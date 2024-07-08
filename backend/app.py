from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', backref=db.backref('files', lazy=True))

class SharedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('file.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    permission = db.Column(db.String(50), nullable=False)
    file = db.relationship('File', backref=db.backref('shared_files', lazy=True))
    owner = db.relationship('User', foreign_keys=[owner_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if data['password'] != data['confirmPassword']:
        return jsonify({'message': 'Passwords do not match'}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 401

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registration Success'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login Success', 'access_token': access_token}), 200
    return jsonify({'message': 'Username or password incorrect'}), 401

@app.route('/api/files', methods=['GET'])
@jwt_required()
def get_files():
    current_user_id = get_jwt_identity()
    files = File.query.filter_by(owner_id=current_user_id).all()
    shared_files = SharedFile.query.filter_by(receiver_id=current_user_id).all()
    files.extend([shared.file for shared in shared_files])
    return jsonify([{'id': file.id, 'filename': file.filename, 'date_created': file.date_created} for file in files])

@app.route('/api/files/<int:file_id>', methods=['GET'])
@jwt_required()
def get_file(file_id):
    current_user_id = get_jwt_identity()
    file = File.query.filter_by(id=file_id, owner_id=current_user_id).first()
    if not file:
        shared_file = SharedFile.query.filter_by(file_id=file_id, receiver_id=current_user_id).first()
        if not shared_file:
            return jsonify({'message': 'File not found or not authorized'}), 404
        file = shared_file.file
    return jsonify({'id': file.id, 'filename': file.filename, 'date_created': file.date_created})

@app.route('/api/files', methods=['POST'])
@jwt_required()
def create_file():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    new_file = File(filename=data['filename'], owner_id=current_user_id)
    db.session.add(new_file)
    db.session.commit()
    return jsonify({'id': new_file.id, 'filename': new_file.filename, 'date_created': new_file.date_created}), 201

@app.route('/api/files/<int:file_id>', methods=['PUT'])
@jwt_required()
def update_file(file_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()
    file = File.query.filter_by(id=file_id, owner_id=current_user_id).first()
    if not file:
        return jsonify({'message': 'File not found or not authorized'}), 404
    file.filename = data['filename']
    db.session.commit()
    return jsonify({'id': file.id, 'filename': file.filename, 'date_created': file.date_created})

@app.route('/api/files/<int:file_id>', methods=['DELETE'])
@jwt_required()
def delete_file(file_id):
    current_user_id = get_jwt_identity()
    file = File.query.filter_by(id=file_id, owner_id=current_user_id).first()
    if not file:
        return jsonify({'message': 'File not found or not authorized'}), 404
    db.session.delete(file)
    db.session.commit()
    return '', 204

@app.route('/api/files/<int:file_id>/share', methods=['POST'])
@jwt_required()
def share_file(file_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()
    file = File.query.filter_by(id=file_id, owner_id=current_user_id).first()
    if not file:
        return jsonify({'message': 'File not found or not authorized'}), 404
    user_to_share_with = User.query.filter_by(username=data['username']).first()
    if not user_to_share_with:
        return jsonify({'message': 'User not found'}), 404
    shared_file = SharedFile(file_id=file_id, owner_id=current_user_id, receiver_id=user_to_share_with.id, permission=data['permission'])
    db.session.add(shared_file)
    db.session.commit()
    return jsonify({'message': 'File shared successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
