const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#buscador');

const selectYear = document.querySelector('#year')
const selectMarca = document.querySelector('#marca');
const selectPuertas = document.querySelector('#puertas');
const selectTransmision = document.querySelector('#transmision');
const selectColor = document.querySelector('#color');
const selectMinimo = document.querySelector('#minimo');
const selectMaximo = document.querySelector('#maximo');

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    puertas: '',
    transmision: '',
    color: '',
    minimo: '',
    maximo: '',

}

document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);


    crearSelectYears();





})

//Eventlistener para los select
selectMarca.addEventListener('change', leerMarca);
selectTransmision.addEventListener('change', leerTransmision);
selectPuertas.addEventListener('change', leerPuertas);
selectMinimo.addEventListener('change', leerMinimo);
selectMaximo.addEventListener('change', leerMaximo);
selectColor.addEventListener('change', leerColor);
selectYear.addEventListener('change', leerYear);


function mostrarAutos(autos) {

    limpiarHTML();


    autos.forEach((auto) => {
        const { marca, year, puertas, modelo, transmision, precio, color } = auto;


        const infoAuto = document.createElement('P');
        infoAuto.textContent = `${marca} ${modelo} - ${year} - ${puertas} PUERTAS - TRANSMISIÓN: ${transmision} - PRECIO: ${precio} - COLOR: ${color}`;
        resultado.appendChild(infoAuto);

    })


}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


function crearSelectYears() {

    for (let i = maxYear; i >= minYear; i--) {
        const option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }

}

function noResultado(){
    const error = document.createElement('DIV');
    error.classList.add('alerta', 'error')
    error.textContent = 'No hay resultados';
    resultado.appendChild(error);
}

function leerMarca(e) {

    datosBusqueda.marca = e.target.value;
    filtrar();
}

function leerYear(e) {

    datosBusqueda.year = parseInt(e.target.value);
    filtrar();
}

function leerMinimo(e) {

    datosBusqueda.minimo = e.target.value;
    console.log(datosBusqueda.minimo);
    filtrar();
}

function leerMaximo(e) {

    datosBusqueda.maximo = e.target.value;
    filtrar();
}

function leerTransmision(e) {

    datosBusqueda.transmision = e.target.value;
    filtrar();
}

function leerPuertas(e) {

    datosBusqueda.puertas = parseInt(e.target.value);
    filtrar();
}

function leerColor(e) {

    datosBusqueda.color = e.target.value;
    filtrar();
}



function filtrar() {

    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); //Se llama a la funcion filtrarMarca y directamente se le pasa el auto del (auto) => 
    // La funcion filtrarMarca se aplicará a cada argumento del array de autos
    console.log(resultado);

    if(resultado.length === 0){
        limpiarHTML();
        noResultado();
        return;
    }

    mostrarAutos(resultado);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    console.log(auto.precio);
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}

