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
