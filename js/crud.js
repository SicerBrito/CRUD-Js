let comentarios = []; // TODO: Arreglo vacio.

const comentario = {
    nombre: '',
    email: '',
    mensaje: ''
};

let editar = false;

const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const mensajeInput = document.getElementById('mensaje');

formulario.addEventListener('submit', validarFormulario); // TODO: Cuando detecte el submit va a llamar a la funtion validarFormulario.


// TODO: La funcion validarFormulario va a resivir  ( (e) el evento )
function validarFormulario(e) {
    e.preventDefault(); // TODO: Esto es la para que no se ejecute de forma automatica y evitar el refresh.

    if (nombreInput.value === '' || emailInput.value === '' || mensajeInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editar){
        editarFormulario();
        editar = false;
    } else{

        comentario.id = Date.now(); //TODO: Lo que hace esta funcion es que nunca se repita el id.
        comentario.nombre = nombreInput.value;
        comentario.email = emailInput.value;
        comentario.mensaje = mensajeInput.value;

        agregarComentario(); // TODO: Llamamos a la funcion:
    }
}




function agregarComentario() {
    comentarios.push({ ...comentario }); // TODO: Dentro de esta funcion agrega por medio del push el objeto y para agregar el objeto utilizamos un spread operator que sirve para copiar el comentario.

    mostrarComentarios();

    formulario.reset(); // Con esto limpiamos los input cada que agreguemos un comentario (No necesita nada aparte de esta linea de codigo).

    limpiarObjeto(); //Limpiar el comentario.
}




function limpiarObjeto(){
    comentario.id = '';
    comentario.nombre = '';
    comentario.email = '';
    comentario.mensaje = '';
}





function mostrarComentarios() {

    limpiarHtml(); //Llamamos a la function limpiarHtml. (Esta function lo que hace es limpiar el comentario anterior del cache (por asi decirlo) para que no se envie por segunda vez a la hora de agregar otro comentario).

    const listado = document.querySelector('.div-listado'); // TODO: Esto es para tener referencia de donde vamos a agregar el listado.

    //TODO: Ahora recorremos la lista de elementos con un foreach
    comentarios.forEach( comentado => {
        // ahora destructuramos los elementos
        const {id, nombre, email, mensaje} = comentado; //Esto es para acceder mas facil a ellos.
        const parrafo = document.createElement('p'); //Creamos una etiqueta p donde vamos a meter los comentarios.
        parrafo.textContent = `ID: ${id}\nNombre: ${nombre}\nEmail: ${email}\nComentario: ${mensaje}\n`;   
        parrafo.style.whiteSpace = "pre-line";   //! Agregamos esta linea de codigo para asi poder agragar saltos de linea el en la linea anterior de codigo utilizando \n
        parrafo.dataset.id = id; // ! Para indicar que parrafo es el que tenemos que eliminar o modificar cuando realicemos las acciones.


        const btnEditar = document.createElement('b'); // Creamos el button (Se puede poner solo b o button).
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btn', 'btn-editar'); //Estas son las clases que va a tener.
        btnEditar.style.cssText = 'color: white; background-color: green;';
        btnEditar.onclick = () => cargarComentario(comentado); //Esta es un array function el cual nos mostrara el comentario, pasandole el objeto 'comentado'.
        parrafo.appendChild(btnEditar);


        // TODO: Lo mismo pero para eliminar.
        const btnBorrar = document.createElement('b'); 
        btnBorrar.textContent = 'Eliminar';
        btnBorrar.classList.add('btn', 'btn-borrar');
        btnBorrar.style.cssText = 'color: white; background-color: red;';
        btnBorrar.onclick = () => eliminarComentario(id); //A este solo le pasamos el id para eliminarlo 
        parrafo.appendChild(btnBorrar);

        const hr = document.createElement('hr');//Creamos el hr (El elemento <hr> se utiliza para insertar una línea horizontal en una página web, y se puede utilizar para separar visualmente secciones de contenido.)

        //TODO: Agregamos como nodos hijos a parrafo y a hr del contenedor listado.
        listado.appendChild(parrafo);
        listado.appendChild(hr);

    });
}




// Esta function revisive comentado y lo desestructuramos.
function cargarComentario(comentado) {    // TODO: Esta function nos va a volver a cargar la informacion del comentario que vamos a editar devuelta al formulario.
    const {id, nombre, email, mensaje} = comentado;
    nombreInput.value = nombre;
    emailInput.value = email;
    mensajeInput.value = mensaje;

    comentario.id = id;


    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'; // TODO: Aqui cambiamos el botton Añadir por uno para Actualizar el cual va a tener la function de actualizar despues de haberle dado click a editar.
    editar = true;
};




function editarFormulario(){

    comentarios.map(comentado => {
        if (comentado.id === comentario.id) {   // TODO: Si el comentado.id es igual a comentario.id reemplazara esa informacion por esta.
            comentado.nombre = nombreInput.value;
            comentado.email = emailInput.value;
            comentado.mensaje = mensajeInput.value;
        }
    });
    
    limpiarHtml();   //Llamamos esta function para limpiar el formulario.
    mostrarComentarios(); //Llamamos a esa function para mostrar los cambios.

    formulario.reset(); //Receteamos el formulario.

    //Y volvemos a cambiar el button
    formulario.querySelector('button[type="submit"]').textContent = 'Añadir';
    editar = false; //Y desactivamos la variable editando.
};




function eliminarComentario(id) {
    comentarios = comentarios.filter(comentado => comentado.id !== id) //Va a filtrar todo los elementos que no sean iguales al id y el resultado nos lo va a guardar en el arreglo comentarios.

    limpiarHtml();
    mostrarComentarios();
}




function limpiarHtml() {
    const listado = document.querySelector('.div-listado'); //TODO: Esto se utiliza para poder tener acceso a los elemtos hijos de la clase div-listado.

    //TODO: Mientras que el contenedor listado tenga hijos los va a ir eliminado de uno en uno hasta que ya no detecte que tenga un hijo.
    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }
}