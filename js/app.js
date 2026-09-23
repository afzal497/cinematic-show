const seatPricing = { regular: 180, premium: 250, recliner: 350 };

function getSeatPrice(type) {
  return seatPricing[type] || seatPricing.regular;
}

const appUtils = {
  storageKeys: {
    city: 'cinematicShowCity',
    favorites: 'cinematicShowFavorites',
    recent: 'cinematicShowRecent',
    bookings: 'cinematicShowBookings',
    bookingState: 'cinematicShowBookingState',
    coupon: 'cinematicShowCoupon'
  },

  read(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return fallback;
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  },

  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  },

  setCity(city) {
    appUtils.write(appUtils.storageKeys.city, city);
    document.querySelectorAll('[data-location-select]').forEach((select) => {
      select.value = city;
    });
  },

  getCity() {
    return appUtils.read(appUtils.storageKeys.city, 'Trichy');
  },

  toggleFavorite(id) {
    const favorites = appUtils.read(appUtils.storageKeys.favorites, []);
    const index = favorites.indexOf(id);
    if (index >= 0) favorites.splice(index, 1);
    else favorites.push(id);
    appUtils.write(appUtils.storageKeys.favorites, favorites);
    return favorites;
  },

  isFavorite(id) {
    return appUtils.read(appUtils.storageKeys.favorites, []).includes(id);
  },

  saveRecentMovie(id) {
    const recent = appUtils.read(appUtils.storageKeys.recent, []);
    const updated = [id, ...recent.filter((item) => item !== id)].slice(0, 6);
    appUtils.write(appUtils.storageKeys.recent, updated);
  },

  getRecentMovies() {
    const recentIds = appUtils.read(appUtils.storageKeys.recent, []);
    return movieDatabase.filter((movie) => recentIds.includes(movie.id));
  },

  getBookingState() {
    return appUtils.read(appUtils.storageKeys.bookingState, {});
  },

  setBookingState(partial) {
    const state = { ...appUtils.getBookingState(), ...partial };
    appUtils.write(appUtils.storageKeys.bookingState, state);
    return state;
  },

  clearBookingState() {
    localStorage.removeItem(appUtils.storageKeys.bookingState);
  },

  getBookings() {
    return appUtils.read(appUtils.storageKeys.bookings, []);
  },

  saveBooking(booking) {
    const bookings = appUtils.getBookings();
    bookings.unshift(booking);
    appUtils.write(appUtils.storageKeys.bookings, bookings);
  },

  updateBookingStatus(bookingId, status) {
    const bookings = appUtils.getBookings();
    const next = bookings.map((booking) => booking.bookingId === bookingId ? { ...booking, status } : booking);
    appUtils.write(appUtils.storageKeys.bookings, next);
  },

  getMovieById(id) {
    return movieDatabase.find((movie) => String(movie.id) === String(id));
  },

  currency(value) {
    return `₹${Number(value).toLocaleString('en-IN')}`;
  },

  showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }
};

