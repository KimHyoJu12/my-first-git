 // a 클릭시 위로 튕김 방지
 $(document).on('click','a[href="#"]', function(e){
  e.preventDefault();
})


//splitting.js
$(function () {
  Splitting(); // 처음 한 번 실행

  $('.animate').scrolla({
    mobile: true,
    once: false
  });

  $(window).on('scroll', function () {
    $('.animate').each(function () {
      if ($(this).hasClass('animated') && !$(this).hasClass('motion')) {
        $(this).addClass('motion');
        Splitting({ target: this });
      }
    });
  });
});

// 스크롤라
$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
  }); 



// 프로덕트 스크롤라
// 스크롤에 따라 카드 움직이는 함수
function scrollHandler() {
  const listItems = document.querySelectorAll('.product .inner .right ul li');
  const scrollY = window.scrollY;

  listItems.forEach((el) => {
    const baseY = parseFloat(el.dataset.base);
    const speed = parseFloat(el.dataset.speed);
    const moveY = scrollY * speed;
    el.style.transform = `translateY(${baseY + moveY}px)`;
  });
}

// 패럴랙스 초기화 함수
function initParallax() {
  const listItems = document.querySelectorAll('.product .inner .right ul li');

  // 먼저 기존 스크롤 이벤트 제거 (중복 방지)
  window.removeEventListener('scroll', scrollHandler);

  if (window.innerWidth > 1279) {
    console.log('🌀 패럴랙스 적용됨');

    listItems.forEach((el, i) => {
      const baseY = (i % 2 === 1) ? -300 : 200; // 홀수, 짝수 카드
      const speed = (i % 2 === 0) ? -0.15 : 0.05;

      el.dataset.base = baseY;
      el.dataset.speed = speed;
      el.style.transform = `translateY(${baseY}px)`;
    });

    window.addEventListener('scroll', scrollHandler);

  } else {
    console.log('📴 패럴랙스 비활성화');

    listItems.forEach((el) => {
      el.style.transform = 'none'; // 패럴랙스 초기화
    });
  }
}

// 문서 처음 로딩할 때
window.addEventListener('load', initParallax);

// 창 크기 바뀔 때마다
window.addEventListener('resize', initParallax);



    //   픽스헤더
    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();
      const visualHeight = $('.visual').outerHeight(); // 비주얼 섹션 높이
    
      if (scrollTop > 100) {
        $('header').addClass('hide');
      } else if (scrollTop <= visualHeight) {
        $('header').removeClass('hide');
      }
    });
    // // 자바스크립트에 내장된 함수에는 ','' 쓰지 않음



    // 숫자 카운트
  let globalInView = false;  // Global이 화면 안에 있는지 여부 추적

function animateScroll() {
  const singleDigitHeight = 180;
  const targetDigitIndex = 10;
  const targetY = -singleDigitHeight * targetDigitIndex;
  const duration = 3000;
  const track = $('.track');

  const start = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(time) {
    let progress = (time - start) / duration;
    if (progress > 1) progress = 1;

    const eased = easeOutQuart(progress);
    const currentY = targetY * eased;

    track.css('transform', `translateY(${currentY}px)`);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

$(window).on('scroll', function () {
  $('.animate').each(function () {
    const $this = $(this);

    // 아직 motion이 안붙은 경우 → 기존처럼 동작
    if ($this.hasClass('animated') && !$this.hasClass('motion')) {
      $this.addClass('motion');
      Splitting({ target: this });
    }

    // 글로벌 섹션 감지용 → 화면에 있을 때만 실행 (반복 가능)
    if ($this.hasClass('global')) {
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();
      const offsetTop = $this.offset().top;
      const sectionHeight = $this.outerHeight();

      // 섹션이 화면 안에 있을 때만!
      if (scrollTop + windowHeight > offsetTop && scrollTop < offsetTop + sectionHeight) {
        if (!globalInView) {
          animateScroll();     // 진입 시 한 번 실행
          globalInView = true; // 상태 ON
        }
      } else {
        globalInView = false;  // 뷰포트에서 벗어나면 다시 실행 가능하게 리셋
      }
    }
  });
});


// 커스텀 커서
$(document).ready(function(){
  const $cursor = $(".custom-cursor");
  const $circle = $(".custom-cursor-circle");

  // 마우스 움직일 때 위치 따라가게
  $(window).on("mousemove", function(e){
    $cursor.css({
      left: e.clientX + "px",
      top: e.clientY + "px"
    });
    $circle.css({
      left: e.clientX + "px",
      top: e.clientY + "px"
    });
    
  });

  // 특정 요소에서만 보이게
  $(".vision .tit, .product .inner .right ul li ").on("mouseenter", function(){
    $cursor.css("opacity", 1);
    $circle.css("opacity", 0.4);
  }).on("mouseleave", function(){
    $cursor.css("opacity", 0);
    $circle.css("opacity", 0);
  });
});


// 탑버튼
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 10) {
    $(".button").addClass("show");
  } else {
    $(".button").removeClass("show");
  }
});

// 클릭 시 상단으로 스무스 스크롤
$(function(){
  $('.topbtn').on('click',function(){
   const top = $('body').offset().top;
  // offset()함수는 원하는 선택자의 위치값을 .top .left...형식으로 반환
  $('html, body').animate({scrollTop :(top)},800);
  })
});


