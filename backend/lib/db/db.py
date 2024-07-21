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