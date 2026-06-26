// burger-menu

let isActiveMenu = false

const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', burgerMenuLogic);

const menuWrapper = document.querySelector('.header__mobile-wrapper');



menuWrapper.addEventListener('click', (e) => {
	let target = e.target;
	let windowWidth = window.innerWidth;

	if (isActiveMenu) {
		if (windowWidth > 700) {
			if (!target.closest('.header-menu__list')) {
				closeMenu()
			}
		} else {
			if (!target.closest('.header__mobile-body')) {
				closeMenu()
			}
		}
	}
})

function closeMenu() {
	burgerMenu.classList.remove('_active');
	document.querySelector('.header-menu').classList.remove('_active');
	document.body.classList.remove('_lock');
	isActiveMenu = false
}
function burgerMenuLogic() {
	burgerMenu.classList.toggle('_active');
	document.querySelector('.header-menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
	isActiveMenu ? isActiveMenu = false : isActiveMenu = true
}

const clearReseizeBlocks = document.querySelectorAll('[data-clear-transition]');

if (clearReseizeBlocks) {

	let resizeTimer;

	window.addEventListener("resize", clearReseizeFunction);

	function clearReseizeFunction() {
		clearReseizeBlocks.forEach(clearReseizeBlock => {
			clearReseizeBlock.classList.add("--resize-animation-stopper");
		});
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			clearReseizeBlocks.forEach(clearReseizeBlock => {
				clearReseizeBlock.classList.remove("--resize-animation-stopper");
			});
		}, 200);
	}
}
