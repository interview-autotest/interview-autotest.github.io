function readFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://interview-autotest.github.io/tests/${file}`);
    xhr.onload = function () {
        var el = document.getElementById('main');
        el.innerHTML = generateHTML(parseInput(xhr.responseText));
    }
    xhr.send();
}

function parseInput(input) {
    const lines = input.split('\n');
    const questions = []; // Массив для хранения разделов
    let currentTopic = null;
    let title = null;

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('#')) {
            let firstSpaceIndex = line.indexOf(' ');
            if (firstSpaceIndex == 1) {
                // Основной заголовок (раздел)
                if (title) {
                    questions.push(currentTopic); // Добавляем предыдущий раздел в массив
                }
                title = line.substring(firstSpaceIndex).trim()
                currentTopic = {
                    title: title,
                    subtitle: "",
                    questions: [],
                };
            } else {
                // Подзаголовок (тема)
                if (title) {
                    if (currentTopic.questions.length > 0) {
                        questions.push(currentTopic); // Добавляем предыдущий раздел в массив
                    }
                    currentTopic = {
                        title: title,
                        subtitle: line.substring(firstSpaceIndex).trim(),
                        questions: [],
                    };
                }
            }
        } else if (currentTopic) {
            // Добавление вопроса
            currentTopic.questions.push({
                text: line.substring(line.indexOf('.') + 1).trim(),
                value: line.substring(0, line.indexOf('.')).trim()
            });
        } else if (title) {
            currentTopic = {
                title: title,
                subtitle: "",
                questions: [],
            };
            // Добавление вопроса
            currentTopic.questions.push({
                text: line.substring(line.indexOf('.') + 1).trim(),
                value: line.substring(0, line.indexOf('.')).trim()
            });
        }
    }

    // Добавляем последний раздел и тему с вопросами
    if (currentTopic) {
        questions.push(currentTopic); // Добавляем последний раздел в массив
    }

    return questions;
}

function generateHTML(questions) {
    let html = '<form action="result.html" id="questions" class="container mt-3">';

    questions.forEach((topicStructure, topicIndex) => {
        const topic = topicIndex + 1
        if (topic == 1) {
            html += `<div id="q${topic}" class="collapse show" data-bs-parent="#questions">\n`;
        } else {
            html += `<div id="q${topic}" class="collapse hide" data-bs-parent="#questions">\n`;
        }
        html += `<h2>${topicStructure.title}</h2>\n`;
        if (topicStructure.subtitle) {
            html += `<h3>${topicStructure.subtitle}</h3>\n`;
        }

        // Добавление дефолтного ответа
        html += `<div class="form-check">\n`;
        html += `<input type="radio" class="form-check-input" id="radio${topic}0" name="t${topic}" value="0" checked="checked">\n`;
        html += `<label class="form-check-label" for="radio${topic}0">0 — Не знаю</label>\n`;
        html += `</div>\n`;
        topicStructure.questions.forEach((questionStructure, questionIndex) => {
            const text = questionStructure.text
            const value = questionStructure.value
            const question = questionIndex + 1
            html += `<div class="form-check">\n`;
            html += `<input type="radio" class="form-check-input" id="radio${topic}${question}" name="t${topic}" value="${value}">\n`;
            html += `<label class="form-check-label" for="radio${topic}${question}">${value} — ${text}</label>\n`;
            html += `</div>\n`;
        });

        // Добавление кнопки назад
        if (topic == 1) {
            html += `<button type="submit" class="btn btn-primary mt-3" disabled>\n`;
            html += `<a class="btn" href="#">Назад</a></button>\n`;
        } else {
            html += `<button type="submit" class="btn btn-primary mt-3">\n`;
            html += `<a class="btn" data-bs-toggle="collapse" href="#q${topicIndex}">Назад</a></button>\n`;
        }
        // Добавление кнопки вперёд
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