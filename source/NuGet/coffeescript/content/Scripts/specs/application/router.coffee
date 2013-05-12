expect = @chai.expect
$ = jQuery

describe 'Router', ->
  templete = null
  container = null
  stubbedNavigationView = null
  stubbedPageView = null
  stubbedNotFoundView = null
  router = null

  before ->
    templete = $('<div/>', id: 'page-template')
      .appendTo('body')
      .append('<p/>')

    container = $('<div/>', id: 'container').appendTo 'body'

    navigationView =
      select: (menu) ->
      deselectAll: ->

    class contentView
      el: $ '<div/>'
      render: -> @
      activate: ->
      deactivate: ->

    stubbedNavigationView = sinon.stub(Application.Views, 'Navigation')
      .returns(navigationView)

    stubbedPageView = sinon.stub Application.Views, 'Page', -> new contentView
    stubbedNotFoundView = sinon.stub Application.Views, 'NotFound', ->
      new contentView

    router = new Application.Router

  describe 'new', ->
    it 'creates navigation view', -> expect(router.navigationView).to.exist

    it 'creates home view', -> expect(router.homeView).to.exist

    it 'creates about view', -> expect(router.homeView).to.exist

    it 'creates not found view', -> expect(router.notFoundView).to.exist

  describe 'navigation', ->
    stubbedActivate = null

    before ->
      stubbedActivate = sinon.stub router, 'activate', -> 
      router.currentView = undefined

    describe '#about', ->
      before -> router.about()

      it 'activates home view', ->
        expect(stubbedActivate)
          .to.have.been.calledWith router.aboutView, 'about'

      after ->
        router.currentView = undefined
        stubbedActivate.reset()

    describe '#home', ->
      before -> router.home()

      it 'activates home view', ->
        expect(stubbedActivate).to.have.been.calledWith router.homeView, 'home'

      after ->
        router.currentView = undefined
        stubbedActivate.reset()

    describe '#notFound', ->
      before -> router.notFound()
      
      it 'activates not found view', ->
        expect(stubbedActivate).to.have.been.calledWith router.notFoundView

      after ->
        router.currentView = undefined
        stubbedActivate.reset()
      
    after -> stubbedActivate.restore()

  describe '#activate', ->

    describe 'other view', ->
      spiedHomeViewDeactivate = null
      spiedAboutViewActivate = null
      spiedSelectMenu = null

      before ->
        spiedSelectMenu = sinon.spy router.navigationView, 'select'
        spiedHomeViewDeactivate = sinon.spy router.homeView, 'deactivate'
        spiedAboutViewActivate = sinon.spy router.aboutView, 'activate'
        router.currentView = router.homeView
        router.activate router.aboutView, 'about'

      it 'deactivates current view', ->
        expect(spiedHomeViewDeactivate).to.have.been.calledOnce

      it 'activates other view', ->
        expect(spiedAboutViewActivate).to.have.been.calledOnce

      it 'selects other view menu', ->
        expect(spiedSelectMenu).to.have.been.calledWith 'about'

      it 'sets other view as current view', ->
        expect(router.currentView).to.equal router.aboutView

      after ->
        spiedSelectMenu.restore()
        spiedHomeViewDeactivate.restore()
        spiedAboutViewActivate.restore()

    describe 'same view', ->
      spiedHomeViewDeactivate = null
      spiedSelectMenu = null

      before ->
        spiedSelectMenu = sinon.spy router.navigationView, 'select'
        spiedHomeViewDeactivate = sinon.spy router.homeView, 'deactivate'
        router.currentView = router.homeView
        router.activate router.homeView, 'home'

      it 'does nothing', ->
        expect(spiedHomeViewDeactivate).to.not.have.been.called
        expect(spiedSelectMenu).to.not.have.been.called
        expect(router.currentView).to.equal router.homeView

      after ->
        spiedSelectMenu.restore()
        spiedHomeViewDeactivate.restore()

    describe 'not found view', ->
      spiedDeselectMenu = null

      before ->
        spiedDeselectMenu = sinon.spy router.navigationView, 'deselectAll'
        router.currentView = router.homeView
        router.activate router.notFoundView

      it 'deselects menu', ->
        expect(spiedDeselectMenu).to.have.been.calledOnce

      after -> spiedDeselectMenu.restore()

  after ->
    stubbedNavigationView.restore()
    stubbedPageView.restore()
    stubbedNotFoundView.restore()
    container.remove()
    templete.remove()