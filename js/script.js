 // a 클릭시 위로 튕김 방지
 $(document).on('click','a[href="#"]', function(e){
    e.preventDefault();
  })


//splitting.js
$(function(){
    Splitting();  //대문자로쓴다!!!
  });

// 스크롤라
$(function() {
   $('.animate').scrolla({
      mobile: true, //모바일버전시 활성화
      once: false //스크롤시 딱 한번만 하고싶을땐 true
   });    
  }); 


// header
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 60) {
    // 아래로 스크롤하면 헤더 숨김
    header.classList.remove("show");
    header.classList.add("hide");
  } else {
    // 위로 스크롤하면 헤더 보임
    header.classList.remove("hide");
    header.classList.add("show");
  }

  lastScroll = currentScroll;
});




// main visual
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const textHeight = document.querySelector('.value-scroll-content p').offsetHeight;

  // 기존 텍스트 스크롤 애니메이션 (HyoJu는 제외)
  gsap.to(".value-scroll-content p:not(.fix-txt)", {
    y: -textHeight,
    ease: "none",
    scrollTrigger: {
      trigger: ".value-scroll-layout",
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,
      // markers: true
    }
  });

  // 오른쪽 텍스트 스크롤
  gsap.to(".side-description", {
    y: 350,
    ease: "none",
    scrollTrigger: {
      trigger: ".value-scroll-layout",
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      // markers: true
    }
  });

ScrollTrigger.create({
  trigger: ".value-scroll-layout",
  start: "top top",
  end: "+=100%",
  scrub: true,
  onUpdate: () => {
    const createEl = document.querySelector(".Create");
    const rightEl = document.querySelector(".side-description");

    const createRect = createEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    // Create가 올라오다가, side-description과 시각적으로 겹치기 시작할 때
    if (createRect.bottom >= rightRect.top && createRect.top <= rightRect.bottom) {
      gsap.to(".underline-bar", {
        width: "100%",
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      gsap.to(".underline-bar", {
        width: "0%",
        duration: 0.2,
        ease: "power2.in",
        overwrite: true,
      });
    }
  },
});

});


// 보라색
document.addEventListener('DOMContentLoaded', () => {
  const glowTarget = document.querySelector('.side-description');

  function animateGlow() {
    gsap.to(glowTarget, {
      duration: gsap.utils.random(0.8, 1),
      ease: "sine.inOut",
      "--glow-x": `${gsap.utils.random(150, 100)}px`, // ← 왼쪽까지 들어오게
      "--glow-y": `${gsap.utils.random(50, 120)}px`,
      onComplete: animateGlow
    });
  }

  animateGlow();
});


// daily video
$(function(){
 gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger: {
      trigger: '.daily-video',   // ✅ 너 구조 기준으로 수정
      start:'top 50%',
      end:'top 0%',
      scrub:1,
      // markers: true  // 디버깅 중엔 true, 나중엔 지워도 됨
    }
  })
    .fromTo('.daily-video video',{width:'0', height:'0', top:'3%', duration:'10', ease:'elastic'},{width:'100%', height:'1200px', duration:'10', ease:'none', top:'0%' },0)



// introTxt
const introTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro .inner .box",
    start: "top 75%",
    end: "+=50%",
    scrub: 1,             // 스크롤에 따라 움직이게 (원하면 지우고 toggleActions 써도 됨)
    // toggleActions: "play none none reverse",
    // markers: true
  }
});

introTl
  // 오른쪽에서 들어오는 애들
  .fromTo(".intro .topBox .mainTxt",
          { xPercent: 100, opacity: 0 },
          { xPercent: 0,   opacity: 1, duration: 1, ease: "power3.out" }, 0)
  .fromTo(".intro .bottomBox .bottomTxt",
          { xPercent: 100, opacity: 0 },
          { xPercent: 0,   opacity: 1, duration: 1, ease: "power3.out" }, 0.10)
  .fromTo(".intro .K-Box",
          { xPercent: 100, opacity: 0 },
          { xPercent: 0,   opacity: 1, duration: 1, ease: "power3.out" }, 0.20)

  // 얘만 왼쪽에서 들어오기
  .fromTo(".intro .centerBox .centerTxt",
          { xPercent: -100, opacity: 0 },
          { xPercent: 0,    opacity: 1, duration: 1, ease: "power3.out" }, 0.15); 

