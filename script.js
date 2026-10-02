/* MOBILE NAVIGATION */
const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}

/* CURRENT YEAR */
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

/* MERGE SERVICES INTO VOICE SAMPLES */
const servicesSection=document.getElementById('services');
const sampleSection=document.getElementById('samples');
const sampleGrid=document.getElementById('sampleGrid');
if(servicesSection&&sampleSection&&sampleGrid){
  const serviceData=[...servicesSection.querySelectorAll('.service')].map(service=>({title:service.querySelector('h3')?.textContent.trim()||'',text:service.querySelector('p')?.textContent.trim()||''}));
  servicesSection.remove();
  const heading=sampleSection.querySelector('.section-heading h2');
  const intro=sampleSection.querySelector('.section-heading p:last-child');
  if(heading)heading.textContent='What I can narrate — and hear it in action.';
  if(intro)intro.textContent='Choose a sample to hear how the voice works across different types of narration.';
  const serviceByTag={
    'AUDIOBOOK':serviceData.find(s=>s.title==='Audiobooks'),
    'CHARACTER':serviceData.find(s=>s.title==='Character Voices'),
    'NON-FICTION':serviceData.find(s=>s.title==='Technical & Corporate'),
    "CHILDREN'S":serviceData.find(s=>s.title==='Audiobooks')
  };
  sampleGrid.querySelectorAll('.sample-card').forEach(card=>{
    const tag=card.querySelector('.tag')?.textContent.trim();
    const service=serviceByTag[tag];
    if(service){
      const label=document.createElement('div');
      label.className='sample-service';
      label.innerHTML='<strong>'+service.title+'</strong><span>'+service.text+'</span>';
      const title=card.querySelector('h3');
      if(title)title.insertAdjacentElement('beforebegin',label);
    }
  });
  document.querySelectorAll('.nav-links a[href="#services"]').forEach(link=>{link.setAttribute('href','#samples');link.textContent='What I narrate'});
}

/* VOICE SAMPLE EXPAND / COLLAPSE */
const samplesToggle=document.getElementById('samplesToggle');
if(sampleGrid&&samplesToggle){
  const sampleCards=sampleGrid.querySelectorAll('.sample-card');
  if(sampleCards.length<=3)samplesToggle.style.display='none';
  samplesToggle.addEventListener('click',()=>{const expanded=sampleGrid.classList.toggle('expanded');samplesToggle.setAttribute('aria-expanded',expanded);samplesToggle.setAttribute('aria-label',expanded?'Show fewer voice samples':'Show more voice samples');samplesToggle.textContent=expanded?'↑':'↓'});
}

/* AUTOMATIC SAMPLE NUMBERING */
sampleGrid?.querySelectorAll('.sample-card').forEach((card,index)=>{const number=card.querySelector('.sample-number');if(number)number.textContent=String(index+1).padStart(2,'0')});

/* AUDIO PLAYERS */
document.querySelectorAll('.audio-player').forEach(player=>{
  const audio=player.querySelector('audio');const button=player.querySelector('.play-button');const waveform=player.querySelector('.waveform-container');const progress=player.querySelector('.wave-progress');const timeDisplay=player.querySelector('.audio-time');
  function formatTime(seconds){if(!Number.isFinite(seconds))return '0:00';const minutes=Math.floor(seconds/60);const remainingSeconds=Math.floor(seconds%60);return `${minutes}:${remainingSeconds.toString().padStart(2,'0')}`}
  button.addEventListener('click',()=>{if(audio.paused)audio.play();else audio.pause()});
  audio.addEventListener('loadedmetadata',()=>{timeDisplay.textContent=formatTime(audio.duration)});
  audio.addEventListener('timeupdate',()=>{if(!audio.duration)return;const percentage=(audio.currentTime/audio.duration)*100;progress.style.width=`${percentage}%`;timeDisplay.textContent=formatTime(audio.currentTime)});
  audio.addEventListener('play',()=>{button.textContent='❚❚';player.classList.add('playing')});
  audio.addEventListener('pause',()=>{button.textContent='▶';player.classList.remove('playing')});
  audio.addEventListener('ended',()=>{button.textContent='▶';player.classList.remove('playing');progress.style.width='0%';timeDisplay.textContent=formatTime(audio.duration)});
  waveform.addEventListener('click',event=>{if(!audio.duration)return;const rect=waveform.getBoundingClientRect();const clickPosition=(event.clientX-rect.left)/rect.width;audio.currentTime=clickPosition*audio.duration});
});
