const params = new URLSearchParams(document.location.search);
const t1 = params.get("t1");
const t2 = params.get("t2");

const r110class = (t1 == "") ? " bg-secondary text-light" : " bg-secondary bg-opacity-25"
const r111class = (t1 == "1") ? " bg-danger text-light" : " bg-danger bg-opacity-25"
const r112class = (t1 == "2") ? " bg-warning" : " bg-warning bg-opacity-25"
const r113class = (t1 == "2" || t1 == "3") ? " bg-success text-light" : " bg-success bg-opacity-25"
const r114class = (t1 == "2" || t1 == "3") ? " bg-primary text-light" : " bg-primary bg-opacity-25"

const r120class = (t2 == "") ? " bg-secondary text-light" : " bg-secondary bg-opacity-25"
const r121class = (t2 == "1") ? " bg-danger text-light" : " bg-danger bg-opacity-25"
const r122class = (t2 == "2") ? " bg-warning" : " bg-warning bg-opacity-25"
const r123class = (t2 == "2") ? " bg-success text-light" : " bg-success bg-opacity-25"
const r124class = (t2 == "2") ? " bg-primary text-light" : " bg-primary bg-opacity-25"

const r110text = (t1 == "") ? "Trainee" : ""
const r111text = (t1 == "1") ? "Junior" : ""
const r112text = (t1 == "2") ? "Middle" : ""
const r113text = (t1 == "2" || t1 == "3") ? "Senior" : ""
const r114text = (t1 == "2" || t1 == "3") ? "Master" : ""

const r120text = (t2 == "") ? "Trainee" : ""
const r121text = (t2 == "1") ? "Junior" : ""
const r122text = (t2 == "2") ? "Middle" : ""
const r123text = (t2 == "2") ? "Senior" : ""
const r124text = (t2 == "2") ? "Master" : ""

var container = document.getElementById('result');
container.innerHTML = `
<div class="row">
    <h1>Результаты теста</h1>

    <h2>1.Computer Science</h2>
    <div class="row">
        <div id="r10" class="col col-m"></div>
        <div id="r11" class="col col-m"></div>
        <div id="r12" class="col col-m"></div>
        <div id="r13" class="col col-m"></div>
        <div id="r14" class="col col-m"></div>
    </div>

    <h3>1.1.Алгоритмы и структуры данных</h3>
    <div class="row">
        <div id="r110" class="col col-m-1${r110class}">${r110text}</div>
        <div id="r111" class="col col-m-1${r111class}">${r111text}</div>
        <div id="r112" class="col col-m-1${r112class}">${r112text}</div>
        <div id="r113" class="col col-m-1${r113class}">${r113text}</div>
        <div id="r114" class="col col-m-1${r114class}">${r114text}</div>
    </div>

    <h3>1.2.ООП</h3>
    <div class="row">
        <div id="r120" class="col col-m-1${r120class}">${r120text}</div>
        <div id="r121" class="col col-m-1${r121class}">${r121text}</div>
        <div id="r122" class="col col-m-1${r122class}">${r122text}</div>
        <div id="r123" class="col col-m-1${r123class}">${r123text}</div>
        <div id="r124" class="col col-m-1${r124class}">${r124text}</div>
    </div>
</div>
`

