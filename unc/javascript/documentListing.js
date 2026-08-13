document.addEventListener('DOMContentLoaded', () => {
    const documentList = document.getElementById('document-list');
    
    // Document data with correct filenames and additional columns
    const documentData = {
  // Default template for all documents
  defaults: {
    accessible: false,
    accessLevel: 'N/A',
    handler: 'N/A',
    title: '[拒絕訪問]',
    threatLevel: '█'
  },
  
  // Special cases override
  overrides: window.documentOverrides || {},
  
  // Generate document list with pagination
  generate: function(start = 1, count = 2000) {
    const documents = [];
    
    for (let i = 0; i < count; i++) {
      const num = start + i;
      const doc = { 
        ...this.defaults, 
        ...(this.overrides[num] || {})
      };
      
      // Use threatLevel from override or default
      const threatLevel = doc.threatLevel || '█';
      doc.id = `UNC-${String(num).padStart(3, '0')}-${threatLevel}`;
      
      // Generate filename only for accessible documents
      if (doc.accessible) {
        doc.filename = num < 100 
          ? `unc-${String(num).padStart(3, '0')}.html` 
          : `unc-${num}.html`;
      }
      
      documents.push(doc);
    }
    
    return documents;
  }
};

// Generate first 2000 documents starting from UNC-001
const documents = documentData.generate(1, 2000);

    // Generate document list
    documents.forEach(doc => {
        const item = document.createElement('div');
        item.className = `document-item ${doc.accessible ? 'accessible' : ''}`;
        
        // Check for N/A values to apply special styling
        const titleClass = doc.title === '[拒絕訪問]' ? 'na-value' : '';
        const accessClass = doc.accessLevel === 'N/A' ? 'na-value' : '';
        const handlerClass = doc.handler === 'N/A' ? 'na-value' : '';
        
        // Add data attributes for mobile labels
        const idDiv = `<div class="list-id" data-label="項目編號">${doc.id}</div>`;
        const titleDiv = `<div class="list-title ${titleClass}" data-label="標題">
            ${doc.accessible ? `<a href="${doc.filename}">${doc.title}</a>` : doc.title}
        </div>`;
        const accessDiv = `<div class="list-access ${accessClass}" data-label="讀取權限要求">${doc.accessLevel}</div>`;
        const handlerDiv = `<div class="list-handler ${handlerClass}" data-label="經手人">${doc.handler}</div>`;
        
        item.innerHTML = idDiv + titleDiv + accessDiv + handlerDiv;
        documentList.appendChild(item);
    });
    
    // Add access warning
    const warning = document.createElement('div');
    warning.className = 'warning';
    warning.style.marginTop = '20px';
    warning.style.textAlign = 'center';
    warning.innerHTML = '⚠ 注意：未授權訪問受限制文件將導致立即終止權限及紀律處分';
    documentList.appendChild(warning);
});