// introcircle
(()=> {
  const el = document.querySelector('.circle-bg');
  if (!el) return;
  gsap.set(el, { transformOrigin: '50% 50%' });
  gsap.to(el, { rotation: 360, duration: 10, ease: 'none', repeat: -1 });
})();




// 어바웃 떠다니는 이미지
let index = 0;
const imagePaths = [
  'img/floatimg1.png',
  'img/floatimg2.png',
  'img/floatimg3.png',
  'img/floatimg4.png',
  'img/floatimg5.png'
];
const floatingWrapper = document.querySelector('.floating-images');
const aboutSection = document.querySelector('.about-Intro');
let lastTime = 0;
const delay = 200; // ✅ 150ms마다 한 번만 이미지 생성

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTime < delay) return;
  lastTime = now;

  const sectionRect = aboutSection.getBoundingClientRect();
  const inViewport = (
    e.clientY >= sectionRect.top &&
    e.clientY <= sectionRect.bottom
  );
  if (!inViewport) return;

  const img = document.createElement('img');
  img.src = imagePaths[index % imagePaths.length];
  img.classList.add('trail-img');
  img.style.left = `${e.clientX}px`;
  img.style.top = `${e.clientY}px`;

  floatingWrapper.appendChild(img);
  index++;

  setTimeout(() => {
    img.remove();
  }, 500); // CSS 애니메이션 시간과 맞춤
});




  // hobby
gsap.utils.toArray('.hobby .list li').forEach((card, index) => {
  const direction = index % 2 === 0 ? -1 : 1; // 왼쪽/오른쪽 번갈아 처리
  gsap.fromTo(card, 
    {rotate: 0,
      x: 0
    },
    {
      rotate: 20 * direction,
      x: 300 * direction,
      scrollTrigger: {
        trigger: '.hobby',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        // markers: true
      }
    }
  );
});



// strength
const allTxt = gsap.utils.toArray(".Strength .txt");

// 활성화 함수: 하나만 활성화, 나머지 다 끄기
function activateOnly(targetTxt) {
  allTxt.forEach(txt => {
    const keywords = txt.querySelectorAll(".keyword");

    if (txt === targetTxt) {
      txt.style.color = "#fff";
      gsap.to(keywords, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.3,
        overwrite: true
      });
    } else {
      txt.style.color = "#898989ff";
      gsap.to(keywords, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        overwrite: true
      });
    }
  });
}

// 초기화 함수: 모두 회색 & 키워드 숨김
function deactivateAll() {
  allTxt.forEach(txt => {
    txt.style.color = "#A5A5A5";
    gsap.to(txt.querySelectorAll(".keyword"), {
      opacity: 0,
      y: 20,
      duration: 0.2,
      overwrite: true
    });
  });
}

// 적용
allTxt.forEach(txt => {
  // ScrollTrigger 설정
  ScrollTrigger.create({
    trigger: txt,
    start: "top center",
    end: "top center",
    onEnter: () => activateOnly(txt),
    onEnterBack: () => activateOnly(txt),
    onLeave: () => deactivateAll(),
    onLeaveBack: () => deactivateAll(),
    // markers: true // 개발 시에만
  });

  // Hover 진입 시: 그 요소만 활성화
  txt.addEventListener("mouseenter", () => {
    activateOnly(txt);
  });

  // Hover 종료 시: 반드시 초기화
  txt.addEventListener("mouseleave", () => {
    deactivateAll();
  });
});


