const input = document.querySelector('#newTodo'); //get input dom
const btn = document.querySelector('#addTodo'); //get btn dom
const todolistUl = document.querySelector('#todoList'); //get todolist ul dom
const deleteBtn = document.querySelectorAll('.delete-btn');
const removeAll = document.querySelector('#clearTask');
const taskCount = document.querySelector('#taskCount');
btn.addEventListener('click', updateData);
removeAll.addEventListener('click', clearAll);

// var clearAll = document.querySelector('#clearTask'); //get clear-btn
// var taskCount = document.querySelector('#taskCount'); //get taskCount
// clearAll.addEventListener('click', clearAllFun);

let todoData = [ ]; //construct data
function updateData() {
  let text = input.value;
  if(text.length > 0){
    text = text.trim();
    todoData.push({
      id: Math.floor(Date.now()),
      content: text,
      complete: 0,
    });
    render();
    input.value = ''; //empty input value
  }
};

function deleteData(e) {
  // console.log(e.target);
  let liId = e.target.parentNode.dataset.id;
  todoData.forEach((item, i) => {
    if(item.id == liId){
      todoData.splice(i ,1);
    }
  });
  render();
}

function clearAll() {
  todoData = [];
  render();
}

function complete(e) {
  let id = e.target.parentNode.dataset.id;
  todoData.forEach((item) => {
    if(item.id == id) {
      if(!item.complete) {
        item.complete = 1;
      }
      else{
        item.complete = 0;
      }
    }
  });
  render();
}

function render(){
  var str = ''; //將資料加到畫面
  todoData.forEach((item) => {
    str += 
    `<li class="py-2 d-flex align-items-center" data-id="${item.id}">
    <input type="checkbox" class="checkbox mx-3">
    <span class="content ${item.complete ? 'completed' : ''}">${item.content}</span>
    <button type="button" class="delete-btn ml-auto btn-light mr-3">x</button>
    </li>`; //把todoData拉進template加總起來
  }); 
  todolistUl.innerHTML = str; //str insert into ul

  const deleteBtn = document.querySelectorAll('.delete-btn');
  deleteBtn.forEach((item) => {
    item.addEventListener('click', deleteData);
  }); //等render後有.delete-btn之後再找出DOM,並將array裡面每個DOM拉出來作監聽
  
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((item) => {
    item.addEventListener('click', complete);
  });

  taskCount.textContent = todoData.length; //render完算出資料數目後塞入taskCount
  
}
