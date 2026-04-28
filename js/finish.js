const botones = document.getElementById('buttonfinish');
const subtitle = document.getElementById('acc');
const leaderboard = document.getElementById('leaderboard');

botones.addEventListener('click', function() { 
        document.body.classList.add('fade-out');
            document.body.classList.remove('fade-in');
            setTimeout(() =>{
                window.location.href = "index.html";
        }, 1000);
    
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('fade-in');
  subtitle.innerHTML = `Felicidades ${localStorage.getItem("username")} has logrado resolver <code>5/7</code> problemas logicos de codigo, lo lograste en: <code>5:30.123</code>.`;
  leaderboard.innerHTML = `🥇 | ${localStorage.getItem("username")}<br>🥈 | Juan<br>🥉 | Ana`;
  console.log("loaded");
});