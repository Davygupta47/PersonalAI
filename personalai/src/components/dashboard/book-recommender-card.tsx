"use client";
import { useState } from "react";

type Book = {
  title: string;
  author: string;
  image: string;
};

export default function BookRecommenderCard() {
  const [mood, setMood] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    setError("");
    try {
      const res = await fetch(`http://127.0.0.1:5000/recommend?mood=${mood}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setBooks([]);
        return;
      }
      const data = await res.json();
      setBooks(data.books);
    } catch {
      setError("Could not fetch recommendations");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📚 Mood Book Recommender</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter your mood (happy, sad, etc)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={fetchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Books
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 gap-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow flex items-center gap-4"
          >
            {/* <img src={book.image} alt={book.title} className="w-16 h-24 object-cover rounded" /> */}
            <div>
              <h2 className="font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
