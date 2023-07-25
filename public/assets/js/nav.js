
// switch circle
var switchWrapper = document.querySelectorAll('.switch-wrapper'),
	switchCircle = document.querySelectorAll('.switch-circle');

	for(let i = 0; i < switchWrapper.length; i++) {
		switchWrapper[i].addEventListener('click', () => {
		switchWrapper[i].classList.toggle('dark-blue-bg');
		switchWrapper[i].querySelector('.switch-circle').classList.toggle('switch-toggle');
		switchWrapper[i].querySelector('.switch-circle').classList.toggle('circle-border');
	})
};