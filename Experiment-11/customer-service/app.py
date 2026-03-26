from flask import Flask, jsonify
import requests

app = Flask(__name__)

# In-memory customer data
customers = {
    1: {"name": "Nikhil", "orders": [101, 102]},
    2: {"name": "Rahul", "orders": [103]}
}

ORDER_SERVICE_URL = "http://localhost:3001/orders"

@app.route('/customers/<int:customer_id>/orders', methods=['GET'])
def get_customer_orders(customer_id):
    if customer_id not in customers:
        return jsonify({"error": "Customer not found"}), 404

    order_ids = customers[customer_id]["orders"]

    # Fetch order details from Order Service
    orders = []
    for order_id in order_ids:
        try:
            response = requests.get(f"{ORDER_SERVICE_URL}/{order_id}")
            if response.status_code == 200:
                orders.append(response.json())
        except:
            pass

    return jsonify({
        "customer": customers[customer_id]["name"],
        "orders": orders
    })

if __name__ == '__main__':
    app.run(port=3000, debug=True)