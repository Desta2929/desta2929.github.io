const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

let currentLang = 'am';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.classList.toggle('lang-en', lang === 'en');
  document.querySelectorAll('[data-am][data-en]').forEach(el => {
    el.innerHTML = el.dataset[lang];
  });
  document.querySelectorAll('[data-am-placeholder][data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.amPlaceholder;
  });
  document.getElementById('langBtn').textContent = lang === 'en' ? 'አማርኛ' : 'English';
  document.title = lang === 'en' ? 'Zetewahdo | Ethiopian Orthodox Tewahedo' : 'ዘተዋሕዶ | Zetewahdo';
  const search = document.getElementById('siteSearch');
  if (search) search.placeholder = lang === 'en' ? 'Search articles…' : 'ጽሑፎችን ፈልግ…';
  const empty = document.querySelector('.no-results');
  if (empty) empty.textContent = lang === 'en' ? 'No matching content found.' : 'የፈለጉት ይዘት አልተገኘም።';
}

document.getElementById('langBtn')?.addEventListener('click', () => applyLanguage(currentLang === 'am' ? 'en' : 'am'));

function subscribe(e) {
  e.preventDefault();
  alert(currentLang === 'en' ? 'Thank you! Newsletter signup is a demo for now.' : 'እናመሰግናለን! የዝማኔ ምዝገባው ለአሁን የማሳያ አገልግሎት ነው።');
}

const searchInput = document.getElementById('siteSearch');
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const cards = [...document.querySelectorAll('.article-card')];
  let shown = 0;
  cards.forEach(card => {
    const haystack = `${card.dataset.search || ''} ${card.innerText}`.toLowerCase();
    const match = !q || haystack.includes(q);
    card.style.display = match ? 'block' : 'none';
    if (match) shown++;
  });
  const grid = document.getElementById('articleGrid');
  let empty = grid.querySelector('.no-results');
  if (!shown) {
    if (!empty) {
      empty = document.createElement('div');
      empty.className = 'no-results';
      grid.appendChild(empty);
    }
    empty.textContent = currentLang === 'en' ? 'No matching content found.' : 'የፈለጉት ይዘት አልተገኘም።';
  } else if (empty) empty.remove();
});

function openCrossArticle() {
  const modal = document.getElementById('crossArticleModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  updateCrossArticleLanguage();
}
function closeCrossArticle() {
  const modal = document.getElementById('crossArticleModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
function updateCrossArticleLanguage() {
  const am = document.querySelector('[data-am-article]');
  const en = document.querySelector('[data-en-article]');
  if (!am || !en) return;
  am.hidden = currentLang !== 'am';
  en.hidden = currentLang !== 'en';
}
const originalApplyLanguage = applyLanguage;
applyLanguage = function(lang) {
  originalApplyLanguage(lang);
  updateCrossArticleLanguage();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCrossArticle();
});
