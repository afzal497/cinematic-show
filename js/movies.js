const movieFilters = {
  language: ['All', ...new Set(movieDatabase.map((movie) => movie.language))],
  genre: ['All', ...new Set(movieDatabase.map((movie) => movie.genre))],
  format: ['All', ...new Set(movieDatabase.flatMap((movie) => movie.formats))],
  rating: ['All', '8+', '7+', '6+'],
  location: ['All', 'Chennai', 'Trichy', 'Coimbatore', 'Madurai', 'Bangalore', 'Hyderabad'],
  date: ['All', 'Today', 'Tomorrow', 'This Weekend']
};

function applyMovieFilters() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('search') || '';
  const language = params.get('language') || 'All';
  const genre = params.get('genre') || 'All';
  const format = params.get('format') || 'All';
  const rating = params.get('rating') || 'All';
  const selectedLocation = params.get('location') || appUtils.getCity();

  let filteredMovies = movieDatabase.filter((movie) => {
    const matchQuery = !query || [movie.title, movie.genre, movie.language, movie.cast.join(' '), movie.theatres.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchLanguage = language === 'All' || movie.language === language;
    const matchGenre = genre === 'All' || movie.genre === genre;
    const matchFormat = format === 'All' || movie.formats.includes(format);
    const matchRating = rating === 'All' || (rating === '8+' ? movie.rating >= 8 : rating === '7+' ? movie.rating >= 7 : movie.rating >= 6);
    const matchLocation = selectedLocation === 'All' || selectedLocation === appUtils.getCity() || selectedLocation === 'Trichy';

    return matchQuery && matchLanguage && matchGenre && matchFormat && matchRating && matchLocation;
  });

  return filteredMovies;
}

function renderMovieGrid() {
  const container = document.querySelector('[data-movie-grid]');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get('search') || '';
  const filteredMovies = applyMovieFilters();
  buildMovieCards(filteredMovies, '[data-movie-grid]');

  const searchInput = document.querySelector('[data-movie-search]');
  if (searchInput) searchInput.value = searchValue;
}

function populateFilterControls() {
  const filterIds = {
    language: '[data-filter-language]',
    genre: '[data-filter-genre]',
    format: '[data-filter-format]',
    rating: '[data-filter-rating]',
    location: '[data-filter-location]'
  };

  Object.entries(filterIds).forEach(([key, selector]) => {
    const select = document.querySelector(selector);
    if (!select) return;
    const values = movieFilters[key];
    select.innerHTML = values.map((value) => `<option value="${value}">${value === 'All' ? 'All' : value}</option>`).join('');
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(key) || 'All';
    if (Array.from(select.options).some((option) => option.value === paramValue)) select.value = paramValue;
  });
}

function setupMovieFilters() {
  const form = document.querySelector('[data-movie-filters]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const searchInput = document.querySelector('[data-movie-search]');
    const language = document.querySelector('[data-filter-language]');
    const genre = document.querySelector('[data-filter-genre]');
    const format = document.querySelector('[data-filter-format]');
    const rating = document.querySelector('[data-filter-rating]');
    const location = document.querySelector('[data-filter-location]');
    if (searchInput && searchInput.value.trim()) params.set('search', searchInput.value.trim());
    if (language && language.value !== 'All') params.set('language', language.value);
    if (genre && genre.value !== 'All') params.set('genre', genre.value);
    if (format && format.value !== 'All') params.set('format', format.value);
    if (rating && rating.value !== 'All') params.set('rating', rating.value);
    if (location && location.value !== 'All') params.set('location', location.value);
    window.location.search = params.toString();
  });

  form.querySelectorAll('select, input').forEach((element) => {
    element.addEventListener('change', () => {
      form.requestSubmit();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  populateFilterControls();
  setupMovieFilters();
  renderMovieGrid();
});
