docker images -a | grep "sustech_lambda" | awk '{print $3}' | xargs docker rmi
