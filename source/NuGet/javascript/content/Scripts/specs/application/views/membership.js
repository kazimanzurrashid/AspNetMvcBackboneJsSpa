var expect = chai.expect;

describe('Views.MembershipChildForm', function() {
    var view;

    before(function() {
        fixtures.set('<form id="form"></form>');
        view = new Application.Views.MembershipChildForm({
            el: $(fixtures.window().document.body).find('#form')
        });
    });

    describe('#onSubmit', function() {
        var model;
        var stubbedModel;
        var stubbedSubscribeModelInvalidEvent;
        var stubbedHideSummaryError;
        var stubbedHideFieldErrors;
        var stubbedSerializeFields;

        before(function() {
            model = {
                save: function() {
                }
            };
            stubbedModel = sinon.stub(Backbone, 'Model').returns(model);
            view.modelType = Backbone.Model;

            stubbedSubscribeModelInvalidEvent = sinon.stub(
                Application.Views.Helpers,
                'subscribeModelInvalidEvent', function() {
                });

            stubbedHideSummaryError = sinon.stub(
                view.$el,
                'hideSummaryError', function() {
                    return view.$el;
                });

            stubbedHideFieldErrors = sinon.stub(
                view.$el,
                'hideFieldErrors',
                function() {
                    return view.$el;
                });

            stubbedSerializeFields = sinon.stub(
                view.$el,
                'serializeFields',
                function() {
                    return {
                        
                    };
                });
        });

        describe('form submit', function() {
            var spiedSave;

            before(function() {
                spiedSave = sinon.spy(model, 'save');
                view.onSubmit({
                    preventDefault: function() {
                    }
                });
            });

            it('hides form summary error', function() {
                expect(stubbedHideSummaryError).to.have.been.called;
            });

            it('hides field errors', function() {
                expect(stubbedHideFieldErrors).to.have.been.called;
            });

            it('creates model', function() {
                expect(stubbedModel).to.have.been.called;
            });

            it('subscribes to model invalid event once', function() {
                expect(stubbedSubscribeModelInvalidEvent)
                    .to.have.been.calledWith(model, view.$el);
            });

            it('serialize form fields', function() {
                expect(stubbedSerializeFields).to.have.been.called;
            });

            it('saves model', function() {
                expect(spiedSave).to.have.been.called;
            });

            after(function() {
                spiedSave.restore();
            });
        });

        describe('persistence', function() {

            describe('success', function() {
                var successEvent = 'dummy-event';
                var stubbedSave;
                var stubbedTrigger;

                before(function() {
                    stubbedSave = sinon.stub(model, 'save')
                        .yieldsTo('success');

                    stubbedTrigger = sinon.stub(
                        Application.events,
                        'trigger',
                        function() {
                        });
                    view.successEvent = successEvent;
                    view.onSubmit({
                        preventDefault: function() {
                        }
                    });
                });

                it('triggers application success event', function() {
                    expect(stubbedTrigger)
                        .to.have.been.calledWith(successEvent);
                });

                after(function() {
                    stubbedSave.restore();
                    stubbedTrigger.restore();
                });
            });

            describe('error', function() {
                var stubbedSave;
                var stubbedHandleError;

                before(function() {
                    stubbedSave = sinon.stub(model, 'save').yieldsTo('error');
                    stubbedHandleError = sinon.stub(
                        view,
                        'handleError',
                        function() {
                        });

                    view.onSubmit({
                        preventDefault: function() {
                        }
                    });
                });

                it('handles ajax error', function() {
                    expect(stubbedHandleError).to.have.been.called;
                });

                after(function() {
                    stubbedSave.restore();
                    stubbedHandleError.restore();
                });
            });
        });

        after(function() {
            stubbedModel.restore();
            stubbedSubscribeModelInvalidEvent.restore();
            stubbedHideSummaryError.restore();
            stubbedHideFieldErrors.restore();
            stubbedSerializeFields.restore();
        });
    });

    after(function() {
        view.undelegateEvents();
        view.stopListening();
        fixtures.cleanUp();
    });
});

