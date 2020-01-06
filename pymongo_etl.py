import json
import csv
import pymongo
death_list = []
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Define the 'classDB' database in Mongo
db = client.NYData

with open(r'NY_clean_data.json', 'r',encoding = 'utf-8') as data_file:
    data = data_file.read()
    obj = json.loads(data)
    print(obj["columns"])
    columns = obj["columns"]
    
    for row in obj["data"]:
        count = 0
        finalrow = {}
        for d in row:
            #print(d)
            #print(columns[count])
            finalrow[columns[count]] = d
            count += 1
        db.ny_death.insert_one(finalrow)
<<<<<<< HEAD
        
=======
        






# nydeath = db.NYJson.find()
# for student in nydeath:
#     print(student)
>>>>>>> af97c2c3da42618b443123731c6c5c9950f17979
