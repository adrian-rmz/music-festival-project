document.addEventListener('DOMContentLoaded', function() {
    startApp();
})

function startApp() {
    fixedNavegation();
    createGallery();
    scrollNav();
}

function fixedNavegation() {
    const navBar = document.querySelector('.header');
    const aboveFestival = document.querySelector('.above-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if (aboveFestival.getBoundingClientRect().top <= 0) {
            navBar.classList.add('fixed');
            body.classList.add('body-scroll');
        } else {
            navBar.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const headerLinks = document.querySelectorAll('.principal-navegation a');
    headerLinks.forEach( link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollSection = e.target.attributes.href.value;
            const section = document.querySelector(scrollSection);
            section.scrollIntoView({behavior:'smooth'});
        });
    });
}

function createGallery() {
    const gallery = document.querySelector('.gallery-images');

    for (let i = 1; i <= 8; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
        <img class="gallery-image" src="media/images/Gallery ${i}.jpg" alt="Gallery Image ${i}">`;

        image.onclick = function() {
            showImage(i);
        }
        gallery.appendChild(image);  
    }
}


function showImage(id) {
    const image = document.createElement('PICTURE');
        image.innerHTML = `
        <img class="overlay-image" src="media/images/Gallery ${id}.jpg" alt="Gallery Image ${id}">`;

    // Overlay Image Creation
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('BODY');
        body.classList.remove('fix-body');
        overlay.remove();
    }

    // Overlay Close Button Creation
    const closeImage = document.createElement('P');
    closeImage.textContent = 'X';
    closeImage.classList.add('close-button');
    closeImage.onclick = function() {
        const body = document.querySelector('BODY');
        body.classList.remove('fix-body');
        overlay.remove();
    };
    overlay.appendChild(closeImage);

    // Add Overlay to the HTML File
    const body = document.querySelector('BODY');
    body.appendChild(overlay);
    body.classList.add('fix-body');
}