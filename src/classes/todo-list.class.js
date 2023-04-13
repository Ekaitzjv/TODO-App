import { Todo } from './todo.class';


export class TodoList {

    constructor(){

        //this.todos =  [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        //Crear nuevo array excluyendo la tarea recien eliminada *filter*
        this.todos = this.todos.filter( todo => todo.id != id );
        //console.log(this.todos);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){

        for( const todo of this.todos ){

            console.log(id);
            console.log(todo.id);
            console.log(todo.completado);
            console.log(this.todos);

            if(todo.id == id ){
            // tarea = a lo contrario a lo que estaba antes(Ej.: tarea(completed)-> tarea(vacío))
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        //Filtrar por las tareas no completadas
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        //Convertir en JSON para que sea un string legible y guardable
        localStorage.setItem('todo', JSON.stringify(this.todos) );
    }

    cargarLocalStorage(){
        //Si tiene contenido guardado lo mostramos, si no se queda vacio.
        // if( localStorage.getItem('todo') ){

        //     //Reconstruir el JSON 
        //     this.todos = JSON.parse(localStorage.getItem('todo'));

        //     console.log('cargarLocal:', this.todos);
        //     console.log( typeof this.todos );
        // }else{
        //     this.todos = [];
        // }

        //Lo mismo de arriba pero con operador ternario

        //Convertir el json en un objeto y después convertir el objeto(generico) en una instancia(objeto nuevo) y real
        this.todos = (localStorage.getItem('todo')) 
                    ? JSON.parse(localStorage.getItem('todo')) 
                    : [];

        //map = barrer cada elemento del arreglo y devolver otro arreglo
        this.todos = this.todos.map(Todo.fromJson);
    }
}

