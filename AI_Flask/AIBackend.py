from urllib.parse import unquote

from flask import Flask
from text import get_text

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World!"


@app.route("/textof/<path:url>")
def text(url: str):
    # url is encoded
    decoded_url = unquote(url)

    return get_text(decoded_url)


if __name__ == "__main__":
    app.run()
