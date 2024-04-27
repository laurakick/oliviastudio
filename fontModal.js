

let currentTarget = null; // To keep track of which element's font we're changing

function closeModal() {
    document.getElementById('fontModal').style.display = 'none';
    showClassFonts(); // Optionally show the fonts applied to the classes
  }
  

function createModal() {
    // Check and remove existing modal if it exists
    let existingModal = document.getElementById('fontModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.setAttribute('id', 'fontModal');
    modal.style.cssText = 'display: none; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000;';

    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background: white; margin: 100px auto; padding: 20px; width: 90%; max-width: 500px;';

    const header = document.createElement('h2');
    header.textContent = 'Select a Font';

    // Create a table to list fonts
    const table = document.createElement('table');
    table.style.width = '100%';
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const fonts = [
        'Bakudai-Regular', 'B2Hana-Regular', 'Bakudai-Medium', 'masafont-Regular', 
        'JasonHandwriting1-Regular', 'JasonHandwriting2-Regular', 'MOEKai', 'MOELi','iansui-Regular',
        'wtFangSong', 'wtLi', 'wtYanKai'
    ];

    // alert(currentTarget)

    if (currentTarget ) {
        // alert(currentTarget)
        sampleElement = document.querySelectorAll(currentTarget)[0]
        // alert(sampleElement)
        //get text from the sample element
        sampleText = sampleElement.textContent
    }

    fonts.forEach(font => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell();
        cell1.textContent = sampleText;
        cell1.style.fontFamily = font;
        cell1.style.fontSize = '2em';

        const cell2 = row.insertCell();
        const applyButton = document.createElement('button');
        applyButton.textContent = 'Apply';
        applyButton.onclick = () => {
            applyFont(font);
            closeModal();
        };
        cell2.appendChild(applyButton);
    });

    modalContent.appendChild(header);
    modalContent.appendChild(table);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = closeModal;
    modalContent.appendChild(closeButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Optional: Automatically create modal on page load
// document.addEventListener('DOMContentLoaded', createModal);


function openModal(target) {
  currentTarget = target; // Set the current target for font application
  createModal();
  document.getElementById('fontModal').style.display = 'block';
}


function applyFont(selectedFont) {
//   var selectedFont = document.getElementById('fontSelect').value;
//   alert(currentTarget, selectedFont)
  if (currentTarget) {
    document.querySelectorAll(currentTarget).forEach(element => {
      element.style.fontFamily = selectedFont;
    //   alert('Font applied!', selectedFont)
    });
  }
  closeModal(); // Optionally close the modal automatically on apply
}

function showClassFonts() {
    // Define the elements to check for fonts
    const selectors = ['.caption', 'nav ul li a', '.tile span', 'footer p, footer a'];

    // Prepare a container for the font list if it doesn't exist
    let fontListContainer = document.getElementById('fontListContainer');
    if (!fontListContainer) {
        fontListContainer = document.createElement('div');
        fontListContainer.style.fontFamily = "Arial, sans-serif";
        fontListContainer.id = 'fontListContainer';
        fontListContainer.style.padding = '20px';
        fontListContainer.style.backgroundColor = '#f0f0f0'; // Style as needed
        fontListContainer.style.marginTop = '20px';
        fontListContainer.style.borderTop = '1px solid #ccc';
        document.body.appendChild(fontListContainer);
    }

    // Clear existing content
    fontListContainer.innerHTML = '';

    // Create and append the font information
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        const currentFont = window.getComputedStyle(elements[0]).fontFamily; // Assuming all elements of a selector have the same font
        const fontInfo = document.createElement('p');
        fontInfo.textContent = ` "${selector}" using  font: ${currentFont}`;
        // fontInfo.fontFamily = "Arial, sans-serif";
        fontListContainer.appendChild(fontInfo);
    });
}



document.querySelector('.caption').addEventListener('click', () => openModal('.caption'));
document.querySelector('nav ul').addEventListener('click', () => openModal('nav ul li a'));
document.querySelector('.row').addEventListener('click', () => openModal('.tile span'));
document.querySelector('footer').addEventListener('click', () => openModal('footer p, footer a'));
// document.querySelector('footer p').addEventListener('click', () => openModal('footer p, footer a'));
// document.querySelector('footer a').addEventListener('click', () => openModal(' footer a'));

