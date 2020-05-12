// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 265 || document.documentElement.scrollTop > 265) {
//     document.getElementsByClassName("service1").style.top = "0";
//   } else {
//     document.getElementsByClassName("service1").style.top = "-85px";
//   }
// }
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("sidelogo").style.top = "0";
} else {
    document.getElementById("sidelogo").style.top = "-50px";
}
}



function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
app.get(htmlExt('index'), controller.web.Home);
app.get(htmlExt('school'), controller.web.school);

