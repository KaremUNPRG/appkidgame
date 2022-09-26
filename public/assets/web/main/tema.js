
import { store, lista,eliminar, editar,restaurar } from "../components/api/Tema.js";


var CodigoTema = null


const formTema = () => {
    CodigoTema = null
    let htmlRender = ` 
          
                
                    <div class="form-nuevo bg-light">
                        
                        <!--
                        <div class="row">
                            <div class="col-xl-12 text-center">
                                <h3 style="font-weight: 900; color: #1eaaf1;">REGISTRAR TEMA</h3>
                            </div>
                        </div>
                        -->

                        <div class="row">

                            <button class="cerrar how-pos3 hov3">
                                <img id="cerrar" src="assets/web/img/icon-close.png" alt="CLOSE">
                            </button>
            
                                <div class="col-xl-12">
                                <div class="input-field">
                                    <input type="text" class="validate executeBorrador" id="itmTitulo">
                                    <label for="itmTitulo">Título <span class="text-danger">*</span></label>
                                    </div> 
                                </div>

                                <div class="col-xl-12">  
                                <div class="input-field">     
                                    <input type="text" id="itmDescripcion" class="validate executeBorrador">
                                    <label for="itmDescripcion">Descripcion <span class="text-danger">*</span></label>
                                </div> 
                                </div>
                        </div>
                        
                            
                        <div class="row">
                            <div class="col-xl-12" style="text-align: right">
                                <br>
                                <button id="sendTema" class="btn btn-outline-primary btnSend" type="submit" name="action">Registrar 
                                    <i class="material-icons right">send</i>
                                </button>
                                    
                            </div>
                           
                        </div>
                    </div>
                         `;
    $('.render-html').html(htmlRender);
}

$('#nuevoTema').click(function () {  
    formTema();
})


$('#content-app').on('click','.btnSend',function () { 
  var titul = document.getElementById('itmTitulo').value;
    var descrip = document.getElementById('itmDescripcion').value;

    if(titul.trim().length == 0 || descrip.trim().length == 0 ){
        Swal.fire({
            title: 'Completa los datos (*)',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }else{
    store({
        itmTitulo: $('#itmTitulo').val(),
        itmDescripcion: $('#itmDescripcion').val()

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
                renderTema()
            } else if (result.isDenied) {
                $('#nuevoTema').click()
            }
          })
    })
  }
})





const renderTema = () => {
    lista(function (response) {  
        let itemTema = '';
        
        response.data.forEach(function (element, index) {
          
            if(element.Vigente == 1){
            itemTema += ` <div style="border-left: 4px solid #1eaaf1; " class="col-12 item-ahorcado">
                                <div class="row justify-content-between">
                                     <div class="col">
                                            <p style="color: #1eaaf1;" class="title-ahorcado">Titulo: ${element.Titulo}</p>
                                            <p>Descripción: ${element.Descripcion}</p>
                                    </div>
                                 <div>
                                <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
                                    <i class="material-icons" style="font-size: 2rem">more_vert</i>
                                </a>
                                <ul id='dropdown${index}' class='dropdown-content'>
                                    <li><a href="#!" class="editarTema" data-info='${JSON.stringify(element)}' data-key="${element.Codigo}"><i class="material-icons">create</i>Editar</a></li>
                                    <li><a href="#!" class="deleteTema" data-key="${element.Codigo}"><i class="material-icons">delete</i>Eliminar</a></li>
        
                                </ul>                                  
                </div>
            </div>
        </div>`}else{ 
            
        itemTema += ` <div style="border-left: 4px solid grey;" class="col-12 item-competencia">
        <div class="row justify-content-between">
             <div class="col">
                    <p class="title-ahorcado">Titulo: ${element.Titulo}</p>
                    <p>Descripción: ${element.Descripcion}</p>
                    <p>Eliminado</p>
            </div>
         <div>
        <a class='dropdown-trigger' href='#' data-target='dropdown${index}'>
            <i class="material-icons" style="font-size: 2rem">more_vert</i>
        </a>
        <ul id='dropdown${index}' class='dropdown-content'>
            <li><a href="#!" class="restaurarTema" data-key="${element.Codigo}"><i class="material-icons">create</i>Restaurar</a></li>
        </ul>                                  
</div>
</div>
</div>`

        }
        });
        let htmlRender = `<div class="list-tema">
                                ${itemTema}
                            </div>`;
        $('.render-html').html(htmlRender);
        $('.dropdown-trigger').dropdown();
    })
}

const deleteTema = (codigo) => {
    eliminar({
        Tema:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderTema()
    })
}

const restaurarTema = (codigo) => {
    restaurar({
        Tema:codigo
    },
    function (response) {  
        Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
        renderTema()
    })
}



$('#listarTema').click(function () { 
    renderTema();
})

$('#content-app').on('click','.cerrar',function () { 
    renderTema();
});


$('#content-app').on('click','.deleteTema',function () { 
    var key = $(this).data('key')
    deleteTema(key)
});

$('#content-app').on('click','.restaurarTema',function () { 
    var key = $(this).data('key')
    restaurarTema(key)
});

$('#content-app').on('click','.editarTema',function () { 
    var key = $(this).data('key')
    
    
    // console.log($(this).data('info'));
    var data = $(this).data('info')
    formTema();
    $('#itmTitulo').val(data.Titulo).focus()
    $('#itmDescripcion').val(data.Descripcion).focus()

    $('#sendTema').removeClass('btnSend')
    $('#sendTema').addClass('btnEdit')
    $('#sendTema').html(`Editar <i class="material-icons right">edit</i>`)
    CodigoTema = key
    // editarCompetencia(key)
});

$(document).ready(function () {
    renderTema();
});

$('#content-app').on('click','.btnEdit',function () { 
  
  var titul = document.getElementById('itmTitulo').value;
    var descrip = document.getElementById('itmDescripcion').value;

    if(titul.trim().length == 0 || descrip.trim().length == 0 ){
        Swal.fire({
            title: 'Completa los datos (*)',
            icon:'error',
            showDenyButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }else{
    editar({
        itmTitulo: $('#itmTitulo').val(),
        itmDescripcion: $('#itmDescripcion').val(),
        Tema: CodigoTema
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
                renderTema()
            } else if (result.isDenied) {
                $('#nuevoTema').click()
            }
          })
    })
  }

})

