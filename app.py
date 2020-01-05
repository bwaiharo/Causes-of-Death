import os
from collections import OrderedDict
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

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["NYData"]
mycol = mydb["ny_death"]
mycol2 = mydb["book_4"]
mycol3 = mydb["weekday_deaths"]
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/maps")
def maps():
    return render_template("leaftletmap.html")

@app.route("/country")
def country():
    return render_template("unitedstates.html")


@app.route("/jsonData")
def jsonData():
    # Create lists from the query results
    male = [{"Ten-Year Age Groups": result["Ten-Year Age Groups"], "Gender":result["Gender"],"Race":result["UCD - ICD Chapter Code"], "Notes":result["Notes"], "Deaths":result["Year Code"],
             "Year":result["Year"]} for result in mycol.find({"Gender": "M", "Year": {"$gt": 2006}}).sort([("Ten-Year Age Groups", 1)])]

    female = [{"Ten-Year Age Groups": result["Ten-Year Age Groups"], "Race":result["UCD - ICD Chapter Code"],"Gender":result["Gender"], "Notes":result["Notes"], "Population":result["Deaths"],
               "Deaths":result["Year Code"], "Year":result["Year"]}for result in mycol.find({"Gender": "F",  "Year": {"$gt": 2006}}).sort([("Ten-Year Age Groups", 1)])]

    book_4 = [{"State": result["State"], "State Code":result["State Code"],"Year Code":result["Year Code"], "Month Code":result["Month Code"],
             "Year":result["Year"],"Months":result["Months"],"Deaths":result["Deaths"]} for result in mycol2.find()]

    weekday_deaths = [{"State": result["State"], "State Code":result["State Code"],"Year Code":result["Year Code"], "Weekday":result["Weekday"], "Weekday Code":result["Weekday Code"],
             "Year":result["Year"],"Deaths":result["Deaths"],"Gender":result["Gender"],"Gender Code":result["Gender Code"]} for result in mycol3.find()]


    result = {}

    race_m = set()
    race_f = set()
    

    year_female = set()
    year_male = set()

    age_female = set()
    age_male = set()

    disease_m = set()
    disease_f = set()

    year_sum_m = defaultdict(int)
    year_sum_f = defaultdict(int)

    disease_sum_m = defaultdict(int)
    disease_sum_f = defaultdict(int)

    age_sum_m = defaultdict(int)
    age_sum_f = defaultdict(int)

    race_sum_f = defaultdict(int)
    race_sum_m = defaultdict(int)

    
    
    for i in female:
        year_female.add(i["Year"])
        disease_f.add(i["Notes"])
        age_female.add(i["Ten-Year Age Groups"])
        race_f.add(i["Race"])
    
    
    for y in disease_f:
        disease_sum_f[y] = 0

    for y in year_female:
        year_sum_f[y] = 0

    for y in age_female:
        age_sum_f[y] = 0
    
    for y in race_f:
        race_sum_f[y] = 0



    for i in female:
        for y in year_female:
            if i["Year"] == y:
                year_sum_f[y] += int(i["Deaths"])

    for i in female:
        for y in race_f:
            if i["Race"] == y:
                 race_sum_f[y] += int(i["Deaths"])
    

    for i in female:
        for y in disease_f:
            if i["Notes"] == y:
                disease_sum_f[y] += int(i["Deaths"])

    for i in female:
        for y in age_female:
            if i["Ten-Year Age Groups"] == y:
                age_sum_f[y] += int(i["Deaths"])

    # print(f"HEllo {year_sum_f}")
    for i in male:
        year_male.add(i["Year"])
        disease_m.add(i["Notes"])
        age_male.add(i["Ten-Year Age Groups"])
        race_m.add(i["Race"])

    for y in year_male:
        year_sum_m[y] = 0

    for y in race_m:
        race_sum_m[y] = 0

    for y in disease_m:
        disease_sum_m[y] = 0

    for y in age_male:
        age_sum_m[y] = 0

    for i in male:
        for y in year_male:
            if i["Year"] == y:
                year_sum_m[y] += int(i["Deaths"])

    for i in male:
        for y in race_m:
            if i["Race"] == y:
                 race_sum_m[y] += int(i["Deaths"])

    for i in male:
        for y in disease_m:
            if i["Notes"] == y:
                disease_sum_m[y] += int(i["Deaths"])
    for i in male:
        for y in age_male:
            if i["Ten-Year Age Groups"] == y:
                age_sum_m[y] += int(i["Deaths"])

    fby = {
        "year": [],
        "deaths": [],

    }
    mby = {
        "year": [],
        "deaths": []
    }

    dis_m = {
        "notes": [],
        "deaths": []

    }

    dis_f = {
        "notes": [],
        "deaths": []

    }
    race_female = {
        "race": [],
        "deaths_f": []
        

    }
    race_male = {
        "race": [],
        
        "deaths_m": []

    }
  

    age_m = OrderedDict({
        # "age": sorted(age_sort_m),
        "deaths": []

    })

    age_f = OrderedDict({
        # "age": sorted(age_sort_f),
        "deaths": []

    })

    
    for k, v in race_sum_f.items():

        race_female["race"].append(k)
        
        race_female["deaths_f"].append(v)

    for k, v in race_sum_m.items():

        race_male["race"].append(k)
        race_male["deaths_m"].append(v)
       
    
    for k, v in disease_sum_f.items():

        dis_f["notes"].append(k)
        dis_f["deaths"].append(v)

    for k, v in year_sum_f.items():

        fby["year"].append(k)
        fby["deaths"].append(v)

    for k, v in disease_sum_m.items():

        dis_m["notes"].append(k)
        dis_m["deaths"].append(v)

    for k, v in year_sum_m.items():

        mby["year"].append(k)
        mby["deaths"].append(v)


    age_sort_f = []
    age_sort_m = []

    for k, v in age_sum_m.items():
        age_sort_m.append(k)
        # age_m["age"].append(k)
        age_m["deaths"].append(v)


    for k, v in age_sum_f.items():
        age_sort_f.append(k)
        # age_f["age"].append(k)
        age_f["deaths"].append(v)

 
    new_age_sort_f = sorted(age_sort_f)
    new_age_sort_m = sorted(age_sort_m)

    new_age_sort_m.pop(6)
    new_age_sort_m.insert( 2, '5-14')
    
    new_age_sort_f.pop(6)
    new_age_sort_f.insert( 2, '5-14')

    age_f['age'] = new_age_sort_f
    age_m['age'] = new_age_sort_m
    # print(new_age_sort_f)
    # print("-------------")
    # print(new_age_sort_m)

    trace = {
        "male": male,
        "female": female,
        "male_by_year": mby,
        "female_by_year": fby,
        "notes_female": dis_f,
        "notes_male": dis_m,
        "age_group_m": age_m,
        "race_m": race_male,
        "race_f": race_female,
        "age_group_f": age_f,
        "book_4": book_4,
        "weekday_deaths": weekday_deaths



    }
    return jsonify(trace)


if __name__ == "__main__":
    app.run(debug=True)
