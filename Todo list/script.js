
"use strict";






 const p = document.querySelector ('#p');
 const form = document.querySelector('#Form');
 const input = document.querySelector('#addInput');
 const output = document.querySelector('#output');



let todos =[];



const getTodos = () => {
fetch('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => response.json())
    .then(data => {
        todos = data;
        listTodos();
        // console.log(todos);
    })
}
getTodos();



const listTodos = () => {
    output.innerHTML = ''; 
    todos.forEach(todo  => {
        newTodo(todo);

    })
}






const newTodo = (todo) => {



    let groupCard = document.createElement('div')
    groupCard.classList.add('p-3', 'my-4', 'card1','position-relative');

    let innergroupCard = document.createElement('div');
    innergroupCard.classList.add('d-flex', 'justify-content-between', 'align-items-end');

    let heading = document.createElement('h4');
    heading.classList.add('heading','d-flex', 'justify-content-between', 'align-items-end')
    heading.innerText = todo.title; 

  
    
    let button = document.createElement('button');
    button.classList.add('btn', 'deleteAllBtn', 'ms-2', 'position-absolute', 'top-0', 'start-100', 'translate-middle', 'text-dark', );
    button.innerText = 'x';
    button.addEventListener('click', function() {


      if (heading.style.textDecoration ) {
             output.removeChild(groupCard);
             return false;
      } else if (button2.textContent === 'Done') {

          return true;
      }
  
  
            
     });


  let button2 = document.createElement('button2')
    button2.classList.add('btn-grad', 'me-5',)
    button2.innerText = 'Done'
   
    button2.addEventListener('click', function() {
    
        
         heading.style.textDecoration = 'line-through'
         button2.classList.add('btn-dark')
         button2.innerText = 'undo'
        //   console.log('aaaa')
      
   })
   button2.addEventListener('dblclick', function() {
       
    button2.innerText = 'Done'
    heading.style.textDecoration = 'none'

   })



    
    
    innergroupCard.appendChild(heading);
    innergroupCard.appendChild(button2);
    innergroupCard.appendChild(button);
    groupCard.appendChild(innergroupCard);
    output.appendChild(groupCard);


}











const createTodo = (title) => {
    fetch('http://jsonplaceholder.typicode.com/todos', {
    method:'post',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify ({
      title,
      completed: false  
    })
  })
  .then(response => response.json())
  .then(data => {
    //   console.log(data)

      let newTodo = {
          ...data,
          id:Date.now().toString(),
      }
      
      todos.unshift(newTodo);
      listTodos();
  })
}


form.addEventListener('submit', event => {
    event.preventDefault();
    if(input.value.trim() === "") {
        p.innerHTML = 'You need to fill in a todo';
        input.classList.add('is-invalid');
        return;
    } else  {
        p.innerHTML= '';
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')
    }
    
 
    createTodo(input.value);
    input.value = '';
    
    return true;
   

})    


