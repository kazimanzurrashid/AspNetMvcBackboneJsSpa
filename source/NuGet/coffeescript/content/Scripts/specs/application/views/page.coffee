expect = @chai.expect

describe 'Views.Page', ->
  model = null
  view = null

  before ->
    model = new Backbone.Model message: 'Hello world'

    view = new Application.Views.Page
      model: model
      template: _('<span>{{message}}</span>').template()

  it 'can activate', -> expect(view).to.respondTo 'activate'

  it 'can deactivate', -> expect(view).to.respondTo 'deactivate'

  it 'renders model attributes', ->
    expect(view.render().$el.html()).to.contain model.get('message')