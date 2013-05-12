expect = @chai.expect
$ = jQuery

describe 'Views.MembershipChildForm', ->
  view = null

  before ->
    fixtures.set '<form id="form"></form>'
    view = new Application.Views.MembershipChildForm
      el: $(fixtures.window().document.body).find '#form'

  describe '#onSubmit', ->
    model = null
    stubbedModel = null
    stubbedSubscribeModelInvalidEvent = null
    stubbedHideSummaryError = null
    stubbedHideFieldErrors = null
    stubbedSerializeFields = null

    before ->
      model = { save: -> }
      stubbedModel = sinon.stub(Backbone, 'Model').returns(model)
      view.modelType = Backbone.Model

      stubbedSubscribeModelInvalidEvent = sinon.stub Application.Views.Helpers,
        'subscribeModelInvalidEvent',
        ->

      stubbedHideSummaryError = sinon.stub view.$el,
        'hideSummaryError',
        -> view.$el

      stubbedHideFieldErrors = sinon.stub view.$el,
        'hideFieldErrors',
        -> view.$el

      stubbedSerializeFields = sinon.stub view.$el,
        'serializeFields',
        -> {}

    describe 'form submit', ->
      spiedSave = null

      before ->
        spiedSave = sinon.spy model, 'save'
        view.onSubmit preventDefault: ->

      it 'hides form summary error', ->
        expect(stubbedHideSummaryError).to.have.been.called

      it 'hides field errors', ->
        expect(stubbedHideFieldErrors).to.have.been.called

      it 'creates model', ->
        expect(stubbedModel).to.have.been.called

      it 'subscribes to model invalid event once', ->
        expect(stubbedSubscribeModelInvalidEvent)
          .to.have.been.calledWith model, view.$el

      it 'serialize form fields', ->
        expect(stubbedSerializeFields).to.have.been.called

      it 'saves model', ->
        expect(spiedSave).to.have.been.called

      after -> spiedSave.restore()

    describe 'persistence', ->

      describe 'success', ->
        successEvent = 'dummy-event'
        stubbedSave = null
        stubbedTrigger = null

        before ->
          stubbedSave = sinon.stub(model, 'save').yieldsTo 'success'
          stubbedTrigger = sinon.stub Application.events, 'trigger', -> 

          view.successEvent = successEvent
          view.onSubmit preventDefault: ->

        it 'triggers application success event', ->
          expect(stubbedTrigger).to.have.been.calledWith successEvent

        after ->
          stubbedSave.restore()
          stubbedTrigger.restore()

      describe 'error', ->
        stubbedSave = null
        stubbedHandleError = null

        before ->
          stubbedSave = sinon.stub(model, 'save').yieldsTo 'error'
          stubbedHandleError = sinon.stub view, 'handleError', -> 
          view.onSubmit preventDefault: ->

        it 'handles ajax error', -> expect(stubbedHandleError).to.have.been.called

        after ->
          stubbedSave.restore()
          stubbedHandleError.restore()

    after ->
      stubbedModel.restore()
      stubbedSubscribeModelInvalidEvent.restore()
      stubbedHideSummaryError.restore()
      stubbedHideFieldErrors.restore()
      stubbedSerializeFields.restore()

  after ->
    view.undelegateEvents()
    view.stopListening()
    fixtures.cleanUp()

