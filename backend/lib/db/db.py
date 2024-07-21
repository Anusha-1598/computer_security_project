import sqlite3
from datetime import datetime
from lib.utils.actions import generate_alphanumeric_code
from lib.utils.cryptic import hash_string

def connect_db():
    return sqlite3.connect('example.db')

def create_tables():
    conn = connect_db()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        user_id TEXT PRIMARY KEY,
                        password_hash TEXT NOT NULL
                      )''')

     # Create files table
    cursor.execute('''CREATE TABLE IF NOT EXISTS files (
                        file_id TEXT PRIMARY KEY,
                        user_id TEXT NOT NULL,
                        date_created TEXT NOT NULL,
                        file_name TEXT NOT NULL,
                        content TEXT NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES users(user_id)
                      )''') 

# Create shared_files table
    cursor.execute('''CREATE TABLE IF NOT EXISTS shared_files (
                        id TEXT PRIMARY KEY,
                        file_id TEXT NOT NULL,
                        owner_id TEXT NOT NULL,
                        receiver_id TEXT NOT NULL,
                        permission TEXT NOT NULL,
                        FOREIGN KEY (file_id) REFERENCES files(file_id),
                        FOREIGN KEY (owner_id) REFERENCES users(user_id),
                        FOREIGN KEY (receiver_id) REFERENCES users(user_id)
                      )''')  

# Create cookies table
    cursor.execute('''CREATE TABLE IF NOT EXISTS cookies (
                        identifier TEXT NOT NULL,
                        encrypted_data BLOB NOT NULL
                      )''')
    
    conn.commit()
    conn.close() 

    def register_user(username, password):
    if check_username_exists(username):
        return {"body": {"message": "Username already exists"}, "status_code": 401}
    else:
        password_hash = hash_string(password)
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (user_id, password_hash) VALUES (?, ?)', (username, password_hash))
        conn.commit()
        conn.close()
        return {"body": {"message": "Registered Successfully"}, "status_code": 200}    

        def check_username_exists(username):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE user_id = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    return user is not None    

    def login_user(username, password):
    password_hash = hash_string(password)
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE user_id = ? AND password_hash = ?', (username, password_hash))
    user = cursor.fetchone()
    conn.close()
    if user:
        return {"body": {"message": "Login Successfully"}, "status_code": 200}
    else:
        return {"body": {"message": "Invalid Credentials"}, "status_code": 401}  

        def insert_encryption(key, value):
    try:
        print("here")
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO cookies (identifier, encrypted_data) VALUES (?, ?)', (key, value))
        conn.commit()
        conn.close()
        return True
    except:
        return False   

        def get_encryption(key):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT encrypted_data FROM cookies WHERE identifier = ?', (key,))
    result = cursor.fetchone()
    conn.close()
    if result:
        return {"signal": True, "encrypted_string": result[0]}
    else:
        return {"signal": False}

        def getDocuments(userId):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT file_id, file_name, date_created  FROM files WHERE user_id = ?', (userId,))
    userDocuments = [{"fileId": row[0], "fileName": row[1], "dateCreated": row[2], "ownerName":userId} for row in cursor.fetchall()]
    
    for document in userDocuments:
        cursor.execute('SELECT receiver_id, permission FROM shared_files WHERE file_id = ?', (document["fileId"],))
        sharedUsers = [{"userId": row[0], "permission": row[1]} for row in cursor.fetchall()]
        document["sharedUsers"] = sharedUsers
    
    conn.close()
    return {"body": {"message": "Documents fetched Successfully", "filesList": userDocuments}, "status_code": 200}