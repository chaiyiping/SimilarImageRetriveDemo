import os
import numpy as np
import json
from flask import Flask
from flask import Response
from flask import request
app=Flask(__name__)

class ImgObj:
    def __init__(self,name,label):
        self.name=name
        self.label=label

def getRandomImages(db_path, n):
    images_db = os.listdir(db_path)
    images_selected = np.random.choice(images_db, size = n, replace = False)
    return images_selected

@app.route('/randomImageList')
def getRandomImagesApi():
    images_list=getRandomImages("../../imagedemo/public/images/database", 100) #To do: replace the path to be your database path
    resp = Response(json.dumps(images_list.tolist()))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/searchResults')
def getSearchResults():
    img = request.args.get("img")
    #To do: call your function to get retrieved results
    images_list=getRandomImages("../../imagedemo/public/images/database", 50) #set your search results to image_list then return the list to me
    ret_list = []
    for imgName in images_list:
        ret_list.append(ImgObj(imgName,0))
    resp = Response(json.dumps(ret_list,default=lambda o: o.__dict__))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__=='__main__':
    app.run()


