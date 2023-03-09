const cardInfo= document.getElementById("card-info")

console.log([document])

const params = new URLSearchParams(location.search)

const id = params.get("id") // id que no extraemos del data

//comparar id de url con el id de la data

let evento = data.events.find(element => element._id === id)

// creacion de la tarjeta de descripcion 
function crearCardInfo(events){
    return ` 
    <div id="card-info" class="card flex-wrap  gap-5" style="width: 60rem;">
    <img src="${events.image}" alt="...">
    <div class="card-body"style="width: 40rem;">
      <h3 class="card-text"> ${events.name}</h3>
      <h4 class="card-text"> Date: ${events.date} </h4>
      <h4 class="card-text">Category: ${events.category} </h4>
      <h4 class="card-text">Place: ${events.place} </h4>
      <h4 class="card-text">${events.assistance?"Assistance: " + events.assistance :"Estimate: " + events.estimate }</h4>
      <h4 class="card-text">Price: ${events.price}  </h4>
    </div>
  </div>`
}


// crear la funcion que coloque en el html la tarjeta de informacion
function colocarTarjetaInfo(event, element){
    let template=''
    template += crearCardInfo(event)
    element.innerHTML = template
}

// llamo a la funcion 
colocarTarjetaInfo(evento, cardInfo)

