/*
* Animation de section lors de la pagination*/
const buttons = document.querySelectorAll(".action-btn");
const pages = document.querySelectorAll(".page");
let currentPage = document.querySelector(".page.is-active") || pages[0];
// let isAnimating = false;

if (!currentPage.classList.contains("is-active")) {
    currentPage.classList.add("is-active");
}

function switchPageBtn(page) {

    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.classList.toggle('active-page-tab', btn.dataset.page === page)
    })

}

function showPage(page) {
    console.log(page)
    document.querySelectorAll('.page').forEach((page) => {
        page.style.display = 'none'
    })
    document.querySelector(`#${page}`).style.display = 'block'
    document.querySelector(`#${page}`).classList.add('ch-animate-in')
}

// function goToPage(targetId) {
//     if (isAnimating) return;
//     const nextPage = document.getElementById(targetId);
//     if (!nextPage || nextPage === currentPage) return;
//
//     isAnimating = true;
//     currentPage.classList.add("is-transitioning");
//     currentPage.classList.remove("is-active"); // fade-out
//
//     setTimeout(() => {
//         currentPage.classList.remove("is-transitioning");
//         nextPage.classList.add("is-active"); // fade-in
//         currentPage = nextPage;
//         isAnimating = false;
//     }, 250);
// }

export function initNavigation() {
    //     Load currency convert page by default
    const selectTool = document.querySelector('#select-tool').value
    showPage(selectTool)
    switchPageBtn(selectTool)

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.page; // ex: "currency-converter-page"
            showPage(targetId);
            document.querySelector('.ch-sidebar').classList.remove('is-open');
            document.querySelector('#sidebar-backdrop').classList.remove('is-active');

            // Mettre le bouton actif (couleur)
            buttons.forEach(b => b.classList.remove("active-page-tab"));
            btn.classList.add("active-page-tab");
        });
    });

    // Side barre hamburger menu trigger
    document.querySelector('#menu-toggle-btn').addEventListener('click', () => {
        document.querySelector('.ch-sidebar').classList.add('is-open')
        document.querySelector('#sidebar-backdrop').classList.add('is-active')

    })
    document.querySelector('#sidebar-backdrop').addEventListener('click', () => {
        document.querySelector('.ch-sidebar').classList.remove('is-open')
    })

}