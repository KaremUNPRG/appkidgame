import { headersList, url } from "../ApiRest.js";


export const list =  async (success) => {
    let response = await fetch(`${url}/juego`, { 
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

export const ahorcado =  async (id,success) => {
   
    let response = await fetch(`${url}/jugar-ahorcado/${id.id}`, { 
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

export const puntajeAhorcado =  async (body,success) => {
    let bodyContent = JSON.stringify(body);
    let response = await fetch(`${url}/puntaje-ahorcado`, { 
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
