const paymentConfig = {
  coupons: {
    CINE10: { type: 'percent', value: 10 },
    MOVIE50: { type: 'fixed', value: 50 },
    FIRSTSHOW: { type: 'fixed', value: 100 }
  }
};

function getPricingBreakdown(baseTotal = 0) {
  const convenience = 45;
  const taxes = Math.round(baseTotal * 0.12);
  const promo = getCouponDiscount(baseTotal);
  const total = Math.max(0, baseTotal + convenience + taxes - promo);
  return { tickets: baseTotal, convenience, taxes, discount: promo, total };
}

function getCouponDiscount(baseTotal = 0) {
  const bookingStateData = bookingState.get();
  const couponCode = (bookingStateData.coupon || '').toUpperCase();
  const coupon = paymentConfig.coupons[couponCode];
  if (!coupon) return 0;
  if (coupon.type === 'percent') return Math.round(baseTotal * coupon.value / 100);
  return Math.min(coupon.value, baseTotal);
}

function validateCoupons() {
  const code = document.querySelector('[data-coupon-code]')?.value?.trim() || '';
  if (!code) return true;
  const coupon = paymentConfig.coupons[code.toUpperCase()];
  if (!coupon) {
    appUtils.showToast('Invalid coupon code.', 'warning');
    return false;
  }
  bookingState.set({ coupon: code.toUpperCase() });
  appUtils.showToast('Coupon applied successfully.');
  return true;
}

function formatPaymentStatus() {
  return 'Demo transaction — no real payment has been processed.';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

function validateCardNumber(number) {
  return /^\d{16}$/.test(number.replace(/\s+/g, ''));
}

function validateUPI(upi) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(upi);
}

function renderCheckoutPage() {
  const state = bookingState.get();
  const movie = appUtils.getMovieById(state.movieId || state.movie?.id || 1);
  const selectedSeats = state.seats || appUtils.read('cinematicShowSelectedSeats', []);
  const totalBase = selectedSeats.reduce((sum, seat) => sum + getSeatPrice(seat.type), 0);
  const pricing = getPricingBreakdown(totalBase);
  bookingState.set({ pricing, movie, theatre: state.theatre || 'Cinematic PVR', date: state.date || 'Tomorrow', showtime: state.showtime || '07:30 PM' });

  const summary = document.querySelector('[data-checkout-summary]');
  const totalEl = document.querySelector('[data-total-price]');
  if (summary) {
    summary.innerHTML = `
      <div class="summary-list">
        <div class="summary-item"><span>Movie</span><strong>${movie.title}</strong></div>
        <div class="summary-item"><span>Theatre</span><strong>${state.theatre || 'Cinematic PVR'}</strong></div>
        <div class="summary-item"><span>Date</span><strong>${state.date || 'Tomorrow'}</strong></div>
        <div class="summary-item"><span>Time</span><strong>${state.showtime || '07:30 PM'}</strong></div>
        <div class="summary-item"><span>Seats</span><strong>${selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ') || 'No seats selected'}</strong></div>
        <div class="summary-item"><span>Tickets</span><strong>${appUtils.currency(pricing.tickets)}</strong></div>
        <div class="summary-item"><span>Convenience Fee</span><strong>${appUtils.currency(pricing.convenience)}</strong></div>
        <div class="summary-item"><span>Taxes</span><strong>${appUtils.currency(pricing.taxes)}</strong></div>
        <div class="summary-item"><span>Discount</span><strong>-${appUtils.currency(pricing.discount)}</strong></div>
        <div class="summary-item"><span>Total</span><strong>${appUtils.currency(pricing.total)}</strong></div>
      </div>
    `;
  }

  if (totalEl) totalEl.textContent = `₹${pricing.total}`;
}

