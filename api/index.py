from flask import Flask,render_template,request, url_for
import requests
import json

app = Flask(__name__,static_folder='static')

@app.route("/")
def hello_world():
    return render_template('xG.html')

@app.route("/data",methods=['POST','GET'])
def hello():
    data = request.get_json(force=True)
    df = dict(data)
    url = "https://alfiankhofi.ap-south-1.modelbit.com/v1/xg_predict/latest"
    headers = {
    'Content-Type': 'application/json'}
    data = {
    "data": df}

    response = requests.post(url, headers=headers, json=data)
    response_json = response.json()
    return json.dumps(response_json, indent=4)

if __name__ == "__main__":
    app.run()
