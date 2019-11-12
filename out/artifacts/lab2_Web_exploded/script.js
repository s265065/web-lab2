const meows = [
    new Audio(jspContextPath +"/meows/meow.ogg"),
    new Audio(jspContextPath +"/meows/meow.mp3"),
    new Audio(jspContextPath +"/meows/meow (1).mp3"),
    new Audio(jspContextPath +"/meows/meow (2).mp3"),
    new Audio(jspContextPath +"/meows/meow (3).mp3"),
    new Audio(jspContextPath +"/meows/meow (4).mp3"),
    new Audio(jspContextPath +"/meows/meow (5).mp3"),
    new Audio(jspContextPath +"/meows/meow (6).mp3"),
    new Audio(jspContextPath +"/meows/meow (7).mp3"),
    new Audio(jspContextPath +"/meows/meow (8).mp3"),
    new Audio(jspContextPath +"/meows/meow (9).mp3"),
    new Audio(jspContextPath +"/meows/meow (10).mp3"),
    new Audio(jspContextPath +"/meows/meow (11).mp3"),
    new Audio(jspContextPath +"/meows/meow (12).mp3"),
    new Audio(jspContextPath +"/meows/meow (13).mp3"),
    new Audio(jspContextPath +"/meows/meow (14).mp3"),
    new Audio(jspContextPath +"/meows/meow (15).mp3"),
    new Audio(jspContextPath +"/meows/meow (16).mp3"),
    new Audio(jspContextPath +"/meows/meow (17).mp3"),
    new Audio(jspContextPath +"/meows/meow (18).mp3"),
    new Audio(jspContextPath +"/meows/meow (19).mp3"),
    new Audio(jspContextPath +"/meows/meow (20).mp3"),
    new Audio(jspContextPath +"/meows/meow (21).mp3"),
    new Audio(jspContextPath +"/meows/meow (22).mp3"),
    new Audio(jspContextPath +"/meows/meow (23).mp3"),
    new Audio(jspContextPath +"/meows/meow (24).mp3"),
    new Audio(jspContextPath +"/meows/meow (25).mp3"),
    new Audio(jspContextPath +"/meows/meow (26).mp3"),
    new Audio(jspContextPath +"/meows/meow (27).mp3"),
    new Audio(jspContextPath +"/meows/meow (1).wav"),
    new Audio(jspContextPath +"/meows/meow (2).wav"),
    new Audio(jspContextPath +"/meows/meow (3).wav"),
    new Audio(jspContextPath +"/meows/meow (4).wav"),
    new Audio(jspContextPath +"/meows/meow (5).wav"),
    new Audio(jspContextPath +"/meows/meow (6).wav"),
    new Audio(jspContextPath +"/meows/meow (7).wav")];

const error = new Audio(jspContextPath+ "/error/error.mp3");

const MIN_Y = -5;
const MAX_Y = 5;
const AVALIBALE_X = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];
const AVALIBALE_R = ["1", "2", "3", "4", "5"];

//https://docs.google.com/spreadsheets/d/1hGx52Q6omjFo7D_0L_FXXhb5FyVR2I6m2bmbOKYdEVA/edit#gid=719057914&range=Q5

const headerImage = document.getElementById('header_image');
const errorMessage = document.getElementById('errors');
const submitButton = document.getElementById('submit');
const xCheckBoxes = document.querySelectorAll('input[name="x"]');
const rInput = document.getElementById('r');
const yText = document.getElementById('y');
const catAdv = document.getElementById('fix');
const styles = document.getElementById('styles');

window.addEventListener('message', handlerMessage);
submitButton.addEventListener("click", onSubmit);

// const pervertImage = new Image();
// pervertImage.src = jspContextPath +'/error/pervert.jpg';

function pszh() {
    alert("что-то пошло не так? есть решение");
    window.open("http://neerc.ifmo.ru/lgd.pdf", "psz");
}

function asyncRequest(url, method = 'POST') {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    return xhr;
}

function postParams(params) {
    const p = [];

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            p.push(`${encodeURI(key)}=${encodeURI(params[key])}`);
        }
    }

    return p.join('&');
}

