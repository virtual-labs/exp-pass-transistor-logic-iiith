function permutator(inputArr) {
  const results = [];

  function permute(arr, memo) {
    let cur

    memo = memo || [];

    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function muxValidate() {
  const x = permutator([0, 1])
  const y = permutator([0, 1])
  let circuitValid = 0
  for(let i = 0; i < x.length; i++) {
    if(connectionMap.has("input" + x[i][0] + "$pt" + y[i][0]) && connectionMap.has("clock0$pt" + y[i][0]) && connectionMap.has("clockbar0$pt" + y[i][0]) && connectionMap.has("pt" + y[i][1] + "$output0") && connectionMap.has("input" + x[i][1] + "$pt" + y[i][1]) && connectionMap.has("clock0$pt" + y[i][1]) && connectionMap.has("clockbar0$pt" + y[i][1]) && connectionMap.has("pt" + y[i][0] + "$output0")){
      circuitValid = 1
      break;
    }
  }
  if (circuitValid === 1) {
    document.getElementById("graph-image").src = "./images/Screenshot (170).png"
    document.getElementById("graph-image").style.display = "block";
    changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
  }
  else {
    document.getElementById("graph-image").style.display = "none";
    changeObservation("&#10060; Circuit is incorrect", 'text-success', 'text-danger')
  }
}
function ptValidate() {
  if ((connectionMap.has("input0$pmos0") && connectionMap.has("clock0$pmos0") && connectionMap.has("clockbar0$nmos0") && connectionMap.has("pmos0$output0") && connectionMap.has("input0$nmos0") && connectionMap.has("nmos0$output0") || (connectionMap.has("input1$pmos0") && connectionMap.has("clock0$pmos0") && connectionMap.has("clockbar0$nmos0") && connectionMap.has("pmos0$output0") && connectionMap.has("input1$nmos0") && connectionMap.has("nmos0$output0")))) {
    document.getElementById("graph-image").src = "./images/Screenshot (168).png"
    document.getElementById("graph-image").style.display = "block";
    changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
  }
  else {
    document.getElementById("graph-image").style.display = "none";
    changeObservation("&#10060; Circuit is incorrect", 'text-success', 'text-danger')
  }
}
function checkAndValidate() {
  if (selectedTab === currentTab.MUX) {
    muxValidate();
  } else if (selectedTab === currentTab.PT) {
    ptValidate();
  }
  document.getElementById('error-container').style='display:none;';
}

function changeObservation(htmlText, removedClass, addedClass) {
  document.getElementById("output-text").innerHTML = htmlText
  document.getElementById("output-text").classList.remove(removedClass)
  document.getElementById("output-text").classList.add(addedClass)
}
