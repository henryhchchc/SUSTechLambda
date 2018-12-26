import json
from script import *;

def main():
    with open('./parameters2.json', 'r') as f:
        arg_json = json.loads(f.read())
        parameters = dict()
        for i in arg_json:
            if i['type'] == 'NUMBER':
                parameters[i['name']] = float(i['value'])
            if i['type'] == 'STRING':
               parameters[i['name']] = i['value']
        if(len(parameters)>0):
            run(parameters)            
        else:
            print('Parameter error.')

if __name__ == '__main__':
    main()