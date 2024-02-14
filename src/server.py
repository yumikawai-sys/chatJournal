from transformers import pipeline
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Lists to store input texts for sentiment analysis
texts_for_sentiment = []

@app.route("/<input_text>", methods=['POST'])
def analyse_text(input_text):
    global texts_for_sentiment

    print('Received request for sentiment analysis. Input text:', input_text)

    # Perform sentiment analysis on the current input text
    sentiment_analysis = pipeline("sentiment-analysis")
    sentiment_result = sentiment_analysis(input_text)
    sentiment_label = sentiment_result[0]['label']
    sentiment_score = float(sentiment_result[0]['score'])
    print('Sentiment analysis completed. Label:', sentiment_label, 'Score:', sentiment_score)

    # Accumulate the sentiment result for this text
    texts_for_sentiment.append({
        "sentiment_label": sentiment_label,
        "sentiment_score": sentiment_score,
        "input_text": input_text
    })

    # Check if three input texts are received
    if len(texts_for_sentiment) == 3:
        # Perform summarization on the combined texts
        # combined_texts = '\n'.join(texts_for_sentiment)
        combined_texts = ' '.join([text['input_text'] for text in texts_for_sentiment])
        summarizer = pipeline("summarization")
        summarized_result = summarizer(combined_texts, max_length=100, min_length=10, length_penalty=2.0, num_beams=4)
        summary = summarized_result[0]['summary_text']
        print('Text summarization completed. Summary:', summary)

        # Prepare JSON response for sentiment and summarization results
        json_result = [{
            "sentiment_results": texts_for_sentiment,
            "summary": summary
        }]

        # Reset the texts_for_sentiment list
        texts_for_sentiment = []

        print('Sending JSON response for sentiment and summarization:', json_result)
        return jsonify(json_result)

    else:
        # return jsonify({"message": f"Received {len(texts_for_sentiment)} texts. Waiting for more."})
        return jsonify(texts_for_sentiment)
    
if __name__ == "__main__":
    app.run(debug=True)
