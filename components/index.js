/* start of save functions*/
if(typeof(storage) == "undefined")  { alert("Warning " + " your browser does not support local save, when you close this browser all progress will be lost");}
setInterval(function() {save()}, 20);

function save() {
    number(localStorage.cashCount) = cash;
    number(localStorage.MysteryMeat) = MM;
    number(localStorage.MoldyBread) = MB;
}

function clearSave() {
    localStorage.clear();
    if(localStorage.length === 0)
    cash = 0;
    MM = 0;
    MB = 0;
    alert("ahhhh");
 }

if (typeof(storage) !== "undefined" || localStorage.length > 0) {
    var cash = localStorage.cashCount;
    var MM = localStorage.MysteryMeat;
    var MB = localStorage.MoldyBread;
    alert("pain");
}
else { alert("no save found"); }

/* end of save functions*/


/* start of variables and arrays*/
var cash = 0;
var MM = 0;
var MB = 0;



const log = ["Welcome to insert name here LLLLL"];
/* end of variables and arrays*/




/* start update stat functions */
setInterval(function() { updateStats(); }, 20);

function updateStats() {
document.getElementById("cashdisplay").innerHTML = "Cash: " + cash;
document.getElementById("MMdisplay").innerHTML = "Mystery Meat: " + MM;
document.getElementById("MBdisplay").innerHTML = "Moldy Buns: " + MB;
document.getElementById("messageLog").innerHTML = log.join(" <br> ");


if(log.length > 30) { log.pop();}
}
/* end update stat functions */




/* start of the game */
function scavenge() {
    const a = Math.floor(Math.random() * 101);
    if(a >= 50) 
    { 
        MM += 1;
        log.unshift("You Gained 1 Mystery Meat");
    } 
    else if(a >= 10)
    { 
        MB += 1;  
        log.unshift("You Gained 1 Moldy Bun")
    }
    else if(a >= 0)
    {
        cash += 1;
        log.unshift("Its Your Lucky Day! Gained 1 Cash")

    }
}




