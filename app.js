const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz {
    constructor(type, questions, results) {
        this.type = type;
        this.questions = questions;
        this.results = results;
        this.score = 0;
        this.result = 0;
        this.current = 0;
    }

    Click(index) {
        if (this.current >= this.questions.length) return -1;

        const question = this.questions[this.current];
        const value = question.Click(index);
        this.score += value;

        let correct = -1;

        if (value >= 1) {
            correct = index;
        } else {
            for (let i = 0; i < question.answers.length; i++) {
                if (question.answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();
        return correct;
    }

    Next() {
        this.current++;
    }

    End() {
        let bestResultIndex = 0;
        this.results.forEach((result, index) => {
            if (result.Check(this.score) && result.value > this.results[bestResultIndex].value) {
                bestResultIndex = index;
            }
        });
        this.result = bestResultIndex;
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index]?.value || 0;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    Check(value) {
        return this.value <= value;
    }
}

const results = [
    new Result("Иди смотри гонки", 0),
    new Result("Кто-то посмотрел пару этапов и начал считать себя знатоком?)))", 3),
    new Result("Продолжай смотреть гонки", 6),
    new Result("Вы в совершенстве знаете тему!", 9)
];

const questions = [
    new Question("Сколько в среднем пилот теряет в весе во время Гран-при?", [
        new Answer("500 граммов", 0),
        new Answer("5 килограммов", 0),
        new Answer("2 килограмма", 1),
        new Answer("нисколько не теряет", 0)
    ]),
    new Question("Какая средняя температура в кабине пилота?", [
        new Answer("5°C", 0),
        new Answer("30°C", 0),
        new Answer("50°C", 1),
        new Answer("70°C", 0)
    ]),
    new Question("Формулу-1 считают мужским спортом, но сколько женщин приняли участие в гонках за всю историю?", [
        new Answer("2 женщины", 0),
        new Answer("5 женщин", 1),
        new Answer("51 женщина", 0),
        new Answer("больше 100 женщин", 0)
    ]),
    new Question("Для заправки болидов используют вертолетное оборудование. А какая скорость заправки?", [
        new Answer("12 литров в секунду", 1),
        new Answer("20 литров в секунду", 0),
        new Answer("15 литров в секунду", 0),
        new Answer("10 литров в секунду", 0)
    ]),
    new Question("Кто из чемпионов Формулы-1 учился гонять на Ладе?", [
        new Answer("Нико Росберг", 0),
        new Answer("Кими Райкконен", 1),
        new Answer("Марк Уэббер", 0),
        new Answer("Себастьян Феттель", 0)
    ]),
    new Question("Где находится самая быстрая из всех городских трасс Формулы-1?", [
        new Answer("Монако", 0),
        new Answer("Барселона", 0),
        new Answer("Баку", 1),
        new Answer("Сингапур", 0)
    ]),
    new Question("Гонщики Формулы-1 – суеверные люди. Под каким номером они не будут выступать?", [
        new Answer("666", 0),
        new Answer("13", 1),
        new Answer("0", 0),
        new Answer("3", 0)
    ]),
    new Question("Суеверны не только гонщики: механики считают, что во время двухчасовой гонки ни в коем случае нельзя:", [
        new Answer("мыть руки", 1),
        new Answer("шутить", 0),
        new Answer("обходить болид спереди", 0),
        new Answer("носить часы на левой руке", 0)
    ]),
    new Question("Сколько было этапов в самом длинном чемпионате Формулы 1?", [
        new Answer("20", 0),
        new Answer("24", 1),
        new Answer("23", 0),
        new Answer("34", 0)
    ]),
    new Question("Кто станет напарником Макса Ферстаппена в 2026?", [
        new Answer("Даниэль Риккьярдо", 0),
        new Answer("Юки Цунода", 0),
        new Answer("Клон Макса", 1),
        new Answer("Лиам Лоусон", 0)
    ])
];

const quiz = new Quiz(1, questions, results);

function Update() {
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;
        buttonsElem.innerHTML = "";
        
        quiz.questions[quiz.current].answers.forEach((answer, index) => {
            const btn = document.createElement("button");
            btn.className = "button";
            btn.textContent = answer.text;
            btn.dataset.index = index;
            buttonsElem.appendChild(btn);
        });
        
        pagesElem.textContent = `${quiz.current + 1} / ${quiz.questions.length}`;
        Init();
    } else {
        quiz.End();
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.textContent = `Очки: ${quiz.score}`;
    }
}

function Init() {
    document.querySelectorAll('.button').forEach(btn => {
        btn.addEventListener('click', () => {
            Click(parseInt(btn.dataset.index));
        });
    });
}

function Click(index) {
    const correct = quiz.Click(index);
    const btns = document.querySelectorAll('.button');
    
    btns.forEach(btn => {
        btn.className = "button button_passive";
    });

    if (quiz.type === 1) {
        if (correct >= 0 && correct < btns.length) {
            btns[correct].className = "button button_correct";
        }
        if (index >= 0 && index < btns.length && index !== correct) {
            btns[index].className = "button button_wrong";
        }
    } else if (index >= 0 && index < btns.length) {
        btns[index].className = "button button_correct";
    }

    setTimeout(Update, 1000);
}

Update();
