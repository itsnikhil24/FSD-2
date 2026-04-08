from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import config
import re

app = Flask(__name__)

# MySQL Config
app.config["MYSQL_HOST"] = config.MYSQL_HOST
app.config["MYSQL_USER"] = config.MYSQL_USER
app.config["MYSQL_PASSWORD"] = config.MYSQL_PASSWORD
app.config["MYSQL_DB"] = config.MYSQL_DB

mysql = MySQL(app)

# -----------------------------
# VALIDATION FUNCTION
# -----------------------------
def validate_student(data):
    if not data.get("name") or len(data["name"]) < 3:
        return "Name must be at least 3 characters"

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not data.get("email") or not re.match(email_regex, data["email"]):
        return "Invalid email format"

    if not isinstance(data.get("age"), int) or data["age"] < 16:
        return "Age must be >= 16"

    if not data.get("course"):
        return "Course is required"

    return None

# -----------------------------
# CREATE STUDENT
# -----------------------------
@app.route("/students", methods=["POST"])
def create_student():
    data = request.get_json()

    error = validate_student(data)
    if error:
        return jsonify({"error": error}), 400

    cursor = mysql.connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO student (name, email, age, course) VALUES (%s, %s, %s, %s)",
            (data["name"], data["email"], data["age"], data["course"])
        )
        mysql.connection.commit()
        return jsonify({"message": "Student created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------------------
# GET ALL STUDENTS
# -----------------------------
@app.route("/students", methods=["GET"])
def get_students():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM student")
    students = cursor.fetchall()

    result = []
    for s in students:
        result.append({
            "id": s[0],
            "name": s[1],
            "email": s[2],
            "age": s[3],
            "course": s[4],
            "created_at": str(s[5])
        })

    return jsonify(result)

# -----------------------------
# GET SINGLE STUDENT
# -----------------------------
@app.route("/students/<int:id>", methods=["GET"])
def get_student(id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM student WHERE id = %s", (id,))
    s = cursor.fetchone()

    if not s:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({
        "id": s[0],
        "name": s[1],
        "email": s[2],
        "age": s[3],
        "course": s[4],
        "created_at": str(s[5])
    })

# -----------------------------
# UPDATE STUDENT
# -----------------------------
@app.route("/students/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.get_json()

    error = validate_student(data)
    if error:
        return jsonify({"error": error}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM student WHERE id = %s", (id,))
    if not cursor.fetchone():
        return jsonify({"error": "Student not found"}), 404

    cursor.execute(
        "UPDATE student SET name=%s, email=%s, age=%s, course=%s WHERE id=%s",
        (data["name"], data["email"], data["age"], data["course"], id)
    )
    mysql.connection.commit()

    return jsonify({"message": "Student updated successfully"})

# -----------------------------
# DELETE STUDENT
# -----------------------------
@app.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    cursor = mysql.connection.cursor()

    cursor.execute("SELECT * FROM student WHERE id = %s", (id,))
    if not cursor.fetchone():
        return jsonify({"error": "Student not found"}), 404

    cursor.execute("DELETE FROM student WHERE id = %s", (id,))
    mysql.connection.commit()

    return jsonify({"message": "Student deleted successfully"})

# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)