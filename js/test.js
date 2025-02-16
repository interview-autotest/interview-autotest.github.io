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
    const questions = []; // Массив для хранения объектов вопрос и его подзаголовков
    let currentQuestion = null;
    let title = "";

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('#')) {
            let firstSpaceIndex = line.indexOf(' ');
            if (firstSpaceIndex == 1) {
                // Основной заголовок
                if (currentQuestion) {
                    questions.push(currentQuestion); // Добавляем предыдущий вопрос в массив
                }
                currentQuestion = {
                    title: line.substring(firstSpaceIndex).trim(),
                    subTitle: null,
                    answers: [],
                };
            } else {
                // Подзаголовок
                if (currentQuestion) {
                    currentQuestion.subTitle = line.substring(firstSpaceIndex).trim();
                }
            }
        } else if (currentQuestion) {
            // Добавление ответа
            currentQuestion.answers.push(line.substring(3).trim());
        }
    }

    if (currentQuestion) {
        questions.push(currentQuestion); // Добавляем последний вопрос в массив
    }

    return questions;
}

function generateHTML(questions) {
    let html = '<form action="result.html" id="questions" class="container mt-3">';
    
    questions.forEach((question, qIndex) => {
        let titleIndex = qIndex + 1;
        let subTitleIndex = question.subTitle ? 1 : 0;

        html += `<div id="q${titleIndex}${subTitleIndex}" class="collapse show" data-bs-parent="#questions">\n`;
        html += `<h2>${titleIndex}. ${question.title}</h2>\n`;
        if (question.subTitle) {
            html += `<h3>${titleIndex}.${subTitleIndex}. ${question.subTitle}</h3>\n`;
        }

        // Добавление дефолтного ответа
        html += `<div class="form-check">\n`;
        html += `<input type="radio" class="form-check-input" id="radio${titleIndex}${subTitleIndex}0" name="t${titleIndex}${subTitleIndex}" value="0" checked="checked">\n`;
        html += `<label class="form-check-label" for="radio${titleIndex}${subTitleIndex}0">0 — Не знаю</label>\n`;
        html += `</div>\n`;

        // Остальные ответы
        question.answers.forEach((answerText, aIndex) => {
            html += `<div class="form-check">\n`;
            html += `<input type="radio" class="form-check-input" id="radio${titleIndex}${subTitleIndex}${aIndex + 1}" name="t${titleIndex}${subTitleIndex}" value="${aIndex + 1}">\n`;
            html += `<label class="form-check-label" for="radio${titleIndex}${subTitleIndex}${aIndex + 1}">${aIndex + 1} — ${answerText}</label>\n`;
            html += `</div>\n`;
        });

        html += `</div>\n`;
    });

    // Добавление кнопок
    html += `<button type="submit" class="btn btn-primary mt-3" disabled>\n`;
    html += `<a class="btn" href="#">Назад</a></button>\n`;
    html += `<button type="submit" class="btn btn-primary mt-3">\n`;
    html += `<a class="btn" data-bs-toggle="collapse" href="#q${questions.length}">Далее</a></button>\n`;
    html += `</form>\n`;

    return html;
}

// function generateHTML(input) {
//     const lines = input.split('\n');
//     let html = '<form action="result.html" id="questions" class="container mt-3">';
//     let titleIndex = 0;
//     let title = "";
//     let subTitleIndex = 0;
//     let subTitle = "";
//     let answerIndex = 0;
//     let answerText = "";

//     for (let line of lines) {
//         line = line.trim();
//         if (line.startsWith('#')) {
//             let firstSpaceIndex = line.indexOf(' ');
//             if (firstSpaceIndex == 1) {
//                 // Основной заголовок
//                 title = line.substring(firstSpaceIndex);
//                 titleIndex++;
//                 subTitleIndex = 0;
//             } else {
//                 // Подзаголовок
//                 subTitle = line.substring(firstSpaceIndex);
//                 subTitleIndex++;
//             }
//             answerIndex = 0; // Сброс индекса ответов
//         } else {
//             // Добавляем дефолтный ответ в начало
//             if (answerIndex == 0) {
//                 html += `<div id="q${titleIndex}${subTitleIndex}" class="collapse show" data-bs-parent="#questions">\n`;
//                 html += `<h2>${titleIndex}. ${title}</h2>\n`;
//                 if (subTitleIndex > 0) {
//                     html += `<h3>${titleIndex}.${subTitleIndex}. ${subTitle}</h3>\n`;
//                 }
//                 answerText = "Не знаю";
//                 html += `<div class="form-check">\n`;
//                 html += `<input type="radio" class="form-check-input" id="radio${titleIndex}${subTitleIndex}${answerIndex}" name="t${titleIndex}${subTitleIndex}" value="${answerIndex}" checked="checked">\n`;
//                 html += `<label class="form-check-label" for="radio${titleIndex}${subTitleIndex}${answerIndex}">${answerIndex} — ${answerText}</label>\n`;
//                 html += `</div>\n`;
//                 answerIndex++;
//             }
//             // Остальные ответы
//             answerText = line.substring(3);
//             html += `<div class="form-check">\n`;
//             html += `<input type="radio" class="form-check-input" id="radio${titleIndex}${subTitleIndex}${answerIndex}" name="t${titleIndex}${subTitleIndex}" value="${answerIndex}">\n`;
//             html += `<label class="form-check-label" for="radio${titleIndex}${subTitleIndex}${answerIndex}">${answerIndex} — ${answerText}</label>\n`;
//             html += `</div>\n`;
//             answerIndex++;
//         }
//     }

//     // Добавление кнопок
//     html += `<button type="submit" class="btn btn-primary mt-3" disabled>\n`;
//     html += `<a class="btn" href="#">Назад</a></button>\n`;
//     html += `<button type="submit" class="btn btn-primary mt-3">\n`;
//     html += `<a class="btn" data-bs-toggle="collapse" href="#q${titleIndex}">Далее</a></button>\n`;
//     html += `</div>\n`;
//     html += `</form>\n`;

//     return html;
// }