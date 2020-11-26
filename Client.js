var loadFile = function(event) {
    var beforeTag = document.getElementById('Before');
    var afterTag = document.getElementById('After');
    beforeTag.src = "./2.png";
    //URL.createObjectURL(event.target.files[0]);
    afterTag.src = "./1.png";
};