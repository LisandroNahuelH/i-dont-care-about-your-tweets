export const POPUP_HTML_FIXTURE = `
<main class="popup-shell">
  <header class="popup-header">
    <div>
      <h1 data-role="popup-heading"></h1>
      <p data-role="popup-subtitle"></p>
    </div>
    <div class="popup-header-actions">
      <button class="theme-toggle-button" type="button" data-action="toggle-theme" aria-pressed="true"></button>
      <button class="reset-button" type="button" data-action="reset"></button>
    </div>
  </header>
  <section class="preview" data-role="preview">
    <div class="preview-bar" data-role="preview-bar"></div>
  </section>
  <section class="kit-list" data-role="kit-list"></section>
</main>
`;