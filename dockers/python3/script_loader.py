import json
from script import run

def main():
    with open('./parameters.json', 'r') as f:
        arg_json = json.loads(f.read())
        parameters = dict()
        for i in arg_json:
            if i['type'] == 'NUMBER':
                parameters[i['name']] = float(i['value'])
            if i['type'] == 'STRING':
               parameters[i['name']] = i['value']
        run(parameters)
        

if __name__ == '__main__':
    main()
