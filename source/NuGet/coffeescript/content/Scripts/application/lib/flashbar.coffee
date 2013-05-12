timeout = 1000 * 7
animationDuration = 400

template = _("""
  <div class="alert alert-{{type}} fade.in flash-bar hide">
    <button type="button" class="close" data-dismiss="alert" title="close">&times;</button>
    <i class="{{icon}}"></i>
    <span>{{message}}</span>
  </div>
""").template()

showFlashbar = (type, message) ->
  icon = switch type
    when 'success' then 'icon-ok-sign'
    when 'error' then 'icon-warning-sign'
    when 'info' then 'icon-info-sign'
    else
      throw new Error 'Unknown Type.'

  flashbar = $(template { icon, type, message })
    .prependTo('body')
    .alert()
    .slideDown animationDuration

  _(()-> flashbar.slideUp animationDuration, ->
    flashbar.remove()
  ).delay timeout

$.showSuccessbar = (message) -> showFlashbar 'success', message
$.showErrorbar = (message) -> showFlashbar 'error', message
$.showInfobar = (message) -> showFlashbar 'info', message