function init(header, sidebar, link) {
  let legalContent = document.getElementById("legal-content-wrapper");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    legalContent.classList.remove("hidden");
  }, 100);
}
