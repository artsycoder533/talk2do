const checkbox = document.getElementById("checkbox");
const toggleBtn = document.querySelector(".talk");
const todoItem = document.querySelector(".todos__item");
const todoInput = document.querySelector(".todos__input");
const containter = document.querySelector(".todos__container");
const modal = document.querySelector(".modal"); 
const talkBtn = document.querySelector(".talk");


window.addEventListener("onload", initUI);

function initUI() {
    
}

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



checkbox.addEventListener("click", () => {
	//change theme of website
	document.body.classList.toggle("dark");
    toggleBtn.classList.toggle("dark");
    todoItem.classList.toggle("dark");
    todoInput.classList.toggle("dark");
});

