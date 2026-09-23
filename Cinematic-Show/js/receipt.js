function generateBookingReceipt() {
  const state = bookingState.get();
  const movie = appUtils.getMovieById(state.movieId || state.movie?.id || 1);
  const bookingId = state.bookingId || 'CS2026000001';
  const customer = state.customer || { fullName: 'Guest Guest', email: 'guest@example.com', mobile: '9876543210' };
  const pricing = state.pricing || { tickets: 0, convenience: 0, taxes: 0, discount: 0, total: 0 };
  const seats = (state.seats || []).map((seat) => `${seat.row}${seat.number}`).join(', ') || 'N/A';

  const container = document.querySelector('[data-receipt]');
  if (!container) return;

  container.innerHTML = `
    <div class="receipt-box">
      <div class="receipt-header">
        <div>
          <h2>CINEMATIC SHOW</h2>
          <p class="text-muted">BOOKING RECEIPT</p>
        </div>
        <div class="badge status-ok">${state.paymentStatus || 'Paid'}</div>
      </div>
      <div class="receipt-grid">
        <div class="receipt-movie-thumb"><img src="${movie?.poster || 'assets/images/posters/leo.svg'}" alt="${movie?.title || 'Movie'} poster" data-poster data-title="${movie?.title || 'Movie'}" data-genre="${movie?.genre || 'Cinema'}" data-language="${movie?.language || 'Now Showing'}" loading="lazy" onerror="handlePosterError(this)" /></div>
        <div><strong>Booking ID</strong><br>${bookingId}</div>
        <div><strong>Date</strong><br>${state.date || 'Tomorrow'}</div>
        <div><strong>Movie</strong><br>${movie?.title || 'Movie'}</div>
        <div><strong>Theatre</strong><br>${state.theatre || 'Cinematic PVR'}</div>
        <div><strong>Showtime</strong><br>${state.showtime || '07:30 PM'}</div>
        <div><strong>Seats</strong><br>${seats}</div>
        <div><strong>Customer</strong><br>${customer.fullName}</div>
        <div><strong>Payment Method</strong><br>${state.paymentMethod || 'UPI'}</div>
      </div>
      <table class="summary-table">
        <tbody>
          <tr><td>Ticket Amount</td><td>${appUtils.currency(pricing.tickets || 0)}</td></tr>
          <tr><td>Convenience Fee</td><td>${appUtils.currency(pricing.convenience || 0)}</td></tr>
          <tr><td>Taxes</td><td>${appUtils.currency(pricing.taxes || 0)}</td></tr>
          <tr><td>Discount</td><td>-${appUtils.currency(pricing.discount || 0)}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>${appUtils.currency(pricing.total || 0)}</strong></td></tr>
        </tbody>
      </table>
      <div class="receipt-total" style="margin-top: 24px;">
        <div>
          <strong>Thank you for booking with Cinematic Show!</strong>
        </div>
        <div>
          <button class="btn btn-secondary" type="button" onclick="window.print()">Print Receipt</button>
        </div>
      </div>
    </div>
  `;
}

function initializeConfirmationPage() {
  const state = bookingState.get();
  const movie = appUtils.getMovieById(state.movieId || state.movie?.id || 1);
  const summary = document.querySelector('[data-confirmation-details]');
  if (summary) {
    summary.innerHTML = `
      <div class="confirmation-movie"><img src="${movie.poster}" alt="${movie.title} poster" data-poster data-title="${movie.title}" data-genre="${movie.genre}" data-language="${movie.language}" loading="lazy" onerror="handlePosterError(this)" /><div><strong>${movie.title}</strong><span>${movie.genre} • ${movie.language}</span></div></div>
      <div class="summary-list">
        <div class="summary-item"><span>Booking ID</span><strong>${state.bookingId || 'CS2026000001'}</strong></div>
        <div class="summary-item"><span>Movie</span><strong>${movie.title}</strong></div>
        <div class="summary-item"><span>Theatre</span><strong>${state.theatre || 'Cinematic PVR'}</strong></div>
        <div class="summary-item"><span>Date</span><strong>${state.date || 'Tomorrow'}</strong></div>
        <div class="summary-item"><span>Time</span><strong>${state.showtime || '07:30 PM'}</strong></div>
        <div class="summary-item"><span>Seats</span><strong>${(state.seats || []).map((seat) => `${seat.row}${seat.number}`).join(', ') || 'N/A'}</strong></div>
        <div class="summary-item"><span>Amount Paid</span><strong>${appUtils.currency((state.pricing && state.pricing.total) || 0)}</strong></div>
        <div class="summary-item"><span>Payment Status</span><strong>${state.paymentStatus || 'Paid'}</strong></div>
      </div>
    `;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  generateBookingReceipt();
  initializeConfirmationPage();
  const ticketDownloadButton = document.querySelector('[data-download-ticket]');
  if (ticketDownloadButton) {
    ticketDownloadButton.addEventListener('click', () => {
      window.location.href = 'digital-ticket.html';
    });
  }
  const viewBookingButton = document.querySelector('[data-view-booking]');
  if (viewBookingButton) viewBookingButton.addEventListener('click', () => window.location.href = 'bookings.html');
  const bookAnotherButton = document.querySelector('[data-book-another]');
  if (bookAnotherButton) bookAnotherButton.addEventListener('click', () => window.location.href = 'movies.html');
  const homeButton = document.querySelector('[data-home-button]');
  if (homeButton) homeButton.addEventListener('click', () => window.location.href = 'index.html');
});
