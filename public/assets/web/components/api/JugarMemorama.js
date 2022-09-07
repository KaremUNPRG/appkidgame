import { headersList, url } from "../ApiRest.js";
export const juegoMemorama =  async (body,success) => {
    let bodyContent = JSON.stringify(body);
    let response = await fetch(`${url}/juegomemorama`, { 
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
