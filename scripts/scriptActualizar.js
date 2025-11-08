let biomaCount = 1;
let rangoCount = 1;
let elementoCount = 1;
let debilidadCount = 1;
let itemCount = 1;

// Funcion para actualizar el index de cada nuevo elemento en el formulario
function actualizarIndice(idCampo) {
  const campo = document.getElementById(idCampo);
  const children = campo.querySelectorAll("div");
  children.forEach((child, index) => {
    const input = child.querySelectorAll("input, select, textarea");
    input.forEach((input) => {
      const name = input.name;
      const newName = name.replace(/\[\d+\]/, `[${index}]`);
      input.name = newName;
    });
  });
}

// Funcion para agregar nuevo bioma
function addBioma() {
  const newDiv = document.createElement("div");
  const containerBioma = document.getElementById("biomaContrainer");
  newDiv.setAttribute("class", "biomaField");
  newDiv.innerHTML = `
    <select id="bioma${biomaCount}" name="biomas[1][id_bioma]">
        <option value="">Sleciona el bioma</option>
        <option value="1">Bosque primigenio</option>
        <option value="2">Yermo de agujas</option>
        <option value="3">Altiplano coralinos</option>
        <option value="4">Valle putrefacto</option>
        <option value="5">Lecho de los ancianos</option>
        <option value="6">Arroyo de escarcha</option>
        <option value="7">Tierras destino</option>
        <option value="8">Gran desfiladero</option>
        <option value="9">Torrente eterno</option>
        <option value="10">Confluencia de destinos</option>
        <option value="11">Cavernas de El Dorado</option>
        <option value="12">Isla origen</option>
        <option value="13">Valle remoto</option>
        <option value="14">Castillo skrad</option>
    </select>
    <button type="button" onclick="removeField(this,'biomaContrainer')" class="botonEliminar">Eliminar</button>
    `;
  containerBioma.appendChild(newDiv);
  biomaCount++;
  actualizarIndice("biomaContrainer");
}
// Funcion para agregar nuevo rango
function addRango() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "rangoField");
  const containerRango = document.getElementById("rangoContainer");
  newDiv.innerHTML = `
        <select name="rangos[1][id_rango]" id="rango${rangoCount}">
            <option value="">Seleccione el rango</option>
            <option value="1">Rango bajo</option>
            <option value="2">Rango alto</option>
            <option value="3">Rango maestro</option>
        </select>
        <button type="button" onclick="removeField(this,'rangoContainer')" class="botonEliminar">Eliminar</button>
    `;
  containerRango.appendChild(newDiv);
  rangoCount++;
  actualizarIndice("rangoContainer");
}
// Funcion para agregar nuevo elemento
function addElemento() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "elementoField");
  const containerElemento = document.getElementById("elementoContainer");
  newDiv.innerHTML = `
        <select name="elementos[1][id_elemento]" id="elemento${elementoCount}">
            <option value="">Seleccione el Elementos del monstruo</option>
            <option value="1">Fuego</option>
            <option value="2">Agua</option>
            <option value="3">Treuno</option>
            <option value="4">Hielo</option>
            <option value="5">Dragon</option>
            <option value="6">Ninguno</option>
        </select>
        <button type="button" onclick="removeField(this,'elementoContainer')" class="botonEliminar">Eliminar</button>
    `;
  containerElemento.appendChild(newDiv);
  elementoCount++;
  actualizarIndice("elementoContainer");
}

// Funcion para agregar nuevo debilidad
function addDebilidad() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "debilidadField");
  const containerDebilidad = document.getElementById("debilidadContainer");
  newDiv.innerHTML = `
        <select name="debilidad[1][id_elemento]" id="debilidad${debilidadCount}">
            <option value="">Seleccione el Elementos debil del monstruo</option>
            <option value="1">Fuego</option>
            <option value="2">Agua</option>
            <option value="3">Treuno</option>
            <option value="4">Hielo</option>
            <option value="5">Dragon</option>
            <option value="6">Ninguno</option>
        </select>
        <label for="eficacia${debilidadCount}">Eficacia</label>
        <input type="number" id="eficacia${debilidadCount}" name="debilidad[1][eficacia]" />
        <button type="button" onclick="removeField(this,'debilidadContainer')" class="botonEliminar">Eliminar</button>
    `;
  containerDebilidad.appendChild(newDiv);
  debilidadCount++;
  actualizarIndice("debilidadContainer");
}
// Funcion para agregar nuevo items
function addItem() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "itemsField");
  const containerDebilidad = document.getElementById("itemsContainer");
  newDiv.innerHTML = `
        <label for="items${itemCount}">Nombre del item</label>
        <input id="items${itemCount}" name="items[1][name]"/>
        <label for="itemDes${itemCount}">Descripcion del item</label>
        <textarea id="itemDes${itemCount}" name="items[1][description]"></textarea>
        <button type="button" onclick="removeField(this,'itemsContainer')" class="botonEliminar">Eliminar</button>
        `;
  containerDebilidad.appendChild(newDiv);
  itemCount++;
  actualizarIndice("itemsContainer");
}

