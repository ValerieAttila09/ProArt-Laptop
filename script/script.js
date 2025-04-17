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
            end: "+=1300",
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



const supabaseClient = supabase.createClient('https://wpupfzumeufxqvmqtlvs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwdXBmenVtZXVmeHF2bXF0bHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNzk0NjIsImV4cCI6MjA1ODc1NTQ2Mn0.6VzojGXQ0nxvHZNYKvgMKF0qZW39ryGKJQhHOB5hzb4');

const form = document.getElementById('testimonial-form');
const list = document.getElementById('testimonial-list');

async function loadTestimonials() {
    const {
        data,
        error
    } = await supabaseClient
    .from('testimonials')
    .select('*')
    .order('created_at', {
        ascending: false
    });

    if (data) {
        list.innerHTML = '';
        data.forEach(addTestimonialToDOM);
    }
}

function addTestimonialToDOM( {
    name, message, created_at
}) {
    const item = document.createElement('div');
    item.className = "relative p-4 border border-neutral-700 rounded-lg shadow-lg shadow-neutral-900 bg-neutral-900/80 focus:scale-[1.04] transition-all";
    item.innerHTML = `
    <div class="w-[2.1rem] h-[2.1rem] flex justify-center items-center absolute -top-2 -left-1 rounded-full bg-sky-500 overflow-hidden">
        <svg class="size-4" fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="796 698 200 200" enable-background="new 796 698 200 200" xml:space="preserve">
            <g>
                <path d="M885.208,749.739v-40.948C836.019,708.791,796,748.81,796,798v89.209h89.208V798h-48.26
                    C836.948,771.39,858.598,749.739,885.208,749.739z" />
                <path d="M996,749.739v-40.948c-49.19,0-89.209,40.019-89.209,89.209v89.209H996V798h-48.26
                    C947.74,771.39,969.39,749.739,996,749.739z" />
            </g>
        </svg>
    </div>
    <div class="w-full grid px-4 gap-1">
        <p class="instrument-sans-bold text-neutral-100">${name}</p>
        <p class="instrument-sans-regular text-md text-neutral-400">${message}</p>
        <p class="text-xs text-neutral-500">${new Date(created_at).toLocaleString()}</p>
    </div>
    `;

    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";

    list.prepend(item);

    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    await supabaseClient.from('testimonials').insert([{
        name, message
    }]);
    form.reset();
});

supabaseClient.channel('public:testimonials').on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'testimonials'
}, (payload) => {
    addTestimonialToDOM(payload.new);
}).subscribe();

loadTestimonials();
