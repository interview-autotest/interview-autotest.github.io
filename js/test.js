function readFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://interview-autotest.github.io/tests/${file}`);
    xhr.onload = function () {
        var container = document.getElementById('test');
        container.innerHTML = generateHTML(parseInput(xhr.responseText));
    }
    xhr.send();
}

function parseInput(input) {
    const lines = input.split('\n');
    const questions = [];
    let current = null;
    let title = null;

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('#')) {
            let firstSpaceIndex = line.indexOf(' ');
            if (firstSpaceIndex == 1) {
                // Основной заголовок
                if (title) {
                    questions.push(current); // Добавляем предыдущий раздел в массив
                }
                title = line.substring(firstSpaceIndex).trim()
                current = {
                    title: title,
                    subtitle: "",
                    questions: [],
                };
            } else {
                // Подзаголовок
                if (title) {
                    if (current.questions.length > 0) {
                        questions.push(current); // Добавляем предыдущую тему в массив
                    }
                    current = {
                        title: title,
                        subtitle: line.substring(firstSpaceIndex).trim(),
                        questions: [],
                    };
                }
            }
        } else if (current) {
            // Добавление вопроса
            current.questions.push({
                text: line.substring(line.indexOf('.') + 1).trim(),
                value: line.substring(0, line.indexOf('.')).trim()
            });
        } else if (title) {
            // Добавление вопроса для раздела без подзаголовка
            current = {
                title: title,
                subtitle: "",
                questions: [],
            };
            current.questions.push({
                text: line.substring(line.indexOf('.') + 1).trim(),
                value: line.substring(0, line.indexOf('.')).trim()
            });
        }
    }

    // Добавляем последнюю тему с вопросами
    if (current) {
        questions.push(current);
    }

    return questions;
}

function generateHTML(questions) {
    let html = '<form action="result.html" id="questions" class="container mt-3">';

    questions.forEach((topicStructure, topicIndex) => {
        const topic = topicIndex + 1
        // Начало блока
        if (topic == 1) {
            html += `<div id="q${topic}" class="collapse show" data-bs-parent="#questions">\n`;
        } else {
            html += `<div id="q${topic}" class="collapse hide" data-bs-parent="#questions">\n`;
        }
        // Заголовки
        html += `<h2>${topicStructure.title}</h2>\n`;
        if (topicStructure.subtitle) {
            html += `<h3>${topicStructure.subtitle}</h3>\n`;
        }
        // Дефолтный ответ
        html += `<div class="form-check">\n`;
        html += `<input type="radio" class="form-check-input" id="radio${topic}0" name="t${topic}" value="0" checked="checked">\n`;
        html += `<label class="form-check-label" for="radio${topic}0">0 — Не знаю</label>\n`;
        html += `</div>\n`;
        // Остальные ответы
        topicStructure.questions.forEach((questionStructure, questionIndex) => {
            const text = questionStructure.text
            const value = questionStructure.value
            const question = questionIndex + 1
            html += `<div class="form-check">\n`;
            html += `<input type="radio" class="form-check-input" id="radio${topic}${question}" name="t${topic}" value="${value}">\n`;
            html += `<label class="form-check-label" for="radio${topic}${question}">${value} — ${text}</label>\n`;
            html += `</div>\n`;
        });
        // Кнопка назад
        if (topic == 1) {
            html += `<button type="submit" class="btn btn-primary mt-3" disabled>\n`;
            html += `<a class="btn" href="#">Назад</a></button>\n`;
        } else {
            html += `<button type="submit" class="btn btn-primary mt-3">\n`;
            html += `<a class="btn" data-bs-toggle="collapse" href="#q${topicIndex}">Назад</a></button>\n`;
        }
        // Кнопка вперёд/завершить
        html += `<button type="submit" class="btn btn-primary mt-3">\n`;
        if (topic == questions.length) {
            html += `<a class="btn">Завершить</a></button>\n`;
        } else {
            html += `<a class="btn" data-bs-toggle="collapse" href="#q${topic + 1}">Далее</a></button>\n`;
        }
        html += `</div>\n`;
    });
    html += `</form>\n`;
    return html;
}