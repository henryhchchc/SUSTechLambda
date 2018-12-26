from ast import literal_eval as make_tuple
import json
from script import *;

def main():
    with open('./parameters.json', 'r') as f:
        arg_json = json.loads(f.read())
        arg = make_tuple(arg_json[0]['value'])
        if arg:
            run(arg)
        else:
            print('Parameter error.')

if __name__ == '__main__':
    main()