const startHooker = (() => {
    let started = false;
    let previous = false;

    const hooker = () => {
        const req = asyncRequest(`${jspContextPath}/controller`);
        req.responseType = 'json';

        req.onload = () => {
            if (typeof req.response === 'boolean') {
                if (req.response !== previous) {
                    if (req.response === true) {
                        errorPlay();
                    } else if (req.response === false) {
                        fixAll();
                    }
                }

                previous = req.response;
            }
        };

        req.send(postParams({'isFallen': true}));
        setTimeout(hooker, 1000);
    };

    return () => {
        if (started) {
            return;
        }

        started = true;
        setTimeout(hooker, 1);
    };
})();

function errorPlay() {
    error.play();

    styles.href = `${jspContextPath}/stylesheets/error.css`;

    asyncRequest(`${jspContextPath}/controller`).send(postParams({'trolling': true}));
    startHooker();
}

function fixAll() {
    error.pause();
    error.currentTime = 0;

    styles.href = `${jspContextPath}/stylesheets/normal.css`;
}

function randomPlay() {
    meows[Math.floor(Math.random() * meows.length)].play();
}

function onSubmit(event) {
    randomPlay();

    if (!checkX() || !checkY() || !checkR()) {
        event.preventDefault();
        // return;
    }

    // setMessage(null);
}

function setMessage(text) {
    if (text != null) {
        headerImage.src = `${jspContextPath}/img/cat.jpg`;
    } else {
        headerImage.src = `${jspContextPath}/img/not-fallen.jpg`;
    }

    errorMessage.innerText = text;
}

function checkX() {
    let selected = null;

    for (let i = 0; i < xCheckBoxes.length; i++) {
        if (xCheckBoxes[i].checked) {
            if (selected) {
                setMessage("потому что ты можешь выбрать только один X");
                pszh();

                return false;
            }

            if (AVALIBALE_X.indexOf(xCheckBoxes[i].value) === -1)   {
                setMessage("потому что ты меня уронил :'(");
                errorPlay();

                return false;
            }

            selected = xCheckBoxes[i].value;
        }
    }

    if (!selected) {
        setMessage("потому что ты забыл выбрать X");
        pszh();

        return false;
    }

    return true;
}

function checkY() {
    const y = (yText.value = yText.value.trim()).replace(',', '.');

    if (y.length === 0) {
        setMessage("из-за того что ты не выбрал Y");
        pszh();

        return false;
    }

    if (isNaN(+y)) {
        setMessage("потому Y должен быть числом");
        pszh();

        return false;
    }

    let val = +y;
    if (val <= MIN_Y || val >= MAX_Y) {
        setMessage(`потому что Y может быть только из интервала (${MIN_Y}, ${MAX_Y})`);
        pszh();

        return false;
    }

    return true;
}

function checkR() {
    if (rInput.value === '') {
        setMessage("из-за того что ты не выбрал R");
        pszh();

        return false;
    }

    if (AVALIBALE_R.indexOf(rInput.value) === -1) {
        setMessage("потому что ты потрогал там, где не надо >:(");
        errorPlay();

        return false;
    }

    return true;
}

let redrawGraphView = () => graphView(null);

function handlerMessage(e) {
    if (e.data.hasOwnProperty('history')) {
        points = e.data.history;

        redrawGraphView();
        if (points.length === 0) {
            return;
        }
    }

    if (e.data.hasOwnProperty('height')) {
        const frame = document.getElementById('result_frame');
        const bounds = frame.getBoundingClientRect();

        frame.style.height = Math.max(bounds.bottom - bounds.top, e.data.height) + 'px';
    }

    if (e.data.hasOwnProperty('current')) {
        if (e.data.current === 1) {
            setMessage(null);
            return false;
        }

        setMessage("потому что точка не попала в область(");
    }
}

