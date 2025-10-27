from flask import Flask, jsonify
from events import bus, EVENTS
from game_logic import spin_logic

app = Flask(__name__)

@app.route("/spin", methods=["GET"])
def spin():
    spin_logic()
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    print("🎰 Server running at http://127.0.0.1:5000/")
    app.run(debug=True)
