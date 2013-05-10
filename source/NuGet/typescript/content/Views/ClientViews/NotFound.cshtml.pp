@using $rootnamespace$.Helpers
<div id="not-found-page" class="page">
  <h2 class="page-header">404</h2>
  <div class="alert alert-block alert-error">
    <h4>Error!</h4>
    <p>
      The page you are looking for does not exit. Please make sure you have 
      spelled the page name correctly. If this is a automatic redirection by 
      the system, please report it to support team or you can 
      <a href="@Url.ClientUrl("/")">click here</a> if you want to return to 
      Home page.
    </p>
  </div>
</div>
