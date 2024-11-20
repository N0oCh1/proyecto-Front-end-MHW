document.addEventListener('DOMContentLoaded',function(){
const input = document.getElementById('search');
const lista = document.getElementById('busquedaResult');

function mostrarBusqueda (monstros){
lista.innerHTML='';

monstros.forEach( monstros => {
   const li = document.createElement('li');
   li.setAttribute("class","liMonstro");
   li.addEventListener('click', ()=>{
    navegarMonstruo(monstros.idMonstro)
   })
   li.addEventListener('click', ()=>{
    navegarMonstruo(monstros.idMonstro)
   })
   li.innerHTML= `
    <img class="monstroImagenCard" src=${monstros.imagen.iconUrl}> </img>
    <img class="monstroImagenCard" src=${monstros.imagen.iconUrl}> </img>
     <div class="contenidoMonstro">
    <H3>${monstros.nombre}</H3>
    <p class="descrpcion"> ${monstros.descripcion} </p>
    </div>`;

     lista.appendChild(li);
});
}

function navegarMonstruo(id){
  window.location.href = `/src/monstros.html?id=${id}`
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




