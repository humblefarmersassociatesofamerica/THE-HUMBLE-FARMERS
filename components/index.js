setInterval(function() { updateStats(); }, 20);



var cash = 100;
var MM = 0;
var MB = 0;




function updateStats() {
document.getElementById("cashdisplay").innerHTML = "Cash: " + cash;



}








function buyMM() {
    MM += 1;
}




