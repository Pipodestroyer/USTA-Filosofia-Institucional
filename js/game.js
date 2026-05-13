const botones = document.getElementById('send');
const definput = document.getElementById('codigo');
const helper =  document.getElementById('despliegue');
const boxtosize = document.getElementById('helper-box');
const docs = document.getElementById('buttons-helper');
const tipping = document.getElementById('buttons-helper-tip');
const tosizeup = document.getElementById('game');


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
            
            // Hacemos scroll
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
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
        nextBtn.onclick = endTutorial;
    } else {
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>';
        nextBtn.onclick = nextStep;
    }
}

function nextStep() {
    if (currentStep < tutorialSteps.length - 1) showStep(currentStep + 1);
}

function prevStep() {
    if (currentStep > 0) showStep(currentStep - 1);
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

document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('fade-in');
  docs.style.display = 'none';
  tipping.style.display = 'none';
  botones.disabled = true;
});