const movieDatabase = [
  { id: 1, title: 'Leo', poster: 'assets/images/posters/leo.svg', backdrop: 'assets/images/backdrops/leo-backdrop.svg', genre: 'Action', language: 'Tamil', duration: '2h 44m', rating: 8.5, certificate: 'UA', releaseDate: '2023-10-19', description: 'A quiet family man with a dark past is forced into a fierce showdown when a violent threat returns to his life.', cast: ['Vijay', 'Trisha', 'Arjun Sarja'], formats: ['2D', 'IMAX', '4DX'], trailer: 'https://www.youtube.com/embed/6N1_j3zhm2I', theatres: ['Cinematic PVR', 'Cinepolis Central', 'Galaxy Cinemas'], price: 180 },
  { id: 2, title: 'Interstellar', poster: 'assets/images/posters/interstellar.svg', backdrop: 'assets/images/backdrops/interstellar-backdrop.svg', genre: 'Sci-Fi', language: 'English', duration: '2h 49m', rating: 8.7, certificate: 'PG-13', releaseDate: '2014-11-07', description: 'A team of explorers travels through a wormhole in search of a new home for humanity.', cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], formats: ['2D', '3D', 'IMAX'], trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E', theatres: ['INOX Grand', 'Cinematic Luxe', 'Galaxy Cinemas'], price: 220 },
  { id: 3, title: 'Avatar', poster: 'assets/images/posters/avatar.svg', backdrop: 'assets/images/backdrops/avatar-backdrop.svg', genre: 'Adventure', language: 'English', duration: '2h 42m', rating: 8.0, certificate: 'PG-13', releaseDate: '2009-12-18', description: 'A paraplegic marine is sent to Pandora and finds belonging in the world of the Na’vi.', cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'], formats: ['3D', 'IMAX'], trailer: 'https://www.youtube.com/embed/5PSNL1qE6VY', theatres: ['Cinematic PVR', 'Cinepolis Central', 'INOX Grand'], price: 240 },
  { id: 4, title: 'Dune: Part Two', poster: 'assets/images/posters/dune-part-two.svg', backdrop: 'assets/images/backdrops/dune-part-two-backdrop.svg', genre: 'Drama', language: 'English', duration: '2h 46m', rating: 9.0, certificate: 'PG-13', releaseDate: '2024-03-01', description: 'Paul Atreides unites with Chani and the Fremen in a battle for the future of Arrakis.', cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'], formats: ['2D', 'IMAX', '4DX'], trailer: 'https://www.youtube.com/embed/Way9Dexny3w', theatres: ['Cinematic Luxe', 'Galaxy Cinemas', 'INOX Grand'], price: 260 },
  { id: 5, title: 'The Batman', poster: 'assets/images/posters/the-batman.svg', backdrop: 'assets/images/backdrops/the-batman-backdrop.svg', genre: 'Thriller', language: 'English', duration: '2h 56m', rating: 8.4, certificate: 'UA', releaseDate: '2022-03-04', description: 'Batman investigates a serial killer while uncovering corruption across Gotham City.', cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'], formats: ['2D', '3D', 'IMAX'], trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4', theatres: ['Cinematic PVR', 'Galaxy Cinemas', 'Cinepolis Central'], price: 200 },
  { id: 6, title: 'Jailer', poster: 'assets/images/posters/jailer.svg', backdrop: 'assets/images/backdrops/jailer-backdrop.svg', genre: 'Action', language: 'Tamil', duration: '2h 48m', rating: 8.3, certificate: 'UA', releaseDate: '2023-08-10', description: 'A retired jailer becomes the last hope against a violent gang and a sinister conspiracy.', cast: ['Rajinikanth', 'Vinayakan', 'Shiva Rajkumar'], formats: ['2D', 'IMAX', '4DX'], trailer: 'https://www.youtube.com/embed/8rQ5TzBQ7Q0', theatres: ['INOX Grand', 'Cinepolis Central', 'Galaxy Cinemas'], price: 190 },
  { id: 7, title: 'Oppenheimer', poster: 'assets/images/posters/oppenheimer.svg', backdrop: 'assets/images/backdrops/oppenheimer-backdrop.svg', genre: 'Biography', language: 'English', duration: '3h 00m', rating: 8.8, certificate: 'R', releaseDate: '2023-07-21', description: 'The story of J. Robert Oppenheimer and his role in the creation of the atomic bomb.', cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.'], formats: ['2D', 'IMAX'], trailer: 'https://www.youtube.com/embed/uYPbbksJxIg', theatres: ['Cinematic Luxe', 'INOX Grand', 'Cinematic PVR'], price: 250 },
  { id: 8, title: 'Pathaan', poster: 'assets/images/posters/pathaan.svg', backdrop: 'assets/images/backdrops/pathaan-backdrop.svg', genre: 'Action', language: 'Hindi', duration: '2h 26m', rating: 8.1, certificate: 'UA', releaseDate: '2023-01-25', description: 'An ex-army agent races across the globe to stop a deadly attack on India.', cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'], formats: ['2D', 'IMAX', '3D'], trailer: 'https://www.youtube.com/embed/vqu4z34wENw', theatres: ['Cinematic PVR', 'Galaxy Cinemas', 'Cinepolis Central'], price: 210 },
  { id: 9, title: 'Salaar', poster: 'assets/images/posters/salaar.svg', backdrop: 'assets/images/backdrops/salaar-backdrop.svg', genre: 'Action', language: 'Telugu', duration: '2h 33m', rating: 8.2, certificate: 'UA', releaseDate: '2023-12-22', description: 'A loyal friend becomes a hunted man when a violent dynasty collides with his life.', cast: ['Prabhas', 'Shruti Haasan', 'Prithviraj Sukumaran'], formats: ['2D', 'IMAX'], trailer: 'https://www.youtube.com/embed/XbGQ4lVbJxE', theatres: ['INOX Grand', 'Cinematic Luxe', 'Galaxy Cinemas'], price: 195 },
  { id: 10, title: 'Kalki 2898 AD', poster: 'assets/images/posters/kalki-2898-ad.svg', backdrop: 'assets/images/backdrops/kalki-2898-ad-backdrop.svg', genre: 'Sci-Fi', language: 'Hindi', duration: '2h 51m', rating: 7.9, certificate: 'UA', releaseDate: '2024-06-27', description: 'An old warrior and a mysterious girl cross paths in a dystopian future shaped by myth and machine.', cast: ['Prabhas', 'Deepika Padukone', 'Amitabh Bachchan'], formats: ['3D', 'IMAX'], trailer: 'https://www.youtube.com/embed/FI7KD3WvHhM', theatres: ['Cinematic Luxe', 'Cinepolis Central', 'INOX Grand'], price: 230 },
  { id: 11, title: 'Maharaja', poster: 'assets/images/posters/maharaja.svg', backdrop: 'assets/images/backdrops/maharaja-backdrop.svg', genre: 'Crime', language: 'Tamil', duration: '2h 22m', rating: 8.6, certificate: 'A', releaseDate: '2024-08-15', description: 'A man struggling with a debt and a troubled past takes on a ruthless cartel.', cast: ['Vijay Sethupathi', 'Anurag Kashyap', 'Mamta Mohandas'], formats: ['2D', '4DX'], trailer: 'https://www.youtube.com/embed/rR6YtUeG5Ro', theatres: ['Cinematic PVR', 'Galaxy Cinemas', 'INOX Grand'], price: 180 },
  { id: 12, title: 'Barbie', poster: 'assets/images/posters/barbie.svg', backdrop: 'assets/images/backdrops/barbie-backdrop.svg', genre: 'Comedy', language: 'English', duration: '1h 54m', rating: 7.6, certificate: 'PG', releaseDate: '2023-07-21', description: 'Barbie and Ken travel through the real world and discover emotional freedom and living outside stereotypes.', cast: ['Margot Robbie', 'Ryan Gosling', 'America Ferrera'], formats: ['2D', '3D'], trailer: 'https://www.youtube.com/embed/8zIf0XvoL9Y', theatres: ['Cinepolis Central', 'Cinematic PVR', 'Galaxy Cinemas'], price: 170 },
  { id: 13, title: 'Mission Impossible', poster: 'assets/images/posters/mission-impossible.svg', backdrop: 'assets/images/backdrops/mission-impossible-backdrop.svg', genre: 'Action', language: 'English', duration: '2h 43m', rating: 8.5, certificate: 'PG-13', releaseDate: '2024-01-12', description: 'Ethan Hunt faces his most dangerous enemy yet in a mission that could define the future.', cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames'], formats: ['2D', 'IMAX', '4DX'], trailer: 'https://www.youtube.com/embed/6g2MnJk2QYg', theatres: ['Cinematic Luxe', 'Cinepolis Central', 'Galaxy Cinemas'], price: 230 },
  { id: 14, title: 'Maamannan', poster: 'assets/images/posters/maamannan.svg', backdrop: 'assets/images/backdrops/maamannan-backdrop.svg', genre: 'Drama', language: 'Tamil', duration: '2h 28m', rating: 8.0, certificate: 'UA', releaseDate: '2024-02-14', description: 'A father’s pride and family ties are tested in a society built on caste and conflict.', cast: ['Vadivelu', 'Fahadh Faasil', 'Keerthy Suresh'], formats: ['2D', '3D'], trailer: 'https://www.youtube.com/embed/UrB2_q77gNU', theatres: ['INOX Grand', 'Cinematic PVR', 'Cinepolis Central'], price: 175 }
];

window.movieDatabase = movieDatabase;

function posterFallbackMarkup(title, genre, language) {
  return `<div class="poster-fallback" role="img" aria-label="${title} poster fallback"><span class="poster-fallback-brand">CINEMATIC SHOW</span><strong>${title}</strong><span>${genre} • ${language}</span></div>`;
}

function handlePosterError(image) {
  if (!image || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = 'true';
  image.outerHTML = posterFallbackMarkup(image.dataset.title || 'Movie', image.dataset.genre || 'Cinema', image.dataset.language || 'Now Showing');
}

function posterImage(movie, className = '') {
  return `<img class="${className}" src="${movie.poster}" alt="${movie.title} poster" data-poster data-title="${movie.title}" data-genre="${movie.genre}" data-language="${movie.language}" loading="lazy" onerror="handlePosterError(this)" />`;
}

function initGlobalUI() {
  const city = appUtils.getCity();
  document.querySelectorAll('[data-location-select]').forEach((select) => {
    select.value = city;
  });

  document.querySelectorAll('[data-nav]').forEach((link) => {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    if (link.getAttribute('href') === current || (current === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.top-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  document.body.classList.add('page-enter');
}

function renderRecommendations() {
  const recContainer = document.querySelector('[data-recommendations]');
  if (!recContainer) return;
  const recent = appUtils.getRecentMovies();
  const preferred = recent.length ? recent : movieDatabase.slice(0, 4);
  recContainer.innerHTML = preferred.map((movie) => `
    <article class="movie-card">
      <div class="movie-poster">
        ${posterImage(movie)}
        <div class="movie-overlay"></div>
        <button class="favorite-btn ${appUtils.isFavorite(movie.id) ? 'active' : ''}" aria-label="Add ${movie.title} to favorites" data-favorite-id="${movie.id}">♥</button>
        <div class="movie-meta">
          <h3>${movie.title}</h3>
        </div>
      </div>
      <div class="movie-info">
        <div class="meta-row"><span>${movie.genre}</span><strong>${movie.rating} ★</strong></div>
        <div class="meta-row"><span>${movie.language}</span><span>${movie.duration}</span></div>
        <div class="movie-actions">
          <a class="btn btn-secondary" href="movie-details.html?id=${movie.id}">View Details</a>
          <a class="btn btn-primary" href="theatres.html?id=${movie.id}">Book Now</a>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-favorite-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const id = Number(event.currentTarget.dataset.favoriteId);
      appUtils.toggleFavorite(id);
      event.currentTarget.classList.toggle('active');
      appUtils.showToast(appUtils.isFavorite(id) ? 'Added to favorites' : 'Removed from favorites');
    });
  });
}

function buildMovieCards(movies, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  if (!movies.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No movies found</h3>
        <p>Try searching for a different title, language, theatre, or genre.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = movies.map((movie) => `
    <article class="movie-card">
      <div class="movie-poster">
        ${posterImage(movie)}
        <div class="movie-overlay"></div>
        <button class="favorite-btn ${appUtils.isFavorite(movie.id) ? 'active' : ''}" aria-label="Add ${movie.title} to favorites" data-favorite-id="${movie.id}">♥</button>
        <div class="movie-meta">
          <h3>${movie.title}</h3>
        </div>
      </div>
      <div class="movie-info">
        <div class="meta-row"><span>${movie.genre}</span><strong>${movie.rating} ★</strong></div>
        <div class="meta-row"><span>${movie.language}</span><span>${movie.duration}</span></div>
        <div class="meta-row"><span>${movie.certificate}</span><span>${movie.releaseDate}</span></div>
        <div class="movie-actions">
          <a class="btn btn-secondary" href="movie-details.html?id=${movie.id}">View Details</a>
          <a class="btn btn-primary" href="theatres.html?id=${movie.id}">Book Now</a>
        </div>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-favorite-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const id = Number(event.currentTarget.dataset.favoriteId);
      const favorites = appUtils.toggleFavorite(id);
      event.currentTarget.classList.toggle('active', favorites.includes(id));
      appUtils.showToast(appUtils.isFavorite(id) ? 'Added to favorites' : 'Removed from favorites');
    });
  });
}

function renderFavoritesSection() {
  const container = document.querySelector('[data-favorites-list]');
  if (!container) return;
  const favoriteIds = appUtils.read(appUtils.storageKeys.favorites, []);
  const favorites = movieDatabase.filter((movie) => favoriteIds.includes(movie.id));
  if (!favorites.length) {
    container.innerHTML = '<div class="empty-state"><h3>No favorites yet</h3><p>Tap the heart on your favorite movies to save them here.</p></div>';
    return;
  }
  container.innerHTML = favorites.map((movie) => `
    <article class="movie-card">
      <div class="movie-poster">
        ${posterImage(movie)}
        <div class="movie-overlay"></div>
        <div class="movie-meta"><h3>${movie.title}</h3></div>
      </div>
      <div class="movie-info">
        <div class="meta-row"><span>${movie.genre}</span><strong>${movie.rating} ★</strong></div>
        <div class="movie-actions">
          <a class="btn btn-secondary" href="movie-details.html?id=${movie.id}">View Details</a>
          <a class="btn btn-primary" href="theatres.html?id=${movie.id}">Book Now</a>
        </div>
      </div>
    </article>
  `).join('');
}

function initLocationSelectors() {
  document.querySelectorAll('[data-location-select]').forEach((select) => {
    select.addEventListener('change', (event) => {
      appUtils.setCity(event.target.value);
      appUtils.showToast(`Location set to ${event.target.value}`);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initGlobalUI();
  initLocationSelectors();
  renderRecommendations();
  renderFavoritesSection();
});
