const botones = document.getElementById('send');
const definput = document.getElementById('codigo');

function manage(){
    if(definput.value.trim()===''){
        botones.disabled = true;
    } else {
        botones.disabled = false;
    }
}

definput.addEventListener('input', manage);

document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('fade-in');
    botones.disabled = true;
});