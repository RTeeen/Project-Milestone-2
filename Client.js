function showPreview(event){
    console.log(localStorage.getItem("needPreview"));
    if(localStorage.getItem("needPreview") == 1){
        localStorage.setItem('needPreview', 0);
        alert("hello");
        document.getElementById('preview').style.visibility ="visible";
        document.getElementById('Before').src = "./grayscale/uploads/1.png";
        document.getElementById('After').src = "./grayscale/grayscaled/GS_1.png";
    }
}

function previewMark(){
    alert("marked!");
    localStorage.setItem('needPreview', 1);
}
function clearDir(params) {
    
    workingDirectory.getFile(`./grayscale/uploads/${i}.png`, {}, function(fileEntry) {
        fileEntry.remove(function() {
        });
      }, handleError);
}