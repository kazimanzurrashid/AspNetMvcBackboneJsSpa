@using $rootnamespace$.Models
@model dynamic
@if (!Html.ViewData.ModelState.IsValid) {

  var model = Model as ValidationSummary ?? new ValidationSummary();
  var modelStates = Html.ViewData.ModelState.ToList();

  if (model.ExcludePropertyErrors) {
    modelStates = modelStates.Where(ms => string.IsNullOrWhiteSpace(ms.Key))
      .ToList();
  }

  var errorMessages = modelStates
    .SelectMany(ms =>
      ms.Value
      .Errors
        .Select(e =>
          e.Exception == null ? e.ErrorMessage : e.Exception.Message))
      .Where(e => !string.IsNullOrWhiteSpace(e))
      .ToList();

  if (errorMessages.Any()) {
    var alertBlockCssClass = errorMessages.Any() ? "alert-block" : string.Empty;

    <div class="alert alert-error @alertBlockCssClass fade in">
      @if (model.Closable) {
        <button type="button" class="close" data-dismiss="alert" title="close">&times;</button>
      }
      @if (errorMessages.Count == 1) {
        if (!string.IsNullOrWhiteSpace(model.Title)) {
          <strong>@(model.Title)</strong> 
        }
        <span>@errorMessages.First()</span>
        } else {
          if (!string.IsNullOrWhiteSpace(model.Title)) {
            <h4>@(model.Title)</h4>
          }
          if (!string.IsNullOrWhiteSpace(model.Message)) {
            <p>@(model.Message)</p>
          }
          <ul>
            @foreach (var message in errorMessages) {
              <li>@message</li>
            }
          </ul>
        }
      </div>
    }
}
