import { store, list,eliminar, editar,restaurar } from "../components/api/Ahorcado.js";
import { lista } from "../components/api/Tema.js";



var CodigoAhorcado = null

const listarTema = (cod) => {
    
    lista(function (response) {  
        let itemTema = '';
        response.data.forEach(function (element, index) {
            if(cod == element.Codigo){
            itemTema +=`<option value="${element.Codigo}" selected>${element.Descripcion}</option>`
            }else{
                itemTema +=`<option value="${element.Codigo}">${element.Descripcion}</option>`
            }
        });
        let htmlRender = `
                            <p>Tema</p>
                            <select id="itmTema" class="form-control">
                                <option value="">Seleccione tema...</option>
                                ${itemTema}
                            </select> 
                        `;
            $('.render-tema').html(htmlRender);
            $('.dropdown-trigger').dropdown();
        })
}


$('#nuevoAhorcado').click(function () {  
    CodigoAhorcado = null
    let htmlRender = ` 
          
                
                    <div class="form-nuevo bg-light">
                        
                        <!--
                        <div class="row">
                            <div class="col-xl-12 text-center">
                                <h3 style="font-weight: 900; color: #1eaaf1;">REGISTRAR AHORCADO</h3>
                            </div>
                        </div>
                        -->

                        <div class="row">

                        <button class="cerrar how-pos3 hov3">
					        <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
				        </button>
        
                            <div class="form-group col-xl-12">
                                <p>Título</p> <input type="text" class="form-control" id="itmTitulo" placeholder="Ingrese titulo...">
                            </div>
                        
                            <div class="form-group col-xl-6 render-tema">  
                        
                            </div>

                            <div class="form-group col-xl-6">       
                                <p>Palabra</p> <input type="text" class="form-control" id="itmPalabra" placeholder="Ingrese palabra para el juego...">
                            </div>  
                            <div class="form-group col-xl-6">       
                                <p>Pista</p> <input type="text" class="form-control" id="itmPistas" placeholder="Ingrese pista para el juego...">
                            </div>        
                            <div class="form-group col-xl-6">       
                                <p>Tiempo (minutos)</p> <input type="number" class="form-control" id="itmTiempo" min="1" max="5" value="5">
                            </div> 
                   
                            <div class="form-group col-xl-6">
                                <div class="">
                                    <label for="itmFondo">Fondo * </label>
                                    <input id="itmFondo" type="color" class="validate">
                                </div>
                            </div>
                            <div class="form-group col-xl-3">
                            
                                <label class="switchBtn">

                                <input id="itmPrivado" class="inputc form-control" type="checkbox" name="visibilidad">
    
                            
                                <div class="slide round">Privado</div>

                                </label>
                    
                            </div>

                            

                        </div>
                        <div class="row">
                            <div class="col-xl-12 text-center">
                                <br>
                                <button style="height:67px" id="sendAhorcado" class="form-group btn bg-primary btn-primary py-3 px-5 btnSend" type="submit" name="action">Guardar 
                                    <i class="material-icons right">send</i>
                                </button>
                                    
                            </div>
                           
                        </div>
                    </div>
                         `;
    $('.render-html').html(htmlRender);
    listarTema(0);
})


$('#content-app').on('click','.btnSend',function () { 
    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    store({
        itmTitulo: $('#itmTitulo').val(),
        itmTema: $('#itmTema').val(),
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmFecha: format,
        itmFondo: $('#itmFondo').val(),
        itmPalabra: $('#itmPalabra').val(),
        itmPistas: $('#itmPistas').val(),
        itmTiempo: $('#itmTiempo').val()

      },
      function (response) { 
        Swal.fire({
            title: response.mensaje,
            icon:'success',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Listar',
            denyButtonText: `Nuevo`,
          }).then((result) => {
            if (result.isConfirmed) {  
                renderAhorcado()
            } else if (result.isDenied) {
                $('#nuevoAhorcado').click()
            }
          })
    })
})





