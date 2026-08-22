const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open'); document.body.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.card-detail-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const detail = document.getElementById(link.getAttribute('aria-controls'));
    const isOpening = detail.hidden;

    document.querySelectorAll('.expandable-detail').forEach(panel => { panel.hidden = true; });
    document.querySelectorAll('.card-detail-link').forEach(item => {
      item.setAttribute('aria-expanded', 'false');
      item.textContent = '↘';
    });

    if (isOpening) {
      detail.hidden = false;
      link.setAttribute('aria-expanded', 'true');
      link.textContent = '↖';
      requestAnimationFrame(() => detail.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  });

  link.closest('.card').addEventListener('click', event => {
    if (!event.target.closest('a')) link.click();
  });
});
