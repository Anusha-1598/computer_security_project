from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from routes.auth import auth_bp
from routes.document import document_bp
from routes.google_docs import google_docs_bp

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('instance.config.Config')

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from routes.auth import auth_bp
    from routes.document import document_bp
    from routes.google_docs import google_docs_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(document_bp, url_prefix='/document')
    app.register_blueprint(google_docs_bp, url_prefix='/google_docs')

    with app.app_context():
        db.create_all()

    return app
