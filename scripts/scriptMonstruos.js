
async function GetMonstruo() {
    //Aqui ban los elementos del DOM
  

    const path = window.location.search
    const searchParams = new URLSearchParams(path)
    const id = searchParams.get("id")

    const datosMonstruo = await ObtenerDetalle(id)
    console.log(datosMonstruo)
    
    if(datosMonstruo){
            document.getElementById("nombre").appendChild(document.createTextNode(datosMonstruo.nombre))
            document.getElementById("descripcion").appendChild(document.createTextNode(datosMonstruo.descripcion))
            document.getElementById("icono").setAttribute('src',datosMonstruo.imagen.iconUrl)
            document.getElementById("imagen").setAttribute('src', datosMonstruo.imagen.imageUrl)
            document.getElementById("tipo").appendChild(document.createTextNode(datosMonstruo.tipo.categoria))
            document.getElementById("vida").appendChild(document.createTextNode(datosMonstruo.vida))
            datosMonstruo.elementos.map(elemento => {
                const nuevoElemento = document.createElement('p')
                nuevoElemento.innerHTML = elemento.elemento
                document.getElementById("elementos").appendChild(nuevoElemento)
            })
            datosMonstruo.debilidad.map(debilidad => {
                const nuevaDebilidad = document.createElement("div")
                const nuevoElemento = document.createElement("p")
                const nuevaEficacia = document.createElement("p")
                nuevoElemento.innerHTML = debilidad.elemento
                nuevaEficacia.innerHTML = debilidad.eficacia

                nuevaDebilidad.appendChild(nuevoElemento)
                nuevaDebilidad.appendChild(nuevaEficacia)

                document.getElementById("debilidad").appendChild(nuevaDebilidad)
            })
            datosMonstruo.rangos.map(rango=>{
                const nuevoRango = document.createElement("p")
                nuevoRango.innerHTML = rango.rango

                document.getElementById("rangos").appendChild(nuevoRango)
            })
            datosMonstruo.biomas.map(bioma => {
                const nuevoBioma = document.createElement("div")
                const nuevoNombreBioma = document.createElement("p")
                nuevoNombreBioma.innerHTML = bioma.bioma

                const imgBioma = document.createElement("img")
                imgBioma.setAttribute('src', ObtenerImagenBioma(bioma.bioma))
                nuevoBioma.appendChild(imgBioma)
                nuevoBioma.appendChild(nuevoNombreBioma)
                
                document.getElementById("biomas").appendChild(nuevoBioma)
            })
            datosMonstruo.items.map(item => {
                const nuevoItem = document.createElement("div")
                const nuevoNombre = document.createElement("p")
                const nuevaDescripcio = document.createElement("p")
                nuevoNombre.innerHTML = item.name
                nuevaDescripcio.innerHTML = item.description
                nuevoItem.appendChild(nuevoNombre)
                nuevoItem.appendChild(nuevaDescripcio)

                document.getElementById("items").appendChild(nuevoItem)
            })
        }
    }
    


function ObtenerImagenBioma(bioma){
    switch(bioma){
        case "Bosque primigenio" :
            return "/recursos/biomas/BosquePrimigenio.webp"
        case "Yermo de agujas" :
            return "/recursos/biomas/YermoDeAgujas.webp"
        case "Altiplano coralinos" :
            return "/recursos/biomas/AltiplanosCoralino.webp"
        case "Valle putrefacto" :
            return"/recursos/biomas/VallePutrefacto.webp" 
        case "Lecho de los ancianos" :
            return"/recursos/biomas/LechoDeAncianos.webp"
        case "Arroyo de escarcha" :
            return"/recursos/biomas/ArroyoDeEscarcha.webp"
    }
}
async function ObtenerDetalle(id) {
    return await fetch (`https://localhost:7101/monstro/${id}`, {method: "GET"}) .then(res=>res.json()).then(data=>data)
}