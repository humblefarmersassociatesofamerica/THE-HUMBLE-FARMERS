/* start of save functions*/
function save() {
    number(localStorage.cashCount) = cash;
    number(localStorage.MysteryMeat) = MM;
    number(localStorage.MoldyBread) = MB;




    // Store
localStorage.setItem("lastname", "Smith");

// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
}
setInterval(function() {save();}, 20);

function clearSave() {
    localStorage.clear();
    if(localStorage.length === 0)
    cash = 0;
    MM = 0;
    MB = 0;
    alert("Save succsesfully cleared");
 }

window.onload = function() {
if (typeof(storage) !== "undefined" && localStorage.length > 0) {
    var cash = localStorage.cashCount;
    var MM = localStorage.MysteryMeat;
    var MB = localStorage.MoldyBread;
    log.unshift("Save Loaded");
    }
else { log.unshift("no save found"); }  }


/* end of save functions*/


/* start of variables and arrays*/
var cash = 0;
var MM = 0;
var MB = 0;


const log = ["Welcome to insert name here LLLLL", typeof(storage)];
/* end of variables and arrays*/




/* start update stat functions */
setInterval(function() { updateStats(); }, 20);

function updateStats() {
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
        log.unshift("You Gained 1 Moldy Bun");
    }
    else if(a >= 1)
    {
        cash += 1;
        log.unshift("Its Your Lucky Day! Gained 1 Cash");
    }
    else if(a >= 0)
    {
        cash -= 1;
        log.unshift("Your luck ran out :( lose $1");
    }
}





function lul() {
    document.getElementById("coreTab4").innerHTML = "<h1>" + "NOBODY LOVES YOU" + "</H1>";
}