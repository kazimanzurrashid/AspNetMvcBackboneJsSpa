@using $rootnamespace$.Helpers
<div id="membership-dialog" class="modal hide fade">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="close">&times;</button>
    <h3>My Account</h3>
  </div>
  <div class="modal-body">
    <div class="tabbable">
      <ul class="nav nav-tabs">
        <li class="active"><a href="#sign-in-pane" data-toggle="tab">Sign in</a></li>
        <li><a href="#sign-up-pane" data-toggle="tab">Sign up</a></li>
      </ul>
      <div class="tab-content">
        <div id="sign-in-pane" class="tab-pane active">
          <div class="modal-section">
            @Html.ClientView("SignIn")
          </div>
          <div class="modal-section">
            @Html.ClientView("ForgotPassword")
          </div>
        </div>
        <div id="sign-up-pane" class="tab-pane">
          <div class="modal-section">
            @Html.ClientView("SignUp")
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
