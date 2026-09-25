const menu=document.querySelector(".menu"), links=document.querySelector(".links");
menu?.addEventListener("click",()=>links.classList.toggle("open"));
document.querySelectorAll(".links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
function subscribe(e){e.preventDefault();alert("እናመሰግናለን! የዝማኔ ምዝገባው በዚህ demo ላይ ተቀብሏል።");}
document.getElementById("langBtn").addEventListener("click",()=>{
  document.body.classList.toggle("lang-en");
  const en=document.body.classList.contains("lang-en");
  document.getElementById("langBtn").textContent=en?"አማርኛ":"English";
  if(en){
    document.querySelector(".hero h1").innerHTML="Preserving the <em>Tewahedo Faith</em><br>for generations";
    document.querySelector(".hero p").textContent="A digital home for Ethiopian Orthodox Tewahedo faith, Scripture, saints, feasts, prayers, sermons and spiritual learning.";
  }else{
    document.querySelector(".hero h1").innerHTML="የተዋሕዶ ትምህርትን<br><em>ለትውልድ እንጠብቅ</em>";
    document.querySelector(".hero p").textContent="የእምነት፣ የመጽሐፍ ቅዱስ፣ የቅዱሳን፣ የበዓላት፣ የጸሎት፣ የስብከት እና የመንፈሳዊ ትምህርት ማዕከል።";
  }
});

const searchInput=document.getElementById("siteSearch");
searchInput?.addEventListener("input",()=>{
  const q=searchInput.value.trim().toLowerCase();
  const cards=[...document.querySelectorAll(".article-card")];
  let shown=0;
  cards.forEach(card=>{
    const match=!q || card.dataset.search.toLowerCase().includes(q) || card.innerText.toLowerCase().includes(q);
    card.style.display=match?"block":"none";
    if(match) shown++;
  });
  const grid=document.getElementById("articleGrid");
  let empty=grid.querySelector(".no-results");
  if(!shown){
    if(!empty){empty=document.createElement("div");empty.className="no-results";empty.textContent="የፈለጉት ይዘት አልተገኘም።";grid.appendChild(empty);}
  }else if(empty) empty.remove();
});
