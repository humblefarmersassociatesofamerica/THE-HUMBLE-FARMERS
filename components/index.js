setInterval(function() { updateStats(); }, 20);



var cash = 100;
var MM = 0;
var MB = 0;




function updateStats() {
document.getElementById("cashdisplay").innerHTML = "Cash: " + cash;
document.getElementById("MMdisplay").innerHTML = "Mystery Meat: " + MM;
document.getElementById("MBdisplay").innerHTML = "Moldy Buns: " + MB;

}








function scavenge() {
    const a = Math.floor(Math.random() * 101);
    if(a >= 66.66666) 
    { 
        MM += 1;
    } 
    else if(a >= 33.33333)
    { 
        MB += 1;  
    }
    else if(a >= 0)
    {
        cash += 1;
    }
}




