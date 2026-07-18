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

// dropdown Menu function
function selectMenu() {
	const selects = document.querySelectorAll('[data-select-menu]');

	// data-select-menu main data-atribute
	// data-select-menu-button open close dropdown menu
	// data-select-menu-value value of data-select-menu-button
	// data-select-menu-drop-down body of dropdown menu
	// data-select-menu-option options of dropdown menu

	if (selects) {

		document.documentElement.addEventListener('click', collapseSelects)

		selects.forEach(select => {

			const selectButton = select.querySelector('[data-select-menu-button]');
			const selectOptions = select.querySelectorAll('[data-select-menu-option]');

			selectButton.addEventListener('click', selectToggle)
			selectOptions.forEach(el => {
				el.addEventListener('click', selectChoose)
			});
		});



		function selectToggle(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]'),
				hiddenInput = parent.querySelector('[data-select-hidden-input]');
			parent.classList.toggle('_active')

			_slideToggle(selectBody, 300)
		}

		function selectChoose(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectValue = parent.querySelector('[data-select-menu-value]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]'),
				hiddenInput = parent.querySelector('[data-select-hidden-input]');


			let valueItem = this.innerText;
			selectValue.innerHTML = valueItem;
			hiddenInput.value = valueItem;

			if (parent.classList.contains('_active')) {
				if (hiddenInput.value === '') {
					hiddenInput.closest('.form-contact__item').classList.add('--error')
				} else {
					hiddenInput.closest('.form-contact__item').classList.remove('--error')
				}
			}

			hiddenInput.dispatchEvent(new Event('input'));
			parent.classList.remove('_active')
			_slideUp(selectBody, 300)
		}

		function collapseSelects(e) {
			const targetClick = e.target.closest('[data-select-menu]')
			selects.forEach(select => {
				if (!targetClick || targetClick !== select) {
					if (select.classList.contains('_active')) {
						select.classList.remove('_active')
						const selectBody = select.querySelector('[data-select-menu-drop-down]'),
							hiddenInput = select.querySelector('[data-select-hidden-input]');
						if (hiddenInput.value === '') {
							hiddenInput.closest('.form-contact__item').classList.add('--error')
						} else {
							hiddenInput.closest('.form-contact__item').classList.remove('--error')
						}
						_slideUp(selectBody, 300)
					}
				}
			});

		}

		let _slideUp = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = target.offsetHeight + 'px';
				target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				window.setTimeout(() => {
					target.style.display = 'none';
					target.style.removeProperty('height');
					target.style.removeProperty('padding-top');
					target.style.removeProperty('padding-bottom');
					target.style.removeProperty('margin-top');
					target.style.removeProperty('margin-bottom');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}
		}

		let _slideDown = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.removeProperty('display');
				let display = window.getComputedStyle(target).display;
				if (display === 'none')
					display = 'block'

				target.style.display = display;
				let height = target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				target.offsetHeight;
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = height + 'px';
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				window.setTimeout(() => {
					target.style.removeProperty('height');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}

		}

		let _slideToggle = (target, duration = 500) => {
			if (window.getComputedStyle(target).display === 'none') {
				return _slideDown(target, duration);
			} else {
				_slideUp(target, duration);
			}
		}
	}


}

selectMenu()

document.addEventListener('DOMContentLoaded', () => {
	const travelDates = document.querySelector('#travel_dates');

	if (travelDates) {

		const today = new Date();
		const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		flatpickr(travelDates, {
			minDate: 'today',
			disableMobile: true,          
			altInput: true,
			plugins: [
				new monthSelectPlugin({
					shorthand: false,     
					dateFormat: "m/Y",
					altFormat: "F Y"
				})
			],
			minDate: firstDayOfCurrentMonth,   
			onChange: function (selectedDates, dateStr, instance) {
				
				instance.element.dispatchEvent(new Event('input'));
			},
		});
	}
});



// form validation

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form-contact__form');

	if (!form) return;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	// const phoneRegex = /^\+?\d{1,4}?[\s.-]?\(?\d{1,3}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/
	function isValidGlobalPhone(phone) {
		const cleaned = phone.replace(/[^\d]/g, '');

		return cleaned.length >= 10 && cleaned.length <= 15;
	}

	function validateField(input) {
		const itemContainer = input.closest('.form-contact__item');
		if (!itemContainer) return true;

		let isValid = true;
		const value = input.value.trim();

		if (input.hasAttribute('required') && value === '') {
			isValid = false;
		}
		else if (input.type === 'email' && value !== '') {
			isValid = emailRegex.test(value);
		}
		else if (input.id === 'phone_number' && value !== '') {
			isValid = isValidGlobalPhone(value);
		}
		else if (input.type === 'number' && value !== '') {
			if (parseInt(value, 10) <= 0) {
				isValid = false;
			}
		} else if (input.id === 'travel_dates') {
			input.addEventListener('input', () => validateField(input));
		}

		if (!isValid) {
			itemContainer.classList.add('--error');
		} else {
			itemContainer.classList.remove('--error');
		}

		return isValid;
	}

	form.querySelectorAll('.form-contact__input, input[type="hidden"]').forEach(input => {
		input.addEventListener('blur', () => validateField(input));
		if (input.id === 'travel_dates') {
			input.addEventListener('input', () => validateField(input));
		}
	});

	form.addEventListener('submit', (event) => {
		let isFormValid = true;

		const requiredInputs = form.querySelectorAll('[required]');

		requiredInputs.forEach(input => {
			const isFieldValid = validateField(input);
			if (!isFieldValid) {
				isFormValid = false;
			}
		});

		if (!isFormValid) {
			event.preventDefault();

			const firstError = form.querySelector('.--error');
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		} else {
			console.log('The form has been successfully validated and submitted!');
		}
	});
});

// pop ups


// contact page pop up

const popups = document.querySelectorAll('[data-popup]');

if (popups) {
	popups.forEach(popup => {

		setTimeout(() => {
			popup.classList.add('_active')
			document.body.classList.add('_lock')
		}, 5000);

		popup.addEventListener('click', (e) => {
			const target = e.target
			if (!target.closest('[data-popup-wrapper]') || target.closest('[data-popup-close]')) {
				document.body.classList.remove('_lock')
				popup.classList.remove('_active')
			}
		})
	});
}

// main popup

const scrollingPopups = document.querySelectorAll('[data-scrolling-popup]');
if (scrollingPopups) {
	const header = document.querySelector('.header'),
		footer = document.querySelector('.footer');
	window.addEventListener('scroll', (e) => {
		let scrollDistance = window.scrollY
		let showScrollHeader = scrollDistance > header.offsetHeight ? true : false,
			isScrollToFooter = scrollDistance + window.innerHeight > footer.offsetTop ? true : false
				scrollingPopups.forEach(scrollingPopup => {
					if (showScrollHeader && !isScrollToFooter) {
						scrollingPopup.classList.add('_active')
					} else {
						scrollingPopup.classList.remove('_active')
					}
				});

	})
}


// copy text funcion

const copyButtons = document.querySelectorAll('[data-copy-button]');

copyButtons.forEach(button => {
	button.addEventListener('click', () => {
		const targetTextElement = button.querySelector('[data-copy-text]');

		if (targetTextElement) {
			const textToCopy = targetTextElement.textContent.trim();

			navigator.clipboard.writeText(textToCopy)
				.then(() => {
					button.classList.add('_copied');

					setTimeout(() => {
						button.classList.remove('_copied');
					}, 1000);
				})
		}
	});
});