function muxvalidate() {
  if (jsmap.has("input0$pt0") && jsmap.has("clock0$pt0") && jsmap.has("clockbar0$pt0") && jsmap.has("pt0$output0") && jsmap.has("input1$pt1") && jsmap.has("clock0$pt1") && jsmap.has("clockbar0$pt1") && jsmap.has("pt1$output0")) {
    document.getElementById("graph-image").src = "./images/Screenshot (170).png"
    document.getElementById("graph-image").alt = "The graph is shown since the circuit connection is correct"
    document.getElementById("graph-image").style.visibility = "visible";

  }
  else {
    document.getElementById("graph-image").alt = "The graph is not shown since the circuit connection is incorrect"
    alert("The circuit is wrong");

  }
}
function ptvalidate() {
  if (jsmap.has("input0$pt0") && jsmap.has("clock0$pt0") && jsmap.has("clockbar0$pt0") && jsmap.has("pt0$output0") && jsmap.has("input1$pt1") && jsmap.has("clock1$pt1") && jsmap.has("clockbar1$pt1") && jsmap.has("pt1$output1")) {
    document.getElementById("graph-image").src = "./images/Screenshot (168).png"
    document.getElementById("graph-image").alt = "The graph is shown since the circuit connection is correct"
    document.getElementById("graph-image").style.visibility = "visible";

  }
  else {
    document.getElementById("graph-image").alt = "The graph is not shown since the circuit connection is incorrect"
    alert("The circuit is wrong");

  }
}
function check_and_validate() {
  if (selected_tab == 0) {
    muxvalidate();
  } else if (selected_tab == 1) {
    ptvalidate();
  }
}