const counterOutputLabelNode = document.querySelector('[data-output = "counterOutputLabel"]'); // получил объект надписи для вывода результата
const counterPlusButtonsNode = document.querySelectorAll('[data-pools]'); // получил коллекцию кнопок добавления бассейнов
const counterResetButtonNode = document.querySelector('#resetButton');
const poolProgressBarNode = document.querySelector('#poolProgressBar');
const COUNTER_DEFAULT_VALUE = 0;
// заданы начальные значения для счетчика и надписи
// counterOutputLabelNode.innerHTML = COUNTER_DEFAULT_VALUE; //задали надписи изначальное значение
let counter = COUNTER_DEFAULT_VALUE;

//к каждому элементу в коллекции привязал функцию addPools, которая будет срабатывать по клику
counterPlusButtonsNode.forEach(function (Element) {
	Element.addEventListener('click', addPools);
});
//привязал к кнопке функцию обновления счетчинка
counterResetButtonNode.addEventListener('click', resetCounter)
// функция для добавления бассейнов

function addPools() {
	pools_value = parseInt(this.dataset.pools); // достаю значение из объекта, к которому привязан Listener значение атрибута data-pools
	counter = counter + pools_value;
	counterOutputLabelNode.innerHTML = counter;
	if (counterOutputLabelNode.innerHTML > COUNTER_DEFAULT_VALUE) {
		counterResetButtonNode.classList.remove('hideButton');	
	} 
	if (counter < 100) {
		poolProgressBarNode.style.width = counter + '%';
	} else if (counter >= 100) {
		poolProgressBarNode.style.width = '100%';
	}
}
// функция для обновления счетчика
function resetCounter() {
	counter = COUNTER_DEFAULT_VALUE;
	counterOutputLabelNode.innerHTML = COUNTER_DEFAULT_VALUE;
	counterResetButtonNode.classList.add('hideButton');
	poolProgressBarNode.style.width = '0%';
}