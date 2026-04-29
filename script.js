gsap.registerPlugin(ScrollTrigger);

const words = document.querySelector('#heroTitle').innerText.split(' ');
document.querySelector('#heroTitle').innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
gsap.from('.hero .word', {opacity:0, y:40, duration:1, stagger:0.18, ease:'power3.out'});
gsap.from('.hero .tagline, .hero .cta-button, .hero .logo', {opacity:0, y:25, duration:1, delay:0.8, stagger:0.2});

gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.from(el, {scrollTrigger:{trigger:el, start:'top 85%'}, opacity:0, y:40, duration:0.9, delay:i*0.04, ease:'power2.out'});
});

document.querySelectorAll('.about-copy p').forEach((p, i) => {
  gsap.from(p, {scrollTrigger:{trigger:p, start:'top 92%'}, opacity:0, y:20, duration:0.7, delay:i*0.07});
});

const counters = document.querySelectorAll('.stat-number');
ScrollTrigger.create({
  trigger:'#stats', start:'top 75%', once:true,
  onEnter:() => counters.forEach(counter => {
    const target = +counter.dataset.target;
    gsap.to(counter, {innerText:target, duration:1.8, snap:{innerText:1}, onUpdate:() => {
      const value = Math.floor(counter.innerText);
      counter.innerText = target >= 1000 ? value.toLocaleString() : value;
    }});
  })
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){canvas.width=innerWidth; canvas.height=innerHeight;} resize(); addEventListener('resize', resize);
for(let i=0;i<85;i++) particles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+0.4,vx:(Math.random()-.5)*0.4,vy:(Math.random()-.5)*0.4});
(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.fillStyle='rgba(204,0,0,0.45)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});
  requestAnimationFrame(animate);
})();

const spot = document.getElementById('cursorSpotlight');
addEventListener('mousemove', (e)=>{spot.style.left=`${e.clientX}px`; spot.style.top=`${e.clientY}px`;});
