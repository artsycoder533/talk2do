const toggleBtn = document.getElementById("checkbox");
const todoItem = document.querySelector(".todos__item");
const todoInput = document.querySelector(".todos__input");
const containter = document.querySelector(".todos__container");
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
        
    }
    else if (message === "dark mode off" && document.body.classList.contains("dark")) {
        toggleBtn.click();
    }
}

toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
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

function renderTodo() {
	const todosContainer = document.querySelector(".todos__list");
	const todosItem = document.querySelector("div", "todos__item");
	const todosInfo = createElementWithClass("div", "todos__info");
	const priority = createElementWithClass("span", "todos__priority");
	const p = createElementWithClass("p", "todos__text");
	todosInfo.appendChild(priority);
	todosInfo.appendChild(p);
	todosItem.appendChild(todosInfo);
	const todosButtons = createElementWithClass("div", "todos__buttons");
    const editBtn = createElementWithClass("i", "fas fa-edit");
    editBtn.classList.add("todos__icon");
    const deleteBtn = createElementWithClass("i", "fas fa-trash-alt");
    editBtn.classList.add("todos__icon");
    todosButtons.appendChild(editBtn);
    todosButtons.appendChild(deleteBtn);
    todosItem.appendChild(todosButtons);
    todosContainer.appendChild(todosItem);
    return todosContainer;
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