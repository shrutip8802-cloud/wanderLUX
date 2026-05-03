# WanderLux Travel Agency Website

A responsive multi-page website built with HTML5, CSS3, and vanilla JavaScript for the ICT502 individual coding project.

## Files

- `index.html` – Home page with rotating banner and featured packages
- `destinations.html` – Services and featured destinations
- `calculator.html` – Trip cost calculator (JavaScript-powered)
- `appointment.html` – Appointment request form
- `about.html` – About the agency and team
- `contact.html` – Contact details, map, and email form
- `styles.css` – Single shared stylesheet (responsive)
- `script.js` – All JavaScript (slideshow, calculator, validation, animations)

## How to Run Locally

1. Download/extract the folder.
2. Double-click `index.html` to open in any modern browser.
   - Chrome, Firefox, Edge, and Safari are all supported.
3. Navigate using the top navigation bar.

## How to Host (Free)

### Option 1: GitHub Pages
1. Create a free account at github.com.
2. Create a new public repository (e.g., `wanderlux-travel`).
3. Upload all the files in this folder to the repository.
4. Go to **Settings → Pages**.
5. Under "Source", select branch `main` and folder `/ (root)`.
6. Click Save. Your site will be live at `https://<your-username>.github.io/wanderlux-travel/`

### Option 2: Netlify (drag & drop)
1. Go to https://app.netlify.com/drop
2. Drag the entire project folder onto the page.
3. Netlify gives you a free live URL instantly.

## Features

- Responsive design (desktop, tablet, mobile)
- Sticky navigation with mobile hamburger menu
- Auto-rotating image slideshow on home page
- Trip cost calculator with real-time JS calculation
- Three forms with full client-side validation
- Scroll-triggered fade-in animations using IntersectionObserver
- Embedded Google Map on contact page
- Mailto integration on contact form
- SEO meta tags and semantic HTML5 throughout
- Accessibility: alt text, ARIA labels, focus states, readable colour contrast

## Calculator Logic

```
Total = (daily_rate × travellers × days × style_multiplier) + (accommodation_per_night × days)
```

- Daily rates vary by destination (e.g., Bali $150, Japan $220, Maldives $300)
- Style multiplier: Budget 1.0, Standard 1.3, Luxury 2.0
- Accommodation per night: Budget $50, Standard $100, Luxury $250

Example: 2 travellers to Bali for 5 days, Standard style:
(150 × 2 × 5 × 1.3) + (100 × 5) = $2,450
