const fs= require('fs');
const path= require('path');
const {v4: uuid} = require('uuid');

const codePath = path.join('public',"codes");

if(!fs.existsSync(codePath)){
    fs.mkdirSync(codePath,{recursive : true})
}

const generatepath = async(format,content)=>{
   const codeId = uuid();
   const fileName = `${codeId}.${format}`;
   const filePath = path.join(codePath,fileName);
   await fs.writeFileSync(filePath,content);

   return filePath;
}
module.exports= {generatepath}