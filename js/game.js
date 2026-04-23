const botones = document.getElementById('send');
const definput = document.getElementById('default-input');

function manage(){
    if(definput.value.trim()===''){
        botones.disabled = true;
    } else {
        botones.disabled = false;
    }
}

botones.addEventListener('click', function() { 
        document.body.classList.add('fade-out');
            document.body.classList.remove('fade-in');
            setTimeout(() =>{
                localStorage.setItem("username", `${definput.value}`)
                window.location.href = "game.html";
        }, 1000);
    
});

definput.addEventListener('input', manage);

document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('fade-in');
    botones.disabled = true;
});