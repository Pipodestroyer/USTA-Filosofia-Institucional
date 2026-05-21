const botones = document.getElementById('send');
const definput = document.getElementById('codigo');
const helper =  document.getElementById('despliegue');
const boxtosize = document.getElementById('helper-box');
const shadowoverlay = document.getElementById('shadow-overlay');
const docs = document.getElementById('buttons-helper');
const tipping = document.getElementById('buttons-helper-tip');
const tosizeup = document.getElementById('game');
const finishform = document.getElementById('send-prompt');
const nombrefinal = document.getElementById('default-input');
const enviarnombre = document.getElementById('sendname');
const wins = document.getElementById('nivelmax');


const tutorialSteps = [
    {
        elementId: 'gameinner', 
        text: 'Aquí verás la cita filosófica y el objetivo que tu código debe cumplir para continuar.'
    },
    {
        elementId: 'helper-box', 
        text: 'Esta es tu caja de información. Aquí encontrarás las herramientas para monitorear tu progreso.'
    },
    {
        elementId: 'counter-box', 
        text: 'El cronómetro registrará el tiempo exacto que te toma resolver el desafío.'
    },
    {
        elementId: 'nivelmax', 
        text: 'Este es tu indicador de progreso: te mostrará los niveles superados contra los niveles totales a superar.'
    },
    {
        elementId: 'despliegue', 
        text: '¿Necesitas una pista? ¡Este botón de ayuda te dara lo que necesites!.'
    },
    {
        elementId: 'codigo', 
        text: 'Escribe tu código en Python aquí. ¡La identación con tab y saltos con enter funcionan!.'
    },
    {
        elementId: 'send', 
        text: 'Haz clic en Verificar para ejecutar tu codigo y verificar si has cumplido el objetivo.'
    },
    {
        elementId: 'consola', 
        text: 'En la consola observarás el output de Python y los mensajes del sistema.'
    },
    {
        elementId: 'game',
        text: 'Recuerda, si cierras esta ventana, ¡perderas todo tu progreso!.'
    }
];

let currentStep = 0;

function checkFirstVisit() {
    if (!localStorage.getItem('tutorialCompleted')) {
        document.getElementById('tutorial-overlay').style.display = 'block';
        document.getElementById('tutorial-prompt').style.display = 'flex';
    }
}

function startTutorial() {
    document.body.classList.add('tutorial-on');
    document.getElementById('codigo').disabled = true;
     document.getElementById('tutorial-overlay').style.display = 'block';
    document.getElementById('tutorial-prompt').style.display = 'none';
    document.getElementById('tutorial-tooltip').style.display = 'flex';
    showStep(0);
}

function endTutorial() {
    document.body.classList.remove('tutorial-on');
    document.getElementById('codigo').disabled = false;
     document.getElementById('tutorial-overlay').style.display = 'none';
    document.getElementById('tutorial-overlay').style.display = 'none';
    document.getElementById('tutorial-prompt').style.display = 'none';
    document.getElementById('tutorial-tooltip').style.display = 'none';
    
    
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });

    
    localStorage.setItem('tutorialCompleted', 'true');
}

function showStep(index) {
    
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });

    currentStep = index;
    const step = tutorialSteps[currentStep];
    const targetEl = document.getElementById(step.elementId);
    const tooltip = document.getElementById('tutorial-tooltip');

    
    document.getElementById('tutorial-text').innerText = step.text;
    document.getElementById('tutorial-counter').innerText = `${currentStep + 1}/${tutorialSteps.length}`;

    if (targetEl) {
        targetEl.classList.add('tutorial-highlight');
        
        
        tooltip.style.top = '';
        tooltip.style.left = '';
        tooltip.style.right = '';
        tooltip.style.bottom = '';
        tooltip.style.transform = '';

        const rect = targetEl.getBoundingClientRect();
        const isMobile = window.innerWidth <= 923; 

        if (isMobile) {
           
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            
            if (step.elementId === 'send' || step.elementId === 'consola') {
                tooltip.style.top = '130px'; 
                tooltip.style.bottom = 'auto'; 
            } else {
                
                tooltip.style.bottom = '20px'; 
                tooltip.style.top = 'auto'; 
            }
            
            const yOffset = -120; 
            const y = targetEl.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});

        } else {
            
            const elementCenter = rect.left + (rect.width / 2);
            const screenCenter = window.innerWidth / 2;

            tooltip.style.top = '50%';
            tooltip.style.transform = 'translateY(-50%)';

            if (elementCenter < screenCenter) {
              
                tooltip.style.right = '5vw'; 
            } else {

                tooltip.style.left = '5vw';
            }
            
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    
    prevBtn.disabled = currentStep === 0;
    
    if (currentStep === tutorialSteps.length - 1) {
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>';
        nextBtn.onclick = endTutorial;
    } else {
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>';
        nextBtn.onclick = nextStep;
    }
}


