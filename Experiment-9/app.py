from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
import os

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret-key"

jwt = JWTManager(app)

users = {
    "admin": {"password": "admin123", "role": "admin"},
    "john": {"password": "john123", "role": "user"}
}

@app.route("/basic-protected")
def basic_protected():
    auth = request.authorization
    if not auth:
        return jsonify({"error": "Missing Basic Auth"}), 401

    user = users.get(auth.username)

    if user and user["password"] == auth.password:
        return jsonify({"message": f"Welcome {auth.username}"})

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/jwt-login", methods=["POST"])
def jwt_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users.get(username)

    if user and user["password"] == password:
        token = create_access_token(identity=username)
        return jsonify({"access_token": token})

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/jwt-protected")
@jwt_required()
def jwt_protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"JWT Auth Success. Welcome {current_user}!"})


@app.route("/")
def home():
    return jsonify({"message": "JWT Authentication Experiment Running"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)