$ = jQuery

$.fn.serializeFields = ->
  fields = {}
  @each ->
    $.each $(@).serializeArray(), ->
      fields[@name] = @value
  fields

$.fn.deserializeFields = (attributes) ->
  @each ->
    _(attributes)
      .chain()
      .keys()
      .each (key) =>
        $(@).find(":input[name='#{key}']").val attributes[key]

$.fn.resetFields = ->
  @each ->
    container = $ @
    return container.get(0).reset() if container.is 'form'
    container.find('form').each -> this.reset()

animationDuration = 400
timeout = 1000 * 5

$.fn.hideFieldErrors = ->
  @each ->
    $(@).find('.control-group')
      .filter('.error')
      .removeClass('error')
      .find('.help-block,.help-inline')
      .slideUp animationDuration, -> $(@).remove()

$.fn.showFieldErrors = (options) ->
  options = $.extend inline: false, errors: {}, options
  cssClass = if options.inline then 'help-inline' else 'help-block'
  errors = options.errors or {}
  firstInput = null
  @each ->
    $(@).find(':input').each ->
      input = $ @
      inputName = input.attr 'name'

      return false unless inputName
      lowerCasedInputName = inputName.toLowerCase()

      _(errors)
        .chain()
        .keys()
        .filter((key)-> errors[key].length)
        .filter((key) -> key.toLowerCase() is lowerCasedInputName)
        .each (key) ->
          firstInput = input unless firstInput
          input.closest('.control-group').addClass 'error'
          container = if options.inline
              input.parent()
            else
              input.closest '.controls'
          _(errors[key]).each (message) ->
            $('<span>', text: message, 'class': cssClass)
              .appendTo(container)
              .hide()
              .slideDown animationDuration

  firstInput.first().focus() if firstInput
  _(() => @hideFieldErrors()).delay timeout
  @

$.fn.hideSummaryError = ->
  @each ->
    container = $ @
    container = container.find 'form' unless container.is 'form'
    container.find('.alert').slideUp animationDuration, -> $(@).remove()

do ->
  template = _("""
    <div class="alert alert-error fade in">
      <button type="button" class="close" data-dismiss="alert" title="close">&times;</button>
      <i class="icon-warning-sign"></i> 
      <span>{{message}}</span>
    </div>
  """).template()

  $.fn.showSummaryError = (options) ->
    options = $.extend message: 'An unexpected error has occurred while performing your last operation.', options

    @each ->
      container = $ @
      container = container.find 'form' unless container.is 'form'

      $(template message: options.message)
        .prependTo(container)
        .hide()
        .slideDown animationDuration

    _(() => @hideSummaryError()).delay timeout

$.fn.putFocus = ->
  _(() =>
    @find(':input')
      .not(':button')
      .not(':disabled')
      .first()
      .focus()
    ).delay 100
  @