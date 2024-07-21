import sqlite3
from datetime import datetime
from lib.utils.actions import generate_alphanumeric_code
from lib.utils.cryptic import hash_string

def connect_db():
    return sqlite3.connect('example.db')