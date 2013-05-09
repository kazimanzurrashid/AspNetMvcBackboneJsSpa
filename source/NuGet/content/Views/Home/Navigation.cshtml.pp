@using $rootnamespace$.Helpers
<nav id="navigation">
  <ul class="nav">
    <li class="divider-vertical"></li>
    <li class="home">
      <a href="@Url.ClientUrl("/")">
        <i class="icon-home"></i> Home
      </a>
    </li>
    <li class="divider-vertical"></li>
    <li class="about">
      <a href="@Url.ClientUrl("about")">
        <i class="icon-info-sign"></i> About
      </a>
    </li>
  </ul>
  <ul class="nav pull-right">
    <li class="divider-vertical"></li>
    <li>
      <a href="javascript:;" data-command="myAccount">
        <i class="icon-user"></i> My Account
      </a>
    </li>
  </ul>
</nav>
