import os
from collections import defaultdict
from flask_pymongo import PyMongo
import pymongo
import itertools
from operator import itemgetter
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# Flask Setup
#################################################
app = Flask(__name__)
# mapkey = os.environ.get('MAPKEY', '') or "CREATE MAPKEY ENV"
# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/NYData")
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["NYData"]
mycol = mydb["ny_death"]
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/jsonData")
def jsonData():
    # Create lists from the query results
    
    male = [{"Gender":result["Gender"], "Deaths":result["Deaths"], "Year":result["Year"]} for result in mycol.find({"Gender": "M"})]
 
    female = [{"Gender":result["Gender"], "Deaths":result["Deaths"], "Year":result["Year"]}for result in mycol.find({"Gender": "F"})]
    # female_by_year = sorted(female, key = itemgetter("Year"))
    # print(female)
    # for k, v in itertools.groupby(female_by_year, key=itemgetter("Year")):
    #     print(k)
    result = {} 
    year_female=set()
    for i in female:
        year_female.add(i["Year"])
        # print (f"Deaths: {i.get('Deaths')} Year: {i.get('Year')}") 
    print(year_female)
    year_sum=defaultdict(int)
    year_female=set()
    for i in female:
        year_female.add(i["Year"])
    for y in year_female:
        year_sum[y]=0
    for i in female:
        for y in year_female:
            if i["Year"]==y:
                year_sum[y]+=int(i["Deaths"])
        
        # print (f"Deaths: {i.get('Deaths')} Year: {i.get('Year')}") 
    year = year_sum.keys() 
    print(type(year))
    # death = year_sum.values() 
    # print(year[0])
    # print(death[0])
    fby = {
        "year": [],
        "deaths": []
    }
    
    # for i in range(len(year_sum)):
    for k, v in year_sum.items  ():
        
        fby["year"].append(k)
        fby["deaths"].append(v)
        # fby.update({'Year':k, 'Deaths':v})
        # print(fby)
    # for i in range(len(year_sum)):
    #     fby['Deaths'] = death
    # print(fby)
        # print("each",i["Deaths"],i["Year"])
        # year_female = i["Year"]
        # for y in year_female
    # print(result)
    #Generate the plot trace
    trace = {
        "male": male,
        # #  "male": male,
        # "female": female,
        "female_by_year": fby
        
    }
    return jsonify(trace)
if __name__ == "__main__":
    app.run(debug=True)