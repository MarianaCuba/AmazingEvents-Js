const $section= document.getElementById("section")

function crearTarjeta(array){
    return `
    <div class="card" style="width: 20rem;">
        <img src= ${array.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${ array.name }</h5>
            <p class="card-text">${array.description}</p>
            <a href="./info.html" class="btn btn-primary">More</a>
        </div>     
    </div>`
}

function pintarTarjetas( array, elemento ){
    let template = ''
    for( let carta of array ){
        if(carta.date<=data.currentDate){
        template += crearTarjeta( carta )
        }
    }
    elemento.innerHTML = template
}
pintarTarjetas(data.events,$section);
