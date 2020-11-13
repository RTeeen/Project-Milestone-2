const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

    let photo = document.getElementById("upload");
    let submit = document.getElementById("button");
    submit.onclick = ()=>{
        let formData = new FormData();
        formData.append("photo",photo);
        fetch('./upload/image', {method:"POST", body:formData});
    }
    

