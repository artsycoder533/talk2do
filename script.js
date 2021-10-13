const toggleBtn = document.getElementById("checkbox");
// const todoItem = document.querySelector(".todos__item");
const todoInput = document.querySelector(".todos__input");
// const containter = document.querySelector(".todos__container");
const modal = document.querySelector(".modal"); 
const talkBtn = document.querySelector(".talk");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// page load
// window.addEventListener("onload", initUI);

// function initUI() {
//     renderHeader();
// }

//mic
talkBtn.addEventListener("click", () => {
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        console.log(text);
        searchForKeyword(text);
    }

});

function searchForKeyword(message) {
    //check if entire message is dark mode on
    if (message === "dark mode on" && !document.body.classList.contains("dark")) {
        toggleBtn.click();
        setDarkModeToAllTodos();
    }

    else if (message === "dark mode off" && document.body.classList.contains("dark")) {
        toggleBtn.click();
    }

    const arr = message.split(" ");
    let keyword = arr.shift();
    let result = arr.join(" ");

    //add
    if (keyword === "add") {
        renderTodo(result);
    }
    //edit
    if (keyword === "edit") {
        
    }
    //delete
    if (keyword === "delete") {
        
    }
    //complete
    if (keyword === "complete") {
        
    }
}



toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	todoItem.classList.toggle("dark");
	todoInput.classList.toggle("dark");
});

// create elements
function createElementWithClass(type, className) {
    const element = document.createElement(type);
    element.classList.add(className);
    return element;
}

function createTextElementWithClass(type, className, text) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.textContent = text;
    return element;
}

function createElementWithAttribute(type, className, attr, attrName) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.setAttribute(attr, attrName);
    return element;
}

function createElementWithThreeAttributes(type, className, attr1, attrName1, attr2, attrName2, id, idName) {
	const element = document.createElement(type);
	element.classList.add(className);
    element.setAttribute(attr1, attrName1);
    element.setAttribute(attr2, attrName2);
    element.setAttribute(id, idName);
	return element;
}

function renderTodo(input) {
	const todosContainer = document.querySelector(".todos__list");
	const todosItem = createElementWithClass("div", "todos__item");
	const todosInfo = createElementWithClass("div", "todos__info");
	// const priority = createElementWithClass("span", "todos__priority");
	const p = createTextElementWithClass("p", "todos__text", input);
	// todosInfo.appendChild(priority);
	todosInfo.appendChild(p);
	todosItem.appendChild(todosInfo);
	const todosButtons = createElementWithClass("div", "todos__buttons");
    const editBtn = createElementWithClass("i", "fas");
    editBtn.classList.add("fa-edit");
    editBtn.classList.add("todos__icons");
    const deleteBtn = createElementWithClass("i", "fas");
    deleteBtn.classList.add("fa-trash-alt");
    deleteBtn.classList.add("todos__icons");
    todosButtons.appendChild(editBtn);
    todosButtons.appendChild(deleteBtn);
    todosItem.appendChild(todosButtons);
    todosContainer.appendChild(todosItem);
    return todosContainer;
}


//get all todo elements
function setDarkModeToAllTodos(status) {
    const allTodos = document.querySelectorAll(".todos__item");
    if (status === "remove") {
        allTodos.forEach(item => {
            item.classList.remove("dark");
        });
    }
    else if (status === "add") {
        allTodos.forEach(item => {
            item.classList.add("dark");
        });
    }
}
// render elements
// function renderHeader() {
//     const header = createElementWithClass("header", "header");
//     const nav = createElementWithClass("nav", "header__container");
//     const h1 = createTextElementWithClass("h1", "header__brand", "Talk2Do");
//     const div = createElementWithClass("div", "header__toggle");
//     const input = createElementWithThreeAttributes("input", "header__checkbox", "type", "checkbox", "id", "text");
//     const label = createElementWithAttribute("label", "header__label", "for", "checkbox");
//     const moonIcon = createElementWithClass("i", "fas fa-moon");
//     const adjustIcon = createElementWithClass("i", "fas fa-adjust");
//     const ball = createElementWithClass("div", "header__ball");
//     label.append(moonIcon, adjustIcon, ball);
//     div.append(input, label);
//     nav.append(h1, div);
//     header.append(nav);
//     return header;
// }

// function renderContainer() {
    
// }



// checkbox.addEventListener("click", () => {
// 	//change theme of website
// 	document.body.classList.toggle("dark");
// 	toggleBtn.classList.toggle("dark");
// 	todoItem.classList.toggle("dark");
// 	todoInput.classList.toggle("dark");
// });