from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# サンプルの品種データ
varieties = [
    {
        "id": 1,
        "name": "品種A",
        "aroma": 8,
        "disease_resistance": 7,
        "yield": 9,
        "flavor": 8
    },
    {
        "id": 2,
        "name": "品種B",
        "aroma": 9,
        "disease_resistance": 6,
        "yield": 7,
        "flavor": 8
    },
    {
        "id": 3,
        "name": "品種C",
        "aroma": 7,
        "disease_resistance": 8,
        "yield": 8,
        "flavor": 7
    }
]

@app.route('/api/varieties', methods=['GET'])
def get_varieties():
    return jsonify(varieties)

@app.route('/api/varieties', methods=['POST'])
def add_variety():
    data = request.get_json()
    new_variety = {
        "id": len(varieties) + 1,
        "name": data.get('name'),
        "aroma": int(data.get('aroma', 5)),
        "disease_resistance": int(data.get('disease_resistance', 5)),
        "yield": int(data.get('yield', 5)),
        "flavor": int(data.get('flavor', 5))
    }
    varieties.append(new_variety)
    return jsonify(new_variety), 201

@app.route('/api/hybridize', methods=['POST'])
def hybridize():
    # ここでは仮の実装として、ランダムな特性を持つ新しい品種を生成
    new_variety = {
        "id": len(varieties) + 1,
        "name": f"新品種-{len(varieties) + 1}",
        "aroma": random.randint(5, 10),
        "disease_resistance": random.randint(5, 10),
        "yield": random.randint(5, 10),
        "flavor": random.randint(5, 10)
    }
    varieties.append(new_variety)
    return jsonify(new_variety)

if __name__ == '__main__':
    app.run(debug=True, port=5001) 