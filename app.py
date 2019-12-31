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
    
    male = [{"Gender":result["Gender"],"Notes":result["Notes"], "Deaths":result["Year Code"], "Year":result["Year"]} for result in mycol.find({"Gender": "M", "Year": {"$gt": 2006}})]
 
    female = [{"Gender":result["Gender"],"Notes":result["Notes"], "Population":result["Deaths"], "Deaths":result["Year Code"], "Year":result["Year"]}for result in mycol.find({"Gender": "F",  "Year": {"$gt": 2006}})]
    # female_by_year = sorted(female, key = itemgetter("Year"))
    # print(female)
    # for k, v in itertools.groupby(female_by_year, key=itemgetter("Year")):
    #     print(k)
    result = {} 

    disease_m=set()
    disease_f=set()
  
    disease_sum_m = defaultdict(int)
    disease_sum_f = defaultdict(int)

    year_sum_m=defaultdict(int)
    year_sum_f=defaultdict(int)

    year_female=set()
    year_male=set()
    for i in female:
        year_female.add(i["Year"])
        disease_f.add(i["Notes"])

    for y in disease_f:
        disease_sum_f [y]=0
    
    for y in year_female:
        year_sum_f[y]=0
    
    for i in female:
        for y in year_female:
            if i["Year"]==y:
                year_sum_f[y]+=int(i["Deaths"])

    for i in female:
        for y in disease_f:
            if i["Notes"]==y:
                disease_sum_f[y]+=int(i["Deaths"])
    
    print(f"HEllo {year_sum_f}")
    for i in male:
        year_male.add(i["Year"])
        disease_m.add(i["Notes"])

    for y in year_male:
        year_sum_m[y]=0

    for y in disease_m:
        disease_sum_m [y]=0

    for i in male:
        for y in year_male:
            if i["Year"]==y:
                year_sum_m[y]+=int(i["Deaths"])
    
    for i in male:
        for y in disease_m:
            if i["Notes"]==y:
                disease_sum_m[y]+=int(i["Deaths"])
      


    fby = {
        "year": [],
        "deaths": [],
        
    }
    mby = {
        "year": [],
        "deaths": []
    }

    dis_m = {
        "notes":[],
        "deaths": []

    }

    dis_f = {
        "notes":[],
        "deaths": []

    }

   
    # for i in range(len(year_sum)):
    for k, v in disease_sum_f.items  ():
        
        dis_f["notes"].append(k)
        dis_f["deaths"].append(v)

    for k, v in year_sum_f.items  ():
    
        fby["year"].append(k)
        fby["deaths"].append(v)
    
    for k, v in disease_sum_m.items  ():
        
        dis_m["notes"].append(k)
        dis_m["deaths"].append(v)
        

    for k, v in year_sum_m.items  ():
    
        mby["year"].append(k)
        mby["deaths"].append(v)
  


    trace = {
        "male": male,
        # #  "male": male,
        "female": female,
    "male_by_year": mby,
        "female_by_year": fby,
    "notes_female": dis_f,
    "notes_male": dis_m


        
    }
    return jsonify(trace)
if __name__ == "__main__":
    app.run(debug=True)