
window.addEventListener('scroll', function() {
    let overlay = document.querySelector('.mask');
    let scrollDistance = window.scrollY;

// opacidad de 0 a 0.7 dependiendo del scroll
let opacity = scrollDistance / 1000;  // Se puede ajustar el valor para hacer el efecto más o menos pronunciado

// Limitar la opacidad entre 0 y 1
opacity = opacity > 0.7 ? 0.7 : opacity;

// Aplicar el cambio de opacidad al overlay
overlay.style.opacity = opacity;
  });



  document.getElementById("AbrirMenu").addEventListener('click', function() {
    const menu = document.getElementById("contenedor2");
    const main = document.getElementById("contenedor1")
    if(menu.style.display === "flex"){
      menu.style.display = "none"
      main.style.display = "flex"
    }
    else{
      menu.style.display = "flex"
      main.style.display = "none"
    }
  })


// boton menu MONSTRO
  async function showMonstros() {
    try{
      const container= document.getElementById("resultados")
      container.innerHTML =''
      const monstros = await GetMonstro();
      if(monstros){
        monstros.map(monstro=>{
          const createdElement = document.createElement("div")
          createdElement.setAttribute("class", "monstroCard")
          createdElement.addEventListener('click', function(){
            Navigate(monstro.idMonstro)
          })

          const image = document.createElement("img")
          image.setAttribute("class", "monstroImagenCard")
          image.setAttribute("src", monstro.imagen.iconUrl)

          const nombre = document.createTextNode(monstro.nombre)
          createdElement.appendChild(image)
          createdElement.appendChild(nombre)
          
          container.appendChild(createdElement)
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }

  
  function Navigate (id) {  
    window.location.href = `/src/Monstros.html?id=${id}`;
  }
    

  // funcion para obtener datos de la API
  async function GetMonstro () {
    const monstroData = await fetch("https://localhost:7101/monstro",{
      method:"GET",
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(data=>data.json()).then(data=>data)
    return monstroData
  }

  function navegarIngresar() {
    window.location.href = "/src/nuevo.html"
  }