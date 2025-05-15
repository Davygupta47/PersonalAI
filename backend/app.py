from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={
    r"/recommend/*": {
        "origins": ["http://localhost:3000", "http://192.168.0.142:3000"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["personalai"]
moods_collection = db["moods"]

df = pd.read_csv("books_with_emotion.csv", encoding='ISO-8859-1')
df = df[df['Image-URL-M'].notnull() & df['Image-URL-M'].str.startswith("http")]

mv = pd.read_csv("movie_recommendation_dataset_final.csv", encoding='ISO-8859-1')
mv = mv[mv['link'].notnull() & mv['link'].str.startswith("http")]


@app.route("/mood", methods=["POST"])
def set_mood():
    data = request.get_json()
    user_id = data.get("user_id")
    mood = data.get("mood")
    if not user_id or not mood:
        return jsonify({"error": "user_id and mood are required"}), 400
    moods_collection.update_one(
        {"user_id": user_id},
        {"$set": {"mood": mood}},
        upsert=True
    )
    return jsonify({"success": True})

@app.route("/mood", methods=["GET"])
def get_mood():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    mood_doc = moods_collection.find_one({"user_id": user_id})
    if not mood_doc:
        return jsonify({"error": "Mood not found"}), 404
    return jsonify({"user_id": user_id, "mood": mood_doc["mood"]})

@app.route("/recommend", methods=["GET"])
def recommend_books_by_mood():
    mood = request.args.get("mood", "").lower()
    n = 4
    mood_books = df[df['Emotion'].str.lower() == mood]
    mood_books = mood_books[mood_books['Image-URL-M'].str.strip() != '']

    if mood_books.empty:
        return jsonify({"error": f"No books found for mood: {mood}"}), 404

    selected = mood_books.sample(n=min(n, len(mood_books)))
    result = [
        {
            "title": row["Book-Title"],
            "author": row["Book-Author"],
            "image": row["Image-URL-M"]
        }
        for _, row in selected.iterrows()
    ]
    return jsonify({"books": result})

@app.route('/movies', methods=['GET'])
def recommend_movies():
    """Get movie recommendations based on genre and emotion (case-insensitive)"""
    # Get parameters from query string and convert to lowercase
    genre_input = request.args.get('genre', '').strip().lower()
    emotion_input = request.args.get('emotion', '').strip().lower()

    # Validate required parameters
    if not genre_input or not emotion_input:
        return jsonify({"error": "Both genre and emotion parameters are required"}), 400

    # Convert dataframe columns to lowercase for case-insensitive matching
    filtered_df = mv[
        (mv['genre'].str.lower() == genre_input) &
        (mv['emotion'].str.lower() == emotion_input)
    ]

    if not filtered_df.empty:
        result = []
        for _, row in filtered_df.iterrows():
            movie_data = {
                'name': row['name'],
                'director': row['director'],
                'language': row['language'],
                'genre': row['genre'],
                'emotion': row['emotion'],
                'link': row['link'],
                # 'image_url': row['image_url']
            }
            result.append(movie_data)
        return jsonify({"movies": result})
    else:
        return jsonify({"message": "No movies found matching your criteria"}), 404

if __name__ == "__main__":
    app.run(debug=True)
