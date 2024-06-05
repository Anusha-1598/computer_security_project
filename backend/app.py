from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from routes.auth import auth_bp
from routes.document import document_bp
from routes.google_docs import google_docs_bp

app = Flask(__name__)
app.config.from_object('instance.config.Config')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(document_bp, url_prefix='/document')
app.register_blueprint(google_docs_bp, url_prefix='/google_docs')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
