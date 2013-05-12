expect = @chai.expect
$ = jQuery

describe 'Views.Navigation', ->
  view = null

  before ->
    fixtures.load '/navigation.html'

    view = new Application.Views.Navigation
      el: $(fixtures.window().document.body).find '#navigation'

  describe '#select', ->
    beforeEach -> view.select 'test-1'

    it 'adds css class active', ->
      expect(view.$('li').first()).to.have.class 'active'

  describe '#deselectAll', ->
    beforeEach ->
      view.select 'test-1'
      view.deselectAll()

    it 'removes css class active', ->
      expect(view.$('li').first()).to.not.have.class 'active'

  describe 'application events', ->
    stubbedTrigger = null

    beforeEach -> stubbedTrigger = sinon.stub Application.events, 'trigger'

    describe 'menu item clicks', ->

      describe 'has data-command attribute', ->
        beforeEach -> view.$('a').first().trigger 'click'

        it 'triggers the event', ->
          expect(stubbedTrigger).to.have.been.calledWith 'dummy-event'

      describe 'no data-command attribute', ->
        beforeEach -> view.$('a').last().trigger 'click'

        it 'does not trigger any event', ->
          expect(stubbedTrigger).to.not.have.been.called

    afterEach -> stubbedTrigger.restore()

  after ->
    view.undelegateEvents()
    view.stopListening()
    fixtures.cleanUp()