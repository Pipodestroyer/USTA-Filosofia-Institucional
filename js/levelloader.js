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
    const wins = document.getElementById('nivelmax');

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