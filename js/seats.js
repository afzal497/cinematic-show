const seatCatalog = [
  { row: 'A', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'regular', status: 'available' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'B', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'regular', status: 'available' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'occupied' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'occupied' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'C', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'occupied' }, { number: 3, type: 'regular', status: 'available' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'occupied' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'D', seats: [{ number: 1, type: 'premium', status: 'available' }, { number: 2, type: 'premium', status: 'available' }, { number: 3, type: 'premium', status: 'available' }, { number: 4, type: 'premium', status: 'occupied' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'occupied' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'E', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'regular', status: 'occupied' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'occupied' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'F', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'recliner', status: 'available' }, { number: 4, type: 'recliner', status: 'available' }, { number: 5, type: 'recliner', status: 'occupied' }, { number: 6, type: 'recliner', status: 'available' }, { number: 7, type: 'recliner', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'occupied' }] },
  { row: 'G', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'regular', status: 'available' }, { number: 4, type: 'premium', status: 'occupied' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'occupied' }] },
  { row: 'H', seats: [{ number: 1, type: 'recliner', status: 'available' }, { number: 2, type: 'recliner', status: 'available' }, { number: 3, type: 'recliner', status: 'occupied' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'occupied' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'I', seats: [{ number: 1, type: 'regular', status: 'available' }, { number: 2, type: 'regular', status: 'available' }, { number: 3, type: 'regular', status: 'available' }, { number: 4, type: 'regular', status: 'available' }, { number: 5, type: 'premium', status: 'occupied' }, { number: 6, type: 'premium', status: 'available' }, { number: 7, type: 'premium', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'occupied' }, { number: 10, type: 'regular', status: 'available' }] },
  { row: 'J', seats: [{ number: 1, type: 'recliner', status: 'available' }, { number: 2, type: 'recliner', status: 'available' }, { number: 3, type: 'recliner', status: 'available' }, { number: 4, type: 'premium', status: 'available' }, { number: 5, type: 'premium', status: 'available' }, { number: 6, type: 'premium', status: 'occupied' }, { number: 7, type: 'regular', status: 'available' }, { number: 8, type: 'regular', status: 'available' }, { number: 9, type: 'regular', status: 'available' }, { number: 10, type: 'regular', status: 'available' }] }
];

function getSeatStateFromStorage() {
  return appUtils.read('cinematicShowSeatMap', seatCatalog);
}

function renderSeatLayout() {
  const container = document.querySelector('[data-seat-layout]');
  if (!container) return;
  const map = getSeatStateFromStorage();
  container.innerHTML = map.map((row) => `
    <div class="seat-row">
      <span class="row-label">${row.row}</span>
      ${row.seats.map((seat) => `
        <button
          type="button"
          class="seat ${seat.status} ${seat.type}"
          data-seat-row="${row.row}"
          data-seat-number="${seat.number}"
          data-seat-type="${seat.type}"
          aria-label="Seat ${row.row}${seat.number} ${seat.status}"
          ${seat.status === 'occupied' ? 'disabled' : ''}
        >${seat.number}</button>
      `).join('')}
    </div>
  `).join('');

  const selectedSeats = appUtils.read('cinematicShowSelectedSeats', []);
  selectedSeats.forEach(({ row, number }) => {
    const seatButton = document.querySelector(`[data-seat-row="${row}"][data-seat-number="${number}"]`);
    if (seatButton) {
      seatButton.classList.add('selected');
      seatButton.setAttribute('aria-pressed', 'true');
    }
  });

  bindSeatClicks();
  updateSeatSummary();
}

function bindSeatClicks() {
  document.querySelectorAll('.seat:not(.occupied)').forEach((seat) => {
    seat.addEventListener('click', () => {
      const row = seat.dataset.seatRow;
      const number = Number(seat.dataset.seatNumber);
      const type = seat.dataset.seatType;
      const selected = appUtils.read('cinematicShowSelectedSeats', []);
      const existingIndex = selected.findIndex((item) => item.row === row && item.number === number);

      if (existingIndex >= 0) {
        selected.splice(existingIndex, 1);
      } else {
        if (selected.length >= 6) {
          appUtils.showToast('Maximum booking is 6 seats.', 'warning');
          return;
        }
        selected.push({ row, number, type });
      }

      appUtils.write('cinematicShowSelectedSeats', selected);
      const { movie, theatre, date, showtime, format } = bookingState.get();
      bookingState.set({ seats: selected, movie, theatre, date, showtime, format });

      const seatButton = document.querySelector(`[data-seat-row="${row}"][data-seat-number="${number}"]`);
      if (seatButton) {
        seatButton.classList.toggle('selected');
        seatButton.setAttribute('aria-pressed', seatButton.classList.contains('selected') ? 'true' : 'false');
      }

      updateSeatSummary();
      appUtils.showToast(selected.length ? `${selected.length} seat(s) selected` : 'Seat selection cleared');
    });
  });
}

function updateSeatSummary() {
  const selected = appUtils.read('cinematicShowSelectedSeats', []);
  const totalSeats = selected.length;
  const summary = document.querySelector('[data-seat-summary]');
  const countEl = document.querySelector('[data-seat-count]');
  const priceEl = document.querySelector('[data-seat-price]');
  if (countEl) countEl.textContent = totalSeats;
  if (summary) summary.textContent = totalSeats ? selected.map((seat) => `${seat.row}${seat.number}`).join(', ') : 'No seats selected';

  const computed = selected.reduce((sum, seat) => sum + getSeatPrice(seat.type), 0);
  if (priceEl) priceEl.textContent = `₹${computed}`;

  const continueBtn = document.querySelector('[data-continue-checkout]');
  if (continueBtn) {
    continueBtn.disabled = totalSeats === 0;
  }

  const state = bookingState.get();
  bookingState.set({ seats: selected, pricing: { seatTotal: computed, convenience: 45, taxes: Math.round(computed * 0.12), total: computed + 45 + Math.round(computed * 0.12) } });
}

function recommendSeats() {
  const available = [];
  const map = getSeatStateFromStorage();
  map.forEach((row) => {
    row.seats.forEach((seat) => {
      if (seat.status === 'available') {
        available.push({ row: row.row, number: seat.number, type: seat.type });
      }
    });
  });

  const best = available.filter((seat) => {
    const rowIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].indexOf(seat.row);
    return rowIndex >= 3 && rowIndex <= 7;
  }).slice(0, 4);

  if (!best.length) {
    appUtils.showToast('No recommended seats are available right now.', 'warning');
    return;
  }

  const selected = appUtils.read('cinematicShowSelectedSeats', []);
  const next = [...selected, ...best.filter((seat) => !selected.some((item) => item.row === seat.row && item.number === seat.number))].slice(0, 6);
  appUtils.write('cinematicShowSelectedSeats', next);
  bookingState.set({ seats: next });
  renderSeatLayout();
  appUtils.showToast('Recommended for you: ' + next.map((seat) => `${seat.row}${seat.number}`).join(', '));
}

window.addEventListener('DOMContentLoaded', () => {
  renderSeatLayout();
  const recommendBtn = document.querySelector('[data-recommend-seats]');
  if (recommendBtn) recommendBtn.addEventListener('click', recommendSeats);

  const continueBtn = document.querySelector('[data-continue-checkout]');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const selectedSeats = appUtils.read('cinematicShowSelectedSeats', []);
      if (!selectedSeats.length) {
        appUtils.showToast('Please select at least one seat before continuing.', 'warning');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }
});
