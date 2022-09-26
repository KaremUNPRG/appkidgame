import { headersList, url } from "../ApiRest.js";


export const store =  async (body,success) => {
       
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/tema`, { 
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



export const lista =  async (success) => {
    let response = await fetch(`${url}/tema`, { 
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

export const listaT =  async (success) => {
    let response = await fetch(`${url}/tema/juego`, { 
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



export const eliminar =  async (body,success) => {
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/tema`, { 
        method: "DELETE",
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

export const editar =  async (body,success) => {
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/tema`, { 
        method: "PUT",
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


export const restaurar =  async (body,success) => {
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/tema/restore`, { 
        method: "PUT",
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