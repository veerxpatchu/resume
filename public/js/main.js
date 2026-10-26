/**
 * RESUME & PORTFOLIO JAVASCRIPT
 * Veeraphat Chuenphirom (Computer Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initMobileNav();
  initActiveNavLink();
  initProjectFilters();
  initContactForm();
  initBackToTop();
  initStatsCounter();
  initTerminalInteraction();
});

/* ===================================================================
   1. THEME SWITCHER (DARK / LIGHT)
   =================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  if (theme === 'light') {
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    toggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)');
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    toggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)');
  }
}

/* ===================================================================
   2. TYPING ANIMATION IN HERO SECTION
   =================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const words = [
    'Computer Science Student',
    'Full-Stack Developer',
    'Software Engineer',
    'Node.js & JavaScript Specialist',
    'Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseEnd = 2000;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pauseEnd);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 400);
      return;
    }

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* ===================================================================
   3. MOBILE NAVIGATION (HAMBURGER MENU)
   =================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });
}

/* ===================================================================
   4. ACTIVE LINK ON SCROLL
   =================================================================== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ===================================================================
   5. PROJECT FILTERS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. CONTACT FORM AJAX SUBMISSION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังส่งข้อความ...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showToast(result.message || 'ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อครับ!', 'success');
        form.reset();
      } else {
        showToast(result.message || 'เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองใหม่อีกครั้ง', 'error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showToast('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่อของคุณ', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'success' ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-circle-exclamation text-danger';
  toast.className = `toast toast-${type} show`;
  toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ===================================================================
   7. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   8. STATS COUNTER ANIMATION
   =================================================================== */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-number');
  if (!statsElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statsElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const steps = 40;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + (el.getAttribute('data-suffix') || '');
          }, duration / steps);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ===================================================================
   9. INTERACTIVE TERMINAL SIMULATOR
   =================================================================== */
function initTerminalInteraction() {
  const terminalInput = document.getElementById('terminal-interactive-input');
  const terminalOutput = document.getElementById('terminal-interactive-output');
  if (!terminalInput || !terminalOutput) return;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      let responseText = '';
      switch (command) {
        case 'help':
          responseText = `Available commands: 
- <span class="t-key">about</span>: Short bio
- <span class="t-key">skills</span>: Core technologies
- <span class="t-key">projects</span>: Highlighted works
- <span class="t-key">contact</span>: Email & social links
- <span class="t-key">clear</span>: Clear output`;
          break;
        case 'about':
          responseText = `<span class="t-string">"นายวีรภัทร ชื่นภิรมย์ (Veeraphat) - Computer Science Student @ มหาวิทยาลัยราชภัฏเพชรบุรี (PBRU) with high passion in Full-Stack Web Development, Data Structures, and Cloud deployment."</span>`;
          break;
        case 'skills':
          responseText = `<span class="t-key">[JavaScript, Node.js, Express, Python, Java, SQL, Git, Docker, REST API]</span>`;
          break;
        case 'projects':
          responseText = `<span class="t-string">1. DevHub Collaboration Platform\n2. Algorithm Visualizer (QuickSort & Dijkstra)\n3. E-Commerce REST API Engine\n4. Campus Analytics Dashboard</span>`;
          break;
        case 'contact':
          responseText = `<span class="t-prompt">Email:</span> veeraphat.ch@example.com | <span class="t-prompt">GitHub:</span> github.com/veeraphat-ch`;
          break;
        case 'clear':
          terminalOutput.innerHTML = '';
          return;
        case '':
          return;
        default:
          responseText = `<span style="color:#ef4444;">Command not found: "${command}". Type "help" for a list of commands.</span>`;
          break;
      }

      const logEntry = document.createElement('div');
      logEntry.style.marginTop = '0.5rem';
      logEntry.innerHTML = `<span class="t-prompt">veeraphat@cs-laptop:~$</span> <span class="t-command">${command}</span>\n<div>${responseText}</div>`;
      terminalOutput.appendChild(logEntry);

      // Auto scroll terminal to bottom
      const terminalBody = document.querySelector('.terminal-body');
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}
