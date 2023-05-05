const counterOutputLabelNode = document.querySelector('[data-output = "counterOutputLabel"]'); // получил объект надписи для вывода результата
const counterPlusButtonsNode = document.querySelectorAll('[data-pools]'); // получил коллекцию кнопок добавления бассейнов
const counterResetButtonNode = document.querySelector('#resetButton');
const poolProgressBarNode = document.querySelector('#poolProgressBar');
const COUNTER_DEFAULT_VALUE = 0;
let FINISH_VALUE = getFinishValue();

// заданы начальные значения для счетчика и надписи
counterOutputLabelNode.innerHTML = `Проплыви ${FINISH_VALUE}, давай!`; //задали надписи изначальное значение (ВСТАВИЛ ТЕКСТ ЧЕРЕЗ JS)
let counter = COUNTER_DEFAULT_VALUE;

//к каждому элементу в коллекции привязал функцию addPools, которая будет срабатывать по клику
counterPlusButtonsNode.forEach(function (Element) {
	Element.addEventListener('click', addPools);
});

//привязал к кнопке функцию обновления счетчинка
counterResetButtonNode.addEventListener('click', resetCounter)

// ___________FUNCTIONS___________
//функиця для ввода целевого значения
function getFinishValue() {
	do {
		userFinishValue = prompt("Укажите цель тренировки (число)", 10);	
	  } while (isNaN(parseInt(userFinishValue)) || userFinishValue == null);
	  return parseInt(userFinishValue);
}
// функция для добавления бассейнов
function addPools() {
	if (counter <= FINISH_VALUE) {
		pools_value = parseInt(this.dataset.pools); // достаю значение из объекта, к которому привязан Listener значение атрибута data-pools
		counter = counter + pools_value;
		counterOutputLabelNode.innerHTML = counter;	
		if (counterOutputLabelNode.innerHTML > COUNTER_DEFAULT_VALUE) {
			counterResetButtonNode.classList.remove('hideButton');	
		} 
			// условие для ProgressBar
		poolProgressBarNode.style.width = Math.round(counter / FINISH_VALUE * 100) + '%';
		
		if (counter >= FINISH_VALUE) {
			//прогрессбар становится перманентно заполненным и надпись не меняется
			poolProgressBarNode.style.width = '100%';
			counterOutputLabelNode.innerHTML = "Все, ты молодец! Успокойся)";	
			//Кнокпи добавления становятся не активными
			counterPlusButtonsNode.forEach(function(Element) {
				Element.classList.add("counter__plus-button_not-active");
			});
			//Кнопка сброса начинает мигать
			counterResetButtonNode.classList.add('glowingButton');
		}
	}
	// при счетчике > 0 показыаем кнопку "Сбросить"
}
// функция для обновления счетчика
function resetCounter() {
	counter = COUNTER_DEFAULT_VALUE;
	counterResetButtonNode.classList.add('hideButton');
	poolProgressBarNode.style.width = '0%';

	//Запрашивается новое целевое значение и вставляется в надпись
	FINISH_VALUE = getFinishValue();
	counterOutputLabelNode.innerHTML = `Проплыви ${FINISH_VALUE}, давай!`;

	//Сброс стилей кнопок к начальному состоянию
	counterResetButtonNode.classList.remove('glowingButton');
	counterPlusButtonsNode.forEach(function(Element) {
		Element.classList.remove("counter__plus-button_not-active");
	});
}