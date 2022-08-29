import { headersList, url } from "../ApiRest.js";

export const listaJuego =  async (success) => {

    let response = await fetch(`${url}/inicio/juego`, { 
        method: "GET",
        headers: headersList()
    })
    .then(response => response.json())
    .then(data => {
        success(data)
    })
    .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}