function initCheckoutForm() {
  const form = document.querySelector('[data-checkout-form]');
  const couponInput = document.querySelector('[data-coupon-code]');
  const couponApply = document.querySelector('[data-apply-coupon]');
  if (couponApply && couponInput) {
    couponApply.addEventListener('click', () => {
      validateCoupons();
      renderCheckoutPage();
    });
  }

  const payButton = document.querySelector('[data-pay-button]');
  if (payButton) {
    payButton.addEventListener('click', () => {
      const fullName = document.querySelector('[data-customer-name]')?.value?.trim() || '';
      const email = document.querySelector('[data-customer-email]')?.value?.trim() || '';
      const mobile = document.querySelector('[data-customer-mobile]')?.value?.trim() || '';
      if (!fullName || !validateEmail(email) || !validateMobile(mobile)) {
        appUtils.showToast('Please complete all customer details correctly.', 'warning');
        return;
      }
      bookingState.set({ customer: { fullName, email, mobile } });
      window.location.href = 'payment.html';
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (window.location.pathname.endsWith('checkout.html')) {
        const fullName = document.querySelector('[data-customer-name]')?.value?.trim() || '';
        const email = document.querySelector('[data-customer-email]')?.value?.trim() || '';
        const mobile = document.querySelector('[data-customer-mobile]')?.value?.trim() || '';
        if (!fullName || !validateEmail(email) || !validateMobile(mobile)) {
          appUtils.showToast('Please enter valid customer details.', 'warning');
          return;
        }
        window.location.href = 'payment.html';
      }
    });
  }
}

function renderPaymentPage() {
  const state = bookingState.get();
  const selectedSeats = state.seats || [];
  const movie = appUtils.getMovieById(state.movieId || state.movie?.id || 1);
  const pricing = state.pricing || getPricingBreakdown(selectedSeats.reduce((sum, seat) => sum + getSeatPrice(seat.type), 0));

  const amountEl = document.querySelector('[data-payment-amount]');
  if (amountEl) amountEl.textContent = `₹${pricing.total}`;

  const payButton = document.querySelector('[data-pay-button]');
  if (payButton) payButton.textContent = `Pay ₹${pricing.total}`;

  const methodButtons = document.querySelectorAll('[data-payment-method]');
  methodButtons.forEach((button) => {
    button.addEventListener('click', () => {
      methodButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const method = button.dataset.paymentMethod;
      const creditForm = document.querySelector('[data-credit-card-form]');
      const upiForm = document.querySelector('[data-upi-form]');
      const field = document.querySelector('[data-payment-fieldset]');
      if (method === 'UPI') {
        creditForm?.classList.add('hidden');
        upiForm?.classList.remove('hidden');
      } else {
        upiForm?.classList.add('hidden');
        creditForm?.classList.remove('hidden');
      }
      if (field) field.dataset.method = method;
    });
  });

  const standardPayBtn = document.querySelector('[data-process-payment]');
  if (standardPayBtn) {
    standardPayBtn.addEventListener('click', () => {
      const method = document.querySelector('[data-payment-fieldset]')?.dataset.method || 'UPI';
      const paymentValid = (() => {
        if (method === 'UPI') {
          const value = document.querySelector('[data-upi-id]')?.value?.trim() || '';
          return validateUPI(value);
        }
        const number = document.querySelector('[data-card-number]')?.value?.trim() || '';
        const name = document.querySelector('[data-card-name]')?.value?.trim() || '';
        const expiry = document.querySelector('[data-card-expiry]')?.value?.trim() || '';
        const cvv = document.querySelector('[data-card-cvv]')?.value?.trim() || '';
        return validateCardNumber(number) && name && /^\d{2}\/\d{2}$/.test(expiry) && /^\d{3,4}$/.test(cvv);
      })();

      if (!paymentValid) {
        appUtils.showToast('Incorrect payment details. Please review the form.', 'warning');
        return;
      }

      const button = standardPayBtn;
      button.disabled = true;
      button.textContent = 'Processing...';
      button.classList.add('loading');

      setTimeout(() => {
        const bookingId = `CS${new Date().getFullYear()}${Math.floor(Math.random() * 900000 + 100000)}`;
        const booking = {
          bookingId,
          movieId: movie?.id || state.movieId,
          movieTitle: movie?.title || 'Movie',
          poster: movie?.poster || '',
          theatre: state.theatre || 'Cinematic PVR',
          date: state.date || 'Tomorrow',
          time: state.showtime || '07:30 PM',
          seats: selectedSeats.map((seat) => `${seat.row}${seat.number}`),
          amount: pricing.total,
          paymentMethod: method,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };

        bookingState.set({ bookingId, paymentStatus: 'Paid', pricing, customer: state.customer || { fullName: 'Guest', email: 'guest@example.com', mobile: '9876543210' }, booking });
        appUtils.saveBooking(booking);
        window.location.href = 'booking-success.html';
      }, 1800);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'checkout') {
    renderCheckoutPage();
    initCheckoutForm();
  }
  if (document.body.dataset.page === 'payment') {
    renderPaymentPage();
  }
});
