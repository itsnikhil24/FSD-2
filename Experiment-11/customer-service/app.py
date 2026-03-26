import os
from flask import Flask, jsonify
import requests

app = Flask(__name__)

# In-memory customer data
customers = {
    1: {"name": "Nikhil", "orders": [101, 102]},
    2: {"name": "Rahul", "orders": [103]}
}

# Use environment variable for Order Service URL (VERY IMPORTANT for deployment)
ORDER_SERVICE_URL = os.getenv(
    "ORDER_SERVICE_URL",
    "http://localhost:5001/orders"  # fallback for local testing
)

@app.route('/')
def home():
    return jsonify({"message": "Customer Service is running 🚀"})

@app.route('/customers/<int:customer_id>/orders', methods=['GET'])
def get_customer_orders(customer_id):
    if customer_id not in customers:
        return jsonify({"error": "Customer not found"}), 404

    order_ids = customers[customer_id]["orders"]

    orders = []
    for order_id in order_ids:
        try:
            response = requests.get(
                f"{ORDER_SERVICE_URL}/{order_id}",
                timeout=3  # prevent hanging
            )
            if response.status_code == 200:
                orders.append(response.json())
        except requests.exceptions.RequestException:
            return jsonify({"error": "Order service unavailable"}), 503

    return jsonify({
        "customer": customers[customer_id]["name"],
        "orders": orders
    })

# IMPORTANT: use PORT from environment (Render requirement)
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)