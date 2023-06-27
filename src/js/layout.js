const images = [
  "./src/image/main/banner_img_desktop.png",
  "./src/image/main/desktop/1920-1.jpg",
  "./src/image/main/desktop/1920-2.jpg",
  "./src/image/main/desktop/1920-3.jpg",
];

let currentIndex = 0;
const text = document.querySelector('.banner__slider__dot__text');
const dots = document.querySelectorAll(".banner__slider__dot__button");
const pauseIcon = document.querySelector('.pause');
const sliderImage = document.getElementById("sliderImage");

function showImage(index) {
  sliderImage.style.opacity = 0;
  setTimeout(() => {
    sliderImage.style.backgroundImage = `linear-gradient(to top , rgba(0,0,0,0.5) 0%,rgba(0,0,0,1) 10%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 40%,
    rgba(255,255,255,0) 100%),linear-gradient(to left , rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 5%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 40%,
    rgba(255,255,255,0) 100%),linear-gradient(to right , rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 10%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 40%,
    rgba(255,255,255,0) 100%), url(${images[index]})`;
    sliderImage.style.opacity = 1;
  }, 500); // 500ms => 0.5 초 뒤 다음 index로 가도록 구현.
  if (index == 1) {
    text.innerHTML = '두번째 텍스트';
  } else if (index == 2) {
    text.innerHTML = "세번째 텍스트";
  } else if (index == 3) {
    text.innerHTML = "마지막 텍스트";
  }
  else {
    text.innerHTML = '인생 2회차를 사는 드라마';
  }
}



function moveImage() {  //이미지가 자동 슬라이드 되도록 만들고 마우스가 이미지를 가르킬시 잠깐 멈추고 다시 마우스가 이미지 밖으로 나가면 슬라이드 되도록 만듬. 또한 정지 버튼을 누르면 이미지 슬라이드를 멈추고 다시 재생을 누르면 시작되게 만듬. => 중첩 현상이 발생해서 둘중에 하나만 구현이 가능함 .... 다른방법 모르겠음....
  timer = setInterval(() => {
    nextImage();
  }, 3000);

  sliderImage.addEventListener("mouseover", function () {
    clearInterval(timer);
  })
  sliderImage.addEventListener("mouseout", function () {
    timer = setInterval(() => {
      nextImage();
    }, 3000);
  })

  // if(pauseIcon.classList.contains('fa-play')){ 퍼스, 플레이 구현 실패
  //   clearInterval(timer);
  // }else{
  //   timer = setInterval(() => {
  //     nextImage();
  //   }, 3000);
  // }  재귀함수 불러오기도 x 


}



function prevImage() {  // 이전 버튼 누르면 이전 이미지 가장 낮은 인덱스이면 가장 높은 인덱스 이미지가 나올수 있도록 만듬
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
  dotMove()
}

function nextImage() {  //위와 반대로 작동
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  dotMove()
}

function dotMove() {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove('active');
    }
  })
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      currentIndex = index;
      showImage(currentIndex);
      dotMove();
    });
  });
}


// 꼼수 ....
pauseIcon.addEventListener('click', function () {
  pauseIcon.classList.toggle("fa-play");
})


// 스크롤시 header배경색 변경 구현
const banner = document.getElementById('mainbanner');
const bannerHeight = banner.getBoundingClientRect().height; 

window.addEventListener('scroll', function(){
  if( window.scrollY > bannerHeight){
    document.getElementById('scrollHeader').style.backgroundColor = 'black'
  }
  else{
    document.getElementById('scrollHeader').style.backgroundColor = 'transparent'
  }
})



showImage(currentIndex); // 서버 실행시 첫번째 index 이미지 화면에 랜더링 시켜주기 
document.querySelector(".banner__slider__prev").addEventListener("click", prevImage);
document.querySelector(".banner__slider__next").addEventListener("click", nextImage);
dotMove();
moveImage();