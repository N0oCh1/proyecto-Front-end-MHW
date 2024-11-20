
let biomaCount = 1
let rangoCount = 1
let elementoCount = 1
let debilidadCount = 1
let itemCount = 1

function actualizarIndice(idCampo) {
  const campo = document.getElementById(idCampo)
  const children = campo.querySelectorAll('div')
  children.forEach((child, index) => {
    const input = child.querySelectorAll('input, select, textarea')
    input.forEach(input => {
      console.log(index, input)
      const name = input.name
      console.log("nombre actual ", name)
      const newName = name.replace(/\[\d+\]/, `[${index}]`)
      console.log("nuevo nombre", newName)
      input.name = newName
    })
  })
}



function addBioma() {
  const newDiv = document.createElement("div")
  const containerBioma = document.getElementById("biomaContrainer")
  newDiv.setAttribute("class", "biomaField")
  newDiv.innerHTML = `
    <select id="bioma${biomaCount}" name="biomas[1][id_bioma]">
        <option>Sleciona el bioma</option>
        <option value="1">Bosque primigenio</option>
        <option value="2">Yermo de agujas</option>
        <option value="3">Altiplano coralinos</option>
        <option value="4">Valle putrefacto</option>
        <option value="5">Lecho de los ancianos</option>
        <option value="6">Arroyo de escarcha</option>
    </select>
    <button type="button" onclick="removeField(this,'biomaContrainer')" class="botonEliminar">Eliminar</button>
    `
  containerBioma.appendChild(newDiv)
  biomaCount++
  actualizarIndice("biomaContrainer")
}
function addRango() {
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "rangoField")
  const containerRango = document.getElementById("rangoContainer")
  newDiv.innerHTML = `
        <select name="rangos[1][id_rango]" id="rango${rangoCount}">
            <option>Seleccione el rango</option>
            <option value="1">Rango bajo</option>
            <option value="2">Rango alto</option>
            <option value="3">Rango maestro</option>
        </select>
        <button type="button" onclick="removeField(this,'rangoContainer')" class="botonEliminar">Eliminar</button>
    `
  containerRango.appendChild(newDiv)
  rangoCount++
  actualizarIndice("rangoContainer")
}

function addElemento() {
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "elementoField")
  const containerElemento = document.getElementById("elementoContainer")
  newDiv.innerHTML = `
        <select name="elementos[1][id_elemento]" id="elemento${elementoCount}">
            <option>Seleccione el Elementos del monstruo</option>
            <option value="1">Fuego</option>
            <option value="2">Agua</option>
            <option value="3">Treuno</option>
            <option value="4">Hielo</option>
            <option value="5">Dragon</option>
            <option value="6">Ninguno</option>
        </select>
        <button type="button" onclick="removeField(this,'elementoContainer')" class="botonEliminar">Eliminar</button>
    `
  containerElemento.appendChild(newDiv)
  elementoCount++
  actualizarIndice("elementoContainer")
}

function addDebilidad() {
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "debilidadField")
  const containerDebilidad = document.getElementById("debilidadContainer")
  newDiv.innerHTML = `
        <select name="debilidad[1][id_elemento]" id="debilidad${debilidadCount}">
            <option>Seleccione el Elementos debil del monstruo</option>
            <option value="1">Fuego</option>
            <option value="2">Agua</option>
            <option value="3">Treuno</option>
            <option value="4">Hielo</option>
            <option value="5">Dragon</option>
            <option value="6">Ninguno</option>
        </select>
        <label for="eficacia">Eficacia</label>
        <input type="number" id="eficacia${debilidadCount}" name="debilidad[1][eficacia]" />
        <button type="button" onclick="removeField(this,'debilidadContainer')" class="botonEliminar">Eliminar</button>
    `
  containerDebilidad.appendChild(newDiv)
  debilidadCount++
  actualizarIndice("debilidadContainer")
}
function addItem() {
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "itemsField")
  const containerDebilidad = document.getElementById("itemsContainer")
  newDiv.innerHTML = `
        <label for="items${itemCount}">Nombre del item</label>
        <input id="items${itemCount}" name="items[1][name]"/>
        <label for="itemDes${itemCount}">Descripcion del item</label>
        <textarea id="itemDes${itemCount}" name="items[1][description]"></textarea>
        <button type="button" onclick="removeField(this,'itemsContainer')" class="botonEliminar">Eliminar</button>
        `
  containerDebilidad.appendChild(newDiv)
  itemCount++
  actualizarIndice("itemsContainer")
}

function removeField(button, campo) {
  button.parentElement.remove()
  actualizarIndice(campo)
}

document.getElementById("formularioMonstruo").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const jsonObject = {};
  formData.forEach((value, key) => {
    const keys = key.split(/[\[\]]+/).filter(k => k);
    keys.reduce((acc, curr, i) => {
      if (i === keys.length - 1) {
        acc[curr] = value;
      } else {
        acc[curr] = acc[curr] || (isNaN(keys[i + 1]) ? {} : []);
      }
      return acc[curr];
    }, jsonObject);
  });
  fetch('https://localhost:7101/monstro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObject)
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});


function testImage() {
  const imageContainer1 = document.getElementById("imagenPrueba")
  const imageContainer2 = document.getElementById("imagenPrueba2")
  
  const urlImagen = document.getElementById("imagen")
  const urlIcon = document.getElementById("icon")
  urlImagen.style.borderColor = "inherit"
  urlIcon.style.borderColor = "inherit"
  if (urlImagen.value && urlIcon.value) {
    imageContainer1.setAttribute("src", urlImagen.value)
    imageContainer2.setAttribute("src", urlIcon.value)
  }
  else{
    urlImagen.style.borderColor = "red"
    urlIcon.style.borderColor = "red"
  }
  
}
function regresar() {
  window.location.href = "/src/index.html"
}