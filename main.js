

let input = document.querySelector("input[type = text]");
let inputContainer = document.querySelector(".input_container");
let ul = document.querySelector(".list");
let activeTodo = document.querySelector(".active");
let completedTodo = document.querySelector(".completed");
let clearCompletedTodo = document.querySelector(".clear_completed");
let item_count = document.querySelector('.item_count')
let item = document.querySelector('.item');
let allTodo = document.querySelector('.all');
let allTodo2 = document.querySelector('.all1');
let selectAllTodo = document.querySelector('.i');
var newlabel = document.createElement("Label");
let footer1 = document.querySelector('footer1');
todoList =[];
// let todoList = JSON.parse(localStorage.getItem('todo-list')) || [];

function view (arrayToDisplay) {
    ul.innerHTML = '';
    
    arrayToDisplay.forEach((item,index) => {
        let li = document.createElement("li");
        li.className = "li_list";
        const check = document.createElement("input");
        check.type = "checkbox";
        check.setAttribute("data-id", todoList.indexOf(item));
        check.id = 'right-'+index;
        check.className = "check";
        const newLabel = document.createElement("Label");
        newLabel.setAttribute("for",'right-'+index);
        imgContainer = document.createElement("div");
        imgContainer.className = 'imgContainer';
        img = document.createElement('img');
        img.className = 'right';
        img.src = 'chk.png';
        imgContainer.appendChild(img);
        newLabel.appendChild(imgContainer);
        li.appendChild(newLabel);
        check.checked = item.isDone;
        check.addEventListener("click", handleCheck);
        const p = document.createElement("p");
        p.innerText = item.text;
        const btn = document.createElement("span");
        btn.addEventListener("click" , deleteSubmit);
        btn.innerText = "x";
        btn.className = "btn del";
        btn.setAttribute("data-id", item.id);
        if (item.isDone == true ){
            img.style.opacity = "1";
            imgContainer.style.border = "none";
            p.style.textDecoration = "line-through";
            p.style.color = "rgb(238, 231, 231)";
        } else {
            img.style.opacity = "0";
            p.style.textDecoration = "none";
        }
        li.appendChild(check);
        li.appendChild(p);
        li.appendChild(btn);
        ul.appendChild(li);
    });
    
    item_count.innerText = activeLength();
    itemsLeft(); 
    showClearCompleted (); 
    // localStorage.setItem('todo-list', JSON.stringify(todoList));
}

function handleSubmit (event){
    console.log(event.target.value);
    if (event.keyCode === 13 && event.target.value.trim() != "") {
        const todoText = {text: '', isDone: false , id:""};
        todoText.text = input.value;
        todoList.push(todoText);
        console.log(todoList);
        document.querySelector(".input_container .i").classList.add("i_");
        document.querySelector(".input_container .i").style.opacity = 0.2;
        document.querySelector(".foot").classList.add("footer_container");
        event.target.value = "";
        view(todoList);
    }

}    
    function deleteSubmit (event) {
        console.log('inside delete',event)
        var id = event.target.dataset.id
        // if(event.target.classList.contains("del")){
            console.log('inside delete if')
        todoList.splice(id,1);
        // }
        view(todoList);

    }
    

    function handleCheck (event) {
        console.log("handle check",event);
        var id = event.target.dataset.id
        if (event.target.classList.contains('check')){
        //    todoList.forEach(item => { 
        //     if (item.id != id){ 
           todoList[id].isDone = !todoList[id].isDone;
        //    }
        // })
    }
    view(todoList);
}
       

    function completed () {
        console.log('inside complete')
        const isChecked = todoList.filter((item) => {
            allTodo2.classList.remove('all');
            activeTodo.classList.remove('active1');
            completedTodo.classList.add('completed1');
            return item.isDone == true;
        })
        view(isChecked);
}
    function showClearCompleted () {
        if(todoList.some((todo) => todo.isDone==true)) {
            document.querySelector('.clear_completed').classList.add('clearCompleted');
        }else{
            document.querySelector('.clear_completed').classList.remove('clearCompleted');
        }
};
 
   function active () {
        const isActive = todoList.filter((item) => {
            completedTodo.classList.remove('completed1');
            allTodo2.classList.remove('all');
            activeTodo.classList.add('active1');
            return item.isDone == false;
        })
        view(isActive);
    }
    function activeLength () {
        const isActive = todoList.filter((item) => {
            return item.isDone == false;
        })
        
        return isActive.length;
    }
    function all() {
        completedTodo.classList.remove('completed1');
        allTodo2.classList.add('all');
        activeTodo.classList.remove('active1');
        view(todoList);
    }
    function itemsLeft () {
        const isActive = todoList.filter((item) => {
            return item.isDone == false;
        })
        return isActive.length <= 1 ? item.innerText = "item left" : item.innerText = "items left";
        }
    function clearCompleted (event) {
        const isNotComplete = todoList.filter((item) => {
            selectAllTodo.style.opacity = 0.2;
             return item.isDone == false;
          })
          todoList = isNotComplete;
          view(todoList)
    }
    function selectAll (event){
        const falsed = todoList.filter(item => item.isDone == false)
        console.log(falsed.length); 
        if(falsed.length == 0){
            todoList.forEach((item) => {
                selectAllTodo.style.opacity = 0.2;
                return item.isDone = false;
            })            
        }
        else {
            todoList.forEach((item) => {
                selectAllTodo.style.opacity = 0.8;
                return item.isDone = true;
            })
        }
        
        console.log('hola');
        view(todoList);
    }

    // view(todoList);

    document.addEventListener('keydown', handleSubmit);
    completedTodo.addEventListener('click',completed);
    activeTodo.addEventListener('click',active);
    allTodo.addEventListener("click",all);
    clearCompletedTodo.addEventListener('click',clearCompleted);
    selectAllTodo.addEventListener('click',selectAll);




