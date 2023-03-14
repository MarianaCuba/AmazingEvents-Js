const tabla1= document.getElementById("primer-tabla")
const tabla2= document.getElementById("tabla2")
const tabla3= document.getElementById("tabla3")



function datosUrlEventos(){
  const valorUrl=  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response=> response.json())
    .then(dato =>{ 
        let listaAsistenciaCapacidad = dato.events.map(evento=> {
            let aux= Object.assign({}, evento)
            aux.porcentaje = ((evento.assistance*100)/(evento.capacity))
            return aux})
            .filter(evento => evento.porcentaje)
         console.log(listaAsistenciaCapacidad)

         let ordenLista = listaAsistenciaCapacidad.sort((a,b) => b.porcentaje -a.porcentaje)
         console.log(ordenLista)
         let porcentajeMaximo=ordenLista.slice(0,1)
         let porcentajeMinimo=ordenLista.slice(-1)
         
         
          let listaCapacidad = dato.events.filter(evento=> evento.capacity)

         let capacidadOrden= listaCapacidad.sort((a,b)=> b.capacity -a.capacity)
          console.log(capacidadOrden);
        let capacidadMaxima= capacidadOrden.slice(0,1)
        console.log(capacidadMaxima);

         function crearPrimeraTabla(){
            return template= `
          
                    <tr class="table-light">
                        <td>${porcentajeMaximo[0].name} </td>
                        <td>${porcentajeMinimo[0].name}</td>
                        <td>${capacidadMaxima[0].name}</td>
                    </tr>`;


         }
        function colocarTabla(lista,elemento){
            let template='';
            template += crearPrimeraTabla(lista)
            elemento.innerHTML= template
        }
        colocarTabla(ordenLista, tabla1)

    // -------------------------------------------------------------
        const filtroEventosFuturos = dato.events.filter(evento => evento.date>dato.currentDate)
        const listaCategorias = Array.from(new Set (filtroEventosFuturos.map(category=> category.category)))
       
        console.log(listaCategorias)
        const eventosFuturos = listaCategorias.map(categoria => {
            const filtroEventoPorCategoria = filtroEventosFuturos.filter( evento => evento.category === categoria)
            const ganancias = filtroEventoPorCategoria.reduce((acc, valorActual) => {
                acc += valorActual.estimate * valorActual.price 
                return acc
            }, 0)
            const estimadoTotal= filtroEventoPorCategoria.reduce((acc, valorActual)=>{
                acc += valorActual.estimate
                return acc
            },0)
            const capacidadTotal= filtroEventoPorCategoria.reduce((acc, valorActual)=>{
                acc += valorActual.capacity
                return acc
            },0)

            let nuevoObjFuturo= {}
            nuevoObjFuturo.category = categoria
            nuevoObjFuturo.ganancia = ganancias
            nuevoObjFuturo.porcentaje = ((estimadoTotal *100 )/capacidadTotal).toFixed(2)
            return nuevoObjFuturo

        } )
        colocarTablaDosTres(eventosFuturos, tabla2,crearSegundaTerceraTabla)
         console.log (eventosFuturos)
      //---------------------------------------------------------------------------------
      const filtroEventosPasados = dato.events.filter(evento => evento.date<dato.currentDate)
      const listaCategoriasDos = Array.from(new Set (filtroEventosPasados.map(category=> category.category)))

      const eventosPasados = listaCategoriasDos.map( categoria=>{
        const filtroEventCategoria= filtroEventosPasados.filter( evento => evento.category === categoria )
        const ingresos= filtroEventCategoria.reduce((acc, valorActual)=> {
            acc += valorActual.assistance* valorActual.price
            return acc
        },0)
        const asistenciaTotal= filtroEventCategoria.reduce((acc,valorActual)=>{
            acc += valorActual.assistance
            return acc
        },0)
        const totalCapacidad= filtroEventCategoria.reduce((acc, valorActual)=>{
            acc += valorActual.capacity
            return acc
        },0)

        let nuevoObjPasado ={}
        nuevoObjPasado.category = categoria
        nuevoObjPasado.ganancia = ingresos
        nuevoObjPasado.porcentaje = ((asistenciaTotal *100)/ totalCapacidad).toFixed(2)
        return nuevoObjPasado
      })
      colocarTablaDosTres(eventosPasados, tabla3, crearSegundaTerceraTabla )


})
.catch(error => console.log(error))
}

 function crearSegundaTerceraTabla(array){
     return ` <tr>
    <td> ${array.category} </td>
     <td>$ ${array.ganancia} </td>
     <td> ${array.porcentaje} %</td>
</tr>`
 }

datosUrlEventos()

function colocarTablaDosTres(lista, elemento, tabla){
    let template=""
    for( item of lista){
        template += tabla(item)
    }
    elemento.innerHTML=template
}
