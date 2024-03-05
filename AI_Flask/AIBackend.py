from urllib.parse import unquote

from flask import Flask
from text import get_text

app = Flask(__name__)


<<<<<<< Updated upstream
@app.route("/")
=======
@app.route("/hello")
>>>>>>> Stashed changes
def hello_world():
    return {"hey":"Hello World!"}


@app.route("/textof/<path:url>")
def text(url: str):
    # url is encoded
    decoded_url = unquote(url)

    return get_text(decoded_url)


if __name__ == "__main__":
    app.run()
