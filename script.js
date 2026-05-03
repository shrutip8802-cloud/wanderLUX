/* ============================================
   WanderLux Travel Agency - Main JavaScript
   ============================================ */

/* ---------- MOBILE NAV TOGGLE ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}

/* ---------- HERO SLIDESHOW ---------- */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
  setInterval(showNextSlide, 4000);
}

/* ---------- SCROLL FADE-IN ANIMATIONS ---------- */
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));

/* ---------- TRIP COST CALCULATOR ---------- */
const calcForm = document.getElementById('calcForm');

if (calcForm) {
  // Daily base cost per traveller for each destination
  const destinationRates = {
    bali: 150,
    thailand: 140,
    japan: 220,
    europe: 280,
    dubai: 240,
    sydney: 190,
    singapore: 200,
    maldives: 300
  };

  // Travel style multiplier
  const styleMultiplier = {
    budget: 1.0,
    standard: 1.3,
    luxury: 2.0
  };

  // Flat accommodation cost per night (per booking, not per traveller)
  const accommodationRates = {
    budget: 50,
    standard: 100,
    luxury: 250
  };

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get inputs
    const destination = document.getElementById('destination').value;
    const travellers = parseInt(document.getElementById('travellers').value);
    const days = parseInt(document.getElementById('days').value);
    const style = document.getElementById('style').value;

    // Validation
    let valid = true;
    document.getElementById('destError').textContent = '';
    document.getElementById('travError').textContent = '';
    document.getElementById('daysError').textContent = '';
    document.getElementById('styleError').textContent = '';

    if (!destination) {
      document.getElementById('destError').textContent = 'Please choose a destination.';
      valid = false;
    }
    if (!travellers || travellers < 1) {
      document.getElementById('travError').textContent = 'Enter at least 1 traveller.';
      valid = false;
    }
    if (!days || days < 1) {
      document.getElementById('daysError').textContent = 'Enter at least 1 day.';
      valid = false;
    }
    if (!style) {
      document.getElementById('styleError').textContent = 'Please choose a travel style.';
      valid = false;
    }

    if (!valid) return;

    // Calculation:
    // (daily rate * travellers * days * style multiplier) + (accommodation rate * days)
    const dailyRate = destinationRates[destination];
    const multiplier = styleMultiplier[style];
    const accomm = accommodationRates[style];

    const travelCost = dailyRate * travellers * days * multiplier;
    const accommodationCost = accomm * days;
    const total = Math.round(travelCost + accommodationCost);

    // Format destination name nicely
    const destName = destination.charAt(0).toUpperCase() + destination.slice(1);
    const styleName = style.charAt(0).toUpperCase() + style.slice(1);

    // Display result
    const resultBox = document.getElementById('resultBox');
    document.getElementById('totalCost').textContent = '$' + total.toLocaleString();
    document.getElementById('costNote').textContent =
      `Estimated cost for ${travellers} traveller(s) to ${destName} for ${days} day(s): $${total.toLocaleString()} – ${styleName} Travel Package.`;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ---------- APPOINTMENT FORM VALIDATION ---------- */
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Clear errors
    document.querySelectorAll('#appointmentForm .error-msg').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('preferredDate').value;
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) {
      document.getElementById('nameError').textContent = 'Please enter your full name.';
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      valid = false;
    }

    const phonePattern = /^[0-9+\s\-()]{8,}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number.';
      valid = false;
    }

    if (!date) {
      document.getElementById('dateError').textContent = 'Please pick a preferred date.';
      valid = false;
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        document.getElementById('dateError').textContent = 'Date cannot be in the past.';
        valid = false;
      }
    }

    if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (valid) {
      document.getElementById('appointmentSuccess').style.display = 'block';
      appointmentForm.reset();
      setTimeout(() => {
        document.getElementById('appointmentSuccess').style.display = 'none';
      }, 5000);
    }
  });
}

/* ---------- CONTACT FORM (sends email via mailto) ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    document.querySelectorAll('#contactForm .error-msg').forEach(el => el.textContent = '');

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (name.length < 2) {
      document.getElementById('cNameError').textContent = 'Please enter your name.';
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('cEmailError').textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (subject.length < 3) {
      document.getElementById('cSubjectError').textContent = 'Please enter a subject.';
      valid = false;
    }

    if (message.length < 10) {
      document.getElementById('cMessageError').textContent = 'Message must be at least 10 characters.';
      valid = false;
    }

    if (valid) {
      // Open user's email client with a pre-filled email
      const mailtoLink = `mailto:info@wanderlux.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      window.location.href = mailtoLink;

      document.getElementById('contactSuccess').style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        document.getElementById('contactSuccess').style.display = 'none';
      }, 5000);
    }
  });
}
