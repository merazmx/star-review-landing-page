
let currentRating = 0;
const feedbackTexts = {
  1: "Lamentamos tu experiencia. Por favor, cuéntanos cómo podemos mejorar.",
  2: "Gracias por tu feedback. Trabajaremos en mejorar.",
  3: "Apreciamos tu feedback y lo usaremos para mejorar nuestro servicio.",
  4: "¡Gracias por tu valoración positiva! Nos encantaría que compartas tu experiencia.",
  5: "¡Nos alegra que hayas tenido una gran experiencia! Considera dejar una reseña."
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initializeStarRating();
  loadBannerImage();
  loadTheme();
});

function initializeStarRating() {
  const container = document.getElementById('star-rating');
  container.innerHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('button');
    star.innerHTML = '★';
    star.className = 'btn btn-link fs-2 text-warning';
    star.onclick = () => handleRating(i);
    container.appendChild(star);
  }
}

function handleRating(rating) {
  currentRating = rating;
  updateStars();
  showFeedbackContent(rating);
}

function updateStars() {
  const stars = document.querySelectorAll('#star-rating button');
  stars.forEach((star, index) => {
    star.style.opacity = index < currentRating ? '1' : '0.5';
  });
}

function showFeedbackContent(rating) {
  const container = document.getElementById('feedback-content');
  
  if (rating >= 4) {
    container.innerHTML = `
      <div class="mt-4">
        <p class="mb-4">${feedbackTexts[rating]}</p>
        <button onclick="window.open('https://g.page/r/your-business-id/review', '_blank')" 
                class="btn btn-primary me-2">
          Reseña en Google
        </button>
        <button onclick="window.open('https://www.facebook.com/your-business/reviews', '_blank')" 
                class="btn btn-info">
          Reseña en Facebook
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="mt-4">
        <p class="mb-4">${feedbackTexts[rating]}</p>
        <form onsubmit="handleFeedbackSubmit(event)" class="text-start">
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Tu Nombre" required>
          </div>
          <div class="mb-3">
            <input type="email" class="form-control" placeholder="Tu Email" required>
          </div>
          <div class="mb-3">
            <textarea class="form-control" placeholder="Tu Feedback" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar Feedback</button>
        </form>
      </div>
    `;
  }
}

function handleFeedbackSubmit(event) {
  event.preventDefault();
  // Aquí iría la lógica para enviar el feedback al servidor
  alert('¡Gracias por tu feedback!');
  event.target.reset();
  currentRating = 0;
  updateStars();
  document.getElementById('feedback-content').innerHTML = '';
}

function setTheme(theme) {
  document.body.className = theme + '-theme';
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  setTheme(theme);
}

function loadBannerImage() {
  const bannerUrl = localStorage.getItem('bannerUrl') || '/placeholder.svg';
  document.getElementById('banner').style.backgroundImage = `url(${bannerUrl})`;
}