function nextStep() {
    if (currentStep < tutorialSteps.length - 1) showStep(currentStep + 1);
}

function prevStep() {
    if (currentStep > 0) showStep(currentStep - 1);
}



function enviar(){
    document.getElementById('tutorial-overlay').style.display = 'block';
    finishform.style.display = 'flex';
}



function noanonname(){
    if(nombrefinal.value.trim()===''){
        enviarnombre.disabled = true;
    } else {
        enviarnombre.disabled = false;
    }
}

nombrefinal.addEventListener('input', noanonname);

function finalizar(){
    localStorage.setItem("username", `${nombrefinal.value}`)
    window.location.href = "clasificacion";
}

window.addEventListener('DOMContentLoaded', checkFirstVisit);

function manage(){
    if(definput.value.trim()===''){
        botones.disabled = true;
    } else {
        botones.disabled = false;
    }
}


function Despliegue(){
    const isMobile = window.innerWidth <= 923; 
    const isTiny = window.innerHeight <= 600; 
    if(!localStorage.getItem('desplegado')){
        localStorage.setItem('desplegado', "true")
        boxtosize.style.flexWrap = 'warp';
        docs.style.display = 'flex';
        tipping.style.display = 'flex';
        if(!isMobile && isTiny){
            const newsizing = boxtosize.offsetHeight;
            tosizeup.style.height = `calc(100vh - min(224px, 20vh) + ${newsizing-65}px)`;
        }
        if(isMobile){
            tosizeup.style.height = 'auto';
        }
    } else if(localStorage.getItem('desplegado')) {
        if(!isMobile){
            const newsizing = boxtosize.offsetHeight;
            tosizeup.style.height = `calc(100vh - min(224px, 20vh)`;
        }
        if(isMobile){
            tosizeup.style.height = 'auto';
        }
        boxtosize.style.flexWrap = 'never';
        docs.style.display = 'none';
        tipping.style.display = 'none';
        localStorage.removeItem('desplegado');
    }
}

const editor = document.getElementById('codigo');

editor.addEventListener('paste', (e) => {
  e.preventDefault();
});

editor.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault(); 
                
        const start = this.selectionStart;
        const end = this.selectionEnd;
            
        const indentacion = "    "; 
                
        this.value = this.value.substring(0, start) + indentacion + this.value.substring(end);
                
        this.selectionStart = this.selectionEnd = start + indentacion.length;
    }
            
    if (e.key === 'Enter') {
        e.preventDefault(); 
                
        const start = this.selectionStart;
        const textoAntesCursor = this.value.substring(0, start);         
             
        const inicioLineaActual = textoAntesCursor.lastIndexOf('\n') + 1;
        const lineaActual = textoAntesCursor.substring(inicioLineaActual);
                
        const coincidencia = lineaActual.match(/^\s*/);
        let espaciosPrevios = coincidencia ? coincidencia[0] : "";
                
        if (lineaActual.trimEnd().endsWith(':')) {
            espaciosPrevios += "    ";
        }
                
                
        const textoAInsertar = "\n" + espaciosPrevios;
        this.value = this.value.substring(0, start) + textoAInsertar + this.value.substring(this.selectionEnd);
                
        this.selectionStart = this.selectionEnd = start + textoAInsertar.length;
    }
});

definput.addEventListener('input', manage);

let gamesize = shadowoverlay.offsetHeight;

document.addEventListener('DOMContentLoaded', (event) => {
    if(localStorage.getItem('desplegado')){
        Despliegue();
    }
    document.body.classList.add('fade-in');
    docs.style.display = 'none';
    tipping.style.display = 'none';
    botones.disabled = true;
    enviarnombre.disabled = true;
    wins.innerHTML = `0/${niveles.length}`;
    document.getElementById('game').style.height = `${gamesize}px`;
});

