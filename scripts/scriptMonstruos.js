
// Funcion para obtener el datos del monstro e insertalo en su lugar correspondiente
async function GetMonstruo() {
  //Aqui ban los elementos del DOM
  const id = getID();

  const datosMonstruo = await ObtenerDetalle(id);

  if (datosMonstruo) {
    const botonContainer = document.getElementById("botonContainer");
    botonContainer.style.display = "flex";
    document
      .getElementById("nombre")
      .appendChild(document.createTextNode(datosMonstruo.nombre));
    document
      .getElementById("descripcion")
      .appendChild(document.createTextNode(datosMonstruo.descripcion));
    document
      .getElementById("icono")
      .setAttribute("src", datosMonstruo.imagen.iconUrl);
    document
      .getElementById("imagen")
      .setAttribute("src", datosMonstruo.imagen.imageUrl);
    document
      .getElementById("tipo")
      .appendChild(document.createTextNode(datosMonstruo.tipo.categoria));
    document
      .getElementById("vida")
      .appendChild(document.createTextNode(datosMonstruo.vida));
    datosMonstruo.elementos.map((elemento) => {
      const nuevoElemento = document.createElement("p");
      nuevoElemento.innerHTML = elemento.elemento;
      document.getElementById("elementos").appendChild(nuevoElemento);
    });
    datosMonstruo.debilidad.map((debilidad) => {
      const nuevaDebilidad = document.createElement("div");
      const nuevoElemento = document.createElement("p");
      const nuevaEficacia = document.createElement("p");
      nuevoElemento.innerHTML = debilidad.elemento;
      nuevaEficacia.innerHTML = debilidad.eficacia;

      nuevaDebilidad.appendChild(nuevoElemento);
      nuevaDebilidad.appendChild(nuevaEficacia);

      document.getElementById("debilidad").appendChild(nuevaDebilidad);
    });
    datosMonstruo.rangos.map((rango) => {
      const nuevoRango = document.createElement("p");
      nuevoRango.innerHTML = rango.rango;

      document.getElementById("rangos").appendChild(nuevoRango);
    });
    datosMonstruo.biomas.map((bioma) => {
      const nuevoBioma = document.createElement("div");
      const nuevoNombreBioma = document.createElement("p");
      nuevoNombreBioma.innerHTML = bioma.bioma;

      const imgBioma = document.createElement("img");
      imgBioma.setAttribute("src", ObtenerImagenBioma(bioma.bioma));
      imgBioma.setAttribute("class", "imagenBioma");
      nuevoBioma.appendChild(nuevoNombreBioma);
      nuevoBioma.appendChild(imgBioma);

      document.getElementById("biomas").appendChild(nuevoBioma);
    });
    datosMonstruo.items.map((item) => {
      const nuevoItem = document.createElement("div");
      const nuevoNombre = document.createElement("p");
      const nuevaDescripcio = document.createElement("p");
      nuevoNombre.innerHTML = item.name;
      nuevaDescripcio.innerHTML = item.description;
      nuevoItem.appendChild(nuevoNombre);
      nuevoItem.appendChild(nuevaDescripcio);

      document.getElementById("items").appendChild(nuevoItem);
    });
  }
}
// Funcion para navegar a la edicion del mosnstruo
function EditarMonstruo() {
  const id = getID();
  window.location.href = `/src/actualizar.html?id=${id}`;
}

// Funcion para obtener el ID del URL param
function getID() {
  const path = window.location.search;
  const searchParams = new URLSearchParams(path);
  const id = searchParams.get("id");
  return id;
}

// Funcion para insertar la imagen del bioma
function ObtenerImagenBioma(bioma) {
  switch (bioma) {
    case "Bosque primigenio":
      return "/recursos/biomas/BosquePrimigenio.webp";
    case "Yermo de agujas":
      return "/recursos/biomas/YermoDeAgujas.webp";
    case "Altiplano coralinos":
      return "/recursos/biomas/AltiplanosCoralino.webp";
    case "Valle putrefacto":
      return "/recursos/biomas/VallePutrefacto.webp";
    case "Lecho de los ancianos":
      return "/recursos/biomas/LechoDeAncianos.webp";
    case "Arroyo de escarcha":
      return "/recursos/biomas/ArroyoDeEscarcha.webp";
  }
}
// FUncion GET del api para  obtener todo los detalle del mosntruo especifico
async function ObtenerDetalle(id) {
  return await fetch(`https://localhost:7101/monstro/${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((data) => data);
}

// Funcion para ensenar un feedback de cuando se queire eliminar el munstruo
function showModal() {
  const modal = document.getElementById("modal");
  if (modal.style.display === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

// Funcion para eleminar le monstro 
async function ElminarMonstruo() {
  const id = getID();
  await fetch(`https://localhost:7101/monstro/${id}`, { method: "DELETE" });
  showModal();
  location.reload();
}
