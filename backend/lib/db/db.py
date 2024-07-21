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