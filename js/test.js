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
    let currentSection = null;
    let currentTopic = null;

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('#')) {
            let firstSpaceIndex = line.indexOf(' ');
            if (firstSpaceIndex == 1) {
                // Основной заголовок (раздел)
                if (currentSection) {
                    if (currentTopic) {
                        currentSection.topics.push(currentTopic); // Добавляем последнюю тему в секции
                    }
                    questions.push(currentSection); // Добавляем предыдущий раздел в массив
                }
                currentSection = {
                    title: line.substring(firstSpaceIndex).trim(),
                    topics: [],
                };
                currentTopic = null; // Обнуляем текущую тему
            } else {
                // Подзаголовок (тема)
                if (currentSection) {
                    if (currentTopic) {
                        currentSection.topics.push(currentTopic); // Добавляем предыдущую тему
                    }
                    currentTopic = {
                        subTitle: line.substring(firstSpaceIndex).trim(),
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
        } else if (currentSection) {
            currentTopic = {
                subTitle: "",
                questions: [],
            };
            // Добавление вопроса
            currentTopic.questions.push({
                text: line.substring(line.indexOf('.') + 1).trim(),
                value: line.substring(0, line.indexOf('.')).trim()
            });
        }
    }

    // Добавляем последние раздел и тему с вопросами
    if (currentTopic) {
        if (currentSection) {
            currentSection.topics.push(currentTopic); // Добавляем последнюю тему в раздел
        }
    }
    if (currentSection) {
        questions.push(currentSection); // Добавляем последний раздел в массив
    }

    return questions;
}

function generateHTML(questions) {
    let html = '<form action="result.html" id="questions" class="container mt-3">';

    questions.forEach((sectionStructure, sectionIndex) => {
        const section = sectionIndex + 1

        sectionStructure.topics.forEach((topicStructure, topicIndex) => {
            const topic = topicIndex + 1
            html += `<div id="q${section}${topic}" class="collapse show" data-bs-parent="#questions">\n`;
            html += `<h2>${sectionStructure.title}</h2>\n`;
            if (topicStructure.subTitle) {
                html += `<h3>${topicStructure.subTitle}</h3>\n`;
            }

            // Добавление дефолтного ответа
            html += `<div class="form-check">\n`;
            html += `<input type="radio" class="form-check-input" id="radio${section}${topic}0" name="t${section}${topic}" value="0" checked="checked">\n`;
            html += `<label class="form-check-label" for="radio${section}${topic}0">0 — Не знаю</label>\n`;
            html += `</div>\n`;
            topicStructure.questions.forEach((questionStructure, questionIndex) => {
                const text = questionStructure.text
                const value = questionStructure.value
                const question = questionIndex + 1
                html += `<div class="form-check">\n`;
                html += `<input type="radio" class="form-check-input" id="radio${section}${topic}${question}" name="t${section}${topic}" value="${value}">\n`;
                html += `<label class="form-check-label" for="radio${section}${topic}${question}">${value} — ${text}</label>\n`;
                html += `</div>\n`;
            });
            html += `</div>\n`;
        });
    });

    // Добавление кнопок
    html += `<button type="submit" class="btn btn-primary mt-3" disabled>\n`;
    html += `<a class="btn" href="#">Назад</a></button>\n`;
    html += `<button type="submit" class="btn btn-primary mt-3">\n`;
    html += `<a class="btn" data-bs-toggle="collapse" href="#q${questions.length}">Далее</a></button>\n`;
    html += `</form>\n`;

    return html;
}