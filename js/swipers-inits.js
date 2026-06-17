// homepage

const homeDestinationSwiper = document.querySelector('.content-home-destinations__swiper');
if (homeDestinationSwiper) {
	const swiper = new Swiper(homeDestinationSwiper, {
		slidesPerView: 1.2,
		spaceBetween: 20,
		navigation: {
			nextEl: '.content-home-destinations__button-next',
			prevEl: '.content-home-destinations__button-prev',
		},
		speed: 500,

		breakpoints: {
			380: {
				slidesPerView: 1.5,
			},
			400: {
				slidesPerView: 1.5,
			},
			485: {
				slidesPerView: 2.2,
			},
			630: {
				slidesPerView: 2.32,
			},
			800: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 3.5,

			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 32,
			}
		},

		pagination: {
			el: '.content-home-destinations__pagination',
			type: 'bullets',
			clickable: true,
		},
	});
}

const homePartnersSwiper = document.querySelector('.content-home-partners__swiper');

if (homePartnersSwiper) {
	let swiperInstance = null;

	function initPartnersSwiper() {
		const width = window.innerWidth;
		let slides = 2;
		let gap = 12;

		// Визначаємо параметри для кожного брейкпоїнта (як у вашому ТЗ)
		if (width >= 768) {
			slides = 5;
			gap = 20;
		} else if (width >= 600) {
			slides = 4;
			gap = 12;
		} else if (width >= 450) {
			slides = 3;
			gap = 12;
		}

		const config = {
			slidesPerView: slides,
			spaceBetween: gap,
			grid: {
				rows: 2,
				fill: "row"
			},
			observer: true,
			observeParents: true,
			resizeObserver: true,
			navigation: {
				nextEl: '.content-home-partners__button-next',
				prevEl: '.content-home-partners__button-prev',
			},
			speed: 500,
			pagination: {
				el: '.content-home-partners__pagination',
				type: 'bullets',
				clickable: true,
			}
		};

		// Якщо слайдер вже існує — повністю видаляємо його перед створенням нового
		if (swiperInstance) {
			swiperInstance.destroy(true, true);
		}

		// Створюємо чистий слайдер під поточний екран
		swiperInstance = new Swiper(homePartnersSwiper, config);
	}

	// Перший запуск при завантаженні сторінки
	initPartnersSwiper();

	// Розумне відстеження ресайзу (спрацьовує ТІЛЬКИ коли реально змінюється кількість слайдів)
	let currentSlidesCount = swiperInstance ? swiperInstance.params.slidesPerView : 2;
	let resizeTimeout;

	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const width = window.innerWidth;
			let targetSlides = 2;

			if (width >= 768) targetSlides = 5;
			else if (width >= 600) targetSlides = 4;
			else if (width >= 450) targetSlides = 3;

			// Перезапускаємо Swiper тільки якщо змінився брейкпоїнт, щоб не смикати процесор на кожен піксель
			if (targetSlides !== currentSlidesCount) {
				currentSlidesCount = targetSlides;
				initPartnersSwiper();
			}
		}, 100);
	});

}

const homeReviewsSwiper = document.querySelector('.content-home-reviews__swiper');
if (homeReviewsSwiper) {
	const swiper = new Swiper(homeReviewsSwiper, {
		slidesPerView: 1.3,
		spaceBetween: 44,
		navigation: {
			nextEl: '.home-reviews__button-next',
			prevEl: '.home-reviews__button-prev',
		},
		speed: 500,

		breakpoints: {
		
			767: {
				slidesPerView: 2.37,
				spaceBetween: 60,
			},
			500: {
				slidesPerView: 1.6,
				spaceBetween: 44,
			}
		},

		pagination: {
			el: '.content-home-reviews__pagination',
			type: 'bullets',
			clickable: true,
		},
	});

}