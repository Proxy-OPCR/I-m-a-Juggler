from flask import Flask, jsonify, request
from game_logic import get_result

app = Flask(__name__)

@app.route("/api/spin", methods=["POST"])
def spin():
    result = get_result()
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
