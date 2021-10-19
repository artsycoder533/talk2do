const toggleBtn = document.getElementById("checkbox");
const checker = document.querySelector(".todos__input");
// const todoItem = document.querySelector(".todos__item");
const todoInput = document.querySelector(".todos__input");
// const containter = document.querySelector(".todos__container");

const talkBtn = document.getElementById("mainMic");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


// page load
window.addEventListener("load", () => {
    //add constraints object
    const constraints = { audio: true, video: false };
    //call get user media
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream){
        //checker.value = "you let me use your mic!";
    }).catch(function (err) {
        //checker.value = "mic access denied";
    })
});


//mic
talkBtn.addEventListener("click", () => {
    const recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        console.log(text);
        //checker.value = text;
        searchForKeyword(text);
    }

});

function searchForKeyword(message) {
    //check if entire message is dark mode on
   // checker.value = message;
    if (message === "dark mode on" && !document.body.classList.contains("dark")) {
        //checker.value = "dark mode enabled";
        toggleBtn.click();
        setDarkModeToAllTodos("add");
    }

    else if (message === "dark mode off" && document.body.classList.contains("dark")) {
        //checker.value = "dark mode disabled";
        toggleBtn.click();
        setDarkModeToAllTodos("remove");
    }

    else if (message === "complete all") {
        completeAllTodo();
    }

    else if (message === "undo all") {
        undoAllTodos();
    }

    else if (message === "delete all") {
        deleteAllTodos();
    }

    const arr = message.split(" ");
    let keyword = arr.shift();
    let result = arr.join(" ");

    //add
    if (keyword === "add") {
       // checker.value = result;
        renderTodo(result);
        //checker.value = "item successfully added!";
    }
    //edit
    if (keyword === "edit") {
        editTodo(result);
    }

    if (keyword === "undo") {
        undoCompletion(result);
    }

    //delete
    if (keyword === "delete") {
        deleteTodo(result);
    }

    //complete
    if (keyword === "complete") {
        completeTodo(result);
    }
}

function completeAllTodo() {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        element.children[0].classList.add("complete");
        element.previousElementSibling.checked = true;
    });
}

function completeTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            element.children[0].classList.add("complete");
            element.previousElementSibling.checked = true;
        }
    });
}

function deleteTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            element.parentElement.remove();
        }
    });
}

function deleteAllTodos() {
    const modal = document.querySelector(".modal");
    
    const parent = document.querySelector(".todos__list");
    let children = Array.from(parent.children);
    children.forEach(child => {
        parent.removeChild(child);
    });
}

function editTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            //speech synthesis
            let words = getReplacementText(text);
            console.log(words);
            element.children[0].textContent = words;
        }
    });
}

function getReplacementText(message) {
    const speech = new SpeechSynthesisUtterance();
    const modal = document.querySelector(".modal");
    
    speech.text = `What would you like to replace ${message} with?`;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 0.5;
    window.speechSynthesis.speak(speech);
    modal.classList.add("show");
    const modalMic = document.getElementById("secondaryMic");
    modalMic.addEventListener("click", getEditText);
}

function getEditText() {
    const recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        //console.log(text);
        modal.classList.remove("show");
        return text;
    }
}

function undoCompletion(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text && element.children[0].classList.contains("complete")) {
            element.children[0].classList.remove("complete");
            element.previousElementSibling.checked = false;
        }
    });
}

function undoAllTodos() {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].classList.contains("complete")) {
            element.children[0].classList.remove("complete");
            element.previousElementSibling.checked = false;
        }
    });
}

toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	// todoItem.classList.toggle("dark");
    //todoInput.classList.toggle("dark");
    const allTodos = document.querySelectorAll(".todos__item");
    allTodos.forEach(item => {
        item.classList.toggle("dark");
    })
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
    //checker.value = input;
    const todosContainer = document.querySelector(".todos__list");
    const todosItem = createElementWithClass("div", "todos__item");
    //check for dark mode
    if (document.body.classList.contains("dark")) {
        todosItem.classList.add("dark");
    }
    const checkbox = createElementWithThreeAttributes("input", "todos__checkbox", "type", "checkbox", "name", "checkbox", "id", "checkbox");
    todosItem.appendChild(checkbox);
	const todosInfo = createElementWithClass("div", "todos__info");
	// const priority = createElementWithClass("span", "todos__priority");
	const p = createTextElementWithClass("p", "todos__text", input);
	// todosInfo.appendChild(priority);
	todosInfo.appendChild(p);
	todosItem.appendChild(todosInfo);
	// const todosButtons = createElementWithClass("div", "todos__buttons");
    // const editBtn = createElementWithClass("i", "fas");
    // editBtn.classList.add("fa-edit");
    // editBtn.classList.add("todos__icons");
    // const deleteBtn = createElementWithClass("i", "fas");
    // deleteBtn.classList.add("fa-trash-alt");
    // deleteBtn.classList.add("todos__icons");
    // todosButtons.appendChild(editBtn);
    // todosButtons.appendChild(deleteBtn);
    // todosItem.appendChild(todosButtons);
    todosContainer.appendChild(todosItem);
    return todosContainer;
}


//get all todo elements
function setDarkModeToAllTodos(status) {
    //checker.value = "inside setDarkModeToAllTodos";
    const allTodos = document.querySelectorAll(".todos__item");
    if (status === "remove") {
        allTodos.forEach(item => {
            item.classList.remove("dark");
            //checker.value = "dark mode successsfully disabled";
        });
    }
    else if (status === "add") {
        allTodos.forEach(item => {
            item.classList.add("dark");
            //checker.value = "dark mode successfully enabled";
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