// experience
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function experienceImages() {
  const imgs = gsap.utils.toArray('.Experience .exp-img');

  // 초기엔 중앙에 겹친 상태로 "보이게"
  gsap.set(imgs, { opacity: 1 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.Experience',
      start: 'top 30%',
      toggleActions: 'play none none reverse',
      // markers: true
    }
  })
  .to(imgs[0], { x: -650, y: -200, duration: 1 }, 0)
  .to(imgs[1], { x: 450,  y: -350, duration: 1 }, 0)
  .to(imgs[2], { x: -700, y: 150,  duration: 1 }, 0)
  .to(imgs[3], { x: 600,  y: 50,  duration: 1 }, 0)
  .to(imgs[4], { x: -100, y: -350, duration: 1 }, 0)
  .to(imgs[5], { x: 250,  y: 300,  duration: 1 }, 0)
  .to(imgs[6], { x: -320, y: 350,  duration: 1 }, 0)
  .to(imgs[7], { x: -300, y: 250,  duration: 1 }, 0)
  .to(imgs[8], { x: 200, y: 150,  duration: 1 }, 0);
}

// ▼ 이미지까지 모두 로드된 뒤 실행(가장 확실)
window.addEventListener('load', () => {
  experienceImages();
  ScrollTrigger.refresh();
});

// story → 흰색
gsap.timeline({
  scrollTrigger: {
    trigger: '.story', 
    start: '10% 90%',
    end: 'top 60%',
    scrub: true,
    // markers: true
  }
})
.to('.wrap', { backgroundColor:'#fff', color:'#000', ease:'none', duration:5 }, 0);

// story txt
(() => {
  gsap.to(".txtEn", {
    color: "#858585",
    opacity: 1,
    duration: 3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".txtEn",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.to(".txtKor", {
    color: "#858585",
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".txtKor",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
})();


// philosophy
(() => {
  const OPTS = {
     characters: 'AEFHKNPRST',
    speed: 45
  };

  const targets = document.querySelectorAll('.philosophy .en2[data-words]');
  if (!targets.length || !window.baffle) return;

  targets.forEach((el, idx) => {
    let words = [];
    try {
      words = JSON.parse(el.dataset.words || '[]');
    } catch(e) {}
    if (!words.length) return;

    const bf = baffle(el, OPTS);
    let i = 0;

    function cycle() {
      i = (i + 1) % words.length;
      bf.start();
      bf.text(() => words[i]);
      bf.reveal(800, 100);
      setTimeout(cycle, 2200);
    }

    setTimeout(cycle, 600 + idx * 200);
  });
})();






// designIntro → 검정
gsap.timeline({
  scrollTrigger: {
    trigger: '.designIntro', 
    start: '10% 90%',
    end: '100% 100%',
    scrub: true,
    // markers: true
  }
})
.to('.wrap', { backgroundColor:'#101010', color:'#fff', ease:'none', duration:5 }, 0);



// design journey
gsap.timeline({
      scrollTrigger:{
         trigger:'.designIntro',
          start: 'top 40%',   // 뷰포트 하단 근처 들어와야 시작
      end: '100% 100%',
         scrub:1,
        //  markers:true
      }
   })
   .fromTo('.designIntro .mainTxt .word:first-child', { x: '-100%' }, { x: '0%', ease: 'none', duration: 5 }, 0)
.fromTo('.designIntro .mainTxt .word:last-child', { x: '100%' }, { x: '0%', ease: 'none', duration: 5 }, 0);



  // worklist horizontal scroll
  let sections = document.querySelectorAll(".workItem");
  let container = document.querySelector(".workTrack");
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "linear",
    scrollTrigger: {
      trigger: ".wroklist",
      pin: true,
      scrub: 1.5,
      end: () => "+=" + (window.innerWidth * (sections.length - 1)),
      // markers: true
    }
  });


// 동영상
  // 전역 커서 요소를 body에 추가
  const cursor = document.createElement('div');
cursor.classList.add('work-custom-cursor');
document.body.appendChild(cursor);

// 모든 imgBox에 공통 이벤트
document.querySelectorAll('#work .imgBox, .wroklis2 .imgBox').forEach((box, idx) => {
  const video = box.querySelector('.thumb-video');

  if (video) {
    // 첫 번째 li는 hover 필요 없이 자동재생
    if (idx === 0) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true; // 모바일 브라우저 호환
      video.currentTime = 0;
      video.play().catch(() => {});

      // 뷰포트 감지해서 보일 때만 재생/일시정지 (성능 최적화)
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.25 });
        io.observe(box);
      }
    } else {
      // 다른 li는 hover 시 재생/정지
      box.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play();
      });
      box.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  }

  // 마우스 움직임에 따라 커서 위치 이동
  box.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.display = 'block';
  });

  box.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
});


