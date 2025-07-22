document.addEventListener('DOMContentLoaded', () => {
  const tocCodeSpan = document.getElementById('toc-code');
  const objectIdSpan = document.getElementById('object-code');

  // 自動填入編號
  if (objectIdSpan && tocCodeSpan) {
    tocCodeSpan.textContent = objectIdSpan.textContent.trim();
  }

  // 生成 TOC 結構
  const tocContainer = document.querySelector('.toc-container');
  if (!tocContainer) return;

  function makeItem(id, text) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = text;
    li.appendChild(a);
    return li;
  }

  const sections = Array.from(
    document.querySelectorAll('.main-content > .content-section')
  );

  const ol = document.createElement('ol');
  ol.classList.add('toc-list');

  sections.forEach(section => {
    const id = section.id;
    const title = section.querySelector('.section-title')?.textContent.trim();
    if (!id || !title) return;

    const li = makeItem(id, title);

    const childSections = Array.from(
      section.querySelectorAll(':scope > .content-section')
    );
    if (childSections.length) {
      const subOl = document.createElement('ol');
      subOl.classList.add('toc-sublist');
      childSections.forEach(child => {
        const cid = child.id;
        const ctitle = child.querySelector('.section-title')?.textContent.trim();
        if (cid && ctitle) {
          subOl.appendChild(makeItem(cid, ctitle));
        }
      });
      li.appendChild(subOl);
    }

    ol.appendChild(li);
  });

  tocContainer.appendChild(ol);

  // 綁定點擊與展開
  if (typeof initializeTableOfContents === 'function') {
    initializeTableOfContents();
  }
});
