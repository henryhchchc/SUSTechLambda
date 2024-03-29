import json
import os

def main():
    with open('./parameters.json', 'r') as f:
        arg_json = json.loads(f.read())
        parameters = []
        for i in arg_json:
            if i['type'] == 'STRING':
                parameters.append("\"{}\"".format(i['value']))
            else:
                parameters.append(i['value'])
        if(len(parameters)>0):
            os.system("/bin/bash ./script.sh " + ' '.join(parameters))
        else:
            print('Parameter error.')

if __name__ == '__main__':
    main()
