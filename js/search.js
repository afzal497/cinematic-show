function buildSuggestions(input) {
  const query = input.trim().toLowerCase();
  const suggestions = query ? movieDatabase.filter((movie) => {
    return [movie.title, movie.genre, movie.language, movie.cast.join(' '), movie.theatres.join(' ')].join(' ').toLowerCase().includes(query);
  }).slice(0, 6) : [
    { title: 'Leo', meta: 'Action | Tamil | 2h 44m' },
    { title: 'Interstellar', meta: 'Sci-Fi | English | 2h 49m' },
    { title: 'Avatar', meta: 'Adventure | English | 2h 42m' },
    { title: 'Tamil movies', meta: 'Popular in Trichy' },
    { title: 'IMAX', meta: 'Formats available' },
    { title: 'Movies near me', meta: 'Local cinemas' }
  ];

  return suggestions.map((movie) => {
    if (typeof movie === 'string') {
      return { title: movie, meta: '' };
    }
    return movie;
  });
}

function renderSuggestions(keyword, targetSelector = '[data-search-suggestions]') {
  const container = document.querySelector(targetSelector);
  if (!container) return;
  const suggestions = buildSuggestions(keyword);
  if (!keyword || suggestions.length === 0) {
    container.classList.remove('active');
    container.innerHTML = '';
    return;
  }

  container.innerHTML = suggestions.map((item) => `
    <button type="button" class="suggestion-item" data-suggestion="${item.title}">
      <span>${item.title}</span>
      <small>${item.meta || 'Movie'}</small>
    </button>
  `).join('');
  container.classList.add('active');

  container.querySelectorAll('[data-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.querySelector('[data-search-input]');
      if (input) input.value = button.dataset.suggestion;
      container.classList.remove('active');
      const query = button.dataset.suggestion.trim();
      if (query) {
        window.location.href = `movies.html?search=${encodeURIComponent(query)}`;
      }
    });
  });
}

function initSearchUI() {
  const input = document.querySelector('[data-search-input]');
  const suggestions = document.querySelector('[data-search-suggestions]');
  if (!input) return;

  const searchAction = () => {
    const value = input.value.trim();
    if (value) {
      window.location.href = `movies.html?search=${encodeURIComponent(value)}`;
    }
  };

  input.addEventListener('input', (event) => renderSuggestions(event.target.value, '[data-search-suggestions]'));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchAction();
  });

  const searchButton = document.querySelector('[data-search-button]');
  if (searchButton) searchButton.addEventListener('click', searchAction);

  document.addEventListener('click', (event) => {
    if (suggestions && !suggestions.contains(event.target) && event.target !== input) {
      suggestions.classList.remove('active');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initSearchUI();
});