// worklistintro
const sec = document.querySelector(".work-intro");
const circle = sec.querySelector(".intro_circle");

gsap.timeline({
  scrollTrigger: {
    trigger: sec,
    start: "top top",
    end: "+=150%",
    scrub: 1.2,
    pin: true,
    // markers: true,
  }
})
.to(circle, { 
  scale: 0, 
  duration: 2.6, 
  ease: "power1.inOut" 
}, ">+=0.3");
















// worklist 2 
(function attachWroklis2Carousel(){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  function init(){
    const section = document.querySelector('.wroklis2');
    const track   = section ? section.querySelector('.conBox') : null;
    const slides  = track ? Array.from(track.querySelectorAll('.item')) : [];
    if (!track || slides.length < 3) {
      console.warn('[wroklis2] 슬라이더 초기화 불가: .conBox 또는 .item(3장 이상) 확인 필요');
      return;
    }

    const TRANSITION_MS = 650;
    const BASE_THRESHOLD   = 40;
    const MOBILE_THRESHOLD = 24;
    const THRESHOLD = window.matchMedia('(max-width: 1024px)').matches
      ? MOBILE_THRESHOLD
      : BASE_THRESHOLD;

    let iCurrent = 0;
    let iPrev    = wrap(iCurrent - 1, slides.length);
    let iNext    = wrap(iCurrent + 1, slides.length);
    let lock = false;

    let startX = 0;
    let dragging = false;
    let moved = false;
    let pid = null;

    applyState();

    // ===== 이벤트 바인딩 =====
    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup',    onPointerUp);
    track.addEventListener('pointercancel',onPointerCancel);

    track.addEventListener('click', (e) => {
      const a = e.target.closest('.btnBox a, .imgBox a');
      if (!a) return;

      if (moved) {   // 드래그 끝난 직후만 막기
        e.preventDefault();
      }
      moved = false;  // 항상 false로 초기화
    });

    window.addEventListener('keydown', onKey);

    // ---------- 유틸 ----------
    function wrap(n, m){ return (n + m) % m; }

    function applyState(){
      const showSet = new Set([iPrev, iCurrent, iNext]);
      slides.forEach((li, idx) => {
        li.removeAttribute('data-current');
        li.removeAttribute('data-previous');
        li.removeAttribute('data-next');
        li.style.removeProperty('--drag');
        li.style.removeProperty('--rotY');
        li.style.zIndex = '';

        const txtBox  = li.querySelector('.textBox');
        if (txtBox){
          txtBox.style.opacity = '0';
          txtBox.style.pointerEvents = 'none';
        }

        if (!showSet.has(idx)) {
          li.style.display = 'none';
          return;
        }
        li.style.display = '';

        if (idx === iCurrent) {
          li.setAttribute('data-current', '');
          li.style.zIndex = '30';
          if (txtBox){
            txtBox.style.opacity = '1';
            txtBox.style.pointerEvents = 'auto';
          }
        } else if (idx === iPrev) {
          li.setAttribute('data-previous', '');
          li.style.zIndex = '20';
        } else if (idx === iNext) {
          li.setAttribute('data-next', '');
          li.style.zIndex = '20';
        }
      });
    }

    function go(dir){
      if(lock) return;
      lock = true;
      if(dir === 1){
        iPrev = iCurrent;
        iCurrent = iNext;
        iNext = wrap(iCurrent + 1, slides.length);
      } else {
        iNext = iCurrent;
        iCurrent = iPrev;
        iPrev = wrap(iCurrent - 1, slides.length);
      }
      applyState();
      setTimeout(()=>{ lock = false; }, TRANSITION_MS);
    }

    function setDrag(px){
      const v = typeof px === 'number' ? `${px}px` : px;
      slides[iCurrent].style.setProperty('--drag', v);
      slides[iPrev].style.setProperty('--drag', v);
      slides[iNext].style.setProperty('--drag', v);
    }
    function clearDrag(){
      slides[iCurrent].style.removeProperty('--drag');
      slides[iPrev].style.removeProperty('--drag');
      slides[iNext].style.removeProperty('--drag');
    }

    // ---------- 드래그 핸들러 ----------
  function onPointerDown(e) {
  const btnLink = e.target.closest('.btnBox a');
  const imgLink = e.target.closest('.imgBox a');

  if (btnLink || imgLink) {
    // 버튼이나 이미지 링크 클릭 → 드래그 준비 안 함
    return;
  }

  // 그 외 영역만 드래그
  e.preventDefault(); // 드래그 시작 시에만 막음
  dragging = true;
  moved = false;
  startX = e.clientX;
  pid = e.pointerId;
  try { track.setPointerCapture(pid); } catch (_) {}
  track.classList.add('is-dragging');
}

function onPointerMove(e) {
  if (!dragging) return;
  const dx = e.clientX - startX;

  if (Math.abs(dx) > 3) {
    moved = true;
    e.preventDefault(); // 실제로 움직였을 때만 기본 이벤트 막음
  }

  setDrag(dx);
  const rot = Math.max(-18, Math.min(18, -dx / 20));
  slides[iCurrent].style.setProperty('--rotY', rot + 'deg');
}

track.addEventListener('click', (e) => {
  const a = e.target.closest('.btnBox a, .imgBox a');
  if (!a) return;

  if (moved) {
    // 드래그 끝난 직후라면 링크 막음
    e.preventDefault();
  }
  moved = false; // 항상 초기화
});


    function onPointerUp(e){
      if(!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');

      const dx = e.clientX - startX;

      if (Math.abs(dx) >= THRESHOLD) {
        const dir  = dx < 0 ? 1 : -1;
        const held = dx;
        go(dir);

        requestAnimationFrame(()=>{
          setDrag(held);
          requestAnimationFrame(()=>{
            setDrag(0);
            setTimeout(()=>{
              clearDrag();
              slides[iCurrent].style.removeProperty('--rotY');
            }, TRANSITION_MS + 20);
          });
        });
      } else {
        setDrag(0);
        setTimeout(()=>{
          clearDrag();
          slides[iCurrent].style.removeProperty('--rotY');
        }, TRANSITION_MS + 20);
      }

      if (pid != null) {
        try { track.releasePointerCapture(pid); } catch(_) {}
        pid = null;
      }
    }

    function onPointerCancel(){
      dragging = false;
      track.classList.remove('is-dragging');
      clearDrag();
      slides[iCurrent].style.removeProperty('--rotY');
      if (pid != null) {
        try { track.releasePointerCapture(pid); } catch(_) {}
        pid = null;
      }
    }

    function onKey(e){
      if(e.key === 'ArrowRight') go(1);
      if(e.key === 'ArrowLeft')  go(-1);
    }


// ===== 화살표 버튼 바인딩 =====
const prevBtn = section.querySelector('.carousel-nav .prev');
const nextBtn = section.querySelector('.carousel-nav .next');

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    if (!lock) go(-1); // ← 왼쪽(이전)
  });
  nextBtn.addEventListener('click', () => {
    if (!lock) go(1);  // → 오른쪽(다음)
  });
}

  }
})(); // ← IIFE 닫기


