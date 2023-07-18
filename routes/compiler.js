const express = require('express');
const router = express.Router();
const compilerX = require('compilex');
const path= require('path');
const fs= require('fs');

const {generatepath}= require('./generatePath');


const option = {stats : true};

compilerX.init(option);

router.get('/',async(req,res)=>{
    res.render('index');
})

router.post('/compileCpp',async(req,res)=>{
    try{
    const language = req.body.language;
    const codes = req.body.codes;
    const inputs = req.body.inputs;
    const radio = req.body.radio;
    
    const fileName = await generatepath(language,codes);
    //const cPath = await executeCpp(cdPath);

    let envData = {
        OS: "windows", 
        cmd: "g++", 
        options: {timeout : 10000} 
    }

    if(radio === "true"){
        compilerX.compileCPPWithInput(envData,codes,inputs,function(data){
            if(data.error){
                try{
                const errorData = data.error;
               // console.log(errorData);
                res.render('code/error',errorData);
                }
                catch(err){
                    console.log(typeof(err));
                    res.json(err + data.error)
                }
            }
            else{
            console.log(typeof(data.output));
            let result = data.output;
            res.render('code/resultant', {
                result: result,
                fileName : fileName
            });
         }
        })
    }
    else{
        compilerX.compileCPP(envData,codes,function(data){
            if(data.error){
                try{
                const errorData = data.error;
                console.log(errorData);
                res.render('code/error',errorData);
                }
                catch(err){
                    console.log(typeof(err));
                    res.json(err + data.error)
                }
            }
            else{
            console.log(typeof(data.output));
            let result = data.output;
            res.render('code/resultant', {
                result: result,
                fileName : fileName
            });
         }
        })
    }
    }
    catch(err){
        res.json({
            'status' : 'failure',
            'error' : err
        });
    }
})

module.exports = router