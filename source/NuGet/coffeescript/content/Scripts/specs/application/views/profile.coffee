expect = @chai.expect
$ = jQuery

describe 'Views.Profile', ->
  spiedListenTo = null
  view = null

  before ->
    fixtures.load '/profile.html'
    spiedListenTo = sinon.spy Application.Views.Profile.prototype, 'listenTo'

    view = new Application.Views.Profile
      el: $(fixtures.window().document.body).find '#profile-dialog'

  describe 'new', ->
    it 'is a modal dialog', -> expect(view.$el.data 'modal').to.be.ok
    
    it 'subscribes to showProfile application event', ->
      expect(spiedListenTo)
        .to.have.been.calledWith Application.events,
          'showProfile', view.onShowProfile

  describe '#onShowProfile', ->
    stubbedResetFields = null
    stubbedHideSummaryError = null
    stubbedHideFieldErrors = null
    stubbedModal = null

    before ->
      stubbedResetFields = sinon.stub view.changePasswordForm,
        'resetFields',
        -> view.changePasswordForm

      stubbedHideSummaryError = sinon.stub view.changePasswordForm,
        'hideSummaryError',
        -> view.changePasswordForm

      stubbedHideFieldErrors = sinon.stub view.changePasswordForm,
        'hideFieldErrors',
        -> view.changePasswordForm

      stubbedModal = sinon.stub view.$el, 'modal', ->

      view.onShowProfile()
    
    it 'resets forms fields', ->
      expect(stubbedResetFields).to.have.been.calledOnce

    it 'hides form summary errors', ->
      expect(stubbedHideSummaryError).to.have.been.calledOnce

    it 'hides form fields errors', ->
      expect(stubbedHideFieldErrors).to.have.been.calledOnce

    it 'shows modal dialog', ->
      expect(stubbedModal).to.have.been.calledWith 'show'

    after ->
      stubbedResetFields.restore()
      stubbedHideSummaryError.restore()
      stubbedHideFieldErrors.restore()
      stubbedModal.restore()

  describe '#onDialogShown', ->
    spiedPutFocus = null

    before ->
      spiedPutFocus = sinon.spy view.changePasswordForm, 'putFocus'
      view.onDialogShown()
    
    it 'puts focus on form', -> expect(spiedPutFocus).to.have.been.calledOnce
    
    after -> spiedPutFocus.restore()

  describe '#onChangePassword', ->
    stubbedHideSummaryError = null
    stubbedHideFieldErrors = null
    stubbedSubscribeModelInvalidEvent = null
    stubbedSerializeFields = null
    stubbedModel = null
    model = null

    before ->
      stubbedHideSummaryError = sinon.stub view.changePasswordForm,
        'hideSummaryError',
        -> view.changePasswordForm

      stubbedHideFieldErrors = sinon.stub view.changePasswordForm,
        'hideFieldErrors',
        -> view.changePasswordForm

      stubbedSubscribeModelInvalidEvent = sinon.stub Application.Views.Helpers,
          'subscribeModelInvalidEvent',
          ->

      stubbedSerializeFields = sinon.stub view.changePasswordForm,
        'serializeFields',
        -> { }

      model =
        once: ->
        save: ->

      stubbedModel = sinon.stub(Backbone, 'Model').returns model
      view.changePasswordModelType = Backbone.Model

    describe 'form submit', ->
      spiedSave = null

      before ->
        spiedSave = sinon.spy model, 'save'
        view.onChangePassword preventDefault: ->
      
      it 'hides form summary error', ->
        expect(stubbedHideSummaryError).to.have.been.called

      it 'hides form fields errors', ->
        expect(stubbedHideFieldErrors).to.have.been.called
      
      it 'creates ChangePassword as model', ->
        expect(stubbedModel).to.have.been.called
      
      it 'subscribes to model invalid event once', ->
        expect(stubbedSubscribeModelInvalidEvent)
          .to.have.been.calledWith model, view.changePasswordForm
      
      it 'serializes form fields', ->
        expect(stubbedSerializeFields).to.have.been.called
      
      it 'saves model', ->
        expect(spiedSave).to.have.been.calledOnce

      after -> spiedSave.restore()

    describe 'persistence', ->

      describe 'success', ->
        stubbedSave = null
        stubbedModal = null
        stubbedEventsTrigger = null

        before ->
          stubbedSave = sinon.stub(model, 'save').yieldsTo 'success'
          stubbedModal = sinon.stub view.$el, 'modal', ->
          stubbedEventsTrigger = sinon.stub Application.events, 'trigger', ->

          view.onChangePassword preventDefault: ->

        it 'hides the modal dialog', ->
          expect(stubbedModal).to.have.been.calledWith 'hide'

        it 'triggers passwordChanged application event', ->
          expect(stubbedEventsTrigger)
            .to.have.been.calledWith 'passwordChanged'

        after ->
          stubbedSave.restore()
          stubbedModal.restore()
          stubbedEventsTrigger.restore()

      describe 'error', ->

        describe 'known', ->
          stubbedHasModelErrors = null
          stubbedGetModelErrors = null
          stubbedShowFieldErrors = null
          stubbedSave = null

          before ->
            stubbedHasModelErrors = sinon.stub Application.Views.Helpers,
              'hasModelErrors',
              -> true

            stubbedGetModelErrors = sinon.stub Application.Views.Helpers,
              'getModelErrors',
              -> {}

            stubbedShowFieldErrors = sinon.stub view.changePasswordForm,
              'showFieldErrors',
              ->

            stubbedSave = sinon.stub(model, 'save').yieldsTo 'error'

            view.onChangePassword preventDefault: ->
          
          it 'shows field errors', ->
            expect(stubbedShowFieldErrors).to.have.been.calledOnce

          after ->
            stubbedHasModelErrors.restore()
            stubbedGetModelErrors.restore()
            stubbedShowFieldErrors.restore()
            stubbedSave.restore()

        describe 'unknown', ->
          stubbedHasModelErrors = null
          stubbedShowSummaryError = null
          stubbedSave = null

          before ->
            stubbedHasModelErrors = sinon.stub Application.Views.Helpers,
              'hasModelErrors',
              -> false

            stubbedShowSummaryError = sinon.stub view.changePasswordForm,
              'showSummaryError',
              ->
            stubbedSave = sinon.stub(model, 'save').yieldsTo 'error'

            view.onChangePassword preventDefault: ->
          
          it 'shows summary error', ->
            expect(stubbedShowSummaryError).to.have.been.calledOnce
          
          after ->
            stubbedHasModelErrors.restore()
            stubbedShowSummaryError.restore()
            stubbedSave.restore()

    after ->
      stubbedHideSummaryError.restore()
      stubbedHideFieldErrors.restore()
      stubbedSubscribeModelInvalidEvent.restore()
      stubbedSerializeFields.restore()
      stubbedModel.restore()

  describe '#onSignOut',  ->
    stubbedModalHide = null
    stubbedConfirm = null

    before -> stubbedModalHide = sinon.stub view.$el, 'modal', ->

    describe 'submit', ->
      before ->
        stubbedConfirm = sinon.stub $, 'confirm', ->
        view.onSignOut preventDefault: ->

      it 'hides the modal dialog', ->
        expect(stubbedModalHide).to.have.been.calledWith 'hide'

      it 'asks for confirmation', ->
        expect(stubbedConfirm).to.have.been.calledOnce

      after -> stubbedConfirm.restore()

    describe 'confirmed', ->
      stubbedModel = null
      stubbedEventsTrigger = null

      before ->
        stubbedConfirm = sinon.stub($, 'confirm').yieldsTo 'ok'

        model = destroy: ->
        stubbedModel = sinon.stub(Backbone, 'Model').returns model
        view.sessionModelType = Backbone.Model
        sinon.stub(model, 'destroy').yieldsTo 'success'

        stubbedEventsTrigger = sinon.stub Application.events, 'trigger', ->

        view.onSignOut preventDefault: ->

      it 'triggers signedOut application event', ->
        expect(stubbedEventsTrigger).to.have.been.calledWith 'signedOut'

      after ->
        stubbedEventsTrigger.restore()
        stubbedModel.restore()
        stubbedConfirm.restore()

    after -> stubbedModalHide.restore()

  after ->
    view.undelegateEvents()
    view.stopListening()
    spiedListenTo.restore()
    fixtures.cleanUp()