// main.js
(function () {
  const loadingScreen = document.querySelector('.loading-screen');

  if (!loadingScreen) {
    return;
  }

  const hideLoadingScreen = () => {
    loadingScreen.classList.add('is-hidden');
  };

  // Fallback: hide after 4.5s even if load event is slow.
  const timeoutId = window.setTimeout(hideLoadingScreen, 4500);

  window.addEventListener('load', () => {
    window.clearTimeout(timeoutId);
    // Slight delay to let the final progress animation play.
    window.setTimeout(hideLoadingScreen, 1200);
  });
})();
