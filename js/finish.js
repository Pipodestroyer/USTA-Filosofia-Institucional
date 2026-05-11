const botones = document.getElementById('buttonfinish');
const subtitle = document.getElementById('acc');
const leaderboard = document.getElementById('leaderboard');

botones.addEventListener('click', function() { 
        document.body.classList.add('fade-out');
            document.body.classList.remove('fade-in');
            setTimeout(() =>{
                window.location.href = "/";
        }, 1000);
    
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.body.classList.add('fade-in');
  subtitle.innerHTML = `Felicidades ${localStorage.getItem("username")} has logrado resolver <code>${localStorage.getItem("wins")}</code> problemas logicos de codigo, lo lograste en: <code>${localStorage.getItem("time")}</code>.`;
  leaderboard.innerHTML = `🥇 <code>${localStorage.getItem("time")}</code> | ${localStorage.getItem("username")}<br>🥈 <code>0:00.000</code>  | Juan<br>🥉 <code>0:00.000</code> | Ana`;
  console.log("loaded");
});