var expect = chai.expect;

describe('Views.Profile', function() {
    var spiedListenTo;
    var view;

    before(function() {
        fixtures.load('/profile.html');
        spiedListenTo = sinon.spy(
            Application.Views.Profile.prototype,
            'listenTo');

        view = new Application.Views.Profile({
            el: $(fixtures.window().document.body).find('#profile-dialog')
        });
    });

    describe('new', function() {
        it('is a modal dialog', function() {
            expect(view.$el.data('modal')).to.be.ok;
        });

        it('subscribes to showProfile application event', function() {
            expect(spiedListenTo)
                .to.have.been.calledWith(
                    Application.events, 'showProfile', view.onShowProfile);
        });
    });

    describe('#onShowProfile', function() {
        var stubbedResetFields;
        var stubbedHideSummaryError;
        var stubbedHideFieldErrors;
        var stubbedModal;

        before(function() {
            stubbedResetFields = sinon.stub(
                view.changePasswordForm,
                'resetFields',
                function() {
                    return view.changePasswordForm;
                });

            stubbedHideSummaryError = sinon.stub(
                view.changePasswordForm,
                'hideSummaryError',
                function() {
                    return view.changePasswordForm;
                });

            stubbedHideFieldErrors = sinon.stub(
                view.changePasswordForm,
                'hideFieldErrors',
                function() {
                    return view.changePasswordForm;
                });

            stubbedModal = sinon.stub(view.$el, 'modal', function() {
            });

            view.onShowProfile();
        });

        it('resets forms fields', function() {
            expect(stubbedResetFields).to.have.been.calledOnce;
        });

        it('hides form summary errors', function() {
            expect(stubbedHideSummaryError).to.have.been.calledOnce;
        });

        it('hides form fields errors', function() {
            expect(stubbedHideFieldErrors).to.have.been.calledOnce;
        });

        it('shows modal dialog', function() {
            expect(stubbedModal).to.have.been.calledWith('show');
        });

        after(function() {
            stubbedResetFields.restore();
            stubbedHideSummaryError.restore();
            stubbedHideFieldErrors.restore();
            stubbedModal.restore();
        });
    });

    describe('#onDialogShown', function() {
        var spiedPutFocus;

        before(function() {
            spiedPutFocus = sinon.spy(view.changePasswordForm, 'putFocus');
            view.onDialogShown();
        });

        it('puts focus on form', function() {
            expect(spiedPutFocus).to.have.been.calledOnce;
        });

        after(function() {
            return spiedPutFocus.restore();
        });
    });

    describe('#onChangePassword', function() {
        var stubbedHideSummaryError;
        var stubbedHideFieldErrors;
        var stubbedSubscribeModelInvalidEvent;
        var stubbedSerializeFields;
        var stubbedModel;
        var model;

        before(function() {
            stubbedHideSummaryError = sinon.stub(
                view.changePasswordForm,
                'hideSummaryError',
                function() {
                    return view.changePasswordForm;
                });

            stubbedHideFieldErrors = sinon.stub(
                view.changePasswordForm,
                'hideFieldErrors',
                function() {
                    return view.changePasswordForm;
                });

            stubbedSubscribeModelInvalidEvent = sinon.stub(
                Application.Views.Helpers,
                'subscribeModelInvalidEvent',
                function() {
                }
            );

            stubbedSerializeFields = sinon.stub(
                view.changePasswordForm,
                'serializeFields',
                function() {
                    return {};
                });

            model = {
                once: function() {

                },
                save: function() {
                }
            };

            stubbedModel = sinon.stub(Backbone, 'Model').returns(model);
            view.changePasswordModelType = Backbone.Model;
        });

        describe('form submit', function() {
            var spiedSave;

            before(function() {
                spiedSave = sinon.spy(model, 'save');
                view.onChangePassword({
                    preventDefault: function() {
                    }
                });
            });

            it('hides form summary error', function() {
                expect(stubbedHideSummaryError).to.have.been.called;
            });

            it('hides form fields errors', function() {
                expect(stubbedHideFieldErrors).to.have.been.called;
            });

            it('creates ChangePassword as model', function() {
                expect(stubbedModel).to.have.been.called;
            });

            it('subscribes to model invalid event once', function() {
                expect(stubbedSubscribeModelInvalidEvent)
                    .to.have.been.calledWith(model, view.changePasswordForm);
            });

            it('serializes form fields', function() {
                expect(stubbedSerializeFields).to.have.been.called;
            });

            it('saves model', function() {
                expect(spiedSave).to.have.been.calledOnce;
            });

            after(function() {
                return spiedSave.restore();
            });

        });

        describe('persistence', function() {

            describe('success', function() {
                var stubbedSave;
                var stubbedModal;
                var stubbedEventsTrigger;

                before(function() {
                    stubbedSave = sinon.stub(model, 'save').yieldsTo('success');
                    stubbedModal = sinon.stub(view.$el, 'modal', function() {
                    });

                    stubbedEventsTrigger = sinon.stub(
                        Application.events,
                        'trigger',
                        function() {
                        }
                    );

                    view.onChangePassword({
                        preventDefault: function() {
                        }
                    });
                });

                it('hides the modal dialog', function() {
                    expect(stubbedModal).to.have.been.calledWith('hide');
                });

                it('triggers passwordChanged application event', function() {
                    expect(stubbedEventsTrigger)
                        .to.have.been.calledWith('passwordChanged');
                });

                after(function() {
                    stubbedSave.restore();
                    stubbedModal.restore();
                    stubbedEventsTrigger.restore();
                });
            });

            describe('error', function() {

                describe('known', function() {
                    var stubbedHasModelErrors;
                    var stubbedGetModelErrors;
                    var stubbedShowFieldErrors;
                    var stubbedSave;

                    before(function() {
                        stubbedHasModelErrors = sinon.stub(
                            Application.Views.Helpers,
                            'hasModelErrors',
                            function() {
                                return true;
                            });

                        stubbedGetModelErrors = sinon.stub(
                            Application.Views.Helpers,
                            'getModelErrors',
                            function() {
                                return {};
                            });

                        stubbedShowFieldErrors = sinon.stub(
                            view.changePasswordForm,
                            'showFieldErrors',
                            function() {
                            });

                        stubbedSave = sinon.stub(model, 'save')
                            .yieldsTo('error');

                        view.onChangePassword({
                            preventDefault: function() {
                            }
                        });
                    });

                    it('shows field errors', function() {
                        expect(stubbedShowFieldErrors).to.have.been.calledOnce;
                    });

                    after(function() {
                        stubbedHasModelErrors.restore();
                        stubbedGetModelErrors.restore();
                        stubbedShowFieldErrors.restore();
                        stubbedSave.restore();
                    });
                });

                describe('unknown', function() {
                    var stubbedHasModelErrors;
                    var stubbedShowSummaryError;
                    var stubbedSave;

                    before(function() {
                        stubbedHasModelErrors = sinon.stub(
                            Application.Views.Helpers,
                            'hasModelErrors',
                            function() {
                                return false;
                            });

                        stubbedShowSummaryError = sinon.stub(
                            view.changePasswordForm,
                            'showSummaryError',
                            function() {
                            });

                        stubbedSave = sinon.stub(model, 'save')
                            .yieldsTo('error');

                        view.onChangePassword({
                            preventDefault: function() {
                            }
                        });
                    });

                    it('shows summary error', function() {
                        expect(stubbedShowSummaryError)
                            .to.have.been.calledOnce;
                    });

                    after(function() {
                        stubbedHasModelErrors.restore();
                        stubbedShowSummaryError.restore();
                        stubbedSave.restore();
                    });
                });
            });
        });

        after(function() {
            stubbedHideSummaryError.restore();
            stubbedHideFieldErrors.restore();
            stubbedSubscribeModelInvalidEvent.restore();
            stubbedSerializeFields.restore();
            stubbedModel.restore();
        });
    });

    describe('#onSignOut', function() {
        var stubbedModalHide;
        var stubbedConfirm;

        before(function() {
            return stubbedModalHide = sinon.stub(
                view.$el,
                'modal', function() {
                });
        });

        describe('submit', function() {
            before(function() {
                stubbedConfirm = sinon.stub($, 'confirm', function() {
                });
                view.onSignOut({
                    preventDefault: function() {
                    }
                });
            });

            it('hides the modal dialog', function() {
                expect(stubbedModalHide).to.have.been.calledWith('hide');
            });

            it('asks for confirmation', function() {
                expect(stubbedConfirm).to.have.been.calledOnce;
            });

            after(function() {
                return stubbedConfirm.restore();
            });
        });

        describe('confirmed', function() {
            var stubbedModel;
            var stubbedEventsTrigger;

            before(function() {
                stubbedConfirm = sinon.stub($, 'confirm').yieldsTo('ok');
                var model = {
                    destroy: function() {
                    }
                };

                stubbedModel = sinon.stub(Backbone, 'Model').returns(model);
                view.sessionModelType = Backbone.Model;
                sinon.stub(model, 'destroy').yieldsTo('success');
                stubbedEventsTrigger = sinon.stub(Application.events, 'trigger', function() {
                });

                view.onSignOut({
                    preventDefault: function() {
                    }
                });
            });

            it('triggers signedOut application event', function() {
                expect(stubbedEventsTrigger).to.have.been.calledWith('signedOut');
            });

            after(function() {
                stubbedEventsTrigger.restore();
                stubbedModel.restore();
                stubbedConfirm.restore();
            });
        });

        after(function() {
            return stubbedModalHide.restore();
        });
    });

    after(function() {
        view.undelegateEvents();
        view.stopListening();
        spiedListenTo.restore();
        fixtures.cleanUp();
    });
});