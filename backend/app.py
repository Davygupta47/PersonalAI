from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from pymongo import MongoClient
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
import os
from dotenv import load_dotenv
load_dotenv()  # Load from .env file



app = Flask(__name__)
CORS(app, resources={
    r"/recommend/*": {
        "origins": ["http://localhost:3000", "http://192.168.0.142:3000","https://personal-ai-six.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"],
    },
    r"/movies/*": {
        "origins": ["http://localhost:3000", "http://192.168.0.142:3000","https://personal-ai-six.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    },
     r"/play-song/*": {
        "origins": ["http://localhost:3000", "http://192.168.0.142:3000","https://personal-ai-six.vercel.app"],
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

@app.route('/play-song', methods=['GET'])
def play_emotion():
    # Spotify credentials (replace with environment variables in production)
    client_id = os.getenv('SPOTIPY_CLIENT_ID')
    client_secret = os.getenv('SPOTIPY_CLIENT_SECRET')
    redirect_uri = os.getenv('SPOTIPY_REDIRECT_URI')

    emotion_to_playlist = {
        "Happy": "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",  # Happy Hits
        "Sad": "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1",    # Sad Vibes
        "Angry": "https://open.spotify.com/playlist/37i9dQZF1DWZLcGGC0HJbc",  # Rage Beats
        "Calm": "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",   # Peaceful Piano
    }

    # Get the emotion from the query parameters
    emotion = request.args.get('emotion', '').capitalize()

    # Look up the corresponding playlist URL
    playlist_url = emotion_to_playlist.get(emotion)
    if not playlist_url:
        return jsonify({"error": f"No playlist found for emotion: {emotion}"}), 400

    # Return the playlist URL to the frontend
    return jsonify({"playlist_url": playlist_url}), 200

if __name__ == "__main__":
    app.run(debug=True)
