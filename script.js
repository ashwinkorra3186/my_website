// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  // Show mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Hide mobile menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Hide menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== SMOOTH SCROLLING =====
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
    }
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
      };
      
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.style.background = '#10b981';
        
        // Reset form after 2 seconds
        setTimeout(() => {
          this.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.background = '';
        }, 2000);
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
      }, 1500);
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards and portfolio cards
  const animatedElements = document.querySelectorAll('.service-card, .portfolio-card');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ===== FLOATING CARDS PARALLAX =====
  const floatingCards = document.querySelectorAll('.floating-card');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    floatingCards.forEach((card, index) => {
      const speed = 0.3 + (index * 0.1);
      card.style.transform = `translateY(${parallax * speed}px)`;
    });
  });

  // ===== STATS COUNTER ANIMATION =====
  const stats = document.querySelectorAll('.stat h3');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
      }
    });
  });

  if (stats.length > 0) {
    statsObserver.observe(stats[0].parentElement.parentElement);
  }

  function animateStats() {
    stats.forEach(stat => {
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      const suffix = finalValue.replace(/[0-9]/g, '');
      
      let currentValue = 0;
      const increment = numericValue / 50;
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          stat.textContent = finalValue;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(currentValue) + suffix;
        }
      }, 40);
    });
  }

  // ===== UTILITY FUNCTIONS =====
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#667eea'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  // ===== PORTFOLIO CARD HOVER EFFECTS =====
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== SERVICE CARD INTERACTIONS =====
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const features = card.querySelectorAll('.service-card__features li');
    
    card.addEventListener('mouseenter', () => {
      features.forEach((feature, index) => {
        setTimeout(() => {
          feature.style.transform = 'translateX(5px)';
          feature.style.transition = 'transform 0.2s ease';
        }, index * 50);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      features.forEach(feature => {
        feature.style.transform = 'translateX(0)';
      });
    });
  });

  // ===== THEME TOGGLE (Optional) =====
  // Uncomment if you want to add a dark mode toggle
  /*
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = 'theme-toggle';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  document.body.appendChild(themeToggle);
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
  */

  // ===== LOADING ANIMATION =====
  window.addEventListener('load', () => {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    `;
    
    loadingOverlay.innerHTML = `
      <div style="text-align: center; color: white;">
        <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <h3 style="font-family: 'Inter', sans-serif; font-weight: 600;">Kivra.services</h3>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(loadingOverlay);
      }, 500);
    }, 1000);
  });
});