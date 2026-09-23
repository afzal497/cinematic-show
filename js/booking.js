const bookingState = {
  get() {
    const state = appUtils.getBookingState();
    return state || {};
  },
  set(partial) {
    return appUtils.setBookingState(partial);
  },
  clear() {
    appUtils.clearBookingState();
  }
};

function getSelectedMovie() {
  const movieId = new URLSearchParams(window.location.search).get('id') || bookingState.get().movieId;
  if (!movieId) return movieDatabase[0];
  return appUtils.getMovieById(movieId) || movieDatabase[0];
}

function setMovieSelectionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');
  if (movieId) {
    bookingState.set({ movieId: Number(movieId) });
    appUtils.saveRecentMovie(Number(movieId));
  }
}

function getTheatreOptions(movie) {
  const theatreList = movie?.theatres || ['Cinematic PVR', 'INOX Grand', 'Cinepolis Central', 'Galaxy Cinemas', 'Cinematic Luxe'];
  return theatreList.map((name, index) => ({
    name,
    distance: `${(1.5 + index * 0.8).toFixed(1)} km`,
    rating: 4 + (index % 3) * 0.2,
    amenities: ['Parking', 'Cafè', 'Dolby Atmos'][index % 3] + ' • ' + ['Luxury seats', '2D Audio', 'Easy booking'][index % 3],
    formats: ['2D', 'IMAX', '3D', '4DX'],
    showtimes: ['10:00 AM', '01:30 PM', '04:30 PM', '07:30 PM', '10:30 PM']
  }));
}

function kickOffBooking() {
  const state = bookingState.get();
  const movie = getSelectedMovie();
  if (!state.movieId && movie) bookingState.set({ movieId: movie.id });
}

window.addEventListener('DOMContentLoaded', () => {
  setMovieSelectionFromUrl();
  kickOffBooking();
});
