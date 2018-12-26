import json
import os 

def main():
    with open('./parameters.json', 'r') as f:
        arg_json = json.loads(f.read())
        parameters = []
        for i in arg_json:
            parameters.append(i['name'])
            parameters.append(i['value'])
        if(len(parameters)>0):
            os.system("./script.sh " + ' '.join(parameters))
        else:
            print('Parameter error.')

if __name__ == '__main__':
    main()