/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: Calling all of our modules in the main file.
 * 
 * Created Date: Nov 8th, 2020
 * Author: Artin Peyvasteh
 * 
 */

const {unzip, readDir,grayScale} = require("./IOhandler"),
  pathUnzipped = `${__dirname}/uploads`,
  pathProcessed = `${__dirname}/grayscaled`;

function onlineGrayscale (){

  readDir(pathUnzipped)
    .then((result)=>{
      console.log(result);
        return grayScale(result,pathProcessed);

      
    })
    .then((msg)=> console.log(msg))
    .catch((err)=> console.log(err))
}

module.exports= {onlineGrayscale};
