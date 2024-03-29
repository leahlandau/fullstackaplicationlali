from flask import Flask
from flask_cors import CORS
from waitress import serve

from routes.route import routes


app = Flask(__name__)
CORS(app)
app.register_blueprint(routes)


@app.route("/api")
def index():
    return "Image-Reduction"


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8080)
