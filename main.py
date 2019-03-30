from flask import Flask,render_template,request,jsonify
import pandas as pd
app = Flask(__name__)

df=pd.read_csv("word_search.tsv",sep='\t',names = ["words", "frequency"])
df['words']=df['words'].apply(str)
tot_words=list(df['words'])

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search',methods=['GET','POST'])
def search():
    if request.method=="POST":
        try:
            search_field=str(request.form.get('search'))
            #searching for words containing (entered letters from user)
            retrieved_words=[i for i in tot_words if i.find(search_field)>=0]
            #sorting according to index position of words and length
            fin_list=sorted(sorted(retrieved_words,key=lambda x: x.find(search_field)),key=len)
        except:
            fin_list=['error']
        return jsonify({'words':fin_list})
    return "404"

@app.route('/retrieve',methods=['GET','POST'])
def retrieve():
    if request.method=="POST":
        entered_text=str(request.form.get('entered_text'))
        try:
            frequency_count=str(int(df[df['words']==entered_text]['frequency']))
        except:
            frequency_count="Not in DataBase"
        return jsonify({'frequency_count':frequency_count,'entered_text':entered_text})
    return "404"

if __name__ == '__main__':
    app.run(debug = True)
