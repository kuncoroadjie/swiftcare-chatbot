from flask import Flask, render_template, request
import chatbot

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chatbot")
def bot():
    return render_template("chatbot.html")

@app.route("/get")
def chat():
    userText = request.args.get('msg')
    return chatbot.chatbot_response(userText)