
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }

}

function leerDatosCurso(curso) {
    const cardInfo = curso.querySelector('.info-card');


    const infoCurso = {
        img: curso.firstElementChild.src,
        titulo: cardInfo.querySelector('h4').textContent,
        precio: cardInfo.querySelector('.precio span').textContent,
        id: cardInfo.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const repetido = articulosCarrito.some(articulo => articulo.id === infoCurso.id); //Utilizamos some mejor que find; Porque la primera vez va adar undefined con find
    console.log(repetido);
    if (repetido) {
        //Si ya esta en el carrito actualizamos la cantidad
        const item = articulosCarrito.find(articulo => articulo.id === infoCurso.id);
        item.cantidad += 1;
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    articulosCarrito.map(articulo => {

        const row = document.createElement('tr');
        const img = document.createElement('img');
        img.src = articulo.img;
        img.alt = 'Imagen articulo'
        row.innerHTML = `
        <td>
        <img src=${articulo.img} alt="Imagen articulo" width="100"/>
        </td>
            <td>
                ${articulo.titulo}
            </td>
            <td>
            ${articulo.precio}
            </td>
            <td>
            ${articulo.cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${articulo.id}">X</a>
            </td>
        
        `


        contenedorCarrito.appendChild(row);
    })
}

//Elimina los curos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//Borrar un curso
function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {

        const curso = e.target.parentElement.parentElement;
        const id = curso.querySelector('a').getAttribute('data-id');

        const cursoBorrado = articulosCarrito.find((item) => item.id === id);
        if (cursoBorrado.cantidad === 1) {
            articulosCarrito = articulosCarrito.filter(item => item.id !== id);

        } else {
            cursoBorrado.cantidad--;
        }
        carritoHTML();
        console.log(articulosCarrito);

    }



}