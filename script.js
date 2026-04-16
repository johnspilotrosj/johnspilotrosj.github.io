// ─── CUSTOM CURSOR ──────────────────────────────────────
const updateCursor = (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
};
document.addEventListener('mousemove', updateCursor);

// Expand cursor on interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.matches('button, a, input, textarea, .btn')) {
    document.body.classList.add('cursor-hover');
  }
});
document.addEventListener('mouseout', (e) => {
  if (e.target.matches('button, a, input, textarea, .btn')) {
    document.body.classList.remove('cursor-hover');
  }
});

// ─── GLOW ORB ────────────────────────────────────────────
const glow = document.getElementById('glow');
let glowX = 0, glowY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

(function animateGlow() {
  glowX += (targetX - glowX) * 0.06;
  glowY += (targetY - glowY) * 0.06;
  if (glow) {
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
  }
  requestAnimationFrame(animateGlow);
})();

// ─── NAVBAR SCROLL ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── SMOOTH NAV SCROLL ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── SCROLL FADE-IN ──────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ─── GALLERY CLICK ───────────────────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.gallery-title').textContent;
    item.style.background = 'rgba(124,58,237,0.12)';
    setTimeout(() => {
      item.style.background = '';
    }, 300);
  });
});

// ─── CONTACT FORM ────────────────────────────────────────
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-input');
    let valid = true;

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = 'rgba(124,58,237,0.6)';
        valid = false;
      }
    });

    if (!valid) return;

    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.6';
    submitBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      submitBtn.textContent = 'SEND MESSAGE';
      submitBtn.style.opacity = '';
      submitBtn.style.pointerEvents = '';
      inputs.forEach(input => input.value = '');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
      }
    }, 1200);
  });
}

// ─── CARD TILT ───────────────────────────────────────────
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── MODAL ───────────────────────────────────────────────
function openModal(type) {
  document.getElementById('modal-label').textContent = type;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('modal-submit').addEventListener('click', () => {
  const fields = ['f-name', 'f-phone', 'f-email', 'f-service'];
  let valid = true;

  fields.forEach(id => {
    const el = document.getElementById(id);
    el.style.borderColor = '';
    if (!el.value.trim()) {
      el.style.borderColor = 'rgba(107,71,184,0.7)';
      el.classList.remove('shake');
      void el.offsetWidth; // reflow to restart animation
      el.classList.add('shake');
      valid = false;
    }
  });

  if (!valid) return;

  const btn = document.getElementById('modal-submit');
  let dots = 0;
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.7';
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    btn.textContent = 'SENDING' + '.'.repeat(dots);
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
    btn.textContent = 'SENT ✓';
    btn.style.opacity = '';
    btn.style.background = 'rgba(74,45,138,0.4)';
    ['f-name','f-phone','f-email','f-service','f-message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    const success = document.getElementById('modal-success');
    success.style.display = 'block';
    setTimeout(() => {
      success.style.display = 'none';
      btn.textContent = 'SEND';
      btn.style.background = '';
      btn.style.pointerEvents = '';
      closeModal();
    }, 2500);
  }, 1400);
});
