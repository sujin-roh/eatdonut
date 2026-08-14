Exit code: 0
Wall time: 0.4 seconds
Output:
const notice=document.querySelector('.notice');notice.querySelector('button').onclick=()=>notice.remove();
const modal=document.querySelector('.search-modal');document.querySelector('[data-open-search]').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>document.querySelector('#search').focus(),50)};document.querySelector('[data-close-search]').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
const filterButtons=document.querySelectorAll('[data-filter]');const products=document.querySelectorAll('.product');filterButtons.forEach(btn=>btn.onclick=()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');products.forEach(p=>p.style.display=btn.dataset.filter==='all'||p.dataset.category===btn.dataset.filter?'block':'none')});
let count=0;const badge=document.querySelector('.icon-btn em');const toast=document.querySelector('.toast');document.querySelectorAll('.product>button').forEach(btn=>btn.onclick=()=>{badge.textContent=++count;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1600)});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelector('.search-modal form').onsubmit=e=>{e.preventDefault();modal.classList.remove('open');toast.textContent='검색 기능은 다음 단계에서 연결할 수 있어요';toast.classList.add('show');setTimeout(()=>{toast.classList.remove('show');toast.textContent='장바구니에 담았어요 🍩'},2200)};

const partnerForm=document.querySelector('[data-partner-form]');
partnerForm.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!partnerForm.reportValidity())return;
  const button=partnerForm.querySelector('button[type="submit"]');
  const status=partnerForm.querySelector('.form-status');
  button.disabled=true;button.innerHTML='보내는 중...';status.textContent='';status.classList.remove('error');
  try{
    const response=await fetch(partnerForm.action,{method:'POST',body:new FormData(partnerForm),headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('submit failed');
    partnerForm.reset();status.textContent='제안이 접수되었습니다. 담당자가 곧 연락드릴게요! 🍩';
  }catch(error){status.textContent='전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';status.classList.add('error')}
  finally{button.disabled=false;button.innerHTML='제휴 문의 보내기 <span>→</span>'}
});

