from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory order data
orders = {
    101: {"id": 101, "item": "Laptop", "status": "Pending"},
    102: {"id": 102, "item": "Phone", "status": "Pending"},
    103: {"id": 103, "item": "Tablet", "status": "Pending"}
}

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(orders[order_id])

@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    if order_id not in orders:
        return jsonify({"error": "Order not found"}), 404

    data = request.json
    status = data.get("status")

    if not status:
        return jsonify({"error": "Status required"}), 400

    orders[order_id]["status"] = status

    return jsonify({
        "message": "Order updated successfully",
        "order": orders[order_id]
    })

if __name__ == '__main__':
    app.run(port=3001, debug=True)