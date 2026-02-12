/* =========================
   RAMADAN + ENGLISH DATE LOGIC
   Ramadan 1 = 8 January
========================= */
(function setTodayDates(){

  const today = new Date();
  today.setHours(0,0,0,0);

  /* English Date (REAL TODAY) */
  const eng = today.toLocaleDateString("en-GB",{
    day:"numeric",
    month:"long",
    year:"numeric"
  });

  const engEl = document.getElementById("engDate");
  if(engEl) engEl.innerText = "🗓 " + eng;

  /* Ramadan Count Logic */
  const ramadanStart = new Date(today.getFullYear(), 0, 11); // 8 January
  ramadanStart.setHours(0,0,0,0);

  const diffDays =
    Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;

  const hijriEl = document.getElementById("hijriDate");

  if(hijriEl){
    if(diffDays >= 1 && diffDays <= 30){
      hijriEl.innerText = "🌙 Ramadan " + diffDays;
    }else{
      hijriEl.innerText = "🌙 Ramadan";
    }
  }

})();

/* =========================
   CLICK SOUND
========================= */
const clickSound = new Audio("assets/click.mp3");
clickSound.preload = "auto";

/* TOGGLES */
document.querySelectorAll(".toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(()=>{});
    toggle.classList.toggle("active");
  });
});

/* SAVE SCREENSHOT (NO FADE / NO BLUR) */
document.getElementById("saveBtn").addEventListener("click", async () => {

  clickSound.currentTime = 0;
  clickSound.play().catch(()=>{});

  const area = document.getElementById("captureArea");

  /* 🔥 TEMP FIXES BEFORE CAPTURE */
  const animated = document.querySelectorAll("*");
  animated.forEach(el=>{
    el.style.animation = "none";
    el.style.transition = "none";
    el.style.opacity = "1";
  });

  const oldBg = document.body.style.background;
  document.body.style.background = "#efe8fb"; // solid background

  /* CAPTURE */
  html2canvas(area,{
    backgroundColor:"#efe8fb",
    scale:2,
    scrollY:-window.scrollY,
    useCORS:true
  }).then(canvas=>{

    const dataURL = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `Ramadan-${new Date().toISOString().slice(0,10)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    /* 🔁 RESTORE STYLES */
    animated.forEach(el=>{
      el.style.animation = "";
      el.style.transition = "";
      el.style.opacity = "";
    });
    document.body.style.background = oldBg;

  }).catch(err=>{
    console.error(err);
    alert("Screenshot failed");
  });

});
