// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav.classList.contains('open')) nav.classList.remove('open');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Coupon: set dynamic expiry = today + 3 months
(function setCouponExpiry() {
  const el = document.getElementById('coupon-expiry');
  if (!el) return;
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  el.textContent = `${y}年${m}月${day}日`;
})();

// Print coupon
const printBtn = document.getElementById('print-coupon');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// Download coupon as image (simple canvas snapshot of the coupon block)
const downloadBtn = document.getElementById('download-coupon');
if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    const coupon = document.querySelector('.coupon');
    if (!coupon) return;
    // Use HTML2Canvas if available, otherwise fallback to print
    if (window.html2canvas) {
      const canvas = await window.html2canvas(coupon, { backgroundColor: '#11151b', scale: 2 });
      const link = document.createElement('a');
      link.download = `coupon-hk$100-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      alert('提示：如需下載圖片，請在此頁面載入 html2canvas 或改用「列印本券」。');
      window.print();
    }
  });
}

// Demo contact form (no backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = '已收到您的訊息（示意）。實際提交請改接後端或 WhatsApp。';
    form.reset();
  });
}