window.addEventListener('resize', (event) => {
    let gamesize = shadowoverlay.offsetHeight;
    document.getElementById('game').style.height = `${gamesize}px`;
});

let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('stopwatch');

function formatTime(ms) {
    let milliseconds = Math.floor(ms % 1000);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    // Padding with zeros for consistent width
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    let msDisplay = String(milliseconds).padStart(3, '0');

    return `${m}:${s}:${msDisplay}`;
}

function start() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10); // Update every 10ms for smooth display
    }
}

function stop() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function reset() {
    stop();
    elapsedTime = 0;
    display.textContent = "00:00:000";
}
document.getElementById('codigo').addEventListener('click', start);

let pyodide;
        
async function initPyodide() {
    const consola = document.getElementById('consola');
    pyodide = await loadPyodide({
        stdout: (texto) => {
            consola.innerHTML += texto + '<br>';
            consola.scrollTop = consola.scrollHeight;
            }
        });
    consola.innerHTML = "<span class='system-msg'>> Motor Python listo. El intelecto está en acto.</span>\n";
    cargarNivel();
}

const niveles = [
    {
        titulo: "De Potencia a Acto",
        filosofia: '"El acto es anterior a la potencia en cuanto a la idea, pero la potencia es anterior en el tiempo."',
        enunciado: 'Tienes una semilla en estado de potencia. Crea una clase <code>Ente</code> con un método <code>actualizar()</code> que imprima <code>"Acto alcanzado"</code>.',
        codigoInicial: "class Ente:\n    # Define el método actualizar aquí\n    pass\n\nsemilla = Ente()\n# Llama al método de la semilla",
        docs: "https://www.w3schools.com/python/python_classes.asp",
        clue: ["La semilla tiene el potencial de convertirse en algo más. ¿Cómo puedes actualizar su estado?", "Piensa en cómo una función o método puede cambiar el estado de un objeto.", "def actualizar(self):\n    print(...)"],
        testPython: `
def _test_lvl2():
    try:
        obj = Ente()
        obj.actualizar()
        return True
    except:
        return False
_test_lvl2()
`
    },             
    {
        titulo: "De Potencia a Acto",
        filosofia: '"El acto es anterior a la potencia en cuanto a la idea, pero la potencia es anterior en el tiempo."',
        enunciado: 'Tienes una semilla en estado de potencia. Crea una clase <code>Ente</code> con un método <code>actualizar()</code> que imprima <code>"Acto alcanzado"</code>.',
        codigoInicial: "class Ente:\n    # Define el método actualizar aquí\n    pass\n\nsemilla = Ente()\n# Llama al método de la semilla",
        docs: "https://www.w3schools.com/python/python_classes.asp",
        clue: ["La semilla tiene el potencial de convertirse en algo más. ¿Cómo puedes actualizar su estado?", "Piensa en cómo una función o método puede cambiar el estado de un objeto.", "def actualizar(self):\n    print(...)"],
        testPython: `
def _test_lvl2():
    try:
        obj = Ente()
        obj.actualizar()
        return True
    except:
        return False
_test_lvl2()
`
    },
    {
        titulo: "De Potencia a Acto",
        filosofia: '"El acto es anterior a la potencia en cuanto a la idea, pero la potencia es anterior en el tiempo."',
        enunciado: 'Tienes una semilla en estado de potencia. Crea una clase <code>Ente</code> con un método <code>actualizar()</code> que imprima <code>"Acto alcanzado"</code>.',
        codigoInicial: "class Ente:\n    # Define el método actualizar aquí\n    pass\n\nsemilla = Ente()\n# Llama al método de la semilla",
        docs: "https://www.w3schools.com/python/python_classes.asp",
        clue: ["La semilla tiene el potencial de convertirse en algo más. ¿Cómo puedes actualizar su estado?", "Piensa en cómo una función o método puede cambiar el estado de un objeto.", "def actualizar(self):\n    print(...)"],
        testPython: `
def _test_lvl2():
    try:
        obj = Ente()
        obj.actualizar()
        return True
    except:
        return False
_test_lvl2()
`
    },
    {
        titulo: "La Primera Vía: El Primer Motor",
        filosofia: '"Todo lo que se mueve es movido por otro, hasta llegar a un motor inmóvil."',
        enunciado: 'Define una función llamada <code>encontrar_motor()</code> que no reciba parámetros y retorne la cadena de texto exacta <code>"Primer Motor"</code>.',
        codigoInicial: "def encontrar_motor():\n    # Escribe tu código aquí\n    pass",
        docs:"https://www.w3schools.com/python/python_functions.asp",
        clue: ["Piensa en algo que siempre ha estado ahí, sin necesidad de ser movido por otro.", "¿Qué podría ser el origen de todo movimiento sin ser movido por algo más?", "return ..."],
        testPython: `
def _test_lvl1():
    try:
        print(encontrar_motor())
        return encontrar_motor() == "Primer Motor"
    except:
        return False
_test_lvl1()
`
    },
    {
        titulo: "De Potencia a Acto",
        filosofia: '"El acto es anterior a la potencia en cuanto a la idea, pero la potencia es anterior en el tiempo."',
        enunciado: 'Tienes una semilla en estado de potencia. Crea una clase <code>Ente</code> con un método <code>actualizar()</code> que imprima <code>"Acto alcanzado"</code>.',
        codigoInicial: "class Ente:\n    # Define el método actualizar aquí\n    pass\n\nsemilla = Ente()\n# Llama al método de la semilla",
        docs: "https://www.w3schools.com/python/python_classes.asp",
        clue: ["La semilla tiene el potencial de convertirse en algo más. ¿Cómo puedes actualizar su estado?", "Piensa en cómo una función o método puede cambiar el estado de un objeto.", "def actualizar(self):\n    print(...)"],
        testPython: `
def _test_lvl2():
    try:
        obj = Ente()
        obj.actualizar()
        return True
    except:
        return False
_test_lvl2()
`
    }
];

