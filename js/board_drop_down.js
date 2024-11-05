'use strict';

/* DROP DOWN  */


function toggleDropdown() {
  document.getElementById('dropdown_content').classList.toggle('d_none');
}


window.onclick = function(event) {
  if (!event.target.matches('.drop-btn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('d_none')) {
        openDropdown.classList.remove('d_none');
      }
    }
  }
} 


function toggleInputImage() {
  let inputImage = document.getElementById('dropdown_icon');

  if (inputImage.src.includes('arrow_drop_downaa.png')) {
    inputImage.src = '../assets/img/arrow_drop_up.png';
  } else {
    inputImage.src = '../assets/img/arrow_drop_downaa.png';
  }
} 