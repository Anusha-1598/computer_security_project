from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from lib.db.db import create_tables, register_user, login_user, insert_encryption, get_encryption, getDocuments, getSharedDocuments, getDocumentContent as getDocContent, deleteDocument as deleteDoc, renameDocument as renameDoc, updateFilePermissions as updateFileAccess
from lib.utils.cryptic import encrypt_to_fixed_length_string, decrypt_from_fixed_length_string

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Ensure tables are created when the server starts
create_tables()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route("/register", methods=["POST"])
def register():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["username"] == "" or json["password"] == "" or json["confirmPassword"] != json["password"]:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = register_user(json["username"], json["password"])
                print(f"Registration result: {result}")  # Debug print
                return jsonify(result["body"]), result["status_code"]
        else:
            print(f"Unsupported Content-Type: {content_type}")  # Debug print
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        print(f"Error in register: {repr(error)}")  # Debug print
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/login", methods=["POST"])
def login():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["username"] == "" or json["password"] == "":
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = login_user(json["username"], json["password"])
                response = make_response(jsonify(result["body"]))
                response.status_code = result["status_code"]
                if result["status_code"] == 200:
                    enc_object = encrypt_to_fixed_length_string({"ip": request.remote_addr, "username": json["username"]})
                    insert_encryption(enc_object["identifier"], enc_object["encrypted_data"])
                    print(f"Setting cookie: {enc_object['identifier']}")  # Debug print
                    response.set_cookie('user', enc_object["identifier"], max_age=60*60*24, httponly=True, secure=False, samesite='None')
                return response
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        print(f"Error in login: {repr(error)}")  # Debug print
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/verifyCookie", methods=["POST"])
def verifyCookie():
    try:
        identifier = request.cookies.get("user")
        print(f"Cookie identifier: {identifier}")  # Debug print
        print(f"Request cookies: {request.cookies}")  # Debug print
        if identifier:
            enc_signal_obj = get_encryption(identifier)
            print(f"Encryption signal object: {enc_signal_obj}")  # Debug print
            if enc_signal_obj["signal"]:
                enc_obj = decrypt_from_fixed_length_string(enc_signal_obj["encrypted_string"])
                print(f"Decrypted object: {enc_obj}")  # Debug print
                if enc_obj["ip"] == request.remote_addr:
                    response = make_response(jsonify({"message": "User Verified"}))
                    response.status_code = 200
                    return response
                else:
                    print(f"IP Mismatch: {enc_obj['ip']} != {request.remote_addr}")  # Debug print
                    response = make_response(jsonify({"message": "Please login Again"}))
                    response.status_code = 401
                    return response
            else:
                print(f"Invalid Cookie: {identifier}")  # Debug print
                response = make_response(jsonify({"message": "Invalid Cookie"}))
                response.status_code = 401
                return response
        else:
            print("Cookie not found")  # Debug print
            response = make_response(jsonify({"message": "Cookie not found"}))
            response.status_code = 401
            return response
    except Exception as error:
        print(f"Error in verifyCookie: {repr(error)}")  # Debug print
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/getUserDocuments", methods=["POST"])
def getUserDocuments():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["userId"] == "" or json["userId"] is None:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = getDocuments(json["userId"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/getSharedDocuments", methods=["POST"])
def getSharedDocuments():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["userId"] == "" or json["userId"] is None:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = getSharedDocuments(json["userId"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/getDocumentContent", methods=["POST"])
def getDocumentContent():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["fileId"] == "" or json["fileId"] is None or json["userId"] == "" or json["userId"] is None:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = getDocContent(json["userId"], json["fileId"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/deleteDocument", methods=["POST"])
def deleteDocument():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["fileId"] == "" or json["fileId"] is None or json["userId"] == "" or json["userId"] is None:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = deleteDoc(json["userId"], json["fileId"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/renameDocument", methods=["POST"])
def renameDocument():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["fileId"] == "" or json["fileId"] is None or json["userId"] == "" or json["userId"] is None or json["newFileName"] == "":
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = renameDoc(json["userId"], json["fileId"], json["newFileName"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

@app.route("/updateFilePermissions", methods=["POST"])
def updateFilePermissions():
    try:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            json = request.json
            if json["fileId"] == "" or json["fileId"] is None or json["userId"] == "" or json["userId"] is None or json["sharedUsers"] is None:
                response = make_response(jsonify({"message": 'Invalid Data'}))
                response.status_code = 400
                return response
            else:
                result = updateFileAccess(json["userId"], json["fileId"], json["sharedUsers"])
                return jsonify(result["body"]), result["status_code"]
        else:
            response = make_response(jsonify({"message": 'Content-Type not supported!'}))
            response.status_code = 400
            return response
    except Exception as error:
        response = make_response(jsonify({"message": repr(error)}))
        response.status_code = 500
        return response

if __name__ == "__main__":
    app.run(debug=True)
