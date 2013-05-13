var expect = chai.expect;

describe('Application', function() {

    describe('.start', function() {

        var stubbedMembershipView;
        var stubbedProfileView;
        var spiedEventsTrigger;
        var stubbedRouter;

        before(function() {
            stubbedMembershipView = sinon.stub(Application.Views, 'Membership', function() {
                return {};
            });

            stubbedProfileView = sinon.stub(Application.Views, 'Profile', function() {
                return {};
            });

            spiedEventsTrigger = sinon.spy(Application.events, 'on');

            stubbedRouter = sinon.stub(Application, 'Router', function() {
                return {
                    navigate: function() {
                    }
                };
            });

            try {
                Application.start();
            } catch(e) {
            }
        });

        describe('view creation', function() {
            it('creates membership view', function() {
                expect(Application.membershipView).to.exist;
            });

            it('creates profile view', function() {
                expect(Application.profileView).to.exist;
            });
        });

        describe('application events', function() {

            describe('subscription', function() {
                it('subscribe to myAccount application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('myAccount');
                });

                it('subscribe to signedIn application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('signedIn');
                });

                it('subscribe to passwordResetRequested application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('passwordResetRequested');
                });

                it('subscribe to signedUp application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('signedUp');
                });

                it('subscribe to passwordChanged application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('passwordChanged');
                });

                it('subscribe to signedOut application event', function() {
                    expect(spiedEventsTrigger).to.have.been.calledWith('signedOut');
                });
            });

            describe('handling', function() {
                var stubbedShowInfoBar;
                var stubbedDelay;

                before(function() {
                    stubbedShowInfoBar = sinon.stub($, 'showInfobar', function() {
                    });
                    stubbedDelay = sinon.stub(_, 'delay');
                    stubbedDelay.withArgs(sinon.match.func, sinon.match.number);
                });

                describe('myAccount', function() {
                    var spiedEventsTrigger;

                    before(function() {
                        spiedEventsTrigger = sinon.spy(Application.events, 'trigger');
                    });

                    describe('user signed in', function() {
                        before(function() {
                            Application.userSignnedIn = true;
                            Application.events.trigger('myAccount');
                        });

                        it('triggers showProfile', function() {
                            expect(spiedEventsTrigger).to.have.been.calledWith('showProfile');
                        });
                    });

                    describe('user not signed in', function() {
                        before(function() {
                            Application.userSignnedIn = false;
                            Application.events.trigger('myAccount');
                        });

                        it('triggers showMembership', function() {
                            expect(spiedEventsTrigger).to.have.been.calledWith('showMembership');
                        });
                    });

                    after(function() {
                        spiedEventsTrigger.reset();
                        Application.userSignnedIn = false;
                        spiedEventsTrigger.restore();
                    });
                });

                describe('signedIn', function() {
                    before(function() {
                        Application.userSignnedIn = false;
                        Application.events.trigger('signedIn');
                        stubbedDelay.callArg(0);
                    });

                    it('sets #userSignnedIn to true', function() {
                        expect(Application.userSignnedIn).to.be.true;
                    });

                    it('shows info bar', function() {
                        expect(stubbedShowInfoBar).to.have.been.called;
                    });

                    after(function() {
                        Application.userSignnedIn = false;
                        stubbedShowInfoBar.reset();
                    });
                });

                describe('passwordResetRequested', function() {
                    before(function() {
                        Application.events.trigger('passwordResetRequested');
                        stubbedDelay.callArg(0);
                    });

                    it('shows info bar', function() {
                        expect(stubbedShowInfoBar).to.have.been.called;
                    });

                    after(function() {
                        stubbedShowInfoBar.reset();
                    });
                });

                describe('signedUp', function() {
                    before(function() {
                        Application.events.trigger('signedUp');
                        stubbedDelay.callArg(0);
                    });

                    it('shows info bar', function() {
                        expect(stubbedShowInfoBar).to.have.been.called;
                    });

                    after(function() {
                        stubbedShowInfoBar.reset();
                    });
                });

                describe('passwordChanged', function() {
                    before(function() {
                        Application.events.trigger('passwordChanged');
                        stubbedDelay.callArg(0);
                    });

                    it('shows info bar', function() {
                        expect(stubbedShowInfoBar).to.have.been.called;
                    });

                    after(function() {
                        stubbedShowInfoBar.reset();
                    });
                });

                describe('signedOut', function() {
                    before(function() {
                        Application.userSignnedIn = true;
                        Application.events.trigger('signedOut');
                        stubbedDelay.callArg(0);
                    });

                    it('sets #userSignnedIn to false', function() {
                        expect(Application.userSignnedIn).to.be.false;
                    });

                    it('shows info bar', function() {
                        expect(stubbedShowInfoBar).to.have.been.called;
                    });

                    after(function() {
                        Application.userSignnedIn = false;
                        stubbedShowInfoBar.reset();
                    });
                });

                after(function() {
                    stubbedShowInfoBar.restore();
                    stubbedDelay.restore();
                });
            });
        });

        it('creates router', function() {
            expect(Application.router).to.exist;
        });

        after(function() {
            stubbedMembershipView.restore();
            stubbedProfileView.restore();
            spiedEventsTrigger.restore();
            stubbedRouter.restore();
        });
    });
});