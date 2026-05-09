// ═══════ PRELOADER ═══════
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('preloader').classList.add('done'),600)});

// ═══════ 3D STAR FIELD ═══════
(function(){
  const c=document.getElementById('stars'),ctx=c.getContext('2d');
  let W,H,stars=[],mx=0,my=0,NUM=220;
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  function init(){stars=[];for(let i=0;i<NUM;i++)stars.push({x:Math.random()*W-W/2,y:Math.random()*H-H/2,z:Math.random()*1000+1,pz:0})}
  function draw(){
    ctx.fillStyle='rgba(7,13,20,.25)';ctx.fillRect(0,0,W,H);
    const cx=W/2,cy=H/2;
    for(let s of stars){
      s.pz=s.z;s.z-=1.5;
      if(s.z<=0){s.z=1000;s.x=Math.random()*W-W/2;s.y=Math.random()*H-H/2;s.pz=s.z}
      const sx=((s.x+mx*.05)/s.z)*300+cx, sy=((s.y+my*.05)/s.z)*300+cy;
      const px=((s.x+mx*.05)/s.pz)*300+cx, py=((s.y+my*.05)/s.pz)*300+cy;
      const r=Math.max(0,(1-s.z/1000)*2.5);
      const a=Math.max(0,(1-s.z/1000));
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(sx,sy);
      ctx.strokeStyle=`rgba(180,220,255,${a*.6})`;ctx.lineWidth=r;ctx.stroke();
      ctx.beginPath();ctx.arc(sx,sy,r*.6,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,230,255,${a})`;ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  document.addEventListener('mousemove',e=>{mx=e.clientX-W/2;my=e.clientY-H/2});
  window.addEventListener('resize',()=>{resize();init()});
  resize();init();draw();
})();

// ═══════ HERO TYPEWRITER ═══════
(function(){
  const el=document.getElementById('hero-tag'),txt='ML ENGINEER · ALIPURDUAR, INDIA';
  let i=0;
  function t(){if(i<=txt.length){el.textContent=txt.slice(0,i);i++;setTimeout(t,55)}}
  setTimeout(t,800);
})();

// ═══════ ANIMATED COUNTERS ═══════
(function(){
  const counters=document.querySelectorAll('.stat-n');
  const vals=['5+','20+','1B+','3'];
  const nums=[5,20,1,3];
  const obs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      obs.disconnect();
      counters.forEach((el,i)=>{
        let cur=0;const target=nums[i];const suffix=vals[i].replace(/[0-9]/g,'');
        const dur=1200;const step=dur/target;
        const timer=setInterval(()=>{cur++;el.textContent=cur+suffix;if(cur>=target)clearInterval(timer)},step);
      });
    }
  },{threshold:.3});
  if(counters[0])obs.observe(counters[0].closest('.hero-stats')||counters[0]);
})();

// ═══════ RADAR CHART ═══════
(function(){
  const canvas=document.getElementById('radar'),ctx=canvas.getContext('2d');
  const cx=150,cy=150,r=110;
  const axes=[{l:'DEEP LEARNING',v:.93},{l:'NLP / LLMs',v:.88},{l:'MLOps',v:.82},{l:'DATA ENG.',v:.79},{l:'COMP. VISION',v:.86},{l:'STATISTICS',v:.81}];
  const N=axes.length,ang=i=>(Math.PI*2*i/N)-Math.PI/2;
  const pt=(i,f)=>({x:cx+Math.cos(ang(i))*r*f,y:cy+Math.sin(ang(i))*r*f});
  let p=0;
  function draw(prog){
    ctx.clearRect(0,0,300,300);
    [.25,.5,.75,1].forEach(f=>{ctx.beginPath();for(let i=0;i<N;i++){const pp=pt(i,f);i===0?ctx.moveTo(pp.x,pp.y):ctx.lineTo(pp.x,pp.y)}ctx.closePath();ctx.strokeStyle='rgba(0,229,255,.07)';ctx.lineWidth=1;ctx.stroke()});
    for(let i=0;i<N;i++){const e=pt(i,1);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(e.x,e.y);ctx.strokeStyle='rgba(0,229,255,.08)';ctx.lineWidth=1;ctx.stroke()}
    ctx.beginPath();for(let i=0;i<N;i++){const pp=pt(i,axes[i].v*prog);i===0?ctx.moveTo(pp.x,pp.y):ctx.lineTo(pp.x,pp.y)}
    ctx.closePath();ctx.fillStyle='rgba(0,229,255,.07)';ctx.fill();
    ctx.strokeStyle='#00e5ff';ctx.lineWidth=1.5;ctx.shadowColor='#00e5ff';ctx.shadowBlur=6;ctx.stroke();ctx.shadowBlur=0;
    for(let i=0;i<N;i++){const pp=pt(i,axes[i].v*prog);ctx.beginPath();ctx.arc(pp.x,pp.y,4,0,Math.PI*2);ctx.fillStyle='#00e5ff';ctx.shadowColor='#00e5ff';ctx.shadowBlur=10;ctx.fill();ctx.shadowBlur=0}
    for(let i=0;i<N;i++){const lp=pt(i,1.25);ctx.font='600 9.5px "Share Tech Mono"';ctx.fillStyle='rgba(0,229,255,.55)';ctx.textAlign=lp.x>cx+5?'left':lp.x<cx-5?'right':'center';ctx.textBaseline=lp.y>cy?'top':'bottom';ctx.fillText(axes[i].l,lp.x,lp.y)}
  }
  function anim(){if(p<1){p=Math.min(1,p+.028);draw(p);requestAnimationFrame(anim)}else draw(1)}
  const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){obs.disconnect();anim()}});
  obs.observe(canvas);
})();

// ═══════ DATA ═══════
const PROJECTS=[
  {title:"WIRELESS DATA TRANSFER",desc:"A lightweight, secure Flask-based file sharing application with SSH-only admin access, QR code generation, and automatic file expiration. Built for Raspberry Pi deployments on local networks.",stack:["Python","Flask","Raspberry Pi","SSH","QR Code"],status:"live",hue:145,link:"https://github.com/DebashisMajumder/Wireless-Data-Transfer"}
];

/*
const EXPERIENCE=[
  {date:"2023 — PRESENT",company:"STEALTH AI STARTUP",role:"Senior ML Engineer",desc:"Architected a real-time recommendation engine for 10M+ daily users. Built internal AutoML platform reducing iteration time by 60%. Led a team of 4 ML engineers.",chips:["LLMs","RecSys","MLOps","Team Lead"]},
  {date:"2021 — 2023",company:"INFOSYS AI LAB",role:"ML Engineer II",desc:"Built NLP pipelines for enterprise document processing. Fine-tuned BERT models for SOTA results. Reduced inference latency 45% via quantization + ONNX.",chips:["NLP","BERT","Azure ML","Python"]},
  {date:"2020 — 2021",company:"FRACTAL ANALYTICS",role:"Data Scientist",desc:"Churn prediction models with 83% recall impacting $4M+ campaigns. Automated reporting pipelines for C-suite across 3 geographies.",chips:["XGBoost","SHAP","SQL","Tableau"]},
  {date:"2018 — 2020",company:"IIT KHARAGPUR",role:"Research Assistant",desc:"Published 3 papers on computer vision and transfer learning. Improved ImageNet top-5 accuracy by 2.3% over ResNet-50 with novel attention mechanisms.",chips:["Research","CV","PyTorch","LaTeX"]}
];
*/
const EXPERIENCE=[];

// ═══════ PROJECTS (with 3D tilt) ═══════
(function(){
  const grid=document.getElementById('proj-grid');
  PROJECTS.forEach((p,idx)=>{
    const card=document.createElement('div');card.className='proj-card sr sr-d'+(idx%4+1);
    const badge=p.status==='live'?'<div class="proj-badge live">&#9679; LIVE</div>':'<div class="proj-badge wip">&#9675; WIP</div>';
    const tags=p.stack.map(t=>`<span class="proj-tag">${t}</span>`).join('');
    card.innerHTML=`<div class="proj-vis"><canvas class="pvc" data-hue="${p.hue}" width="400" height="140"></canvas><div class="proj-vis-fade"></div>${badge}</div><div class="proj-body"><div class="proj-name">${p.title}</div><div class="proj-desc">${p.desc}</div><div class="proj-tags">${tags}</div><div class="proj-links">${p.link?`<a href="${p.link}" target="_blank" rel="noopener" class="proj-link">GitHub ↗</a>`:''}</div></div>`;
    // 3D tilt effect
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform=''});
    grid.appendChild(card);
  });
  // generative canvas art
  document.querySelectorAll('.pvc').forEach(cv=>{
    const h=parseInt(cv.dataset.hue);cv.width=400;cv.height=140;
    const ctx=cv.getContext('2d');
    const g=ctx.createLinearGradient(0,0,400,140);g.addColorStop(0,`hsl(${h},60%,4%)`);g.addColorStop(1,`hsl(${h+30},45%,7%)`);ctx.fillStyle=g;ctx.fillRect(0,0,400,140);
    ctx.strokeStyle=`hsla(${h},70%,60%,.06)`;ctx.lineWidth=1;
    for(let x=0;x<400;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,140);ctx.stroke()}
    for(let y=0;y<140;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(400,y);ctx.stroke()}
    const bg=ctx.createRadialGradient(200,70,0,200,70,140);bg.addColorStop(0,`hsla(${h},100%,65%,.12)`);bg.addColorStop(1,'transparent');ctx.fillStyle=bg;ctx.fillRect(0,0,400,140);
    ctx.strokeStyle=`hsla(${h},100%,72%,.65)`;ctx.lineWidth=1.5;ctx.shadowColor=`hsl(${h},100%,70%)`;ctx.shadowBlur=5;ctx.beginPath();
    for(let x=0;x<=400;x+=3){const y=70+Math.sin(x*.04)*18+Math.sin(x*.09+1)*10;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}
    ctx.stroke();ctx.shadowBlur=0;
  });
})();

// ═══════ EXPERIENCE ═══════
(function(){
  const list=document.getElementById('exp-list');
  EXPERIENCE.forEach(e=>{
    const el=document.createElement('div');el.className='exp-item';
    const chips=e.chips.map(c=>`<span class="chip">${c}</span>`).join('');
    el.innerHTML=`<div><div class="exp-date">${e.date}</div><div class="exp-co">${e.company}</div></div><div><div class="exp-role">${e.role}</div><div class="exp-desc">${e.desc}</div><div class="exp-chips">${chips}</div></div>`;
    list.appendChild(el);
  });
  const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.15});
  document.querySelectorAll('.exp-item').forEach(el=>obs.observe(el));
})();

// ═══════ SCROLL REVEAL ═══════
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}});
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.sr').forEach(el=>obs.observe(el));
})();

// ═══════ CONTACT FORM (Formsubmit.co) ═══════
(function(){
  const form=document.getElementById('contact-form');
  if(!form)return;
  form.addEventListener('submit',async function(ev){
    ev.preventDefault();
    const st=document.getElementById('fst'),btn=document.getElementById('sbtn');
    const n=document.getElementById('fn').value.trim();
    const e=document.getElementById('fe').value.trim();
    const m=document.getElementById('fm').value.trim();
    if(!n||!e||!m){st.textContent='Please fill in all fields.';st.className='fstatus err';return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){st.textContent='Please enter a valid email address.';st.className='fstatus err';return}
    btn.textContent='SENDING...';btn.disabled=true;
    try{
      const fd=new FormData(form);
      const res=await fetch(form.action,{
        method:'POST',
        body:fd,
        headers:{'Accept':'application/json'}
      });
      if(res.ok){
        // Also save locally as backup
        try{const msgs=JSON.parse(localStorage.getItem('dm_msgs')||'[]');msgs.push({n,e,m,ts:new Date().toISOString()});localStorage.setItem('dm_msgs',JSON.stringify(msgs))}catch(_){}
        st.textContent='Message sent successfully! I\'ll get back to you soon.';st.className='fstatus ok';
        btn.textContent='MESSAGE SENT ✓';
        form.reset();
      }else{
        throw new Error('Submission failed');
      }
    }catch(err){
      st.textContent='Failed to send. Please email me directly at debashisxmajumder@gmail.com';st.className='fstatus err';
      btn.textContent='SEND MESSAGE';btn.disabled=false;
    }
  });
})();

// ═══════ NAV ACTIVE ═══════
(function(){
  const links=document.querySelectorAll('nav .nav-link');
  const ids=['about','skills','projects','experience','contact'];
  const secs=ids.map(id=>document.getElementById(id));
  window.addEventListener('scroll',()=>{
    const scrollY=window.scrollY+200;
    let a=-1;
    for(let i=secs.length-1;i>=0;i--){
      if(secs[i]&&scrollY>=secs[i].offsetTop){a=i;break}
    }
    links.forEach((l,i)=>l.classList.toggle('active',i===a));
  });
})();

// ═══════ HAMBURGER MENU ═══════
(function(){
  const btn=document.querySelector('.hamburger');
  const overlay=document.querySelector('.nav-overlay');
  if(!btn||!overlay)return;
  btn.addEventListener('click',()=>{
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow=overlay.classList.contains('open')?'hidden':'';
  });
  overlay.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow='';
    });
  });
})();

// ═══════ RESUME MODAL ═══════
function openR(){
  const o=document.getElementById('r-overlay');
  const frame=document.getElementById('pdf-frame');
  // Load resume.pdf dynamically — changes when you replace the file in repo
  if(!frame.src||!frame.src.includes('resume.pdf')){
    frame.src='resume.pdf';
  }
  o.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeR(){
  document.getElementById('r-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function overlayClick(e){if(e.target.id==='r-overlay')closeR()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeR()});

// ═══════ DYNAMIC FOOTER YEAR ═══════
(function(){
  const el=document.querySelector('.foot-copy');
  if(el)el.innerHTML=`&copy; ${new Date().getFullYear()} DEBASHIS MAJUMDER &mdash; ALIPURDUAR, INDIA`;
})();
