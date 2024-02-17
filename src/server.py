from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime
from collections import Counter
import requests

from transformers import (
    TokenClassificationPipeline,
    AutoModelForTokenClassification,
    AutoTokenizer,
)
from transformers.pipelines import AggregationStrategy
import numpy as np
from flask_cors import cross_origin


load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
mongo_dbname = 'journaldb'

app = Flask(__name__)
CORS(app)

# Connect to MongoDB using MongoClient
client = MongoClient(mongo_uri)
db = client[mongo_dbname]

result_sentiment = []
result_keyphrase = []

# Define keyphrase extraction pipeline
class KeyphraseExtractionPipeline(TokenClassificationPipeline):
    def __init__(self, model, *args, **kwargs):
        super().__init__(
            model=AutoModelForTokenClassification.from_pretrained(model),
            tokenizer=AutoTokenizer.from_pretrained(model),
            *args,
            **kwargs
        )

    def postprocess(self, all_outputs):
        results = super().postprocess(
            all_outputs=all_outputs,
            aggregation_strategy=AggregationStrategy.SIMPLE,
        )
        return np.unique([result.get("word").strip() for result in results])

# Load keyphrase extraction pipeline
keyphrase_model_name = "ml6team/keyphrase-extraction-kbir-inspec"
keyphrase_extractor = KeyphraseExtractionPipeline(model=keyphrase_model_name)

@app.route("/keyphrase-extraction/<input_text>", methods=['POST'])
@cross_origin()  # Enable CORS for this specific route
def extract_keyphrases(input_text):
    global result_keyphrase

    print('Received request for keyphrase extraction. Input text:', input_text)

    # Perform keyphrase extraction on the current input text
    keyphrases = keyphrase_extractor(input_text)
    print('Keyphrases extracted:', keyphrases)

    # Convert NumPy array to a list
    keyphrases_list = keyphrases.tolist()

    print('keyphrases_list', len(keyphrases_list))

    # Return the response with the converted list
    return jsonify(keyphrases_list)

# Sentiment Analysis
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


# Get all journals from MongoDB
@app.route("/api/journals", methods=['GET'])
def get_journals():
    try:
        print('Attempting to fetch journals...')
        # Fetch all documents from the 'journals' collection
        journals = list(db["journals"].find().sort("date", -1))
        print('Fetched journals successfully.', journals)

        # Convert ObjectId to str for JSON serialization
        for journal in journals:
            journal['_id'] = str(journal['_id'])
            formatted_date = datetime.strptime(journal['date'], '%m%d%Y').strftime('%b %d, %Y')
            journal['formatted_date'] = formatted_date

        print('journals', journals)
        return jsonify(journals)
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': str(e)}), 500
    

# Get one journal from MongoDB
@app.route("/api/journal/<current_date>", methods=['GET'])
def get_journal(current_date):
    try:
        # Fetch one collection based on the provided date
        journal = db["journals"].find_one({"date": current_date})
        print('current_date', current_date)
        print('journal', [journal])
        # If a journal is found, format the date and convert ObjectId to str
        if journal:
            journal['_id'] = str(journal['_id'])
            formatted_date = datetime.strptime(journal['date'], '%m%d%Y').strftime('%b %d, %Y')
            journal['formatted_date'] = formatted_date

            return jsonify([journal])
        else:
            # Return a 200 OK with a custom message for no data
            return jsonify([]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)