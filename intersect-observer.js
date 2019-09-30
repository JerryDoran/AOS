const header = document.querySelector('header');
const sectionOne = document.querySelector('.home-intro');
const sectionOneOptions = {
  rootMargin: '-200px 0px 0px 0px'
};

const images = document.querySelectorAll('[data-src]');
const imageOptions = {
  threshold: 1,
  rootMargin: '0px 0px 300px 0px'
};

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}

const sectionOneObserver = new IntersectionObserver(
  (entries, sectionOneObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    });
  },
  sectionOneOptions
);

sectionOneObserver.observe(sectionOne);

const imageObserver = new IntersectionObserver((entries, imageObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imageObserver.unobserve(entry.target);
    }
  });
}, imageOptions);

images.forEach(image => {
  imageObserver.observe(image);
});
