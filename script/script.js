/* GSAP */
const navbarMenu = document.getElementById("menu");
const navbarButton = document.getElementById("navbarButton");
let isOpen = false;

navbarButton.addEventListener("click", function() {
    isOpen = !isOpen;

    if (isOpen) {
        gsap.to(navbarMenu, {
            height: "100vh",
            duration: 0.6,
            opacity: 1,
            ease: "power2.out",
        });
    } else {
        gsap.to(navbarMenu, {
            height: "0vh",
            duration: 0.5,
            opacity: 0,
            ease: "power2.out",
        })
    }
})


let isSettingOpen = false;
const setting = document.getElementById("settings");
const settingMenuButton = document.getElementById("settings-menu");

function OpenSetting() {
    setting.classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
    gsap.to(setting,
        {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        });
    isSettingOpen = true;
}

function CloseSetting() {
    document.querySelector("body").classList.remove("no-scroll");
    gsap.to(setting,
        {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                setting.classList.add("hidden");
            }
        });
    isSettingOpen = false;
}

settingMenuButton.addEventListener("click", () => {
    if (!isSettingOpen) {
        OpenSetting();
    } else {
        CloseSetting();
    }
})


document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const tabContent = document.getElementById("tab-content");

    function loadContent(file) {
        gsap.to(tabContent, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            onComplete: () => {
                fetch(file)
                .then(response => response.text())
                .then(data => {
                    tabContent.innerHTML = data;
                    gsap.to(tabContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                })
                .catch(error => {
                    tabContent.innerHTML = "<p class='text-red-500'>Gagal memuat konten.</p>";
                });
            }});
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("bg-neutral-800", "text-white"));
            tab.classList.add("bg-neutral-800", "text-white");

            const file = tab.getAttribute("tab-get");
            loadContent(file);
        });
    });

    loadContent("components/setting-content1.html");
    tabs[0].classList.add("bg-neutral-800", "text-white");
});


document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline();

    tl.to("#asus", {
        opacity: 1,
        duration: 2,
        scale: 2,
        clipPath: "circle(100%)"
    }).to("#asus", {
        yPercent: -28,
        duration: 0.8,
    }).to("#intro", {
        opacity: 1,
        duration: 0.7,
        scale: 1.2,
        yPercent: -17,
    }, "<").to(["#gap1", "#gap2"], {
        height: 0,
        duration: 1.3,
        ease: "power2.in"
    }, "4").to(["#intro", "#asus"], {
        opacity: 0,
        duration: 1.2,
    }, "<").to("#introView", {
        scale: 0,
    })

    let animateReview = gsap.timeline({
        scrollTrigger: {
            trigger: "#animation-start",
            start: "top 0px",
            end: "+=1500",
            scrub: true,
            //markers: true,
        }
    });

    function animationReview() {
        return gsap.timeline()
        .to("#review", {
            opacity: 1,
            background: "linear-gradient(to 63deg, #171A1B, #25241F)",
        }).to("#dropImage", {
            yPercent: -8,
        }, "<").to("#titleReview", {
            yPercent: 3,
            scale: 1.1,
        })
    }
    let beginAnimate = animateReview.add(animationReview());
});

const carousel = document.getElementById("carousel");
const slides = carousel.children;
const totalSlides = slides.length;
let currentIndex = 0;

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    gsap.to(carousel, {
        x: -index * 100 + "%",
        duration: 0.8,
        ease: "power2.out"
    });
    currentIndex = index;
}

document.getElementById("prev").addEventListener("click", () => goToSlide(currentIndex - 1));
document.getElementById("next").addEventListener("click", () => goToSlide(currentIndex + 1));
