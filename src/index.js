import './styles.css';

//Busca el indez.js por defecto por eso no lo especifico
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class.js';

export const todoList = new TodoList();

//Reconstruir las Tareas en HTML -> En la lista de tareas por cada todo creame un HTML
todoList.todos.forEach( crearTodoHtml);

// const newTodo = new Todo('Aprender JS');
// todoList.nuevoTodo( newTodo );
//todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();

console.log('todos', todoList.todos);