// 커서
(() => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  const core = cursor.querySelector('span');

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  const ease = 0.18; // 부드럽게 따라오는 속도

  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function loop() {
    x += (tx - x) * ease;
    y += (ty - y) * ease;

    // 회전/늘어남 제거 — 위치만 갱신
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    core.style.transform = 'scale(1, 1)';

    requestAnimationFrame(loop);
  }
  loop();
})();


// process
// 0) 중복 트윈 방지 + 스무딩
let __currentBG = null;
let __currentColor = null;
function applyTheme(bg, color) {
  if (__currentBG === bg && __currentColor === color) return; // 같은 색이면 스킵
  __currentBG = bg;
  __currentColor = color;
  gsap.to('.wrap', {
    backgroundColor: bg,
    color: color,
    duration: 0.25,       // 전환 스무딩
    overwrite: 'auto',
    immediateRender: false
  });
}

// 1) 제목 토글 (동일)
ScrollTrigger.create({
  trigger: '.process',
  start: 'top 80%',
  end: 'bottom center',
  toggleClass: { targets: '.process .title', className: 'active' },
  // markers: true,
});

// 2) 타이틀 텍스트 변경 (동일)
gsap.utils.toArray('.dataText').forEach(function (text) {
  const num = text.getAttribute('data-text');
  const counter = document.querySelector('.process .title');

  ScrollTrigger.create({
    trigger: text,
    start: '0 50%',
    end: '100% 50%',
    scrub: true,
    onEnter:     () => (counter.innerHTML = num),
    onEnterBack: () => (counter.innerHTML = num),
    // markers: true,
  });
});

