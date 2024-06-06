from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Document

document_bp = Blueprint('document_bp', __name__)

@document_bp.route('/create', methods=['POST'])
@jwt_required()
def create_document():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_doc = Document(title=data['title'], content=data['content'], owner_id=user_id)
    db.session.add(new_doc)
    db.session.commit()
    return jsonify({"message": "Document created successfully", "doc_id": new_doc.id}), 201

@document_bp.route('/update/<int:doc_id>', methods=['PUT'])
@jwt_required()
def update_document(doc_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    doc = Document.query.get(doc_id)
    if doc and doc.owner_id == user_id:
        doc.content = data['content']
        db.session.commit()
        return jsonify({"message": "Document updated successfully"}), 200
    return jsonify({"message": "Unauthorized"}), 403

@document_bp.route('/get/<int:doc_id>', methods=['GET'])
@jwt_required()
def get_document(doc_id):
    doc = Document.query.get(doc_id)
    if doc:
        return jsonify({"title": doc.title, "content": doc.content}), 200
    return jsonify({"message": "Document not found"}), 404
