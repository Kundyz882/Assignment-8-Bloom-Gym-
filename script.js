document.addEventListener("DOMContentLoaded", () => {
  // ---- Keyboard Event Handling for Navbar Links ----
  const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (menuLinks && menuLinks.length) {
    menuLinks.forEach(link => link.setAttribute('tabindex', '0'));
    let currentIndex = 0;
    if (menuLinks[currentIndex]) menuLinks[currentIndex].focus();

    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'ArrowRight' || key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % menuLinks.length;
        menuLinks[currentIndex].focus();
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
        menuLinks[currentIndex].focus();
      } else if (key === 'Enter') {
        e.preventDefault();
        const href = menuLinks[currentIndex] && menuLinks[currentIndex].href;
        if (href) window.location.href = href;
      }
    });
  }
  

  // ---- Dynamic Managers Cards ----
  const managers = [
    { name: "Anna Petrova", role: "Cardio Fitness Manager", phone: "+7 (777) 123-45-67", email: "anna.petrova@bloomgym.com" },
    { name: "Michael Kim", role: "Yoga Hall Manager", phone: "+7 (700) 987-65-43", email: "michael.kim@bloomgym.com" },
    { name: "Sofia Lee", role: "High Heels Dance Manager", phone: "+7 (701) 555-22-11", email: "sofia.lee@bloomgym.com" },
    { name: "David Brown", role: "Strength Training Manager", phone: "+7 (702) 444-33-22", email: "david.brown@bloomgym.com" }
  ];

  const managersGrid = document.querySelector(".managers-grid");
  if (managersGrid) {
    managersGrid.innerHTML = "";
    managers.forEach(manager => {
      console.log(`Manager: ${manager.name}`);
      const card = document.createElement("div");
      card.classList.add("contact-card");
      card.innerHTML = `
        <h3>${manager.name}</h3>
        <p>${manager.role}</p>
        <p>&#128222; ${manager.phone}</p>
        <p>&#128233; ${manager.email}</p>
        <button class="copy-btn">Copy</button>`;
      managersGrid.appendChild(card);
    });
  }

  // ---- Popup Form ----
  const openPopupBtn = document.getElementById("openPopup");
  const popup = document.getElementById("popupForm");
  const closeBtn = document.querySelector(".popup .close");

  if (openPopupBtn && popup) {
    openPopupBtn.addEventListener("click", () => popup.style.display = "flex");
  }
  if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => popup.style.display = "none");
    window.addEventListener("click", (event) => {
      if (event.target === popup) popup.style.display = "none";
    });
  }

  // ---- FAQ Accordion ----
  const titles = document.querySelectorAll(".accordion-title");
  titles.forEach(title => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      if (!content) return;

      document.querySelectorAll(".accordion-content").forEach(c => {
        if (c !== content) c.classList.remove("open");
      });
      content.classList.toggle("open");
      if (content.classList.contains("open")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // ---- Date/Time Display ----
  function updateDateTime() {
    const dateTimeEl = document.getElementById('dateTime');
    if (!dateTimeEl) return;
    const now = new Date();
    const options = { 
      year:'numeric', month:'long', day:'numeric', 
      hour:'2-digit', minute:'2-digit', second:'2-digit', 
      hour12:true 
    };
    dateTimeEl.textContent = now.toLocaleString('en-US', options);
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ---- Read More Section ----
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.program-card');
      if (!card) return;
      const moreText = card.querySelector('.more-text');
      if (!moreText) return;

      if (moreText.style.display === 'block') {
        moreText.style.display = 'none';
        btn.textContent = 'Read More';
        moreText.style.color = "";
      } else {
        moreText.style.display = 'block';
        moreText.style.color = "#a32c2c";
        btn.textContent = 'Read Less';
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Rating ----
  const stars = document.querySelectorAll(".star");
  let rating = 0;
  if (stars.length) {
    stars.forEach(star => star.addEventListener("click", () => {
      rating = Number(star.dataset.value) || 0;
      stars.forEach(s => {
        const val = Number(s.dataset.value) || 0;
        s.classList.toggle("active", val <= rating);
      });
    }));
  }

  // ---- Form Validation & Multi-step ----
  const form = document.querySelector("form");
  const steps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  function showError(input, msg) {
    if (!input) return;
    const error = document.createElement("small");
    error.className = "error";
    error.style.color = "#e75480";
    error.textContent = msg;
    input.insertAdjacentElement("afterend", error);
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.remove());
  }

  function validateStep(stepIndex) {
    clearErrors();
    let valid = true;
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (stepIndex === 0 && name && name.value.trim() === "") {
      showError(name, "Please enter your full name.");
      valid = false;
    }

    if (stepIndex === 1) {
      if (phone && !/^\d{10,}$/.test(phone.value.replace(/\D/g, ""))) { 
        showError(phone, "Enter a valid phone number (10+ digits).");
        valid = false;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }
    }

    if (stepIndex === 2 && message && message.value.trim() === "") {
      showError(message, "Please enter a message.");
      valid = false;
    }

    return valid;
  }

  function showStep(index) {
    if (!steps || steps.length === 0) return;
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
  }

  // next / back buttons
  document.querySelectorAll(".next-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      if (validateStep(currentStep) && currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    })
  );

  document.querySelectorAll(".back-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  showStep(currentStep);

  // ---- Reset Form Button ----
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const formEl = document.querySelector("form");
      if (formEl) formEl.reset();
      clearErrors();
      currentStep = 0;
      showStep(currentStep);
    });
  }
  

  // ---- Switch Statements for Greeting ----
  const welcome = document.getElementById("welcomeMessage");
  const nowHour = new Date().getHours();
  let greeting = "";
  switch(true){
    case (nowHour >= 5 && nowHour < 12): greeting = "Good Morning!"; break;
    case (nowHour >= 12 && nowHour < 18): greeting = "Good Afternoon!"; break;
    case (nowHour >= 18 && nowHour < 22): greeting = "Good Evening!"; break;
    default: greeting = "Good Night!";
  }
  if (welcome) welcome.textContent = `${greeting}`;

 // ---- Sound on Form Submission ----
  if (form) {
    const successSound = new Audio('success.mp3');
    const submitBtn = form.querySelector('button[type="submit"], #submit');

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateStep(currentStep)) return;
      

      //----Loading spinner on Submit----
      if (submitBtn) {
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Please wait...
        `;
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = "Send";
          submitBtn.disabled = false;
        }

        try {
          successSound.play();
        } catch (e) {
          console.warn("Sound couldn't be played:", e);
        }

        //----Notification System----
        showNotification("✅ Your message has been successfully sent!");

        form.reset();
        currentStep = 0;
        showStep(currentStep);
      }, 2000);
    });
  }

    // ---- Toast Notification----
    function showNotification(message) {
      const notification = document.createElement("div");
      notification.className = "custom-toast";
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => notification.classList.add("show"), 10);

      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    }


  //-----Animations----

  //--Navbar Animation ---
  window.addEventListener("load", () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    navbar.style.opacity = "0";
    navbar.style.transform = "translateY(-50px)";
    navbar.style.transition = "all 0.8s ease";
    setTimeout(() => {
      navbar.style.opacity = "1";
      navbar.style.transform = "translateY(0)";
    }, 200);
  });

  // ---- Change Background Color + Animation  ----
  const changeColorBtn = document.getElementById("changeColorBtn");
  if (changeColorBtn) {
    const colors = ['#f4c2c2', '#b3e5fc', '#c8e6c9', '#fff9c4', '#d1c4e9', '#ffccbc'];
    let currentColor = 0;
    changeColorBtn.addEventListener("click", () => {
      document.body.style.backgroundColor = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
      changeColorBtn.style.transform = "scale(1.1)";
      changeColorBtn.style.transition = "transform 0.3s ease";
      setTimeout(() => changeColorBtn.style.transform = "scale(1)", 300);
    });
  }

  // --- Welcome message typing effect ---
  if (welcome) {

    const text = " Welcome to Bloom GYM!";
    let i = 0;
    function typeText() {
      if (i < text.length) {
        welcome.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, 80);
      }
    }
    setTimeout(typeText, 300);
  }

  // --- Home Page: Fade-in animation for sections---
  const fadeElements = document.querySelectorAll(".grid-sidebar, .grid-main, .big-photo");
  if (fadeElements.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Image hover animation ---
  const images = document.querySelectorAll(".big-photo");
  images.forEach(img => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)";
      img.style.transition = "transform 0.3s ease";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });
  });

  // --- Gallery Page: Smooth Carousel Animation  ---
  window.addEventListener("load", () => {
    const carousel = document.getElementById("gymCarousel");
    if (!carousel) return;
    const fadeInImages = imgs => {
      imgs.forEach(img => {
        img.style.opacity = "0";
        img.style.transform = "scale(0.92)";
        img.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        setTimeout(() => {
          img.style.opacity = "1";
          img.style.transform = "scale(1)";
        }, 100);
      });
    };
    const activeSlide = carousel.querySelector(".carousel-item.active img");
    if (activeSlide) fadeInImages([activeSlide]);
    carousel.addEventListener("slid.bs.carousel", () => {
      const imgs = carousel.querySelectorAll(".carousel-item.active img");
      fadeInImages(imgs);
    });
  });

  // -----jQuery parts------
  if (window.jQuery) {
    $(function() {
      console.log("jQuery is ready!");

      // --- Real-time Search and Live Filter ---
      if ($("#photoSearch").length) {
        $("#photoSearch").on("keyup", function() {
          const value = $(this).val().toLowerCase().trim();
          $(".carousel-item").show();

          if (value === "") return;

          $(".carousel-item").each(function() {
            const hasMatch = $(this).find("img").filter(function() {
              return ($(this).attr("alt") || "").toLowerCase().includes(value);
            }).length > 0;

            if (hasMatch) $(this).show(); else $(this).hide();
          });
        });

        // --- Autocomplete Search Suggestions ---
        const programs = ["Strength Training", "Yoga", "Cardio Fitness", "High Heels Dance"];
        $("#photoSearch").on("keyup", function () {
          const input = $(this).val().toLowerCase();
          const matches = programs.filter(p => p.toLowerCase().includes(input));
          $("#photoSuggestions").empty();
          if (input.length > 0) {
            matches.forEach(m => $("#photoSuggestions").append(`<li class="list-group-item">${m}</li>`));
          }
        });

        $(document).on("click", "#photoSuggestions li", function () {
          const selected = $(this).text();
          $("#photoSearch").val(selected);
          $("#photoSuggestions").empty();
          $(".carousel-item img").each(function () {
            const altText = ($(this).attr("alt") || "").toLowerCase();
            if (altText.includes(selected.toLowerCase())) {
              $(this).closest(".carousel-item").addClass("active").siblings().removeClass("active");
              return false;
            }
          });
        });
      }

      // --- Search Highlighting ---
      if ($("#searchBtn").length && $("#searchInput").length) {
        function removeHighlights() {
          $(".highlight").each(function() {
            $(this).replaceWith($(this).text());
          });
        }

        $("#searchBtn").on("click", function() {
          const keyword = $("#searchInput").val().trim();
          removeHighlights();

          if (keyword.length > 0) {
            const regex = new RegExp("(" + keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");

            $("p, .accordion-title").each(function() {
              let html = $(this).html();
              html = html.replace(regex, '<span class="to-highlight">$1</span>');
              $(this).html(html);
            });

            $(".to-highlight").each(function() {
              $(this).wrap('<span class="highlight"></span>');
              $(this).contents().unwrap();
            });
          }
        });

        $("#searchInput").on("input", function() {
          if ($(this).val().trim() === "") removeHighlights();
        });
      }

      // --- Lazy Loading Images ---
      function lazyLoadImages() {
        $('.lazy').each(function() {
          const img = $(this);
          const imgTop = img.offset().top;
          const windowBottom = $(window).scrollTop() + $(window).height();
          if (imgTop < windowBottom + 100) {
            const src = img.attr('data-src');
            if (src) {
              img.attr('src', src);
              img.addClass('loaded');
              img.removeAttr('data-src');
            }
          }
        });
      }
      lazyLoadImages();
      $(window).on('scroll resize', lazyLoadImages);

      // --- Copied to Clipboard Button ---
      $('.copy-btn').on('click', function () {
      const $btn = $(this);
      const $card = $btn.closest('.contact-card');
      let text = '';
      $card.find('h3, p').each(function () {
        text += $(this).text().trim() + '\n';
      });
      const $temp = $('<textarea>');
      $('body').append($temp);
      $temp.val(text.trim()).select();
      document.execCommand('copy');
      $temp.remove();
      $btn.trigger('copy');
    });

    $('.copy-btn').on('copy', function () {
      const $btn = $(this);
      $btn.html('&#10004;');
      const $tooltip = $('<span class="tooltip">Copied to clipboard!</span>');
      $btn.append($tooltip);
      $btn.addClass('copied');
      $tooltip.fadeIn(200);
      setTimeout(() => {
        $tooltip.fadeOut(200, function () { $(this).remove(); });
        $btn.html('Copy');
        $btn.removeClass('copied');
      }, 2000);
    });

    }); 
  } 

  // ----- Pure JS parts -----
  // Scroll Progress Bar
  window.onscroll = function() {
    const progress = document.getElementById("progress-bar");
    if (!progress) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = scrolled + "%";
  };

  // Animated Number Counter
  const counters = document.querySelectorAll('.count');
  const speed = 100;
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCount();
    });
  };

  if (counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(document.querySelector('.stats-section'));
  }

  // THEME TOGGLE 

  const toggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "day";
  document.body.classList.add(currentTheme === "night" ? "night-theme" : "day-theme");
  if (toggle) toggle.checked = currentTheme === "night";

  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.remove("day-theme");
        document.body.classList.add("night-theme");
        localStorage.setItem("theme", "night");
      } else {
        document.body.classList.remove("night-theme");
        document.body.classList.add("day-theme");
        localStorage.setItem("theme", "day");
      }
    });
  }


});

