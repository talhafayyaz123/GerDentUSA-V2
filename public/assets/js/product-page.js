// related products carasoul
$('.related-products-carasoul').slick({
  dots: false,
  infinite: true,
  arrow: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

let enlargeBtn = document.querySelector('.product-img-container'),
   enlargedImgWrapper = document.querySelector('.enlarged-img-wrapper'),
   enlargedImg = document.querySelector('.enlarged-img')

   enlargeBtn.addEventListener('click', ()=> {
      enlargedImgWrapper.classList.toggle('hidden')
      document.body.classList.add('body-height')
   })

   enlargedImgWrapper.addEventListener('click', () => {
      enlargedImgWrapper.classList.toggle('hidden')
      document.body.classList.remove('body-height')
   })

let reviewsBtn = document.querySelector('.reviews-btn'),
   descriptionBtn = document.querySelector('.description-btn'),
   productDetail = document.querySelector('.product-detail'),
   reviewPost = document.querySelector('.review-form');

   descriptionBtn.addEventListener('click', ()=> {
      if(productDetail.classList.contains('hidden')){
         productDetail.classList.remove('hidden')
         descriptionBtn.classList.add('dark-blue-color')
         reviewPost.classList.add('hidden')
         reviewsBtn.classList.remove('dark-blue-color')
      }
   })

   reviewsBtn.addEventListener('click', ()=> {
      if(reviewPost.classList.contains('hidden')){
         reviewPost.classList.remove('hidden')
         reviewsBtn.classList.add('dark-blue-color')
         descriptionBtn.classList.remove('dark-blue-color')
         productDetail.classList.add('hidden')
      }
   })

// Splitting();

// // product-page intro
// const g = gsap;

// function productIntroInit() {
// let productIntroTl = g.timeline({
//    defaults: {
//       duration: 1
//    }
// })

//    productIntroTl
//    .from('.product-img-wrapper',{
//       xPercent: -100
//    })
//    .from('.product-img-wrapper img',{
//       xPercent: 100
//    },'<')
//    .from('.enlarge-img',{
//       yPercent: 100,
//       autoAlpha: 0,
//       duration: 0.5
//    })   
//    .from('.product-title .char',{
//       autoAlpha: 0,
//       stagger: 0.025,
//       ease: 'expo.in'
//    },'<0.5')
//    .from('.product-sku, .availability-wrapper',{
//       autoAlpha: 0,
//       yPercent: 100,
//       stagger: 0.2,
//       duration: 0.5
//    },'<0.75')
//    .from('.product-description .char',{
//       autoAlpha: 0,
//       stagger: 0.01,
//       ease: 'expo.in'
//    },'<0.5')
//    .from('.price-wrapper, .product-quantity-wrapper',{
//       yPercent: 100,
//       autoAlpha: 0,
//       stagger: 0.2,
//       duration: 0.5
//    },'<0.75')
//    .from('.product-page-center-col .button-wrapper button',{
//       yPercent: 100,
//       autoAlpha: 0,
//       stagger: 0.1,
//       duration: 0.5
//    },'<0.5')
//    .from('.category-name',{
//        autoAlpha: 0,
//       yPercent: 100,
//       duration: 0.5
//    },'<0.5')
//    .from('.notice',{
//       autoAlpha: 0,
//       duration: 0.5
//    })
// }

// window.addEventListener('load', ()=> {
//   setTimeout(()=> {
//    productIntroInit()
//   },1000) 
// })

window.addEventListener('load', () => {
	window.scrollTo(0, 0);
  document.body.style.visibility = "visible";
})