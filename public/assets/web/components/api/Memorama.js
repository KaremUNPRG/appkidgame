import { headersList, url } from "../ApiRest.js";

export const store =  async (body,success) => {
       
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/memorama`, { 
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

export const list =  async (success, get = 0) => {

    let response = await fetch(`${url}/memorama?page=${get}`, { 
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

    let response = await fetch(`${url}/memorama`, { 
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

    let response = await fetch(`${url}/memorama`, { 
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

export const listarTema =  async (success) => {
    let response = await fetch(`${url}/memorama/listar/tema`, { 
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

export const cartaMemorama =  async (codigo, success) => {

    let response = await fetch(`${url}/memorama/get/${codigo}`, { 
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

export const buscarMemorama =  async (body,success) => {
       
    let bodyContent = JSON.stringify(body);

    let response = await fetch(`${url}/memorama/buscar`, { 
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
