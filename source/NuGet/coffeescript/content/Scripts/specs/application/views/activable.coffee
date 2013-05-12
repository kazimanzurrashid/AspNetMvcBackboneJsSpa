expect = @chai.expect
$ = jQuery

class DummmyView
  constructor: ->
    @$el = $ '<div/>'
    @activated = @deactivated = false

  onActivate: -> @activated = true

  onDeactivate: -> @deactivated = true

_(DummmyView.prototype).extend Application.Views.Activable

describe 'Views.Activable', ->
  activable = null

  describe '#activate', ->
    stubbedClearTimer = null
    stubbedShow = null
    stubbedCss = null
    stubbedOuterWidth = null
    stubbedHide = null
    stubbedAnimate = null

    before (done) ->
      activable = new DummmyView()
      stubbedClearTimer = sinon.stub activable, 'clearAnimationTimer', -> 
      stubbedShow = sinon.stub activable.$el, 'show', -> activable.$el
      stubbedCss = sinon.stub activable.$el, 'css', -> activable.$el
      stubbedOuterWidth = sinon.stub activable.$el, 'outerWidth', -> 0
      stubbedHide = sinon.stub activable.$el, 'hide', -> activable.$el
      stubbedAnimate = sinon.stub activable.$el, 'animate', -> activable.$el
      activable.activate()

      _(->
        stubbedShow.getCall(1).args[0]()
        stubbedAnimate.getCall(0).args[2]()
        done()
       ).defer()

    it 'clears animation timer', ->
      expect(stubbedClearTimer).to.have.been.calledOnce

    it 'shows the view initially', ->
      expect(stubbedShow).to.have.been.calledWith()

    it 'moves the view to right', ->
      expect(stubbedCss).to.have.been.calledWith marginLeft: sinon.match.number
      expect(stubbedOuterWidth).to.have.been.calledOnce

    it 'then hides the view', ->
      expect(stubbedHide).to.have.been.calledOnce

    it 'then again shows the view', ->
      expect(stubbedShow).to.have.been.calledWith sinon.match.func

    it 'animates the view from right to left', ->
      expect(stubbedAnimate)
        .to.have.been.calledWith marginLeft: 0,
          sinon.match.number, sinon.match.func

    it 'invokes #onActivate', -> expect(activable.activated).to.be.true

  describe '#deactivate', ->
    stubbedHide = null
    stubbedClearTimer = null

    before ->
      activable = new DummmyView()
      stubbedHide = sinon.stub activable.$el, 'hide', -> 
      stubbedClearTimer = sinon.stub activable, 'clearAnimationTimer', ->
      activable.deactivate()

    it 'invokes #onDeactivate', -> expect(activable.deactivated).to.be.true 

    it 'hides the view', -> expect(stubbedHide).to.have.been.calledOnce

    it 'clears animation timer', ->
      expect(stubbedClearTimer).to.have.been.calledOnce