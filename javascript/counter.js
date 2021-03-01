const count = document.getElementById("amtvisits");
function update(){
     fetch("https://api.countapi.xyz/update/mark-zaydman/hakjfdhlkjdahkjvnkjnlkuzbvknjnklnvHjhjkfhkjanvjkvbnkuhvnkrv/?amount=1")
     .then(res => res.json())
     .then(res =>{
          if (res.value >= 100000){
          count.innerHTML = res.value;
          }
          else if (res.value >= 100000){
               count.innerHTML = "0" + res.value;
               }
          else if (res.value >= 1000){
                    count.innerHTML = "00" +  res.value;
          }
          else if (res.value >= 100){
               count.innerHTML = "000" +  res.value;
          
          }
          else if (res.value >= 10){
               count.innerHTML = "0000" +  res.value;
          }
          else{
               count.innerHTML = "00000" +  res.value;
          }
          
          
     });
}

update()
