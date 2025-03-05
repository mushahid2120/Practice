from flask import Flask
app=Flask(__name__)
@app.route("/")
def home():
    return "This is Jenkins<--------------------->ArgoCd"

app.run(port=80,host='0.0.0.0')

