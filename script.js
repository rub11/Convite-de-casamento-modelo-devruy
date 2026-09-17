/**
 * NOSSO DIA — CONVITE DE CASAMENTO DIGITAL
 * Lógica JavaScript Completa (Vanilla JS)
 */

/* ==========================================================================
   CONFIGURAÇÕES GERAIS DO CASAMENTO (FÁCIL EDIÇÃO)
   ========================================================================== */
const CONFIG = {
  coupleNames: "Helena & Rafael",
  weddingDate: "2026-11-15T16:00:00", // Formato ISO
  whatsappNumber: "5511999999999",     // Número oficial para receber confirmações
  addresses: {
    ceremonia: "Igreja Nossa Senhora do Brasil, Praça Nossa Sra. do Brasil - Jardim América, São Paulo - SP",
    recepcao: "Espaço Jardim Paulista, Av. Rebouças, 1200 - Jardins, São Paulo - SP"
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TELA DE ABERTURA (ENVELOPE DIGITAL)
     ========================================================================== */
  const introOverlay = document.getElementById('intro-overlay');
  const btnOpenInvite = document.getElementById('btn-open-invite');

  btnOpenInvite.addEventListener('click', () => {
    introOverlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    
    // Opcional: Tentar reproduzir a música automaticamente ao abrir se configurado
  });

  /* ==========================================================================
     2. HEADER STICKY & MENU MOBILE
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const toggleMobileMenu = () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     3. PARALLAX NO HERO
     ========================================================================== */
  const heroBgImg = document.getElementById('hero-bg-img');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    if (scrollPos < window.innerHeight && heroBgImg) {
      heroBgImg.style.transform = `translateY(${scrollPos * 0.3}px)`;
    }
  });

  /* ==========================================================================
     4. CONTAGEM REGRESSIVA FUNCIONAL
     ========================================================================== */
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const finishedMsg = document.getElementById('countdown-finished-msg');

  const updateCountdown = () => {
    const targetDate = new Date(CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      countdownGrid.style.display = 'none';
      finishedMsg.style.display = 'block';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerDays.textContent = days < 10 ? `0${days}` : days;
    timerHours.textContent = hours < 10 ? `0${hours}` : hours;
    timerMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    timerSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     5. RSVP — ALTERNÂNCIA E ENVIO INTEGRADO AO WHATSAPP
     ========================================================================== */
  const btnChoiceYes = document.getElementById('btn-choice-yes');
  const btnChoiceNo = document.getElementById('btn-choice-no');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpDeclineBox = document.getElementById('rsvp-decline-box');
  const rsvpSuccessMsg = document.getElementById('rsvp-success-msg');

  btnChoiceYes.addEventListener('click', () => {
    btnChoiceYes.classList.add('active');
    btnChoiceNo.classList.remove('active');
    rsvpForm.style.display = 'flex';
    rsvpDeclineBox.style.display = 'none';
    rsvpSuccessMsg.style.display = 'none';
  });

  btnChoiceNo.addEventListener('click', () => {
    btnChoiceNo.classList.add('active');
    btnChoiceYes.classList.remove('active');
    rsvpForm.style.display = 'none';
    rsvpDeclineBox.style.display = 'block';
    rsvpSuccessMsg.style.display = 'none';
  });

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const phone = document.getElementById('rsvp-phone').value.trim();
    const guests = document.getElementById('rsvp-guests').value;
    const diet = document.getElementById('rsvp-diet').value.trim() || 'Nenhuma';

    if (!name || !phone) return;

    // Mensagem formatada para o WhatsApp
    const message = `Olá! Sou *${name}* e confirmo minha presença no casamento de ${CONFIG.coupleNames}! ❤️%0A%0A` +
                    `*Acompanhantes:* ${guests} pessoa(s)%0A` +
                    `*WhatsApp:* ${phone}%0A` +
                    `*Restrição alimentar:* ${diet}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${message}`;

    // Mostrar feedback de sucesso e abrir WhatsApp
    rsvpForm.style.display = 'none';
    rsvpSuccessMsg.style.display = 'block';

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  });

  /* ==========================================================================
     6. GALERIA DE FOTOS COM LIGHTBOX COMPLETO
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentImgIndex = 0;
  const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

  const openLightbox = (index) => {
    currentImgIndex = index;
    lightboxImg.src = imageSources[currentImgIndex];
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'));
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxNext.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % imageSources.length;
    lightboxImg.src = imageSources[currentImgIndex];
  });

  lightboxPrev.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + imageSources.length) % imageSources.length;
    lightboxImg.src = imageSources[currentImgIndex];
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext.click();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
  });

  /* ==========================================================================
     7. PLAYER DE MÚSICA CUSTOMIZADO
     ========================================================================== */
  const coupleAudio = document.getElementById('couple-audio');
  const btnPlayMusic = document.getElementById('btn-play-music');
  const musicIcon = document.getElementById('music-icon');
  const progressBar = document.getElementById('music-progress-bar');
  const musicTime = document.getElementById('music-time');

  let isPlaying = false;

  btnPlayMusic.addEventListener('click', () => {
    if (isPlaying) {
      coupleAudio.pause();
      musicIcon.textContent = '▶';
    } else {
      coupleAudio.play();
      musicIcon.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
  });

  coupleAudio.addEventListener('timeupdate', () => {
    if (coupleAudio.duration) {
      const progressPercent = (coupleAudio.currentTime / coupleAudio.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      const mins = Math.floor(coupleAudio.currentTime / 60);
      const secs = Math.floor(coupleAudio.currentTime % 60);
      musicTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  });

  /* ==========================================================================
     8. LIVRO DE VISITAS / MENSAGENS (LOCALSTORAGE)
     ========================================================================== */
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookFeed = document.getElementById('guestbook-feed');

  // Carregar mensagens salvas ou definir demonstrativas
  const getStoredMessages = () => {
    const saved = localStorage.getItem('devruby_wedding_messages');
    if (saved) return JSON.parse(saved);
    return [
      { name: "Mariana & Carlos", text: "Desejamos toda a felicidade do mundo a vocês nessa nova fase! Contando os dias!", date: "10/10/2026" },
      { name: "Tia Sophia", text: "Que Deus abençoe essa união linda. Helena, você será uma noiva maravilhosa!", date: "12/10/2026" }
    ];
  };

  const renderMessages = () => {
    const messages = getStoredMessages();
    guestbookFeed.innerHTML = messages.map(msg => `
      <div class="guestbook-card">
        <h4 class="gb-author">${escapeHtml(msg.name)}</h4>
        <span class="gb-date">${msg.date}</span>
        <p class="gb-text">${escapeHtml(msg.text)}</p>
      </div>
    `).join('');
  };

  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('gb-name');
    const msgInput = document.getElementById('gb-message');

    if (!nameInput.value.trim() || !msgInput.value.trim()) return;

    const newMessage = {
      name: nameInput.value.trim(),
      text: msgInput.value.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };

    const messages = getStoredMessages();
    messages.unshift(newMessage);
    localStorage.setItem('devruby_wedding_messages', JSON.stringify(messages));

    nameInput.value = '';
    msgInput.value = '';
    renderMessages();
  });

  renderMessages();

  /* ==========================================================================
     9. MODAL DA LISTA DE PRESENTES
     ========================================================================== */
  const giftModal = document.getElementById('gift-modal');
  const btnOpenGifts = document.getElementById('btn-open-gifts');
  const giftModalClose = document.getElementById('gift-modal-close');

  btnOpenGifts.addEventListener('click', () => {
    giftModal.classList.add('active');
    giftModal.setAttribute('aria-hidden', 'false');
  });

  giftModalClose.addEventListener('click', () => {
    giftModal.classList.remove('active');
    giftModal.setAttribute('aria-hidden', 'true');
  });

  /* ==========================================================================
     10. FAQ ACCORDION
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  /* ==========================================================================
     11. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     12. BOTÃO VOLTAR AO TOPO
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ==========================================================================
   FUNÇÕES GLOBAIS DE MAPEAMENTO (MAPS & WAZE)
   ========================================================================== */
function openGoogleMaps(venueKey) {
  const address = CONFIG.addresses[venueKey];
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

function openWaze(venueKey) {
  const address = CONFIG.addresses[venueKey];
  window.open(`https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`, '_blank');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}