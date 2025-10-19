/* =====  printConfig.js  修訂版 ===== */
function insertContinuedHints(){
  var content;
  switch (lang) {
    
    case "ZH":
      content = '（下頁續）'
      break;
    case "EN":
      content = '(Continued on the next page)'
      break;

    default:
      content = '（下頁續）'
      break;
  }
  const mmToPx = mm => Math.floor(mm * 96 / 25.4);
  const A4_H   = mmToPx(297) - 80;          // 預留 80 px 邊界

  document.querySelectorAll('.content-section').forEach(sec => {
    const st      = window.getComputedStyle(sec);
    const padTop  = parseFloat(st.paddingTop);
    const padBot  = parseFloat(st.paddingBottom);
    const borTop  = parseFloat(st.borderTopWidth);
    const borBot  = parseFloat(st.borderBottomWidth);
    const startY  = sec.getBoundingClientRect().top + padTop + borTop;

    /* 把原始「元素」拷貝出來，忽略純文字節點 */
    const cloneEls = Array.from(sec.cloneNode(true).children);
    sec.innerHTML = '';

    let wrap = document.createElement('div');
    sec.appendChild(wrap);

    cloneEls.forEach(el => {
      const node = el.cloneNode(true);
      wrap.appendChild(node);

      /* 只在「元素」上量高度 */
      const nowBottom = node.getBoundingClientRect().bottom;
      if (nowBottom - startY + padBot + borBot >= A4_H) {
        node.remove();                 // 先拿回來
        const hint = document.createElement('div');
        hint.className  = 'continued-hint';
        hint.textContent= content;
        wrap.appendChild(hint);

        const newWrap = document.createElement('div');
        newWrap.className = 'split-node';
        sec.appendChild(newWrap);
        wrap = newWrap;
        wrap.appendChild(node);        // 完整搬過去
      }
    });
  });
}

window.addEventListener('load', insertContinuedHints);