describe('Views.Membership', function() {
    var originalSignInViewType;
    var originalForgotPasswordViewType;
    var originalSignUpViewType;
    var spiedListenTo;
    var view;
    var Membership = Application.Views.Membership;

    before(function() {
        originalSignInViewType = Membership.prototype.signInViewType;
        originalForgotPasswordViewType = Membership
            .prototype.forgotPasswordViewType;
        originalSignUpViewType = Membership.prototype.signUpViewType;
        Membership.prototype.signInViewType = sinon.stub()
            .returns({});
        
        Membership.prototype.forgotPasswordViewType = sinon.stub()
            .returns({});
        
        Membership.prototype.signUpViewType = sinon.stub()
            .returns({});
        
        spiedListenTo = sinon.spy(Membership.prototype, 'listenTo');
        fixtures.set('<div id="membership-dialog"></div>');
        view = new Membership({
            el: $(fixtures.window().document.body).find('#membership-dialog')
        });
    });

    describe('new', function() {
        it('is a modal dialog', function() {
            expect(view.$el.data('modal')).to.be.ok;
        });

        it('creates sign-in view', function() {
            expect(view.signIn).to.be.ok;
        });

        it('creates forgot password view', function() {
            expect(view.forgotPassword).to.be.ok;
        });

        it('creates sign-up view', function() {
            expect(view.signUp).to.be.ok;
        });

        it('subscribes to showMembership application event', function() {
            expect(spiedListenTo)
                .to.have.been.calledWith(
                    Application.events,
                    'showMembership',
                    view.onShowMembership);
        });

        it('subscribes to signedIn passwordResetRequested and signedUp application events', function() {
            expect(spiedListenTo)
                .to.have.been.calledWith(
                    Application.events,
                    'signedIn passwordResetRequested signedUp',
                    view.onSignedInOrPasswordResetRequestedOrSignedUp);
        });
    });

    describe('#onShowMembership', function() {
        var originalCancelCallback;
        var originalOkCallback;
        var cancelCallback;
        var okCallback;
        var stubbedFirstTabTrigger;
        var stubbedModal;

        before(function() {
            originalCancelCallback = view.cancel;
            originalOkCallback = view.ok;
            stubbedFirstTabTrigger = sinon.stub(
                view.firstTab,
                'trigger',
                function() {
                });

            stubbedModal = sinon.stub(view.$el, 'modal', function() {
            });

            cancelCallback = function() {
            };
            okCallback = function() {
            };
            view.onShowMembership({
                cancel: cancelCallback,
                ok: okCallback
            });
        });

        it('sets #ok callback', function() {
            expect(view.ok).to.deep.equal(okCallback);
        });

        it('sets #cancel callback', function() {
            expect(view.cancel).to.deep.equal(cancelCallback);
        });

        it('switched to first tab', function() {
            expect(stubbedFirstTabTrigger).to.have.been.calledWith('click');
        });

        it('shows modal dialog', function() {
            expect(stubbedModal).to.have.been.calledWith('show');
        });

        after(function() {
            view.cancel = originalCancelCallback;
            view.ok = originalOkCallback;
            stubbedFirstTabTrigger.restore();
            stubbedModal.restore();
        });
    });

    describe('#onSignedInOrPasswordResetRequestedOrSignedUp', function() {
        var originalCanceled;
        var stubbedModal;

        before(function() {
            originalCanceled = view.canceled;
            stubbedModal = sinon.stub(view.$el, 'modal', function() {
            });
            view.onSignedInOrPasswordResetRequestedOrSignedUp();
        });

        it('sets #canceled to false', function() {
            expect(view.canceled).to.be.false;
        });

        it('hides modal dialog', function() {
            expect(stubbedModal).to.have.been.calledWith('hide');
        });

        after(function() {
            view.canceled = originalCanceled;
            stubbedModal.restore();
        });
    });

    describe('#onTabHeaderShown', function() {
        var spiedPutFocus;
        var stubbedSelector;

        before(function() {
            var match = {
                putFocus: function() {
                }
            };
            spiedPutFocus = sinon.spy(match, 'putFocus');
            stubbedSelector = sinon.stub(view, '$', function() {
                return match;
            });
            view.onTabHeaderShown({
                target: {
                    hash: '#tab1'
                }
            });
        });

        it('puts focus on the selected tab', function() {
            expect(spiedPutFocus).to.have.been.calledOnce;
        });

        after(function() {
            spiedPutFocus.restore();
            stubbedSelector.restore();
        });
    });

    describe('#onDialogShow', function() {
        var stubbedResetFields;
        var stubbedHideSummaryError;
        var stubbedHideFieldErrors;
        var originalCanceled;

        before(function() {
            stubbedResetFields = sinon.stub(
                view.$el,
                'resetFields',
                function() {
                    return view.$el;
                });

            stubbedHideSummaryError = sinon.stub(
                view.$el,
                'hideSummaryError',
                function() {
                    return view.$el;
                });

            stubbedHideFieldErrors = sinon.stub(
                view.$el,
                'hideFieldErrors',
                function() {
                    return view.$el;
                });

            originalCanceled = view.canceled;
            view.canceled = false;
            view.onDialogShow();
        });

        it('sets #canceled to true', function() {
            expect(view.canceled).to.be.true;
        });

        it('resets fields', function() {
            expect(stubbedResetFields).to.have.been.calledOnce;
        });

        it('hides summary error', function() {
            expect(stubbedHideSummaryError).to.have.been.calledOnce;
        });

        it('hides field errors', function() {
            expect(stubbedHideFieldErrors).to.have.been.calledOnce;
        });

        after(function() {
            stubbedResetFields.reset();
            stubbedHideSummaryError.reset();
            stubbedHideFieldErrors.reset();
            view.canceled = originalCanceled;
        });
    });

    describe('#onDialogShown', function() {
        var stubbedPutFocus;

        before(function() {
            stubbedPutFocus = sinon.stub(view.$el, 'putFocus', function() {
            });
            view.onDialogShown();
        });

        it('puts focus', function() {
            expect(stubbedPutFocus).to.have.been.calledOnce;
        });

        after(function() {
            return stubbedPutFocus.restore();
        });
    });

    describe('#onDialogHidden', function() {

        describe('cancel', function() {
            var originalCanceled;
            var originalCancelCallback;
            var cancelCalled;

            before(function() {
                originalCanceled = view.canceled;
                originalCancelCallback = view.cancel;
                cancelCalled = false;
                view.cancel = function() {
                    cancelCalled = true;
                };
                view.canceled = true;
                view.onDialogHidden();
            });

            it('executes #cancel callback', function() {
                expect(cancelCalled).to.be.true;
            });

            after(function() {
                view.canceled = originalCanceled;
                view.cancel = originalCancelCallback;
            });
        });

        describe('ok', function() {
            var originalCanceled;
            var originalOkCallback;
            var okCalled;

            before(function() {
                originalCanceled = view.canceled;
                originalOkCallback = view.ok;
                okCalled = false;
                view.ok = function() {
                    okCalled = true;
                };
                view.canceled = false;
                view.onDialogHidden();
            });

            it('executes #ok callback', function() {
                expect(okCalled).to.be.true;
            });

            after(function() {
                view.canceled = originalCanceled;
                view.ok = originalOkCallback;
            });
        });
    });

    after(function() {
        view.undelegateEvents();
        view.stopListening();
        spiedListenTo.restore();
        Membership.prototype.signInViewType = originalSignInViewType;
        Membership.prototype.forgotPasswordViewType = originalForgotPasswordViewType;
        Membership.prototype.signUpViewType = originalSignUpViewType;
        fixtures.cleanUp();
    });
});