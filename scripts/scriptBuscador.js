document.addEventListener('DOMContentLoaded',function(){
const input = document.getElementById('search');
const lista = document.getElementById('busquedaResult');

function mostrarBusqueda (monstros){
lista.innerHTML='';

monstros.forEach(monstro => { 
const span = document.createElement('span');
span.setAttribute("class", "transition");
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

function navegarMonstruo(id){
  window.location.href = `/src/monstros.html?id=${id}`
}

function navegarMonstruo(id){
  window.location.href = `/src/Monstros.html?id=${id}`
}

function filtroMonstros(monstros,lista){
return monstros.filter(monstros => monstros.nombre.toLowerCase().includes(lista.toLowerCase()));
}

input.addEventListener('keyup', async function() 
{ 
    lista.style.display="flex";
    // Limpiar la lista si el input está vacío return;
  const query = input.value.trim(); 
  if (query === '') 
    { lista.innerHTML = '';
     return; }
  const monstros = await GetMonstro(); 
  const filtro = filtroMonstros(monstros, query); 
  mostrarBusqueda(filtro); 
});

GetMonstro().then(mostrarBusqueda);
});