const renderAhorcado = () => {
    list(function (response) {  
        let itemAhorcado = '';
        let aux = '';
        response.data.forEach(function (element, index) {
            if(element.Privado == 1){
                aux = "Privado"    
            }else{
                aux = "Público" 
            }
            if(element.Vigente == 1){
            itemAhorcado += ` <div style="border-left: 4px solid #1eaaf1;" class="col-12 item-competencia">
                                <div class="row justify-content-between">
                                     <div class="col">
                                            <p style="color: #1eaaf1;" class="title-ahorcado">${element.Titulo}</p>
                                            <p>Palabra: ${element.Palabra}</p>
                                            <p>Tiempo: ${element.tiempo}</p>
                                            <p>Fecha: ${element.Fecha}</p>
                                            <p style="color: #f7bb18;">${aux}</p>
                                    </div>
                                 <div>
                                <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                    <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                </a>
                                <ul id='dropdown${index}' class='dropdown-content'>
                                    <li><a href="#!" class="editarAhorcado" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">create</i>Editar</a></li>
                                    <li><a href="#!" class="deleteAhorcado" data-key="${element.Codigo}"><i class="material-icons">delete</i>Eliminar</a></li>
                                </ul>                                  
                </div>
            </div>
        </div>`}else{ 
            
        itemAhorcado += ` <div style="border-left: 4px solid grey;" class="col-12 item-competencia">
        <div class="row justify-content-between">
             <div class="col">
                    <p class="title-ahorcado">${element.Titulo}</p>
                    <p>Palabra: ${element.Palabra}</p>
                    <p>Tiempo: ${element.tiempo}</p>
                    <p>Fecha: ${element.Fecha}</p>
                    <p>Eliminado</p>
            </div>
         <div>
        <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
            <i class="material-icons" style="font-size: 2rem">more_vert</i>
        </a>
        <ul id='dropdown${index}' class='dropdown-content'>
            <li><a href="#!" class="restaurarAhorcado" data-key="${element.Codigo}"><i class="material-icons">create</i>Restaurar</a></li>
        </ul>                                  
</div>
</div>
</div>`

        }
        });
        let htmlRender = `<div class="list-ahorcado">
                                ${itemAhorcado}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

const deleteAhorcado = (codigo) => {
    eliminar({
        Ahorcado:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderAhorcado()
    })
}

const restaurarAhorcado = (codigo) => {
    restaurar({
        Ahorcado:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderAhorcado()
    })
}



$('#listarAhorcado').click(function () { 
    renderAhorcado()
})

$('#content-app').on('click','.cerrar',function () { 
    renderAhorcado()
});


$('#content-app').on('click','.deleteAhorcado',function () { 
    var key = $(this).data('key')
    deleteAhorcado(key)
});

$('#content-app').on('click','.restaurarAhorcado',function () { 
    var key = $(this).data('key')
    restaurarAhorcado(key)
});

$('#content-app').on('click','.editarAhorcado',function () { 
    var key = $(this).data('key')
    
    
    // console.log($(this).data('info'));
    var data = $(this).data('info')
    $('#nuevoAhorcado').click()
    listarTema(data.CodTema);
    $('#itmTitulo').val(data.Titulo).focus()
    $('#itmPalabra').val(data.Palabra).focus()
    $('#itmFondo').val(data.Fondo).focus()
    $('#itmPistas').val(data.Pistas).focus()
    $('#itmTiempo').val(data.tiempo).focus()
    if(data.Privado == 1){
        $('#itmPrivado').prop("checked", true)
    }

    $('#sendAhorcado').removeClass('btnSend')
    $('#sendAhorcado').addClass('btnEdit')
    $('#sendAhorcado').html(`Editar <i class="material-icons right">edit</i>`)
    CodigoAhorcado = key
    // editarCompetencia(key)
});

$(document).ready(function () {
    renderAhorcado()
});

$('#content-app').on('click','.btnEdit',function () { 
    console.log(CodigoAhorcado);
    const fecha = new Date();
    const format = fecha.getFullYear() +"-"+ (fecha.getMonth() +1) + "-" +fecha.getDate();
    editar({
        itmTitulo: $('#itmTitulo').val(),
        itmPalabra: $('#itmPalabra').val(),
        itmPistas: $('#itmPistas').val(),
        itmFondo: $('#itmFondo').val(),
        itmTiempo: $('#itmTiempo').val(),
        itmFecha: format,
        itmPrivado: $('#itmPrivado').prop('checked') ? 1 : 0,
        itmTema: $('#itmTema').val(),
        Ahorcado: CodigoAhorcado
      },
      function (response) { 
        Swal.fire({
            title: response.mensaje,
            icon:'success',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Listar',
            denyButtonText: `Nuevo`,
          }).then((result) => {
            if (result.isConfirmed) {  
                renderAhorcado()
            } else if (result.isDenied) {
                $('#nuevoAhorcado').click()
            }
          })
    })
})