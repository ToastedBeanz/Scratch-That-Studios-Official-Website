document.getElementById('year').textContent = new Date().getFullYear();
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a:not([target="_blank"])');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // this uhhhhhhhhh skips the # and shtuff
      if (!href || href.startsWith('#') || href.startsWith('http') || this.closest('.logo')) {
        return;
      }
      
      e.preventDefault();
      loadPage(href);
      
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  async function loadPage(url) {
    // Fade out
    document.body.style.opacity = '0';
    
    setTimeout(async () => {
      try {
       
        const response = await fetch(url);
        const html = await response.text();
        
        // this js parses html 
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newHeader = doc.querySelector('header');
        const newMain = doc.querySelector('main');
        
        if (newHeader) document.querySelector('header').innerHTML = newHeader.innerHTML;
        if (newMain) document.querySelector('main').innerHTML = newMain.innerHTML;
        
        document.title = doc.title;
        
        // idk if this is right but this should update url
        history.pushState({}, '', url);
        
        // fade in
        document.body.style.opacity = '1';
        
      } catch (error) {
        console.error('Error loading page:', error);
        window.location.href = url; 
      }
    }, 300);
  }
  
 
  window.addEventListener('popstate', function() {
    loadPage(window.location.pathname);
  });
});
