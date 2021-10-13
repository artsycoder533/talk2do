const checkbox = document.getElementById("checkbox");
const toggleBtn = document.querySelector(".talk");

checkbox.addEventListener("click", () => {
	//change theme of website
	document.body.classList.toggle("dark");
	toggleBtn.classList.toggle("dark");
});