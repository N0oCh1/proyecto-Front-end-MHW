
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
    const menu = document.getElementById("menu")
    
    if(menu.style.display === "flex"){
      menu.style.display = "none"
    }
    else{
      menu.style.display = "flex  "
    }
  })
  