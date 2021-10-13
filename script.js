const checkbox = document.getElementById("checkbox");
const toggleBtn = document.querySelector(".talk");
const todoItem = document.querySelector(".todos__item");
const todoInput = document.querySelector(".todos__input");

checkbox.addEventListener("click", () => {
	//change theme of website
	document.body.classList.toggle("dark");
    toggleBtn.classList.toggle("dark");
    todoItem.classList.toggle("dark");
    todoInput.classList.toggle("dark");
});