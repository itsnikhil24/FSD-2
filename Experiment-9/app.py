from flask import Flask, request, jsonify
import base64
import jwt
import datetime
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

# Secret key for JWT
app.config['SECRET_KEY'] = 'mysecretkey'

# Dummy user database
users = {
    "admin": generate_password_hash("admin123")
}

# ------------------------------
# Home Route
# ------------------------------
@app.route('/')
def home():
    return jsonify({"message": "Authentication Server Running"})


# ------------------------------
# 1️⃣ BASIC AUTH
# ------------------------------
@app.route('/basic-protected', methods=['GET'])
def basic_auth():

    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return jsonify({"message": "Authorization header missing"}), 401

    try:
        auth_type, credentials = auth_header.split()

        if auth_type != "Basic":
            return jsonify({"message": "Invalid auth type"}), 401

        decoded = base64.b64decode(credentials).decode('utf-8')
        username, password = decoded.split(':')

        if username in users and check_password_hash(users[username], password):
            return jsonify({"message": "Basic Authentication Successful"})

        return jsonify({"message": "Invalid Credentials"}), 401

    except Exception:
        return jsonify({"message": "Invalid Authorization Header"}), 401


# ------------------------------
# 2️⃣ CUSTOM HEADER AUTH
# ------------------------------
@app.route('/custom-protected', methods=['GET'])
def custom_auth():

    username = request.headers.get('X-Username')
    password = request.headers.get('X-Password')

    if not username or not password:
        return jsonify({"message": "Custom headers missing"}), 401

    if username in users and check_password_hash(users[username], password):
        return jsonify({"message": "Custom Header Authentication Successful"})

    return jsonify({"message": "Invalid Credentials"}), 401


# ------------------------------
# 3️⃣ LOGIN (GENERATE JWT)
# ------------------------------
@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    if not data:
        return jsonify({"message": "Missing JSON body"}), 400

    username = data.get("username")
    password = data.get("password")

    if username in users and check_password_hash(users[username], password):

        token = jwt.encode(
            {
                "user": username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            },
            app.config['SECRET_KEY'],
            algorithm="HS256"
        )

        return jsonify({
            "message": "Login successful",
            "token": token
        })

    return jsonify({"message": "Invalid credentials"}), 401


# ------------------------------
# JWT PROTECTION DECORATOR
# ------------------------------
def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return jsonify({"message": "Token missing"}), 401

        try:
            auth_type, token = auth_header.split()

            if auth_type != "Bearer":
                return jsonify({"message": "Invalid token type"}), 401

            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data["user"]

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 401

        except Exception:
            return jsonify({"message": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated


# ------------------------------
# JWT PROTECTED ROUTE
# ------------------------------
@app.route('/jwt-protected', methods=['GET'])
@token_required
def jwt_protected(current_user):

    return jsonify({
        "message": "JWT Authentication Successful",
        "user": current_user
    })


# ------------------------------
# Local Run (for testing only)
# ------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)