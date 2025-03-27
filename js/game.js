document.querySelectorAll('.game-media').forEach(media => {
    let video = media.querySelector('.game-video');

    media.addEventListener('mouseenter', function() {
        video.play();
    });

    media.addEventListener('mouseleave', function() {
        video.pause();
        video.currentTime = 0; // Reset video to the start
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const itemsPerPage = 6;
    const cards = document.querySelectorAll(".game-card");
    let filteredCards = Array.from(cards);

    function showPage(page) {
        if (page < 1 || page > Math.ceil(filteredCards.length / itemsPerPage)) return;
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        cards.forEach(card => card.style.display = "none");
        filteredCards.slice(start, end).forEach(card => card.style.display = "block");

        renderPagination();
    }

    function changePage(direction) {
        showPage(currentPage + direction);
    }

    function searchCards() {
        const searchInput = document.getElementById("search").value.toLowerCase();
        filteredCards = searchInput ? Array.from(cards).filter(card => card.querySelector("h5").textContent.toLowerCase().includes(searchInput)) : Array.from(cards);
        currentPage = 1; // Reset to first page after search
        showPage(currentPage);
    }

    function renderPagination() {
        const paginationList = document.getElementById("paginationList");
        paginationList.innerHTML = "";

        for (let i = 1; i <= Math.ceil(filteredCards.length / itemsPerPage); i++) {
            const pageLink = document.createElement("li");
            pageLink.innerHTML = `<a href="#" class="${i === currentPage ? "active" : ""}" data-page="${i}">${i}</a>`;
            paginationList.appendChild(pageLink);
        }

        document.querySelectorAll("#paginationList a").forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                showPage(Number(this.dataset.page));
            });
        });

        document.getElementById("prevBtn").disabled = currentPage === 1;
        document.getElementById("nextBtn").disabled = currentPage === Math.ceil(filteredCards.length / itemsPerPage);
    }

    document.getElementById("search").addEventListener("keyup", searchCards);
    document.getElementById("prevBtn").addEventListener("click", () => changePage(-1));
    document.getElementById("nextBtn").addEventListener("click", () => changePage(1));

    // Expose showPage to global scope
    window.showPage = showPage;

    showPage(currentPage);
});



// Responsive cards
document.addEventListener("DOMContentLoaded", function () {
    function adjustBookGrid() {
        const container = document.querySelector(".container");
        if (!container) return;

        let screenWidth = window.innerWidth;
        
        if (screenWidth > 800) {
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(3, 1fr)";
        } else if (screenWidth > 500) {
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(2, 1fr)";
        } else {
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.alignItems = "center";
        }
    }

    window.addEventListener("resize", adjustBookGrid);
    adjustBookGrid(); // Call function on load
});

