from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import HTMLResponse
import pymysql
import hashlib

# Create FastAPI app instance
app = FastAPI()

# ===========================
# MySQL Connection
# ===========================
# IMPORTANT: In a real-world application, you should use environment variables
# to store sensitive information like passwords, not hardcode them.
try:
    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="Sagnik2024",  # <-- Updated with your password
        database="user_demo",
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
except pymysql.err.OperationalError as e:
    print(f"❌ Could not connect to MySQL: {e}")
    # Stop the app if DB is not reachable
    import sys

    sys.exit(1)


# ===========================
# Helper function for password hashing
# ===========================
def hash_password(password: str) -> str:
    """Hashes a password using SHA-256 for secure storage."""
    return hashlib.sha256(password.encode()).hexdigest()


# ===========================
# Home Page
# ===========================
@app.get("/", response_class=HTMLResponse)
def home():
    """Renders the main navigation page."""
    return """
    <h1>SIH User Demo</h1>
    <a href='/register'>Register</a> | 
    <a href='/login'>Login</a> | 
    <a href='/users'>View All Users</a>
    """


# ===========================
# Registration Page
# ===========================
@app.get("/register", response_class=HTMLResponse)
def register_form():
    """Renders the user registration form."""
    return """
    <h2>User Registration</h2>
    <form action="/register" method="post">
        Name: <input type="text" name="name" required><br><br>
        Phone: <input type="text" name="phone" required><br><br>
        Gmail: <input type="email" name="gmail" required><br><br>
        Address: <input type="text" name="address"><br><br>
        Date of Birth: <input type="date" name="dob" required><br><br>
        Username: <input type="text" name="username" required><br><br>
        Password: <input type="password" name="password" required><br><br>
        <button type="submit">Register</button>
    </form>
    <br><a href="/">Back to Home</a>
    """


@app.post("/register", response_class=HTMLResponse)
def register(
        name: str = Form(...),
        phone: str = Form(...),
        gmail: str = Form(...),
        address: str = Form(""),
        dob: str = Form(...),
        username: str = Form(...),
        password: str = Form(...)
):
    """Handles user registration by hashing the password and storing the user data."""
    try:
        # Hash the password before storing it for security
        hashed_password = hash_password(password)
        cursor.execute("""
                       INSERT INTO users (name, phone, gmail, address, dob, username, password)
                       VALUES (%s, %s, %s, %s, %s, %s, %s)
                       """, (name, phone, gmail, address, dob, username, hashed_password))
        conn.commit()
        return f"<h3>✅ User {name} registered successfully!</h3><br><a href='/'>Back to Home</a>"
    except pymysql.err.IntegrityError as e:
        # This will catch errors for duplicate unique fields like username or gmail
        return f"<h3>❌ Error: A user with that username or email already exists.</h3><br><a href='/register'>Try Again</a>"
    except Exception as e:
        return f"<h3>❌ Unexpected Error: {str(e)}</h3><br><a href='/register'>Try Again</a>"


# ===========================
# Login Page
# ===========================
@app.get("/login", response_class=HTMLResponse)
def login_form():
    """Renders the user login form."""
    return """
    <h2>User Login</h2>
    <form action="/login" method="post">
        Username: <input type="text" name="username" required><br><br>
        Password: <input type="password" name="password" required><br><br>
        <button type="submit">Login</button>
    </form>
    <br><a href="/">Back to Home</a>
    """


@app.post("/login", response_class=HTMLResponse)
def login(username: str = Form(...), password: str = Form(...)):
    """Handles user login by hashing the provided password and comparing it."""
    # Hash the provided password to compare with the stored hash
    hashed_password = hash_password(password)

    # Use a parameterized query to prevent SQL Injection
    cursor.execute("""
                   SELECT *
                   FROM users
                   WHERE username = %s
                     AND password = %s
                   """, (username, hashed_password))
    user = cursor.fetchone()

    if user:
        return f"<h3>✅ Welcome {user['name']}! Login successful.</h3><br><a href='/'>Back to Home</a>"
    else:
        return "<h3>❌ Invalid login credentials!</h3><br><a href='/login'>Try Again</a>"


# ===========================
# View All Users
# ===========================
@app.get("/users", response_class=HTMLResponse)
def get_users():
    """Renders a table of all registered users, excluding passwords."""
    # Exclude the password column from the query for security
    cursor.execute("SELECT profile_id, name, phone, gmail, address, dob, username FROM users")
    users = cursor.fetchall()

    table = "<h2>Registered Users</h2><table border='1' cellpadding='5'><tr><th>ID</th><th>Name</th><th>Phone</th><th>Gmail</th><th>Address</th><th>DOB</th><th>Username</th></tr>"
    for u in users:
        table += f"<tr><td>{u['profile_id']}</td><td>{u['name']}</td><td>{u['phone']}</td><td>{u['gmail']}</td><td>{u['address']}</td><td>{u['dob']}</td><td>{u['username']}</td></tr>"
    table += "</table><br><a href='/'>Back to Home</a>"

    return table

