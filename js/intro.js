let pyodide;
let consolaDestino = null;

async function initPyodideIntro() {
    // 1. Mostrar mensaje de carga en todas las consolas
    const consolas = document.querySelectorAll('.console');
    consolas.forEach(c => {
        c.innerHTML = "<span class='system-msg'>> Iniciando motor Python...</span><br>";
        c.style.display = "block"; 
    });

    // 2. Cargar Pyodide y redirigir el print()
    pyodide = await loadPyodide({
        stdout: (texto) => {
            if (consolaDestino) {
                const consola = document.getElementById(consolaDestino);
                consola.innerHTML += texto + '<br>';
                consola.scrollTop = consola.scrollHeight;
            }
        }
    });

    // 3. Ocultar consolas hasta que el usuario presione "Probar"
    consolas.forEach(c => {
        c.innerHTML = "> Esperando ejecución...";
    });
}

async function probarDemo(tipo) {
    // Apuntar a la consola correcta según el botón presionado
    consolaDestino = `consola-${tipo}`;
    const consola = document.getElementById(consolaDestino);
    
    // Preparar consola visualmente
    consola.style.display = "block";
    consola.innerHTML = "<span class='system-msg'>> Ejecutando...</span><br>";

    let codigoAEjecutar = "";

    // Construir el código de Python uniendo lo estático con el input del usuario
    if (tipo === 'print') {
        const val = document.getElementById('input-print').value;
        codigoAEjecutar = `print(${val})`;
    } 
    else if (tipo === 'def') {
        const val = document.getElementById('input-def').value;
        codigoAEjecutar = `def funcion_demo():\n    return ${val}\n\nprint(funcion_demo())`;
    } 
    else if (tipo === 'class') {
        const val = document.getElementById('input-class').value;
        codigoAEjecutar = `class ${val}:\n    estado = "En potencia"\n\nprint(f"Has creado el molde '{${val}.__name__}'. Su estado es: {${val}.estado}")`;
    }
    else if (tipo === 'list') {
        const val = document.getElementById('input-list').value;
        
        // Evitamos un error de sintaxis en Python si el usuario deja el espacio en blanco
        if (val === "") {
            consola.innerHTML += `<span class='incorrect'>> Error: El índice no puede estar vacío. Usa 0, 1 o 2.</span><br>`;
            return; // Detenemos la ejecución aquí
        }

        // Usamos concatenación clásica en Python para evitar el choque de llaves {} con JavaScript
        codigoAEjecutar = `pasiones = ["Ira", "Miedo", "Valentía"]\nprint("Índice [" + str(${val}) + "]: Has seleccionado '" + pasiones[${val}] + "'")`;
    }

    try {
        await pyodide.runPythonAsync(codigoAEjecutar);
    } catch (err) {
        // Si hay un error, ya sea de índice fuera de rango o error de sintaxis, lo atrapamos
        consola.innerHTML += `<span class='incorrect'>> Error al ejecutar. Revisa la lógica o el número ingresado.</span><br>`;
        // Opcional: puedes imprimir "err" en la consola del navegador si quieres ver el error detallado
        console.error(err);
    }
}

// Iniciar Pyodide tan pronto cargue la página
document.addEventListener('DOMContentLoaded', initPyodideIntro);