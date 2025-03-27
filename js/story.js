// Video player functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create video player elements
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container';
  videoContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      max-width: 800px;
      min-width: 500px;
      height: auto;
      aspect-ratio: 16/9;
      z-index: 1000;
      background: rgba(0,0,0,0.9);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0,0,0,0.7);
      transition: all 0.3s ease;
      display: none;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.7);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1001;
      font-size: 16px;
  `;

  const videoPlayer = document.createElement('video');
  videoPlayer.className = 'video-player';
  videoPlayer.style.cssText = `
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
  `;
  videoPlayer.controls = true;
  videoPlayer.playsInline = true;

  // Store original position and size
  const originalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      maxWidth: '800px',
      minWidth: '500px',
      height: 'auto',
      aspectRatio: '16/9',
      borderRadius: '10px'
  };

  videoContainer.appendChild(closeBtn);
  videoContainer.appendChild(videoPlayer);
  document.body.appendChild(videoContainer);

  // Handle play now buttons
  document.querySelectorAll('.play-now').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          const videoSrc = this.getAttribute('href');
          
          // Reset to original position and size
          Object.entries(originalStyle).forEach(([prop, value]) => {
              videoContainer.style[prop] = value;
          });
          
          // Show the video container
          videoContainer.style.display = 'block';
          
          // Set video source and play
          videoPlayer.src = videoSrc;
          videoPlayer.load();
          
          videoPlayer.oncanplay = function() {
              videoPlayer.play().then(() => {
                  console.log("Video is playing");
              }).catch(err => {
                  console.log("Autoplay was prevented:", err);
                  videoPlayer.controls = true;
              });
          };
      });
  });
  
  // Close button
  closeBtn.addEventListener('click', function() {
      videoContainer.style.display = 'none';
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.src = '';
  });
  
  // Handle escape key to close player
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoContainer.style.display === 'block') {
          videoContainer.style.display = 'none';
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
          videoPlayer.src = '';
      }
  });
  
  // Handle escape key to exit fullscreen
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoContainer.style.width === '100%') {
          Object.entries(originalStyle).forEach(([prop, value]) => {
              videoContainer.style[prop] = value;
          });
          fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
      }
  });

  // Rest of your existing functionality...
  // Card hover effect for videos
  document.querySelectorAll('.story-media').forEach(media => {
      let video = media.querySelector('.story-video');
      
      if (!video) return;
      
      media.addEventListener('mouseenter', function() {
          video.muted = true;
          video.play().catch(err => console.log("Autoplay blocked:", err));
      });
      
      media.addEventListener('mouseleave', function() {
          video.pause();
          video.currentTime = 0;
      });
  });
   
  // Pagination functionality
  let currentPage = 1;
  const itemsPerPage = 6;
  const cards = document.querySelectorAll('.story-card');
  let filteredCards = Array.from(cards);
  
  function showPage(page) {
      if (page < 1 || page > Math.ceil(filteredCards.length / itemsPerPage)) return;
      currentPage = page;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      
      cards.forEach(card => card.style.display = 'none');
      filteredCards.slice(start, end).forEach(card => card.style.display = 'block');
      
      renderPagination();
  }
  
  function changePage(direction) {
      showPage(currentPage + direction);
  }
  
  function searchCards() {
      const searchInput = document.getElementById('search').value.toLowerCase();
      filteredCards = searchInput ? Array.from(cards).filter(card => 
          card.querySelector('p').textContent.toLowerCase().includes(searchInput)
      ) : Array.from(cards);
      currentPage = 1;
      showPage(currentPage);
  }
  
  function renderPagination() {
      const paginationList = document.getElementById('paginationList');
      paginationList.innerHTML = '';
      
      for (let i = 1; i <= Math.ceil(filteredCards.length / itemsPerPage); i++) {
          const pageLink = document.createElement('li');
          pageLink.innerHTML = `<a href="#" class="${i === currentPage ? 'active' : ''}" onclick="showPage(${i})">${i}</a>`;
          paginationList.appendChild(pageLink);
      }
      
      document.getElementById('prevBtn').disabled = currentPage === 1;
      document.getElementById('nextBtn').disabled = currentPage === Math.ceil(filteredCards.length / itemsPerPage);
  }
  
  // Initial call to display the first page
  showPage(currentPage);
  
  // Responsive cards
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
  adjustBookGrid();
});