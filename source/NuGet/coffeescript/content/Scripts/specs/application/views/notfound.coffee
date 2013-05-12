expect = @chai.expect

describe 'Views.NotFound', ->
  view = null

  before -> view = new Application.Views.NotFound

  it 'can activate', -> expect(view).to.respondTo 'activate'

  it 'can deactivate', -> expect(view).to.respondTo 'deactivate'