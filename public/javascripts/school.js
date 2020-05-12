window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 285 || document.documentElement.scrollTop > 285) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-90px";
  }
}
