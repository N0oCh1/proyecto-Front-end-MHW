
// Animacion cuando hace scroll y
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


// funcion para cuando se habre el menu hamburguesa
  document.getElementById("AbrirMenu").addEventListener('click', function() {
    const menu = document.getElementById("contenedor2");
    const main = document.getElementById("contenedor1")
    if(menu.style.display === "flex"){
      menu.style.display = "none"
      main.style.position = "relative"
    }
    else{
      menu.style.display = "flex"
      main.style.position = "fixed"
    }
  })


// boton menu MONSTRO
  async function showMonstros() {
    try{
   
      const container= document.getElementById("resultados")
      container.innerHTML =''
      const monstros = await GetMonstro();
      if(container.style.display === "flex"){
        container.style.display = "none"
        
      }
      else{
        container.style.display = "flex"
        
      }
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


  async function showBioma (params) {
    try {
      const container = document.getElementById("resultadoBioma");
      container.innerHTML =''
      const bioma = await GetBioma();
      if(container.style.display === "flex"){
        container.style.display = "none"
      }
      else{
        container.style.display = "flex"
      }
      if(bioma){
        bioma.map(bioma=>{
          const div = document.createElement("div")
          div.setAttribute("class", "biomaCard")
          div.addEventListener("click", function(){
          Navigate(bioma.id_bioma)
          })
          const imagen = document.createElement("img")
          imagen.setAttribute("class", "imagenBioma")
          imagen.setAttribute("src","" )
        })
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  
  function Navigate (id) {  
    window.location.href = `/src/monstros.html?id=${id}`;
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

  // funcion para navegar 
  function navegarIngresar() {
    window.location.href = "/src/nuevo.html"
  }

  // funcion para abir el ventana e logging
  function AbrirLogging() {
    const loggin = document.getElementById("pantallaLoggin")
    const mensaje = document.getElementById("mensaje")
    if(mensaje){
      mensaje.remove()
    }
    if(loggin.style.display === "none"){
      loggin.style.display = "flex"
    }
    else{
      loggin.style.display = "none"
    }
  }
  // funcion cuando se envia los datos de REgistro e inicio de sesion
  document.getElementById("form").addEventListener("submit", async function(e){
    e.preventDefault()
    const user= document.getElementById("user")
    const password = document.getElementById("password")
    const formdata = new FormData(this)
    const accion = e.submitter.getAttribute("data-action")
    console.log(accion)
    const jsonObject = {
    }
    formdata.forEach((value, key)=> {
      jsonObject[key] = value
    })
    if(accion === "registrar"){
      await Registrarse(jsonObject, user, password)
    }
    else{
      if(accion === "inicio"){
        await Iniciar(jsonObject, user, password)
      }
    }

    console.log(jsonObject)
  })

  // Funcion cuando se registra nuevo usuario
  async function Registrarse(jsonObject, user, password) {
    await fetch("https://localhost:7101/usuario/nuevo", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObject)})
      .then(response =>{
      if(response.status === 201){
        console.log(response.status)
        mensage("Se Registro correctamente")
        user.value = ""
        password.value = ""
      }
      if(response.status === 409){
        mensage("El usuario ya existe")
      }
    })
  }
  // funcion cuando se inicia sesion
  async function Iniciar(jsonObject, user, password) {
    const form = document.getElementById("form")
    const boton = document.getElementById("cerrar")
    await fetch("https://localhost:7101/usuario",{
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObject)}).then(response => {
        if(response.ok){
          mensage("Se Inicio correctamente")
          user.value = ""
          password.value = ""
          form.style.display = "none"
          boton.style.display = "flex"
        }
        if(response.status===401){
          mensage("El usuario no esta registrado")
        }
      })
    
  }

  // Funcion para monstrar estados de inicio de seccion
  function mensage(mensage) {
    const pantallaLoggin = document.getElementById("pantallaLoggin")
    const p= document.getElementById("mensaje")
    if(p){
      p.remove()
    }
    const mesanje = document.createElement('p')
    mesanje.setAttribute("class", "mensaje")
    mesanje.setAttribute("id", "mensaje")
    mesanje.innerHTML = ""
    mesanje.innerHTML = mensage
    pantallaLoggin.appendChild(mesanje)
  }

  // Funcion para cerrar la ventana de Logging
  function CerrarSesion (boton) {
    const form = document.getElementById("form")
    form.style.display = "flex"
    boton.style.display = "none"
  }