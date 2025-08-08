const hour = new Date().getHours();
    const body = document.body;

    if (hour >= 5 && hour < 12) {
      body.classList.add("morning"); // 5am to 11:59am
    } else if (hour >= 12 && hour < 18) {
      body.classList.add("afternoon"); // 12pm to 5:59pm
    } else {
      body.classList.add("night"); // 6pm to 4:59am
    }
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
function showSlide(index) {
  const offset = index * -100;
  slides.style.transform = `translateX(${offset}%)`;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000); 