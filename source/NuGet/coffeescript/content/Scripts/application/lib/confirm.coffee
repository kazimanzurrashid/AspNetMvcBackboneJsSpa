$ = jQuery
template = _("""
  <div class="modal fade hide">
    <div class="modal-header">
      <button type="button" class="close" title="close" data-dismiss="modal">&times;</button>
      <h3>{{title}}</h3>
    </div>
    <div class="modal-body">{{prompt}}</div>
    <div class="modal-footer">
      <button type="button" class="btn">Ok</button>
      <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
    </div>
  </div>
""").template()

defaults =
  title: 'Confirm'
  prompt: 'Are you sure you want to perform this action?'
  ok: ->
  cancel: ->

$.confirm = (options) ->
  options = $.extend defaults, options
  data =
    title: options.title
    prompt: options.prompt

  dialog = $(template data).appendTo('body').modal show: false

  dialog.on 'click', '.modal-footer .btn', (e) ->
    if $(e.currentTarget).is '.btn-primary'
      options.cancel?()
    else
      dialog.modal 'hide'
      options.ok?()

  dialog.on('hidden', -> dialog.remove()).modal 'show'