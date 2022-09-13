import { listarJuegos } from "../components/api/CompetenciaJugar.js";
let params = new URLSearchParams(location.search);
console.log(params);
$(document).ready(function () {
    listarJuegos({Competencia : 1},function () {  

    })
});