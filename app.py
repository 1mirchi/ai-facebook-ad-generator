from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/generate-ad', methods=['POST'])
def generate_ad():
    data = request.json
    return jsonify({"message": "Ad generated!", "input": data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
