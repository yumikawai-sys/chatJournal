from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure MongoDB URI
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

# Initialize PyMongo
mongo = PyMongo(app)
