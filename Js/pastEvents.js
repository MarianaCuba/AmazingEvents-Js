const $section= document.getElementById("section")
const CheckBoxContainer = document.getElementById("check")
const inputSearch = document.getElementById("inputSearch") 


function datosDeURl (){
    fetch ("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(dato => { console.log(dato)
        const listaCategorias = Array.from(new Set (dato.events.map(category=> category.category)))
        const filtroEventospasados = dato.events.filter(evento => evento.date<dato.currentDate)
        crearTarjeta(filtroEventospasados)
        pintarTarjetas(filtroEventospasados,$section);
        CheckBoxContainer.innerHTML += categorias(listaCategorias)
        inputSearch.addEventListener("keyup", e=> pintarTarjetas(filtroCruzado(filtroEventospasados), $section))
        CheckBoxContainer.addEventListener("change", e => pintarTarjetas(filtroCruzado(filtroEventospasados),$section))
        pintarTarjetas(filtroEventospasados,$section);
    })
    .catch(error => console.log(error))
}
 datosDeURl()



function crearTarjeta(array){
    return `
    <div class="card" style="width: 20rem;">
        <img src= ${array.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${ array.name }</h5>
            <p class="card-text">${array.description}</p>
            <a href="../html/info.html?id=${array._id}" class="btn btn-primary">More</a>
        </div>     
    </div>`
}

function pintarTarjetas( array, elemento ){
    let template = ''
    if(array == 0){
        template = mensajeAlerta()
    }
    for( let carta of array ){
        
        template += crearTarjeta( carta )
        
    }
    elemento.innerHTML = template
}


//creacion del mensaje a mostrar si el buscador no encuentra nada.
function mensajeAlerta(){
    return`<h2 class="text-black"> Search is not found </h2>`
}
// crear lista de categorias:

// const listaCategorias = Array.from(new Set (data.events.map(category=> category.category)))
// console.log(listaCategorias)

//crear check

const categorias=(arrayCategorias) => {return arrayCategorias.reduce((acc, category) => acc += `<div class="form-check me-3">
    <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
     <label class="form-check-label" for="${category}">
       ${category}
     </label>
   </div>`,"")}

// CheckBoxContainer.innerHTML += categorias
// console.log(categorias)

//crear evento a las categorias

// CheckBoxContainer.addEventListener("change", e => pintarTarjetas(filtroCheckbox(data.events),$section))


//filtro de checkbox

function filtroCheckbox(lista){
    const checkboxs = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    const listaValor = checkboxs.map(e => e.value)
    // console.log(listaValor)
    if(listaValor.length === 0){
        return lista
    }

     const listaFiltro = lista.filter(e => {return listaValor.includes(e.category)})
     console.log(listaFiltro)
     return listaFiltro
}

// pintarTarjetas(data.events,$section);

 // crear evento por letras ingresadas en el search

//  inputSearch.addEventListener("input", e=> pintarTarjetas(filtroCruzado(data.events), $section))

 
 // Filtro del texto ingresado en el buscador, lova a tomar en minuscula y va a guardar su valor
  function filtroSearch (listaArray){
     const searchText = inputSearch.value.toLowerCase()
     console.log(searchText)
   
     const filtroText = listaArray.filter(evento => evento.name.toLowerCase().includes(searchText))
     //filtro la lista de eventos, tomo la propiedad de su nombre y la convierto a minuscula, con el inludes me fijo si el valor guardado antes, esta en la propiedad que consulto de los eventos
     return filtroText
     
   }
 
   // funcion de filtros cruzados que convine ambos filtros al momento de la busqueda.
 function filtroCruzado(array){
     return filtroCheckbox(filtroSearch(array))
 }





