from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

df = pd.read_csv("books_with_emotion.csv", encoding='ISO-8859-1')
df = df[df['Image-URL-M'].notnull() & df['Image-URL-M'].str.startswith("http")]

mv = pd.read_csv("movie_recommendation_dataset_final.csv", encoding='ISO-8859-1')
mv = mv[mv['link'].notnull() & mv['link'].str.startswith("http")]

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

@app.route('/recommend/movies', methods=['GET'])
def recommend_movies():
    """Get movie recommendations based on genre and emotion"""
    # Get parameters from query string
    genre_input = request.args.get('genre', '').strip().title()
    emotion_input = request.args.get('emotion', '').strip().title()
    # Validate required parameters
    if not genre_input or not emotion_input:
        return jsonify({"error": "Both genre and emotion parameters are required"}), 400

    # Filter movies
    recommendations = mv[
        (mv['genre'] == genre_input) & 
        (mv['emotion'] == emotion_input)
    ]
    
    if not recommendations.empty:
        result = []
        for _, row in recommendations.iterrows():
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
