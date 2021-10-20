

const toggleBtn = document.getElementById("checkbox");
const checker = document.querySelector(".todos__input");
const todoInput = document.querySelector(".todos__input");
const talkBtn = document.getElementById("mainMic");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const instructionsMic = document.getElementById("instructions");

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
    getTodosFromLocalStorage();
});


//mic
talkBtn.addEventListener("click", () => {
    const recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        console.log(text);
        searchForKeyword(text);
    }
});

instructionsMic.addEventListener("click", () => {
    const instructions = document.querySelector(".instructions");
    const recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        console.log(text);
        if (text === "close instructions") {
            instructions.classList.add("hide");
        }

        else if (text === "dark mode on" && !document.body.classList.contains("dark")) {
            toggleBtn.click();
        }
            
        else if (text === "dark mode off" && document.body.classList.contains("dark")) {
            toggleBtn.click();
        }
    }
});

function searchForKeyword(message) {
    if (message === "dark mode on" && !document.body.classList.contains("dark")) {
        toggleBtn.click();
        setDarkModeToAllTodos("add");
    }

    else if (message === "dark mode off" && document.body.classList.contains("dark")) {
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

    else if (message === "show instructions") {
        const instructions = document.querySelector(".instructions");
        instructions.classList.remove("hide");
    }

    const arr = message.split(" ");
    let keyword = arr.shift();
    let result = arr.join(" ");

    //add
    if (keyword === "add") {
        addToLocalStorage(result);
        renderTodo(result);
    }

    //edit
    else if (keyword === "edit") {
        editTodo(result);
    }

    else if (keyword === "undo") {
        undoCompletion(result);
    }

    //delete
    else if (keyword === "delete") {
        deleteTodo(result);
    }

    //complete
    else if (keyword === "complete") {
        removeFromLocalStorage(result);
        addToLocalStorage(`${result}-complete`);
        completeTodo(result);
        
    }
}

function completeAllTodo() {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        element.children[0].classList.add("complete");
        element.previousElementSibling.classList.add("visible");
    });
}

function completeTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            element.children[0].classList.add("complete");
            element.previousElementSibling.classList.add("visible");
        }
    });
}

function deleteTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            element.parentElement.classList.add("remove");
            removeFromLocalStorage(element.children[0].textContent);
            setTimeout(() => {
                element.parentElement.remove();
            }, 1000);
        }
    });
}

function deleteAllTodos() {
    const parent = document.querySelector(".todos__list");
    let children = Array.from(parent.children);
    children.forEach(child => {
        console.log(child);
        child.classList.add("remove");
        setTimeout(() => {
            parent.removeChild(child);
        }, 1000);
    });
    localStorage.clear();
}

function editTodo(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text) {
            //speech synthesis
            const speech = new SpeechSynthesisUtterance();
            const modal = document.querySelector(".modal");
            speech.text = `What would you like to replace ${text} with?`;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 0.5;
            window.speechSynthesis.speak(speech);
            modal.classList.add("show");
            const modalMic = document.getElementById("secondaryMic");
            modalMic.addEventListener("click", () => {
                const recognition = new webkitSpeechRecognition();
                recognition.start();
                recognition.onresult = (e) => {
                    const message = e.results[0][0].transcript;
                    element.children[0].textContent = message;
                    modal.classList.remove("show");
                    return;
                }
            });
        }
    });
}



function undoCompletion(text) {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].textContent === text && element.children[0].classList.contains("complete")) {
            element.children[0].classList.remove("complete");
            element.previousElementSibling.classList.remove("visible");
        }
    });
}

function undoAllTodos() {
    const parent = document.querySelectorAll(".todos__info");
    parent.forEach(element => {
        if (element.children[0].classList.contains("complete")) {
            element.children[0].classList.remove("complete");
            element.previousElementSibling.classList.remove("completed");
        }
    });
}

toggleBtn.addEventListener("click", () => {
    addToLocalStorage("dark mode on");
    document.body.classList.toggle("dark");
    const instructions = document.querySelector(".instructions");
    instructions.classList.add("dark");
    const instructionsContainer = document.querySelector(".instructions__container");
    instructionsContainer.classList.toggle("dark");
    const toggleBackground = document.querySelector(".header__label");
    toggleBackground.classList.toggle("dark");
    const modal = document.querySelector(".modal");
    modal.classList.add("dark");
    const modalContainer = document.querySelector(".modal__container");
    modalContainer.classList.toggle("dark");
    const allTodos = document.querySelectorAll(".todos__item");
    allTodos.forEach(item => {
        item.classList.toggle("dark");
    });
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
    //check for dark mode
    if (document.body.classList.contains("dark")) {
        todosItem.classList.add("dark");
    }
    const check = createElementWithClass("i", "fas");
    check.classList.add("fa-check");
    todosItem.appendChild(check);
	const todosInfo = createElementWithClass("div", "todos__info");
	const p = createTextElementWithClass("p", "todos__text", input);
	todosInfo.appendChild(p);
	todosItem.appendChild(todosInfo);
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

//add to local storage
function addToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(item => {
        if (item === "dark mode on" && !document.body.classList.contains("dark")) {
            toggleBtn.click();
        }
        else if (item.includes("-complete")) {
            let sub = item.slice(0, item.indexOf("-"));
            renderTodo(sub);
            completeTodo(sub);
        }
        else {
            renderTodo(item);
        }
    });
}

function removeFromLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((element, index) => {
        console.log(element, todo);
        if (element === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}