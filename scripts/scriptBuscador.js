// Funcion para ensenar la busqueda que se hiso en el buscador
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search");
  const lista = document.getElementById("busquedaResult");
<<<<<<< HEAD
  const cont = document.getElementById("busquedaContenedor");
=======
>>>>>>> main

  function mostrarBusqueda(monstros) {
    lista.innerHTML = "";

<<<<<<< HEAD
monstros.forEach(monstro => { 
const li = document.createElement('li');
li.setAttribute("class", "liMonstro"); 
li.addEventListener('click', () => { 
navegarMonstruo(monstro.idMonstro); 
}); 

//iterar en los elementos
const iconUrls = { 
  Fuego: '/recursos/elementos_icons/FuegoIcon.webp', 
  Dragon: '/recursos/elementos_icons/DragonIcon.webp',
  Treuno: '/recursos/elementos_icons/TreunoIcon.webp'
} // Añade más elementos según sea necesario
const elementosHTML = monstro.elementos.map(elemento => ` 
<img src="${iconUrls[elemento.elemento]}"> 
`).join('');

li.innerHTML = ` 
<img class="monstroImagenCard2" src="${monstro.imagen.iconUrl}" >
<h3 class="contenidoMonstro">${monstro.nombre}</h3> 
<span class ="elementoIcon"> ${elementosHTML} </span>`
;
lista.appendChild(li); });
}
=======
    monstros.forEach((monstros) => {
      const li = document.createElement("li");
      li.setAttribute("class", "liMonstro");
      li.addEventListener("click", () => {
        navegarMonstruo(monstros.idMonstro);
      });
      li.innerHTML = `
    <img class="monstroImagenCard" src=${monstros.imagen.iconUrl}> </img>
     <div class="contenidoMonstro">
    <H3>${monstros.nombre}</H3>
    </div>`;

      lista.appendChild(li);
    });
  }
>>>>>>> main

  // funcion para navegar a la pagina que pertenece al monstruo buscado
  function navegarMonstruo(id) {
    window.location.href = `/src/monstros.html?id=${id}`;
  }

<<<<<<< HEAD
  // funcion para navegar a la pagina que pertenece al monstruo buscado
  function navegarMonstruo(id) {
    window.location.href = `/src/monstros.html?id=${id}`;
  }

  // funcion para buscar el monstro segun cuando estas tecleando
  function filtroMonstros(monstros, lista) {
    cont.style.display="flex";
    return monstros.filter((monstros) =>
      
      monstros.nombre.toLowerCase().includes(lista.toLowerCase())
    );
  }

=======
  // funcion para buscar el monstro segun cuando estas tecleando
  function filtroMonstros(monstros, lista) {
    return monstros.filter((monstros) =>
      monstros.nombre.toLowerCase().includes(lista.toLowerCase())
    );
  }

>>>>>>> main
  // listener del tecleo
  input.addEventListener("keyup", async function () {
    lista.style.display = "flex";
    // Limpiar la lista si el input está vacío return;
    const query = input.value.trim();
    if (query === "") {
      lista.innerHTML = "";
<<<<<<< HEAD
      cont.style.display="none";
=======
>>>>>>> main
      return;
    }
    const monstros = await GetMonstro();
    const filtro = filtroMonstros(monstros, query);
    mostrarBusqueda(filtro);
  });

  GetMonstro().then(mostrarBusqueda);
});
