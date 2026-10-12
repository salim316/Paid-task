let allTools = [];

const container = document.getElementById('tools-container');
const filterButtons = document.querySelectorAll('.filter-btn');

fetch('tools.json')
  .then(res => res.json())
  .then(data => {
    allTools = data;
    renderTools(allTools);
  })
  .catch(err => {
    container.innerHTML = '<p>حدث خطأ في تحميل البيانات.</p>';
    console.error(err);
  });

function renderTools(tools) {
  container.innerHTML = '';
  tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'card';

    const stars = '★'.repeat(Math.round(tool.rating)) + '☆'.repeat(5 - Math.round(tool.rating));

    card.innerHTML = `
      <h2>${tool.name}</h2>
      <span class="category-tag">${tool.category}</span>
      <span class="trust ${tool.trust}">${tool.trust}</span>
      <div class="rating">${stars} (${tool.rating}/5)</div>
      <p><strong>الدفع:</strong> ${tool.payment}</p>
      <p><strong>الحد الأدنى:</strong> ${tool.minWithdraw}</p>
      <p><strong>الدول:</strong> ${tool.countries}</p>
      <p><strong>ملاحظات:</strong> ${tool.notes}</p>
      <a href="${tool.url}" target="_blank" rel="noopener">زيارة الموقع</a>
    `;
    container.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.category;
    if (cat === 'all') {
      renderTools(allTools);
    } else {
      renderTools(allTools.filter(t => t.category === cat));
    }
  });
});

