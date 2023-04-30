function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openTab2(evt2, tabName2) {
  var j, tabcontent2, tablinks2;
  tabcontent2 = document.getElementsByClassName("tabcontent2");
  for (j = 0; j < tabcontent2.length; j++) {
    tabcontent2[j].style.display = "none";
  }
  tablinks2 = document.getElementsByClassName("tablinks2");
  for (j = 0; j < tablinks2.length; j++) {
    tablinks2[j].className = tablinks2[j].className.replace(" active", "");
  }
  document.getElementById(tabName2).style.display = "block";
  evt2.currentTarget.className += " active";
}