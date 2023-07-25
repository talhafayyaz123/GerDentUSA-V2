window.addEventListener('load', () => {
   removeCategoryImgs()
	window.scrollTo(0, 0);
  document.body.style.visibility = "visible";
})

let categoryImg = document.querySelectorAll('.category-product-img')

function removeCategoryImgs () {
  if(window.matchMedia('(max-width:768px)').matches) {
    categoryImg.forEach((img) => {
      img.classList.remove('lazyload')
    }) 
  } else {
      categoryImg.forEach((img) => {
      img.classList.add('lazyload')
    })
    }
}

window.addEventListener('resize', () => {
  removeCategoryImgs()
})