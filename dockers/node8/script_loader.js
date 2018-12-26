let run = require('./script.js')
let fs = require('fs')
fs.readFile('parameters.json','utf8',function (err, data) {
    if(err) console.log(err);
    let parameter=JSON.parse(data);
    let allparameter = {}
    parameter.forEach(
        pr=>{
            allparameter[pr.name]=pr.type==='NUMBER'?Number(pr.value):pr.value
        }
    )
    run(allparameter)
});
