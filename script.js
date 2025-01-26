const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");

loadItems();
shoppingForm.addEventListener("submit",handleFormSubmit);

function loadItems(){
    const items= [
        {id:1, name:"Yumurta", completed:false},
        {id:2, name:"Ekmek", completed:true},
        {id:3, name:"Süt", completed:false},
        {id:4, name:"Bal", completed:false}
    ];

    shoppingList.innerHTML="";
    for(let item of items){
        const li = createListItem(item);
        shoppingList.appendChild(li);
    }
}

function addItem(input){
    const id=generateId();
    const newItem = createListItem({
        id: id,
        name:input.value,
        completed:false,
    });
    shoppingList.prepend(newItem);
    input.value="";
}

function generateId(){
    return Date.now().toString();
}

function handleFormSubmit(e){
    e.preventDefault();
    const input =document.getElementById("item_name");
    if(input.value.trim().length===0){
        alert("Alani doldurunuz");
        return;
    }
    addItem(input);
}

function toggleCompleted(e){
    const li = e.target.parentElement;
    li.toggleAttribute("item-completed",e.target.checked)
}

// <li class="border rounded p-3 mb-1">
//     <input type="checkbox" class="form-check-input">
//     <div class="item-name">item1</div>
//     <i class="fs-3 bi bi-x text-danger delete-icon"></i>
// </li>
function createListItem(item){
    //checkbox
    const input = document.createElement("input");
    input.type="checkbox";
    input.classList.add("form-check-input");
    input.checked=item.completed;
    input.addEventListener("change",toggleCompleted)

    //item
    const div=document.createElement("div");
    div.textContent = item.name;
    div.classList.add("item-name");

    //delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.className="fs-3 bi bi-x text-danger delete-icon";
    deleteIcon.addEventListener("click",removeItem);

    //li
    const li = document.createElement("li");
    li.className ="border rounded p-3 mb-1";
    li.toggleAttribute("item-completed",item.completed);

    li.appendChild(input);
    li.appendChild(div);
    li.appendChild(deleteIcon);

    return li;

}

function removeItem(e){
    const li=e.target.parentElement;
    shoppingList.removeChild(li);
}