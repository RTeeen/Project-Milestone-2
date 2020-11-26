
function showPreview(event){
    console.log(localStorage.getItem("needPreview"));
    if(localStorage.getItem("needPreview") == 1){
        localStorage.setItem('needPreview', 0);
        alert("hello");

        document.getElementById('Before').src = "./2.png";
        document.getElementById('After').src = "./1.png";
    }
}

function previewMark(){
    localStorage.setItem('needPreview', 1);
}