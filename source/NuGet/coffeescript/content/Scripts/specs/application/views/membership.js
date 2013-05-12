(function() {
  var $, expect;

  expect = this.chai.expect;

  $ = jQuery;

  describe('Views.MembershipChildForm', function() {
    var view;

    view = null;
    before(function() {
      fixtures.set('<form id="form"></form>');
      return view = new Application.Views.MembershipChildForm({
        el: $(fixtures.window().document.body).find('#form')
      });
    });
    describe('#onSubmit', function() {
      var model, stubbedHideFieldErrors, stubbedHideSummaryError, stubbedModel, stubbedSerializeFields, stubbedSubscribeModelInvalidEvent;

      model = null;
      stubbedModel = null;
      stubbedSubscribeModelInvalidEvent = null;
      stubbedHideSummaryError = null;
      stubbedHideFieldErrors = null;
      stubbedSerializeFields = null;
      before(function() {
        model = {
          save: function() {}
        };
        stubbedModel = sinon.stub(Backbone, 'Model').returns(model);
        view.modelType = Backbone.Model;
        stubbedSubscribeModelInvalidEvent = sinon.stub(Application.Views.Helpers, 'subscribeModelInvalidEvent', function() {});
        stubbedHideSummaryError = sinon.stub(view.$el, 'hideSummaryError', function() {
          return view.$el;
        });
        stubbedHideFieldErrors = sinon.stub(view.$el, 'hideFieldErrors', function() {
          return view.$el;
        });
        return stubbedSerializeFields = sinon.stub(view.$el, 'serializeFields', function() {
          return {};
        });
      });
      describe('form submit', function() {
        var spiedSave;

        spiedSave = null;
        before(function() {
          spiedSave = sinon.spy(model, 'save');
          return view.onSubmit({
            preventDefault: function() {}
          });
        });
        it('hides form summary error', function() {
          return expect(stubbedHideSummaryError).to.have.been.called;
        });
        it('hides field errors', function() {
          return expect(stubbedHideFieldErrors).to.have.been.called;
        });
        it('creates model', function() {
          return expect(stubbedModel).to.have.been.called;
        });
        it('subscribes to model invalid event once', function() {
          return expect(stubbedSubscribeModelInvalidEvent).to.have.been.calledWith(model, view.$el);
        });
        it('serialize form fields', function() {
          return expect(stubbedSerializeFields).to.have.been.called;
        });
        it('saves model', function() {
          return expect(spiedSave).to.have.been.called;
        });
        return after(function() {
          return spiedSave.restore();
        });
      });
      describe('persistence', function() {
        describe('success', function() {
          var stubbedSave, stubbedTrigger, successEvent;

          successEvent = 'dummy-event';
          stubbedSave = null;
          stubbedTrigger = null;
          before(function() {
            stubbedSave = sinon.stub(model, 'save').yieldsTo('success');
            stubbedTrigger = sinon.stub(Application.events, 'trigger', function() {});
            view.successEvent = successEvent;
            return view.onSubmit({
              preventDefault: function() {}
            });
          });
          it('triggers application success event', function() {
            return expect(stubbedTrigger).to.have.been.calledWith(successEvent);
          });
          return after(function() {
            stubbedSave.restore();
            return stubbedTrigger.restore();
          });
        });
        return describe('error', function() {
          var stubbedHandleError, stubbedSave;

          stubbedSave = null;
          stubbedHandleError = null;
          before(function() {
            stubbedSave = sinon.stub(model, 'save').yieldsTo('error');
            stubbedHandleError = sinon.stub(view, 'handleError', function() {});
            return view.onSubmit({
              preventDefault: function() {}
            });
          });
          it('handles ajax error', function() {
            return expect(stubbedHandleError).to.have.been.called;
          });
          return after(function() {
            stubbedSave.restore();
            return stubbedHandleError.restore();
          });
        });
      });
      return after(function() {
        stubbedModel.restore();
        stubbedSubscribeModelInvalidEvent.restore();
        stubbedHideSummaryError.restore();
        stubbedHideFieldErrors.restore();
        return stubbedSerializeFields.restore();
      });
    });
    return after(function() {
      view.undelegateEvents();
      view.stopListening();
      return fixtures.cleanUp();
    });
  });

  describe('Views.Membership', function() {
    var Membership, originalForgotPasswordViewType, originalSignInViewType, originalSignUpViewType, spiedListenTo, view;

    originalSignInViewType = null;
    originalForgotPasswordViewType = null;
    originalSignUpViewType = null;
    spiedListenTo = null;
    view = null;
    Membership = Application.Views.Membership;
    before(function() {
      originalSignInViewType = Membership.prototype.signInViewType;
      originalForgotPasswordViewType = Membership.prototype.forgotPasswordViewType;
      originalSignUpViewType = Membership.prototype.signUpViewType;
      Membership.prototype.signInViewType = sinon.stub().returns({});
      Membership.prototype.forgotPasswordViewType = sinon.stub().returns({});
      Membership.prototype.signUpViewType = sinon.stub().returns({});
      spiedListenTo = sinon.spy(Membership.prototype, 'listenTo');
      fixtures.set('<div id="membership-dialog"></div>');
      return view = new Membership({
        el: $(fixtures.window().document.body).find('#membership-dialog')
      });
    });
    describe('new', function() {
      it('is a modal dialog', function() {
        return expect(view.$el.data('modal')).to.be.ok;
      });
      it('creates sign-in view', function() {
        return expect(view.signIn).to.be.ok;
      });
      it('creates forgot password view', function() {
        return expect(view.forgotPassword).to.be.ok;
      });
      it('creates sign-up view', function() {
        return expect(view.signUp).to.be.ok;
      });
      it('subscribes to showMembership application event', function() {
        return expect(spiedListenTo).to.have.been.calledWith(Application.events, 'showMembership', view.onShowMembership);
      });
      return it('subscribes to signedIn passwordResetRequested and signedUp application events', function() {
        return expect(spiedListenTo).to.have.been.calledWith(Application.events, 'signedIn passwordResetRequested signedUp', view.onSignedInOrPasswordResetRequestedOrSignedUp);
      });
    });
    describe('#onShowMembership', function() {
      var cancelCallback, okCallback, originalCancelCallback, originalOkCallback, stubbedFirstTabTrigger, stubbedModal;

      originalCancelCallback = null;
      originalOkCallback = null;
      cancelCallback = null;
      okCallback = null;
      stubbedFirstTabTrigger = null;
      stubbedModal = null;
      before(function() {
        originalCancelCallback = view.cancel;
        originalOkCallback = view.ok;
        stubbedFirstTabTrigger = sinon.stub(view.firstTab, 'trigger', function() {});
        stubbedModal = sinon.stub(view.$el, 'modal', function() {});
        cancelCallback = function() {};
        okCallback = function() {};
        return view.onShowMembership({
          cancel: cancelCallback,
          ok: okCallback
        });
      });
      it('sets #ok callback', function() {
        return expect(view.ok).to.deep.equal(okCallback);
      });
      it('sets #cancel callback', function() {
        return expect(view.cancel).to.deep.equal(cancelCallback);
      });
      it('switched to first tab', function() {
        return expect(stubbedFirstTabTrigger).to.have.been.calledWith('click');
      });
      it('shows modal dialog', function() {
        return expect(stubbedModal).to.have.been.calledWith('show');
      });
      return after(function() {
        view.cancel = originalCancelCallback;
        view.ok = originalOkCallback;
        stubbedFirstTabTrigger.restore();
        return stubbedModal.restore();
      });
    });
    describe('#onSignedInOrPasswordResetRequestedOrSignedUp', function() {
      var originalCanceled, stubbedModal;

      originalCanceled = null;
      stubbedModal = null;
      before(function() {
        originalCanceled = view.canceled;
        stubbedModal = sinon.stub(view.$el, 'modal', function() {});
        return view.onSignedInOrPasswordResetRequestedOrSignedUp();
      });
      it('sets #canceled to false', function() {
        return expect(view.canceled).to.be["false"];
      });
      it('hides modal dialog', function() {
        return expect(stubbedModal).to.have.been.calledWith('hide');
      });
      return after(function() {
        view.canceled = originalCanceled;
        return stubbedModal.restore();
      });
    });
    describe('#onTabHeaderShown', function() {
      var spiedPutFocus, stubbedSelector;

      spiedPutFocus = null;
      stubbedSelector = null;
      before(function() {
        var match;

        match = {
          putFocus: function() {}
        };
        spiedPutFocus = sinon.spy(match, 'putFocus');
        stubbedSelector = sinon.stub(view, '$', function() {
          return match;
        });
        return view.onTabHeaderShown({
          target: {
            hash: '#tab1'
          }
        });
      });
      it('puts focus on the selected tab', function() {
        return expect(spiedPutFocus).to.have.been.calledOnce;
      });
      return after(function() {
        spiedPutFocus.restore();
        return stubbedSelector.restore();
      });
    });
    describe('#onDialogShow', function() {
      var originalCanceled, stubbedHideFieldErrors, stubbedHideSummaryError, stubbedResetFields;

      stubbedResetFields = null;
      stubbedHideSummaryError = null;
      stubbedHideFieldErrors = null;
      originalCanceled = null;
      before(function() {
        stubbedResetFields = sinon.stub(view.$el, 'resetFields', function() {
          return view.$el;
        });
        stubbedHideSummaryError = sinon.stub(view.$el, 'hideSummaryError', function() {
          return view.$el;
        });
        stubbedHideFieldErrors = sinon.stub(view.$el, 'hideFieldErrors', function() {
          return view.$el;
        });
        originalCanceled = view.canceled;
        view.canceled = false;
        return view.onDialogShow();
      });
      it('sets #canceled to true', function() {
        return expect(view.canceled).to.be["true"];
      });
      it('resets fields', function() {
        return expect(stubbedResetFields).to.have.been.calledOnce;
      });
      it('hides summary error', function() {
        return expect(stubbedHideSummaryError).to.have.been.calledOnce;
      });
      it('hides field errors', function() {
        return expect(stubbedHideFieldErrors).to.have.been.calledOnce;
      });
      return after(function() {
        stubbedResetFields.reset();
        stubbedHideSummaryError.reset();
        stubbedHideFieldErrors.reset();
        return view.canceled = originalCanceled;
      });
    });
    describe('#onDialogShown', function() {
      var stubbedPutFocus;

      stubbedPutFocus = null;
      before(function() {
        stubbedPutFocus = sinon.stub(view.$el, 'putFocus', function() {});
        return view.onDialogShown();
      });
      it('puts focus', function() {
        return expect(stubbedPutFocus).to.have.been.calledOnce;
      });
      return after(function() {
        return stubbedPutFocus.restore();
      });
    });
    describe('#onDialogHidden', function() {
      describe('cancel', function() {
        var cancelCalled, originalCancelCallback, originalCanceled;

        originalCanceled = null;
        originalCancelCallback = null;
        cancelCalled = null;
        before(function() {
          var _this = this;

          originalCanceled = view.canceled;
          originalCancelCallback = view.cancel;
          cancelCalled = false;
          view.cancel = function() {
            return cancelCalled = true;
          };
          view.canceled = true;
          return view.onDialogHidden();
        });
        it('executes #cancel callback', function() {
          return expect(cancelCalled).to.be["true"];
        });
        return after(function() {
          view.canceled = originalCanceled;
          return view.cancel = originalCancelCallback;
        });
      });
      return describe('ok', function() {
        var okCalled, originalCanceled, originalOkCallback;

        originalCanceled = null;
        originalOkCallback = null;
        okCalled = null;
        before(function() {
          originalCanceled = view.canceled;
          originalOkCallback = view.ok;
          okCalled = false;
          view.ok = function() {
            return okCalled = true;
          };
          view.canceled = false;
          return view.onDialogHidden();
        });
        it('executes #ok callback', function() {
          return expect(okCalled).to.be["true"];
        });
        return after(function() {
          view.canceled = originalCanceled;
          return view.ok = originalOkCallback;
        });
      });
    });
    return after(function() {
      view.undelegateEvents();
      view.stopListening();
      spiedListenTo.restore();
      Membership.prototype.signInViewType = originalSignInViewType;
      Membership.prototype.forgotPasswordViewType = originalForgotPasswordViewType;
      Membership.prototype.signUpViewType = originalSignUpViewType;
      return fixtures.cleanUp();
    });
  });

}).call(this);
