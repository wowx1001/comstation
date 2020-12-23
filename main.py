from flask import Flask, render_template
import pandas as pd
import flask_jsonpify
import json

all_com = json.loads(pd.read_csv('data/all_com.csv', encoding='utf8').to_json(orient='columns', force_ascii=False))
all_tw = json.loads(pd.read_csv('data/12.csv', encoding='utf8').to_json(orient='columns', force_ascii=False))
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/req',methods=['POST'])
def load_data():
    return flask_jsonpify.jsonify(all_com)

@app.route('/tw',methods=['POST'])
def tw_load_data():
    return flask_jsonpify.jsonify(all_tw)

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
