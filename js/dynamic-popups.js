document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[data-popup-trigger]');
  if (!triggers.length) return;
  
  const popupCache = new Map();
  const popupElementsCache = new Map();
  let popupsData = null;
let loadingPromise = null; 

async function loadPopupsData() {
  if (popupsData) return popupsData;
  
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const response = await fetch('api/destinations.json');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      popupsData = data.destinations || data;

      popupsData.forEach(item => {
        popupCache.set(item.id, item);
      });

      return popupsData;
    } catch (error) {
      console.error('Failed to load popups data:', error);
      return null;
    } finally {
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}

  async function getPopupData(id) {
    if (popupCache.has(id)) {
      return popupCache.get(id);
    }

    await loadPopupsData();
    return popupCache.get(id) || null;
  }


function createPopupHTML(popupData) {
  const descriptionHTML = popupData.description.map(part => {
    if (typeof part === 'string') {
      return `<p>${part}</p>`;
    } else if (part.type === 'list') {
      return `<ul>${part.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }
    return '';
  }).join('');
  const hasList = popupData.description.some(item => item && item.type === "list");

  return `
    <div class="content-category-popup" data-popup="${popupData.id}" data-clear-transition>
      <div class="content-category-popup__wrapper" data-popup-wrapper>
        <button type="button" class="content-category-popup__close-button" aria-label="close popup" data-popup-close>
          <svg>
            <use xlink:href='img/icons/icons-sprite.svg#close-icon'></use>
          </svg>
        </button>
        <div class="content-category-popup__body">
          <div class="content-category-popup__map">
            <div class="content-category-popup__image-loader">
              <img src="${popupData.mapSrc || ''}" 
                   width="426" height="426"
                   loading="lazy" 
                   decoding="async" 
                   alt="map"
                   onerror="this.style.display='none'"
                   onload="this.nextElementSibling.style.display='none'">
              <div class="skeleton-loader"></div>
            </div>
          </div>
          <div class="content-category-popup__content">
            <div class="content-category-popup__gallery">
              <div class="content-category-popup__image ibg">
                <div class="content-category-popup__image-loader">
                  <img src="${popupData.firstGallertImageSrc || ''}" 
                       width="268" height="153" 
                       loading="lazy" 
                       decoding="async" 
                       alt="gallery-image"
                       onerror="this.style.display='none'"
                       onload="this.nextElementSibling.style.display='none'">
                  <div class="skeleton-loader"></div>
                </div>
              </div>
              <div class="content-category-popup__image ibg">
                <div class="content-category-popup__image-loader">
                  <img src="${popupData.secondGallertImageSrc || ''}" 
                       width="268" height="153" 
                       loading="lazy" 
                       decoding="async" 
                       alt="gallery-image"
                       onerror="this.style.display='none'"
                       onload="this.nextElementSibling.style.display='none'">
                  <div class="skeleton-loader"></div>
                </div>
              </div>
            </div>
            <h4 class="content-category-popup__title">${popupData.title || ''}</h4>
            <div class="content-category-popup__description ${hasList ? "" : "content-category-popup__description-centered"}">${descriptionHTML}</div>
            <a href="contact.html" class="content-category-popup__button button button-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

   const handleEscape = (e) => {
      if (e.key === 'Escape') {
		const activePopup = document.querySelector('[data-popup]._active')
		if (activePopup){
			
        closePopup(activePopup);
		}
      }
    };
  function closePopup(popup) {
    if (!popup) return;
    popup.classList.remove('_active');
    popup.classList.remove('_preparing');
    document.body.classList.remove('_lock');
  }

  function initPopupEvents(popup) {
    popup.addEventListener('click', (e) => {
      const target = e.target;
      const wrapper = popup.querySelector('[data-popup-wrapper]');
      const closeBtn = target.closest('[data-popup-close]');
      
      if (!wrapper || closeBtn || !wrapper.contains(target)) {
        closePopup(popup);
      }
    });

  }

    

  function openPopupWithAnimation(popup) {
    
    popup.classList.add('_preparing');
    
    if (!popup.parentNode) {
      document.body.appendChild(popup);
    }
    
    void popup.offsetHeight;
    
    requestAnimationFrame(() => {
      popup.classList.remove('_preparing');
      popup.classList.add('_active');
    });
  }

  async function handleTriggerClick(e, trigger) {
    e.preventDefault();
    const id = trigger.dataset.popupTrigger;
    
    popupElementsCache.forEach((p, key) => {
      if (key !== id && p.classList.contains('_active')) {
        closePopup(p);
      }
    });
    
    let popup = popupElementsCache.get(id);
    
    if (!popup) {
      try {
        const popupData = await getPopupData(id);
        
        if (!popupData) {
          console.warn(`Popup data not found for id: ${id}`);
          return;
        }

        const html = createPopupHTML(popupData);
        document.body.insertAdjacentHTML('beforeend', html);
        popup = document.body.lastElementChild;
        
        popupElementsCache.set(id, popup);
        initPopupEvents(popup);
        
        openPopupWithAnimation(popup);
        document.body.classList.add('_lock');
        
      } catch (error) {
        console.error('Error creating popup:', error);
        return;
      }
    } else {
      openPopupWithAnimation(popup);
      document.body.classList.add('_lock');
    }
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => handleTriggerClick(e, trigger));
  });

   document.addEventListener('keydown', handleEscape);


  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadPopupsData());
  } else {
    setTimeout(() => loadPopupsData(), 2000);
  }
});