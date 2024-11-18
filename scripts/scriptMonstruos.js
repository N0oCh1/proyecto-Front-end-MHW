
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
        }
    }
    

async function ObtenerDetalle(id) {
    return await fetch (`https://localhost:7101/monstro/${id}`, {method: "GET"}) .then(res=>res.json()).then(data=>data)
}