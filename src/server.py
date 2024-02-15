from transformers import pipeline
from flask import Flask, jsonify
from flask_cors import CORS
# from db import app, mongo
from collections import Counter
from pymongo import MongoClient
# from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import requests
from datetime import datetime


load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
mongo_dbname = 'journaldb'

app = Flask(__name__)
CORS(app)

# Connect to MongoDB using MongoClient
client = MongoClient(mongo_uri)

# Specify the database
db = client[mongo_dbname]

# List to store to return result
result = []

@app.route("/<input_text>", methods=['POST'])
def analyse_text(input_text):
    global result

    print('Received request for sentiment analysis. Input text:', input_text)

    # Perform sentiment analysis on the current input text
    sentiment_analysis = pipeline("sentiment-analysis")
    sentiment_result = sentiment_analysis(input_text)
    sentiment_label = sentiment_result[0]['label']
    sentiment_score = float(sentiment_result[0]['score'])
    print('Sentiment analysis completed. Label:', sentiment_label, 'Score:', sentiment_score)

    # Add all results (*return to client)
    result.append({
        "sentiment_label": sentiment_label,
        "sentiment_score": sentiment_score,
        "input_text": input_text,
    })

    print('result', len(result))

    # Save mongoDB
    if len(result) == 3:

        required_keys = {'sentiment_label', 'sentiment_score', 'input_text'}
        if all(set(entry.keys()) == required_keys for entry in result):
            # Data for MongoDB
            # Find the most common sentiment-label
            label = [entry['sentiment_label'] for entry in result]
            counter = Counter(label)
            common_element = counter.most_common(1)[0][0]

            # Sentiment score
            score = sum(entry['sentiment_score'] for entry in result) / 3

            # All text
            dbText = ' '.join(entry['input_text'] for entry in result)
            db_result = {
                "sentiment_label": common_element,
                "sentiment_score": score,
                "input_text": dbText,
            }
            today_date = datetime.now().strftime('%m%d%Y')
            db_result["date"] = today_date
            print('db_result', db_result)

            # Connect & save to DB with error handling
            try:
                print('Attempting to save data to MongoDB...')

                # db = mongo.cx.get_database()
                collection = db["journals"]

                print('db_result before insertion:', db_result)
                collection.insert_one(db_result)
                result.clear()
                print('Data saved to MongoDB successfully.')

            except Exception as e:
                print(f'Error saving data to MongoDB: {str(e)}')
        else:
            print('Error: Missing required keys in result entries.')

    return jsonify(result)

# get today's message from API
@app.route("/api/quotes", methods=['GET'])
def get_quotes():
    try:
        # Make the request to the external API
        response = requests.get('https://zenquotes.io/api/today')
        json_data = response.json()
        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Get from MongoDB
@app.route("/api/journals", methods=['GET'])
def get_journals():
    try:
        # Fetch all documents from the 'journals' collection
        journals = list(db["journals"].find().sort("date", -1))

        # Convert ObjectId to str for JSON serialization
        for journal in journals:
            journal['_id'] = str(journal['_id'])
            formatted_date = datetime.strptime(journal['date'], '%m%d%Y').strftime('%b %d, %Y')
            journal['formatted_date'] = formatted_date

        return jsonify(journals)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)