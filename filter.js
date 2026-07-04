const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.piece');
const projectsHeader = document.querySelector('#projects a');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update the projects header text
    if (filter === 'all') {
      projectsHeader.textContent = 'ALL PROJECTS';
    } else {
      projectsHeader.textContent = btn.textContent.trim().toUpperCase();
    }

    // Filter cards
    cards.forEach(card => {
      let show = false;

      if (filter === 'all') {
        show = true;
      } else if (filter === 'professional' || filter === 'personal') {
        show = card.dataset.category.split(' ').includes(filter);
      } else {
        show = !!card.querySelector('.' + filter);
      }

      if (show) {
        card.style.visibility = 'visible';
        card.style.position = 'relative';
        card.style.height = 'auto';
        card.style.overflow = 'visible';
        card.style.marginBottom = '15px';
      } else {
        card.style.visibility = 'hidden';
        card.style.position = 'absolute';
        card.style.height = '0';
        card.style.overflow = 'hidden';
        card.style.marginBottom = '0';
      }
    });

    // Scroll to projects section
    document.querySelector('#connect').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  });
});

// Make existing card labels act as filters too
document.querySelectorAll('.label').forEach(label => {
  label.style.cursor = 'pointer';
  label.addEventListener('click', () => {
    const filter = Array.from(label.classList)
      .find(c => c.startsWith('label') && c !== 'label');
    if (filter) {
      const matchingBtn = document.querySelector(
        `.filter-btn[data-filter="${filter}"]`
      );
      if (matchingBtn) matchingBtn.click();
    }
  });
});