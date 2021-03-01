fetch('sentence.txt')
     .then(response => response.text())
     .then((data) => {
          document.getElementById("addonsentence").innerHTML = data;
     })