let nivelActual = 0;

function cargarNivel() {
    const nivel = niveles[nivelActual];
    document.getElementById('tit').innerText = nivel.titulo;
    document.getElementById('subtit').innerText = nivel.filosofia;
    document.getElementById('acc').innerHTML = nivel.enunciado;
    document.getElementById('codigo').value = nivel.codigoInicial;
    document.getElementById('tip-modifier').innerText = "> ..."
    if (pyodide) {
    document.getElementById('consola').innerHTML = "<span class='system-msg'>> Esperando ejecución...</span><br>";
    }
}

async function verificarCodigo() {
    const codigoUsuario = document.getElementById('codigo').value;
    const consola = document.getElementById('consola');

    consola.innerHTML = "<span class='system-msg'>> Ejecutando...</span><br>";

    try {
        await pyodide.runPythonAsync(codigoUsuario);

        const testCode = niveles[nivelActual].testPython;
        const esCorrecto = await pyodide.runPythonAsync(testCode);

        console.log(testCode)
        console.log(esCorrecto)

        if (esCorrecto) {
            consola.innerHTML += "<span class='correct'>> Adecuación confirmada. Lógica correcta.</span><br>";
            wins.innerHTML = nivelActual+1 + `/${niveles.length}`;
            document.getElementById("codigo").disabled = true;
            stop()
                    
            if (nivelActual < niveles.length - 1) {
                document.getElementById("nextlvl").style.display = 'flex';
                document.getElementById("send").style.display = 'none';

            } else {
                consola.innerHTML += "¡Felicidades! Has completado todas las vías.";
                localStorage.setItem("time", `${document.getElementById("stopwatch").innerHTML}`)
                localStorage.setItem("wins", `${document.getElementById("nivelmax").innerHTML}`)
                document.getElementById("buttonfinish").style.display = 'flex';
                document.getElementById("send").style.display = 'none';
            }

        } else {
            consola.innerHTML += "<span class='incorrect'>> El agente no ha alcanzado su fin. Revisa las instrucciones.</span><br>";
        }
    } catch (err) {
        consola.innerHTML += "<span class='incorrect'>> Error en la forma (Sintaxis/Excepción):</span><br>" + err;
    }
}

function siguienteNivel() {
    nivelActual++; 
    document.getElementById("codigo").disabled = false;
    document.getElementById("send").style.display = 'flex';
    document.getElementById("nextlvl").style.display = 'none';
    if(localStorage.getItem('desplegado')){
        Despliegue();
    }
    cargarNivel();
}

function clued(){
    const nivel = niveles[nivelActual].clue;
    document.getElementById('tip-modifier').innerText = `> ${nivel[Math.floor(Math.random() * nivel.length)]}`;
}

function pythondocs(){
    window.open(`${niveles[nivelActual].docs}`, "_blank");
}

initPyodide();