// 배경 움직임
$(function () {
  function applySwimParallax(sectionSelector, imgSelector, rotateRange = 10) {
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentX = 0;
    let currentY = 0;

    $(sectionSelector).on('mousemove', function (e) {
      const offset = $(this).offset();
      const x = e.pageX - offset.left;
      const y = e.pageY - offset.top;
      const centerX = $(this).width() / 2;
      const centerY = $(this).height() / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // 반대 방향 회전 (물장구 느낌!)
      targetRotateY = percentX * rotateRange; // 좌우
      targetRotateX = -percentY * rotateRange; // 상하 (마우스 위로 가면 아래로 숙이기)
    });

    $(sectionSelector).on('mouseleave', function () {
      targetRotateX = 0;
      targetRotateY = 0;
    });

    function animate() {
      currentX += (targetRotateX - currentX) * 0.1;
      currentY += (targetRotateY - currentY) * 0.1;

      const transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      $(sectionSelector).find(imgSelector).css('transform', transform);

      requestAnimationFrame(animate);
    }

    animate();
  }
  applySwimParallax('.vision', '.bgimg img', 20);
  applySwimParallax('.global', '.bg-img img', 20);
  applySwimParallax('.customer', '.mainbg img', 20);
});

// nav
$(function() {
  $('.list > li').on('mouseenter', function() {
    if (!$('header').hasClass('hide-opacity')) { // ✅ 이거 추가
      $('header').addClass('on');
    }
    $('.list .inner').removeClass('on');
    $(this).find('.inner').addClass('on'); 
  });

  $('.list > li').on('mouseleave', function() {
    if (!$('header').hasClass('hide-opacity')) { // ✅ 이거 추가
      $('header').removeClass('on');
    }
    $(this).find('.inner').removeClass('on'); 
  });
});

// li 차례대로 나타나기
$(function(){
  $('.list > li').on('mouseenter', function() {
    const $items = $(this).find('.inner li');
    $items.each(function(index) {
      $(this).css({
        'opacity': '0',
        'transition': 'all 0.7s ease',
        'transition-delay': (index * 0.2) + 's'
      });
      // 브라우저 강제로 다시 계산 (리플로우)해서 트리거 걸기
      $(this)[0].offsetHeight;
      $(this).css({
        'opacity': '1',
        'transform': 'translateY(0)'
      });
    });
  });

  $('.list > li').on('mouseleave', function() {
    $(this).find('.inner li').css({
      'opacity': '0',
      'transition': 'all 0.3s ease',
      'transition-delay': '0s'
    });
  });
});




// $(function () {
//   $('.gnb > li').on('mouseenter', function () {
//     $('header').addClass('on');
//     $('.gnb .inner').removeClass('on'); // 먼저 전체 제거하고
//     $(this).find('.inner').addClass('on'); // 해당 li만 on
//   });

//   $('header').on('mouseleave', function () {
//     $('header').removeClass('on');
//     $('.gnb .inner').removeClass('on');
//   });
// });


// 메뉴랩
$(function() {
  let menuOpen = false; // 메뉴 열렸는지 상태 변수

  // 햄버거 클릭
  $('.gbnbtn').on('click', function(e){
    e.preventDefault();

    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    $('.gbnbtn').addClass('active');
    $('.menuWrap').removeClass('fadeout').addClass('on motion');
    $('header').addClass('hide-opacity');
    menuOpen = true;
    $('body').css('overflow', 'hidden');
  }

  function closeMenu() {
    $('.gbnbtn').removeClass('active');
    $('.menuWrap').removeClass('on motion').addClass('fadeout');
    $('header').removeClass('hide-opacity');
    menuOpen = false;
    $('body').css('overflow', '');
  }

  // 메뉴 페이드아웃 끝나면 fadeout 클래스 제거
  $('.menuWrap').on('transitionend', function(e){
    if ($(this).hasClass('fadeout') && e.originalEvent.propertyName === 'opacity') {
      $(this).removeClass('fadeout');
    }
  });

  // 스크롤 감지 (메뉴가 안 열렸을 때만 작동)
  $(window).on('scroll', function() {
    if (menuOpen) return; // 메뉴 열렸으면 스크롤 감지 안 함
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 100) {
      $('header').addClass('hide-opacity');
    } else {
      $('header').removeClass('hide-opacity');
    }
  });
});




// 반응형 슬릭
function slickInit() {
  if ($(window).width() <= 1279) {
    if (!$('.product-slide').hasClass('slick-initialized')) {
      $('.product-slide').slick({
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: false,
        variableWidth: false,
        swipeToSlide: true,
        touchMove: true,
        draggable: true,
      });
    }
  } else {
    if ($('.product-slide').hasClass('slick-initialized')) {
      $('.product-slide').slick('unslick');
    }
  }
}

$(window).on('load resize', function () {
  slickInit();
});


// $('.multiple-items').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 3
// });

// function initProductSlick() {
//   const $slider = $('.product .inner .right ul');

//   if (window.innerWidth <= 1279) {
//     if (!$slider.hasClass('slick-initialized')) {
//       $slider.slick({
//         slidesToShow: 2.5,
//         slidesToScroll: 1,
//         infinite: false,
//         arrows: false,
//         dots: false,
//         variableWidth: false,
//         swipeToSlide: true,
//         touchMove: true,
//         draggable: true,
//       });
//     }
//   } else {
//     if ($slider.hasClass('slick-initialized')) {
//       $slider.slick('unslick');
//     }
//   }
// }

// $(window).on('load resize', function () {
//   initProductSlick();
// });