describe 'Views.Membership', ->
  originalSignInViewType = null
  originalForgotPasswordViewType = null
  originalSignUpViewType = null

  spiedListenTo = null
  view = null

  Membership = Application.Views.Membership

  before ->
    originalSignInViewType = Membership.prototype.signInViewType
    originalForgotPasswordViewType = Membership.prototype
      .forgotPasswordViewType
    originalSignUpViewType = Membership.prototype.signUpViewType

    Membership.prototype.signInViewType = sinon.stub().returns {}
    Membership.prototype.forgotPasswordViewType = sinon.stub().returns {}
    Membership.prototype.signUpViewType = sinon.stub().returns {}

    spiedListenTo = sinon.spy Membership.prototype, 'listenTo'

    fixtures.set '<div id="membership-dialog"></div>'

    view = new Membership
      el: $(fixtures.window().document.body).find '#membership-dialog'

  describe 'new', ->
    it 'is a modal dialog', -> expect(view.$el.data 'modal').to.be.ok

    it 'creates sign-in view', -> expect(view.signIn).to.be.ok

    it 'creates forgot password view', -> expect(view.forgotPassword).to.be.ok

    it 'creates sign-up view', -> expect(view.signUp).to.be.ok

    it 'subscribes to showMembership application event', ->
      expect(spiedListenTo)
          .to.have.been.calledWith Application.events, 
            'showMembership',
            view.onShowMembership

    it 'subscribes to signedIn passwordResetRequested and signedUp application events', ->
      expect(spiedListenTo)
          .to.have.been.calledWith Application.events,
            'signedIn passwordResetRequested signedUp',
            view.onSignedInOrPasswordResetRequestedOrSignedUp

  describe '#onShowMembership', ->
    originalCancelCallback = null
    originalOkCallback = null
    cancelCallback = null
    okCallback = null
    stubbedFirstTabTrigger = null
    stubbedModal = null

    before ->
      originalCancelCallback = view.cancel
      originalOkCallback = view.ok

      stubbedFirstTabTrigger = sinon.stub view.firstTab, 'trigger', ->
      stubbedModal = sinon.stub view.$el, 'modal', ->

      cancelCallback = ->
      okCallback = ->

      view.onShowMembership
        cancel: cancelCallback
        ok: okCallback

    it 'sets #ok callback', -> expect(view.ok).to.deep.equal okCallback

    it 'sets #cancel callback', ->
      expect(view.cancel).to.deep.equal cancelCallback

    it 'switched to first tab', ->
      expect(stubbedFirstTabTrigger).to.have.been.calledWith 'click'

    it 'shows modal dialog', ->
      expect(stubbedModal).to.have.been.calledWith 'show'

    after ->
      view.cancel = originalCancelCallback
      view.ok = originalOkCallback
      stubbedFirstTabTrigger.restore()
      stubbedModal.restore()

  describe '#onSignedInOrPasswordResetRequestedOrSignedUp', ->
    originalCanceled = null
    stubbedModal = null

    before ->
      originalCanceled = view.canceled;
      stubbedModal = sinon.stub view.$el, 'modal', ->

      view.onSignedInOrPasswordResetRequestedOrSignedUp()

    it 'sets #canceled to false', -> expect(view.canceled).to.be.false

    it 'hides modal dialog', ->
      expect(stubbedModal).to.have.been.calledWith 'hide'

    after ->
      view.canceled = originalCanceled
      stubbedModal.restore()

  describe '#onTabHeaderShown', ->
    spiedPutFocus = null
    stubbedSelector = null

    before ->
      match = putFocus: ->
      spiedPutFocus = sinon.spy match, 'putFocus'
      stubbedSelector = sinon.stub view, '$', -> match

      view.onTabHeaderShown target: { hash: '#tab1' }

    it 'puts focus on the selected tab', ->
      expect(spiedPutFocus).to.have.been.calledOnce

    after ->
      spiedPutFocus.restore()
      stubbedSelector.restore()

  describe '#onDialogShow', ->
    stubbedResetFields = null
    stubbedHideSummaryError = null
    stubbedHideFieldErrors = null
    originalCanceled = null

    before ->
      stubbedResetFields = sinon.stub view.$el,
        'resetFields',
        -> view.$el

      stubbedHideSummaryError = sinon.stub view.$el,
        'hideSummaryError',
        -> view.$el

      stubbedHideFieldErrors = sinon.stub view.$el,
        'hideFieldErrors',
        -> view.$el

      originalCanceled = view.canceled
      view.canceled = false

      view.onDialogShow()

    it 'sets #canceled to true', -> expect(view.canceled).to.be.true

    it 'resets fields', -> expect(stubbedResetFields).to.have.been.calledOnce

    it 'hides summary error', ->
      expect(stubbedHideSummaryError).to.have.been.calledOnce

    it 'hides field errors', ->
      expect(stubbedHideFieldErrors).to.have.been.calledOnce

    after ->
      stubbedResetFields.reset()
      stubbedHideSummaryError.reset()
      stubbedHideFieldErrors.reset()
      view.canceled = originalCanceled

  describe '#onDialogShown', ->
    stubbedPutFocus = null

    before ->
      stubbedPutFocus = sinon.stub view.$el, 'putFocus', ->
      view.onDialogShown()

    it 'puts focus', -> expect(stubbedPutFocus).to.have.been.calledOnce

    after -> stubbedPutFocus.restore()

  describe '#onDialogHidden', ->

    describe 'cancel', ->
      originalCanceled = null
      originalCancelCallback = null
      cancelCalled = null

      before ->
        originalCanceled = view.canceled
        originalCancelCallback = view.cancel
        cancelCalled = false
        view.cancel = => cancelCalled = true
        view.canceled = true

        view.onDialogHidden()

      it 'executes #cancel callback', -> expect(cancelCalled).to.be.true

      after ->
        view.canceled = originalCanceled
        view.cancel = originalCancelCallback

    describe 'ok', ->
      originalCanceled = null
      originalOkCallback = null
      okCalled = null

      before ->
        originalCanceled = view.canceled
        originalOkCallback = view.ok
        okCalled = false
        view.ok = -> okCalled = true
        view.canceled = false

        view.onDialogHidden()
      
      it 'executes #ok callback', -> expect(okCalled).to.be.true
      
      after ->
        view.canceled = originalCanceled
        view.ok = originalOkCallback

  after ->
    view.undelegateEvents()
    view.stopListening()
    spiedListenTo.restore()
    Membership.prototype.signInViewType = originalSignInViewType
    Membership.prototype.forgotPasswordViewType = originalForgotPasswordViewType
    Membership.prototype.signUpViewType = originalSignUpViewType
    fixtures.cleanUp()