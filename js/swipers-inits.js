// homepage

const categorySwipers = document.querySelectorAll('.content-category__swiper');
if (categorySwipers) {
	categorySwipers.forEach(categorySwiper => {
		const perentElement = categorySwiper.closest('.category')
		const swiper = new Swiper(categorySwiper, {
			slidesPerView: 'auto',
			spaceBetween: 0,
			observer: true,
			observeParents: true,
			resizeObserver: true,
			loop: true,
			navigation: {
				nextEl: perentElement.querySelector('.content-category__button-next'),
				prevEl: perentElement.querySelector('.content-category__button-prev'),
			},
			speed: 500,
			pagination: {
				el: categorySwiper.querySelector('.content-category__pagination'),
				type: 'bullets',
				clickable: true,
			},
		});
	});

}


const homePartnersSwipersWrappers = document.querySelectorAll('.content-home-partners__items');

if (homePartnersSwipersWrappers) {
	homePartnersSwipersWrappers.forEach(homePartnersSwipersWrapper => {
		const homePartnersSwipers = homePartnersSwipersWrapper.querySelectorAll('.content-home-partners__swiper');
		let firstSwiper = null;
		let secondSwiper = null;

		homePartnersSwipers.forEach(function (homePartnersSwiper, i) {
			const isFirst = i === 0;

			const swiperConfig = {
				slidesPerView: 2,
				spaceBetween: 12,

				loop: true,
				speed: 500,
				breakpoints: {
					768: { slidesPerView: 5, spaceBetween: 20 },
					600: { slidesPerView: 4, spaceBetween: 12 },
					450: { slidesPerView: 3, spaceBetween: 12 },
				}
			};

			if (homePartnersSwipers.length === 2) {
				if (isFirst) {
					swiperConfig.navigation = {
						nextEl: '.content-home-partners__button-next',
						prevEl: '.content-home-partners__button-prev',
					};
				} else {
					swiperConfig.pagination = {
						el: '.content-home-partners__pagination',
						type: 'bullets',
						clickable: true,
					};
				}
			} else {
				swiperConfig.navigation = {
					nextEl: '.content-home-partners__button-next',
					prevEl: '.content-home-partners__button-prev',
				};
				swiperConfig.pagination = {
					el: '.content-home-partners__pagination',
					type: 'bullets',
					clickable: true,
				};
			}



			const partnersSwiper = new Swiper(homePartnersSwiper, swiperConfig);

			if (isFirst) {
				firstSwiper = partnersSwiper;
			} else {
				secondSwiper = partnersSwiper;
			}
		});

		if (firstSwiper && secondSwiper) {
			firstSwiper.controller.control = secondSwiper;
			secondSwiper.controller.control = firstSwiper;
		}
	});
	
}
const homeReviewsSwiper = document.querySelector('.content-home-reviews__swiper');
if (homeReviewsSwiper) {
	const swiper = new Swiper(homeReviewsSwiper, {
		slidesPerView: 1.3,
		spaceBetween: 44,
		loop: true,
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


// categories page
const categoriesHeroSwiper = document.querySelector('.body-categories-hero__swiper');
if (categoriesHeroSwiper) {
	const swiper = new Swiper(categoriesHeroSwiper, {
		slidesPerView: 'auto',
		spaceBetween: 0,
		observer: true,
		observeParents: true,
		resizeObserver: true,

		speed: 500,

	});
}

// single product page

const mobileSwiperContainers = document.querySelectorAll('[data-mobile-only-swiper]');

if (mobileSwiperContainers) {
	const mobileSwipers = [];

	function toggleMobileSwipers() {
		const isMobile = window.innerWidth <= 480;

		mobileSwiperContainers.forEach((container, index) => {
			if (mobileSwipers[index]) {
				if (!isMobile) {
					mobileSwipers[index].destroy(true, true);
					mobileSwipers[index] = null;
				}
				return;
			}

			if (isMobile) {
				const swiper = new Swiper(container, {
					slidesPerView: 'auto',
					loop: true,
					// autoplay: {
					// 	delay: 5000,
					// },
					speed: 800,
					pagination: {
						el: `.${container.classList[0]} .pagination`,
						clickable: true,
					},

				});

				mobileSwipers[index] = swiper;
			}
		});
	}

	toggleMobileSwipers();

	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(toggleMobileSwipers, 120);
	});
}

