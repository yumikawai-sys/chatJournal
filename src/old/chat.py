from transformers import pipeline
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/<input_text>")
def analyse_text(input_text):
    print('Received request for sentiment analysis. Input text:', input_text)

    # Sentiment Analysis
    sentiment_analysis = pipeline("sentiment-analysis")
    print('Sentiment analysis pipeline created successfully.')

    sentiment_result = sentiment_analysis(input_text)
    sentiment_label = sentiment_result[0]['label']
    sentiment_score = float(sentiment_result[0]['score'])
    print('Sentiment analysis completed. Label:', sentiment_label, 'Score:', sentiment_score)
    json_result = {
        "sentiment_label" : sentiment_label,
        "sentiment_score" : sentiment_score,
        "input_text":input_text
    }

    # GPT2 for text generation
    # text_generator = pipeline("text-generation", model="gpt2")
    # if sentiment_label == 'POSITIVE':
    #     prompt = f"Today is my birthday! I am feeling really happy because "
    # elif sentiment_label == 'NEGATIVE':
    #     prompt = f"Today is my birthday, but I am feeling a bit down because "
    # else:
    #     prompt = f"Today is my birthday! I am celebrating it in a calm and relaxed manner because "

    # response = text_generator(prompt, max_length=50, temperature=0.8)[0]['generated_text']

    # json_result = {
    #     "sentence": input_text,
    #     "sentiment_label": sentiment_label,
    #     "sentiment_score": sentiment_score,
    #     "response": response,
    # }

    print('Sending JSON response:', json_result)
    return jsonify(json_result)

if __name__ == "__main__":
    app.run(debug=True)
