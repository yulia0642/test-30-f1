const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Иди смотри гонки", 0),
	new Result("Кто-то посмотрел пару этапов <br> и начал считать себя знатоком?)))", 3),
	new Result("Продолжпй смотреть гонки", 6),
	new Result("Вы в совершенстве знаете тему!", 9)
];







//Массив с вопросами
const questions = 
[
	new Question("Сколько в среднем пилот теряет в весе во время Гран-при?", 
	[
		new Answer("500 граммов", 0),
		new Answer("5 килограммов", 0),
		new Answer("2 килограмма", 1),
		new Answer("нисколько не теряет", 0)
	]),

	new Question("Какая средняя температура в кабине пилота?", 
	[
		new Answer("5°C", 0),
		new Answer("30°C", 0),
		new Answer("50°C", 1),
		new Answer("70°C", 0)
	]),

	new Question("Формулу-1 считают мужским спортом, <br> но сколько женщин приняли участие в гонках за всю историю?", 
	[
		new Answer("2 женщины", 0),
		new Answer("5 женщин", 1),
		new Answer("51 женщина", 0),
		new Answer("больше 100 женщин", 0)
	]),

	new Question("Для заправки болидов используют вертолетное оборудование. <br> А какая скорость заправки?", 
	[
		new Answer("12 литров в секунду", 1),
		new Answer("20 литров в секунду", 0),
		new Answer("15 литров в секунду", 0),
		new Answer("10 литров в секунду", 0)
	]),

	new Question("Кто из чемпионов Формулы-1 учился гонять на Ладе?", 
	[
		new Answer("Нико Росберг", 0),
		new Answer("Кими Райкконен", 1),
		new Answer("Марк Уэббер", 0),
		new Answer("Себастьян Феттель", 0)
	]),

	new Question("Где находится самая быстрая из всех городских трасс Формулы-1?",  
	[
		new Answer("Монако", 0),
		new Answer("Барселона", 0),
		new Answer("Баку", 1),
		new Answer("Сингапур", 0)
  ]),

      
      
      
      
      
      
	new Question("Гонщики Формулы-1 – суеверные люди. Под каким номером они не будут выступать?", 
	[
		new Answer("666", 0),
		new Answer("13", 1),
		new Answer("0", 0),
		new Answer("3", 0)
	]),

	new Question("Суеверны не только гонщики: механики считают, что во время двухчасовой гонки ни в коем случае нельзя:", 
	[
		new Answer("мыть руки", 1),
		new Answer("шутить", 0),
		new Answer("обходить болид спереди", 0),
		new Answer("носить часы на левой руке", 0)
	]),

	new Question("Сколько было этапов <br> в самом длинном чемпионате Формулы 1?", 
	[
		new Answer("20", 0),
		new Answer("24", 1),
		new Answer("23", 0),
		new Answer("34", 0)
	]),

	new Question("Кто станет напарником Макса Ферстаппена в 2026?",  
	[
		new Answer("Даниэль Риккьярдо", 0),
		new Answer("Юки Цунода", 0),
		new Answer("Клон Макса", 1),
		new Answer("Лиам Лоусон", 0)
	])
]; 
      
      
      
      
      
      
      
      
      
      
      
//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
} 
