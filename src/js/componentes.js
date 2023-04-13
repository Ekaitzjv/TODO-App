
import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const btnBorrarTodos    = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    //Si completado es TRUE entonces "completed" si no nada
    const htmlTodo = 
    `<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}


//Eventos
//Crear nueva tarea
txtInput.addEventListener('keyup', ( event ) => {

    //Si presiona enter, crear nueva tarea y si hay texto
    if( event.keyCode === 13 && txtInput.value.length > 0){

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );
        
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }

});

//Marcar como completado o eliminar tarea
divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    //console.log(nombreElemento);

    //Marcar como completada
    if( nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    //Borrar tarea si le doy al botón
    } else if( nombreElemento.includes('button')) {

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

    //Comprobar contenido del array completo
    //console.log(todoList);
});

//Borrar todas las tareas completadas
btnBorrarTodos.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //recorrer cada elemento a borrar empezando desde abajo

    for( let i = divTodoList.children.length-1; i>=0; i-- ){
        const elemento = divTodoList.children[i];
        console.log(elemento);

        //Si previamente se ha completado se elimina
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }   
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected'); 
    
    for( const elemento of divTodoList.children){
        
        console.log( elemento );
        
        //eliminar la clase hidden a todos los elementos
        elemento.classList.remove('hidden');
        //almacenar elementos que sean completados
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            //esconde las tareas completadas
            case 'Pendientes': 
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            //esconde las tareas no completadas
            case 'Completados': 
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }










});