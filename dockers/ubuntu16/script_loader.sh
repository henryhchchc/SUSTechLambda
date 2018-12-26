para_str=$(cat parameters.json | ./jq '.[0].value')
echo "echo -e $para_str" > tmp.sh
para=$(/bin/bash ./tmp.sh)
rm ./tmp.sh
/bin/bash ./script.sh ${para}