// 3) 이미지 밝기 (필요 시 유지)
gsap.utils.toArray('.process > ul > li .imgBox li img').forEach(function (img) {
  ScrollTrigger.create({
    trigger: img,
    start: '0 50%',
    end: '100% 50%',
    scrub: true,
    // markers: true,
    onEnter: () => gsap.to(img, { filter: 'brightness(100%)' }),
  });
});

// 4) 배경/글자색 전환 - 깜빡임 방지 구성
//    각 .bg 항목에서는 '적용만' 한다. (onLeaveBack 제거)
gsap.utils.toArray('.process .bg').forEach(function (bg) {
  const bgColor   = bg.getAttribute('data-bgColor')   || '#fff';
  const textColor = bg.getAttribute('data-textColor') || '#000';

  ScrollTrigger.create({
    trigger: bg,
    start: 'top 75%',      // 경계 여유
    end:   'bottom 25%',
     scrub: true,     // 상태 전환 → scrub 불필요
    // markers: true,
    onEnter:     () => applyTheme(bgColor, textColor),
    onEnterBack: () => applyTheme(bgColor, textColor),
   
  });
});

// 5) 섹션 외곽 센티넬 - 섹션을 '완전히' 벗어날 때만 기본색 복귀
ScrollTrigger.create({
  trigger: '.process',
  start: 'top bottom',    // 섹션이 보이기 직전
  end:   'bottom top',    // 섹션이 완전히 사라질 때
  // markers: true,
  onLeave:     () => applyTheme('#101010', '#fff'),  // 아래로 통과
  onLeaveBack: () => applyTheme('#101010', '#fff'),  // 위로 통과
});



});


// topbutton
$(window).on('scroll', function () {
  if ($(this).scrollTop() > 200) {       
    $('.toTop').addClass('show');
  } else {
    $('.toTop').removeClass('show');
  }
});

// 클릭 시 스무스 스크롤
$(function () {
  $('.toTop-btn').on('click', function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 800);
  });
});