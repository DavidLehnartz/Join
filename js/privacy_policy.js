function init(header, sidebar, link) {
  let privacyContent = document.getElementById("privacy-content-wrapper");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    privacyContent.classList.remove("hidden");
  }, 100);
}
