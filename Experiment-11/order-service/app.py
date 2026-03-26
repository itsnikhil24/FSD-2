import os
from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory order data
orders = {
    101: {"id": 101, "item": "Laptop", "status": "Pending"},
    102: {"id": 102, "item": "Phone", "status": "Pending"},
    103: {"id": 103, "item": "Tablet", "status": "Pending"}
}

# Health check route
@app.route('/')
def home():
    return jsonify({"message": "Order Service is running 🚀"})

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = orders.get(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    return jsonify(order)


@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    order = orders.get(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    # Validate JSON body
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    status = data.get("status")

    if not status or not isinstance(status, str):
        return jsonify({"error": "Valid status is required"}), 400

    # Update order
    order["status"] = status.strip()

    return jsonify({
        "message": "Order updated successfully",
        "order": order
    })


# IMPORTANT: Dynamic port for deployment
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5001))
    app.run(host='0.0.0.0', port=port)