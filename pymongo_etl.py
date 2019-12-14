import json
my_list = []


import os

import re

text_file = os.path.join(r'Causes-of-Death\NY_death_data.txt')

with open (text_file, "r",encoding = 'utf-8') as f:

    lines = f.readlines() # list containing lines of file
    print(lines)
#     columns = [] # To store column names

#     i = 1
#     for line in lines:
#         line = line.strip() # remove leading/trailing white spaces
#         if line:
#             if i == 1:
#                 columns = [item.strip() for item in line.split(' ')]
#                 i = i + 1
#             else:
#                 d = {} # dictionary to store file data (each line)
#                 data = [item.strip() for item in line.split(' ')]
#                 for index, elem in enumerate(data):
#                     d[columns[index]] = data[index]

#                 my_list.append(d) # append dictionary to list

# # pretty printing list of dictionaries
# print(json.dumps(my_list, indent=4))