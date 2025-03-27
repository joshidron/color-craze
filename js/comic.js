
    let currentPage = 1;
    const itemsPerPage = 6;
    const booksContainer = document.querySelector('.books-container');
    const books = document.querySelectorAll('.book');
    let filteredBooks = Array.from(books);

    function showPage(page) {
        if (page < 1 || page > Math.ceil(filteredBooks.length / itemsPerPage)) return;
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        books.forEach(book => book.style.display = 'none');
        filteredBooks.slice(start, end).forEach(book => book.style.display = 'block');

        renderPagination();
    }

    function changePage(direction) {
        showPage(currentPage + direction);
    }

    function searchCards() {
        const searchInput = document.getElementById('search').value.toLowerCase();
        filteredBooks = searchInput ? Array.from(books).filter(book => 
            book.querySelector('.content').textContent.toLowerCase().includes(searchInput)
         ) : Array.from(books);
        currentPage = 1; // Reset to first page after search
        showPage(currentPage);
    }

    function renderPagination() {
        const paginationList = document.getElementById('paginationList');
        paginationList.innerHTML = ''; // Clear existing pagination

        for (let i = 1; i <= Math.ceil(filteredBooks.length / itemsPerPage); i++) {
            const pageLink = document.createElement('li');
            pageLink.innerHTML = `<a href="#" class="${i === currentPage ? 'active' : ''}" onclick="showPage(${i})">${i}</a>`;
            paginationList.appendChild(pageLink);
        }

        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = currentPage === Math.ceil(filteredBooks.length / itemsPerPage);
    }

    // Initial call to display the first page
    showPage(currentPage);


  
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

    