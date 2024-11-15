from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vendas.db'
db = SQLAlchemy(app)
CORS(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=True)
