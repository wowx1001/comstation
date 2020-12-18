from flask import Flask, render_template
import pandas as pd
import flask_jsonpify
import json
from django.core.serializers.json import DjangoJSONEncoder

all_com = json.loads(pd.read_csv('data/all_com.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
all_relay = json.loads(pd.read_csv('data/all_relay.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
jb_com = json.loads(pd.read_csv('data/jb_com.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
jb_relay = json.loads(pd.read_csv('data/jb_relay.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
jj_com = json.loads(pd.read_csv('data/jj_com.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
jj_relay = json.loads(pd.read_csv('data/jj_relay.csv', encoding='cp949').to_json(orient='columns', force_ascii=False))
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/req',methods=['POST'])
def load_data():
    return flask_jsonpify.jsonify({0:all_com,1:all_relay,2:jb_com,3:jb_relay,4:jj_com,5:jj_relay})

if __name__ == '__main__':
    app.run(debug=True)