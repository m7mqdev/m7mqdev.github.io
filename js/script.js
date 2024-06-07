let interestContent;
document.addEventListener("DOMContentLoaded", (ev) => {

    document.documentElement.setAttribute("theme", getTheme());
    const themeBtn = document.querySelector(".theme");
    const currentTheme = document.documentElement.getAttribute("theme");
    const themeIcon = themeBtn.querySelector("i");
    function updateThemeBtn() {
        if (currentTheme === "light") {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }
    updateThemeBtn();
    themeBtn.addEventListener("click", () => {
        if (currentTheme === "light") {
            document.documentElement.removeAttribute("theme");
            storeTheme(null);
        } else {
            document.documentElement.setAttribute("theme", "light");
            storeTheme("light");
        }
        updateThemeBtn();
    });
    interestContent = document.querySelector("main .interest-content");
    const buttons = document.querySelectorAll("main .interests-list button");
    setTimeout(() => {
        const majorHeader = document.querySelector("main .intro .h2");
        majorHeader.classList.add("typing-blinking-animation");
        typeWriterLoop(majorHeader, 100, 2);
    }, 2050);
    // Loop through each button and attach the onclick event
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            changeHobby(button);
        });
    })
    const btnsContainer = document.querySelector("header .nav-btns"); // nav buttons
    if (window.innerWidth <= 950) {
        btnsContainer.classList.remove("visible");
        btnsContainer.classList.add("sticky");
    }
    document.querySelector("header nav .bars").addEventListener("click", () => {
        if (btnsContainer.classList.contains("visible")) {
            btnsContainer.classList.remove("visible");
            return;
        }
        btnsContainer.classList.add("visible");
    });
    btnsContainer.querySelectorAll("a").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (window.innerWidth <= 950) {
                btnsContainer.classList.remove("visible");
            }
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 950) {
            btnsContainer.classList.remove("visible");
            btnsContainer.classList.add("sticky");
        } else {
            btnsContainer.classList.add("visible");
            btnsContainer.classList.remove("sticky");
        }
    });
});
function storeTheme(theme) {
    localStorage.setItem('theme', theme);
}

function getTheme() {
    return localStorage.getItem('theme');
}
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
function changeHobby(button) {
    if (button == null) {
        return;
    }
    if (button instanceof HTMLButtonElement) {
        if (button.classList == null || button.classList.contains("selected")) {
            return;
        }
        const bg = button.dataset.bg;
        const desc = button.dataset.desc;
        const title = button.dataset.title;
        const filter = button.dataset.filter;
        const selectedBtn = document.querySelector(".interests-list .selected");
        selectedBtn.classList.remove("selected");
        button.classList.add("selected");
        if (interestContent == null) {
            return;
        }
        const textContent = interestContent.querySelector(".text-content");
        const image = interestContent.querySelector("img");

        textContent.querySelector("h3").textContent = title;
        textContent.querySelector("p").textContent = desc;

        image.style.transform = 'translateX(-100%)';
        const opacityBefore = image.style.opacity;
        image.style.opacity = '0';

        // Remove transition temporarily


        // Load the new image source
        setTimeout(() => {
            image.style.transition = 'unset';
            const lastFilter = selectedBtn.dataset.filter;
            if (lastFilter != null) {
                image.classList.remove(selectedBtn.dataset.filter);
            }
            if (filter != null) {
                image.classList.add(filter);
            }
            image.src = bg;
            image.style.opacity = opacityBefore;
            image.style.transform = 'translateX(100%)';
            // Slide in the new image from the right after a short delay
            setTimeout(() => {
                image.style.transition = '0.3s';
                image.offsetHeight;
                image.style.transform = 'translateX(0)';
            }, 20);
        }, 300);


    }
}