function graphView(r) {
    const canvas = document.getElementById("graph");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
//прямоугольник
    context.beginPath();
    context.rect(20, 250, 230, 230);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

// сектор
    context.beginPath();
    context.moveTo(250, 250);
    context.arc(250, 250, 230, 0, Math.PI / 2);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

//треугольник
    context.beginPath();
    context.moveTo(250, 250);
    context.lineTo(250, 135);
    context.lineTo(480, 250);
    context.lineTo(250, 250);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

//отрисовка осей
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.beginPath();
    context.font = "14px Courier New";
    context.moveTo(250, 0);
    context.lineTo(250, 500);
    context.moveTo(250, 0);
    context.lineTo(245, 15);
    context.moveTo(250, 0);
    context.lineTo(255, 15);
    context.fillText("Y", 260, 10);
    context.moveTo(0, 250);
    context.lineTo(500, 250);
    context.moveTo(500, 250);
    context.lineTo(485, 245);
    context.moveTo(500, 250);
    context.lineTo(485, 255);
    context.fillText("X", 490, 235);

// деления
    const R = r == null ? "R" : r;
    const halfR = r == null ? "R/2" : r / 2;

    context.moveTo(245, 20);
    context.lineTo(255, 20);
    context.fillText(R, 255, 25);
    context.moveTo(245, 135);
    context.lineTo(255, 135);
    context.fillText(halfR, 255, 140);
    context.moveTo(245, 365);
    context.lineTo(255, 365);
    context.fillText(`-${halfR}`, 255, 370);
    context.moveTo(245, 480);
    context.lineTo(255, 480);
    context.fillText(`-${R}`, 255, 485);
    context.moveTo(20, 245);
    context.lineTo(20, 255);
    context.fillText(`-${R}`, 15, 240);
    context.moveTo(135, 245);
    context.lineTo(135, 255);
    context.fillText(`-${halfR}`, 130, 240);
    context.moveTo(365, 245);
    context.lineTo(365, 255);
    context.fillText(halfR, 360, 240);
    context.moveTo(480, 245);
    context.lineTo(480, 255);
    context.fillText(R, 475, 240);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

    drawPoints(r, canvas, context);
    redrawGraphView = () => graphView(r);

    if (r != null) {
        canvas.onclick = (event) => {
            if (!checkR()) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const visualX = Math.floor(event.clientX - rect.left);
            const visualY = Math.floor(event.clientY - rect.top);

            const centerX = 250;
            const centerY = 250;
            const zoomX = 230 / r;
            const zoomY = 230 / r;

            sendForm({
                fromCanvas: true,
                x: (visualX - centerX) / zoomX,
                y: (centerY - visualY) / zoomY,
                r: r
            });

            randomPlay();
        };
    } else {
        canvas.onclick = () => {
            randomPlay();
            checkR();
        }
    }
}

function clickR(r) {
    randomPlay();
    graphView(r);

    // noinspection EqualityComparisonWithCoercionJS
    if (rInput.value == r) {
        rInput.value = '';
    } else {
        rInput.value = r;
    }
}

const correctPawImage = new Image();
correctPawImage.src = jspContextPath +'/img/correctPaw.png';
const wrongPawImage = new Image();
wrongPawImage.src = jspContextPath +'/img/wrongPaw.png';

let points = [];
function drawPoints(r, canvas, context) {
    const centerX = 250;
    const centerY = 250;

    if (r != null) {
        const zoomX = 230 / r;
        const zoomY = 230 / r;

        points.forEach((point) => {
            if (point.r !== r) {
                return;
            }

            const visualX = centerX + point.x * zoomX;
            const visualY = centerY - point.y * zoomY;
            if (point.result===true){
                context.drawImage(correctPawImage, visualX - 15, visualY - 15, 30, 30);
            }
            else context.drawImage(wrongPawImage, visualX - 15, visualY - 15, 30, 30);
        });
    } else {
        points.forEach((point) => {
            const zoomX = 230 / point.r;
            const zoomY = 230 / point.r;

            const visualX = centerX + point.x * zoomX;
            const visualY = centerY - point.y * zoomY;
            if (point.result) {
                context.drawImage(correctPawImage, visualX - 15, visualY - 15, 30, 30);
            }
            else context.drawImage(wrongPawImage, visualX - 15, visualY - 15, 30, 30);
        });
    }
}

function sendForm(parameters) {
    const form = document.createElement("form");
    form.action = `${jspContextPath}/controller`;
    form.method = "POST";
    form.target = "result_frame";
    form.style.display = "hidden";

    for (let parameter in parameters) {
        if (!parameters.hasOwnProperty(parameter)) {
            continue;
        }

        const field = document.createElement("input");
        field.type = "hidden";
        field.name = parameter;
        field.value = parameters[parameter];

        form.appendChild(field);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => form.remove(), 1);
}

graphView(null);
