 // Cookies
  const cookieBar = document.getElementById("cookie-bar");
  const cookieAcceptAll = document.getElementById("cookie-accept-all");
  const cookieAcceptNecessary = document.getElementById("cookie-accept-necessary");
  const cookieConfigure = document.getElementById("cookie-configure");
  const cookieModal = document.getElementById("cookie-modal");
  const cookieSave = document.getElementById("cookie-save");
  const cookieCancel = document.getElementById("cookie-cancel");
  const analyticsCheckbox = document.getElementById("analytics-cookies");
  const marketingCheckbox = document.getElementById("marketing-cookies");

  // Comprobar preferencias de cookies
  function checkCookiesAccepted() {
    return localStorage.getItem("cookiesAccepted") !== null;
  }

  // Mostrar barra con animación mejorada
  function showCookieBar() {
    if (!checkCookiesAccepted() && cookieBar) {
      cookieBar.style.display = "block";

      // Forzar reflow para activar la animación
      void cookieBar.offsetHeight;

      setTimeout(() => {
        cookieBar.classList.add("show");

        // Animación escalonada para botones
        const buttons = cookieBar.querySelectorAll(".cookie-button");
        buttons.forEach((btn, index) => {
          btn.style.transition = `all 0.5s ease ${0.3 + index * 0.1}s`;
          btn.style.opacity = "1";
          btn.style.transform = "translateY(0)";
        });
      }, 100);
    }
  }

  // Ocultar barra con animación
  function hideCookieBar() {
    if (cookieBar) {
      cookieBar.classList.remove("show");
      setTimeout(() => {
        cookieBar.style.display = "none";
      }, 600); // Coincide con la duración de la animación
    }
  }

  // Aceptar todas las cookies
  function acceptAllCookies() {
    localStorage.setItem("cookiesAccepted", "all");
    localStorage.setItem("analyticsCookies", "true");
    localStorage.setItem("marketingCookies", "true");
    hideCookieBar();
    showNotification("Preferencias de cookies guardadas");
  }

  // Aceptar solo necesarias
  function acceptNecessaryCookies() {
    localStorage.setItem("cookiesAccepted", "necessary");
    localStorage.setItem("analyticsCookies", "false");
    localStorage.setItem("marketingCookies", "false");
    hideCookieBar();
    showNotification("Solo se han aceptado cookies necesarias");
  }

  // Mostrar modal de configuración
  function showCookieModal() {
    if (cookieModal) {
      cookieModal.classList.add("show");

      // Cargar preferencias existentes
      const analyticsAccepted = localStorage.getItem("analyticsCookies") === "true";
      const marketingAccepted = localStorage.getItem("marketingCookies") === "true";

      if (analyticsCheckbox) analyticsCheckbox.checked = analyticsAccepted;
      if (marketingCheckbox) marketingCheckbox.checked = marketingAccepted;
    }
  }

  // Guardar preferencias personalizadas
  function saveCookiePreferences() {
    const analyticsAccepted = analyticsCheckbox ? analyticsCheckbox.checked : false;
    const marketingAccepted = marketingCheckbox ? marketingCheckbox.checked : false;

    localStorage.setItem("cookiesAccepted", "custom");
    localStorage.setItem("analyticsCookies", analyticsAccepted.toString());
    localStorage.setItem("marketingCookies", marketingAccepted.toString());

    if (cookieModal) cookieModal.classList.remove("show");
    hideCookieBar();
    showNotification("Preferencias de cookies guardadas");
  }

  // Event listeners seguros
  if (cookieAcceptAll) {
    cookieAcceptAll.addEventListener("click", acceptAllCookies);
  }

  if (cookieAcceptNecessary) {
    cookieAcceptNecessary.addEventListener("click", acceptNecessaryCookies);
  }

  if (cookieConfigure) {
    cookieConfigure.addEventListener("click", showCookieModal);
  }

  if (cookieSave) {
    cookieSave.addEventListener("click", saveCookiePreferences);
  }

  if (cookieCancel) {
    cookieCancel.addEventListener("click", () => {
      if (cookieModal) cookieModal.classList.remove("show");
    });
  }

  //TOGGLE

 function toggleMenu() {
    document.querySelector('.menu-lateral').classList.toggle('active');
}

//TEXTOS LEGALES
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.menu-vertical a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    // Observa todas las secciones
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
});