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
    df = [data['player_pos'],data['distance_to_l'],data['distance_to_r'],data['angle'],data['shot_technique'],data['player_in_the_way'],data['situation'],data['pass_type'],data['inside_pen_box'],data['inside_6_box'],data['body_part'],data['big_chances'],data['on_target']]
    url = "https://alfiankhofi.ap-south-1.modelbit.com/v1/xg_predict/latest"
    headers = {
    'Content-Type': 'application/json'}
    data = {
    "data": df}

    response = requests.post(url, headers=headers, json=data)
    response_json = response.json()
    return json.dumps(response_json, indent=4)

@app.route("/favicon.ico")
def favicon():
    return url_for('static',filename='clipboard.png')

if __name__ == "__main__":
    app.run()