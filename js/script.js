document.addEventListener("DOMContentLoaded", (ev) => {
  /* THEME CHANGING START */
  function storeTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function getTheme() {
    return localStorage.getItem("theme");
  }
  var firstLoadTheme = getTheme();
  if (firstLoadTheme === "dark") {
    document.documentElement.setAttribute("theme", firstLoadTheme);
  }
  const themeBtn = document.querySelector(".theme");
  const themeIcon = themeBtn.querySelector("i");
  var themeCheckBoxLabel = document.querySelector(".theme .switch");
  var themeCheckBox = document.querySelector(".theme .switch #checkboxinp");
  function updateThemeBtn() {
    themeCheckBox.checked = getTheme() === "dark";
  }
  updateThemeBtn();
  function changeTheme() {
    const currentTheme = document.documentElement.getAttribute("theme");
    if (currentTheme === "light") {
      document.documentElement.setAttribute("theme", "dark");
      storeTheme("dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
      storeTheme(null);
    }
  }
  themeIcon.addEventListener("click", () => {
    changeTheme();
    updateThemeBtn();
  });
  themeCheckBox.addEventListener("change", () => {
    changeTheme();
  });
  /* THEME CHANGING END*/
  const btnsContainer = document.querySelector("header .nav-btns"); // nav buttons
  if (window.innerWidth <= 950) {
    btnsContainer.classList.remove("visible");
    btnsContainer.classList.add("sticky");
  }
  const barsButton = document.querySelector("header nav .bars");
  barsButton.addEventListener("click", () => {
    if (btnsContainer.classList.contains("visible")) {
      btnsContainer.classList.remove("visible");
      return;
    }
    btnsContainer.classList.add("visible");
  });
  document.addEventListener("click", function (event) {
    const isBarsButtonVisible =
      barsButton.style.display !== "none" &&
      barsButton.style.visibility !== "hidden" &&
      btnsContainer.classList.contains("sticky");
    if (!isBarsButtonVisible) return;
    const isClickInside =
      barsButton.contains(event.target) || btnsContainer.contains(event.target);
    if (!isClickInside) {
      btnsContainer.classList.remove("visible");
    }
  });
  /* Nav 3 bars button, as well as the nav bar handling being sticky or absolute based on  */
  const majorHeader = document.querySelector("main .intro .h2");
  majorHeader.classList.add("typing-blinking-animation");
  typeWriterLoop(majorHeader, 100, 2);
  btnsContainer.querySelectorAll("a").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 950) {
        btnsContainer.classList.remove("visible");
      }
    });
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 950) {
      btnsContainer.classList.remove("visible");
      btnsContainer.classList.add("sticky");
    } else {
      btnsContainer.classList.add("visible");
      btnsContainer.classList.remove("sticky");
    }
  });
});

function typeWriterLoop(textElement, speed, maximumTimes) {
  const text = textElement.textContent.trim(); // Get the existing text content
  let reverse = true;
  let i = text.length;
  let times = 0;
  const typingInterval = setInterval(() => {
    if (!reverse) {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
      } else {
        reverse = true;
        times++;
        if (times >= maximumTimes) {
          clearInterval(typingInterval);
        }
        i--;
      }
    } else {
      if (i > 0) {
        textElement.textContent = text.substring(0, i);
        i--;
      } else {
        i++;
        times++;
        if (times >= maximumTimes) {
          clearInterval(typingInterval);
        }
        reverse = false;
      }
    }
  }, speed);
}
