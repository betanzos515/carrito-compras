const listaProductos = document.querySelector('#lista-carrito');
const productos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const btnvaciarCarrito = document.querySelector('#vaciar-carrito');


eventListener();


function eventListener(){
    productos.addEventListener('click',agregarCarrito);

    listaProductos.addEventListener('click',eliminarCurso);

    document.addEventListener('DOMContentLoaded',visualizarLocalStorage);

    btnvaciarCarrito.addEventListener('click',vaciarCarrito);
}   

function agregarCarrito(e){
    e.preventDefault();

    if(e.target.classList.contains('button')){
        let elemento = e.target.parentElement.parentElement;
        console.log(elemento);
        leerElemento(elemento);
    }
}

function leerElemento(elemento){
    console.log(elemento);
    const infoCurso = {
        imagen:elemento.querySelector('img').src,
        titulo:elemento.querySelector('h4').textContent,
        precio:elemento.querySelector('.precio span').textContent,
        id:elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

function insertarCarrito(infoCurso){
    
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${infoCurso.imagen}" width="100">
    </td>
    <td>${infoCurso.titulo}</td>
    <td>${infoCurso.precio}</td>
    <td>
        <a href=# class="borrar-curso" data-id="${infoCurso.id}">X</a>
    </td>
    `;

    listaCursos.appendChild(row);
    agregarLocalStorage(infoCurso);
}

function eliminarCurso(e){
    e.preventDefault();

    if(e.target.className === 'borrar-curso'){
        e.target.parentElement.parentElement.remove();
        console.log('Producto Borrado');
        eliminarLocalStorage(e.target.getAttribute('data-id'));
    }
}

function vaciarCarrito(){
   listaCursos.innerHTML = '';
    /* while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    localStorage.clear();*/
    localStorage.clear();
    return false; 
}

function agregarLocalStorage(elemento){
    let datos = obtenerDatosLocalStorage();
    datos.push(elemento);
    localStorage.setItem('cursos',JSON.stringify(datos));
}

function obtenerDatosLocalStorage(){
    let datos;

    if(localStorage.getItem('cursos') === null){
        datos = [];
    }
    else{
        datos = JSON.parse(localStorage.getItem('cursos'));
    }
    return datos;
}

function visualizarLocalStorage(){
    let datos = obtenerDatosLocalStorage();

    datos.forEach(function(objeto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${objeto.imagen}" width="100">
        </td>
        <td>${objeto.titulo}</td>
        <td>${objeto.precio}</td>
        <td>
            <a href=# class="borrar-curso" data-id="${objeto.id}">X</a>
        </td>
        `;
    
        listaCursos.appendChild(row);
    })
}

function eliminarLocalStorage(id){

    let cursos = obtenerDatosLocalStorage();
    cursos.forEach(function(curso,index){
        if(curso.id === id){
            /* console.log(`Este elemento es que el será eliminado del localStorage Imagen: ${curso.imagen}, titulo: ${curso.titulo}, precio: ${curso.id}`); */
            cursos.splice(index,1);
        }
    });
    localStorage.setItem('cursos',JSON.stringify(cursos));
}