// funcion para eliminar los campos agregado
function removeField(button, campo) {
  button.parentElement.remove();
  actualizarIndice(campo);
}

// Funcion para probar los link de imagenes insertado en el formulario
function testImage() {
  const imageContainer1 = document.getElementById("imagenPrueba");
  const imageContainer2 = document.getElementById("imagenPrueba2");

  const urlImagen = document.getElementById("imagen");
  const urlIcon = document.getElementById("icon");
  urlImagen.style.borderColor = "inherit";
  urlIcon.style.borderColor = "inherit";
  if (urlImagen.value && urlIcon.value) {
    imageContainer1.setAttribute("src", urlImagen.value);
    imageContainer2.setAttribute("src", urlIcon.value);
  } else {
    urlImagen.style.borderColor = "red";
    urlIcon.style.borderColor = "red";
  }
}

// Funcion para regresa a la pagina anterior
function regresar() {
  history.back();
}

// Funcion para obtener los datos del mosnstro e insertalo dentro de los campos
async function IntroducirDatos() {
  const buscarMonstruo = await ObtenerDetalle(getID());
  document.getElementById("nombre").value = buscarMonstruo.nombre;
  document.getElementById("vida").value = buscarMonstruo.vida;
  document.getElementById("descripcion").value = buscarMonstruo.descripcion;
  document.getElementById("tipo").value = buscarMonstruo.tipo.id_categoria;
  document.getElementById("imagen").value = buscarMonstruo.imagen.imageUrl;
  document.getElementById("icon").value = buscarMonstruo.imagen.iconUrl;
  buscarMonstruo.biomas.map((bioma, index) => {
    if (index !== 0) {
      addBioma();
    }
    document.getElementById(`bioma${index}`).value = bioma.id_bioma;
  });
  buscarMonstruo.rangos.map((rango, index) => {
    if (index !== 0) {
      addRango();
    }
    document.getElementById(`rango${index}`).value = rango.id_rango;
  });
  buscarMonstruo.elementos.map((elemento, index) => {
    if (index !== 0) {
      addElemento();
    }
    document.getElementById(`elemento${index}`).value = elemento.id_elemento;
  });
  buscarMonstruo.debilidad.map((w, index) => {
    if (index !== 0) {
      addDebilidad();
    }
    document.getElementById(`debilidad${index}`).value = w.id_elemento;
    document.getElementById(`eficacia${index}`).value = w.eficacia;
  });
  buscarMonstruo.items.map((item, index) => {
    if (index !== 0) {
      addItem();
    }
    document.getElementById(`items${index}`).value = item.name;
    document.getElementById(`itemDes${index}`).value = item.description;
  });
}

// FUncion para obtener el id dentro del URL params
function getID() {
  const path = window.location.search;
  const searchParams = new URLSearchParams(path);
  const id = searchParams.get("id");
  return id;
}

// Funcion de GET del API para obtener los datos del mosntro con el id del url param
async function ObtenerDetalle(id) {
  return await fetch(`http://grupo5.utp:7101/monstro/${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((data) => data);
}

// Funcion que acptura el submit y formatea los datos en un JSON para enviar al Back-End
document
  .getElementById("formularioMonstruo")
  .addEventListener("submit", async function (e) {
    const id = getID();
    e.preventDefault();
    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
      const keys = key.split(/[\[\]]+/).filter((k) => k);
      keys.reduce((acc, curr, i) => {
        if (i === keys.length - 1) {
          acc[curr] = value;
        } else {
          acc[curr] = acc[curr] || (isNaN(keys[i + 1]) ? {} : []);
        }
        return acc[curr];
      }, jsonObject);
    });
    showModal();
    try {
      await fetch(`http://grupo5.utp:7101/monstro/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      });
    } catch (error) {
      console.log(error);
    }
  });

// Funcion para enseñar el Feedback cuando envias el formulario

function showModal() {
  const modal = document.getElementById("modal");
  if (modal.style.display === "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}
