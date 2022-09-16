import { headersList, url } from "../ApiRest.js";

export const listaJuego =  async (body,success) => {

    let response = await fetch(`${url}/inicio/juego?Modo=${body.Modo}`, { 
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

export const listaValoracion =  async (codigo,success) => {

    let response = await fetch(`${url}/juego/valoracion/${codigo}`, { 
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

export const insertValoracion =  async (body,success) => {

    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/juego/valoracion`, { 
        method: "POST",
        body: bodyContent,
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
