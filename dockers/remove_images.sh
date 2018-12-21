docker images -a | grep "sustc_lambda" | awk '{print $3}' | xargs docker rmi
