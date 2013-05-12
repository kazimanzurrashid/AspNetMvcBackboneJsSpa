(function() {
  var expect;

  expect = this.chai.expect;

  describe('Application', function() {
    return describe('.start', function() {
      var spiedEventsTrigger, stubbedMembershipView, stubbedProfileView, stubbedRouter;

      stubbedMembershipView = null;
      stubbedProfileView = null;
      spiedEventsTrigger = null;
      stubbedRouter = null;
      before(function() {
        var e;

        stubbedMembershipView = sinon.stub(Application.Views, 'Membership', function() {
          return {};
        });
        stubbedProfileView = sinon.stub(Application.Views, 'Profile', function() {
          return {};
        });
        spiedEventsTrigger = sinon.spy(Application.events, 'on');
        stubbedRouter = sinon.stub(Application, 'Router', function() {
          return {
            navigate: function() {}
          };
        });
        try {
          return Application.start();
        } catch (_error) {
          e = _error;
        }
      });
      describe('view creation', function() {
        it('creates membership view', function() {
          return expect(Application.membershipView).to.exist;
        });
        return it('creates profile view', function() {
          return expect(Application.profileView).to.exist;
        });
      });
      describe('application events', function() {
        describe('subscription', function() {
          it('subscribe to myAccount application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('myAccount');
          });
          it('subscribe to signedIn application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('signedIn');
          });
          it('subscribe to passwordResetRequested application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('passwordResetRequested');
          });
          it('subscribe to signedUp application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('signedUp');
          });
          it('subscribe to passwordChanged application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('passwordChanged');
          });
          return it('subscribe to signedOut application event', function() {
            return expect(spiedEventsTrigger).to.have.been.calledWith('signedOut');
          });
        });
        return describe('handling', function() {
          var stubbedDelay, stubbedShowInfoBar;

          stubbedShowInfoBar = null;
          stubbedDelay = null;
          before(function() {
            stubbedShowInfoBar = sinon.stub($, 'showInfobar', function() {});
            stubbedDelay = sinon.stub(window, '_');
            return stubbedDelay.withArgs(sinon.match.func).returns({
              delay: function() {}
            });
          });
          describe('myAccount', function() {
            spiedEventsTrigger = null;
            before(function() {
              return spiedEventsTrigger = sinon.spy(Application.events, 'trigger');
            });
            describe('user signed in', function() {
              before(function() {
                Application.userSignnedIn = true;
                return Application.events.trigger('myAccount');
              });
              return it('triggers showProfile', function() {
                return expect(spiedEventsTrigger).to.have.been.calledWith('showProfile');
              });
            });
            describe('user not signed in', function() {
              before(function() {
                Application.userSignnedIn = false;
                return Application.events.trigger('myAccount');
              });
              return it('triggers showMembership', function() {
                return expect(spiedEventsTrigger).to.have.been.calledWith('showMembership');
              });
            });
            return after(function() {
              Application.userSignnedIn = false;
              return spiedEventsTrigger.restore();
            });
          });
          describe('signedIn', function() {
            before(function() {
              Application.userSignnedIn = false;
              Application.events.trigger('signedIn');
              return stubbedDelay.callArg(0);
            });
            it('sets #userSignnedIn to true', function() {
              return expect(Application.userSignnedIn).to.be["true"];
            });
            it('shows info bar', function() {
              return expect(stubbedShowInfoBar).to.have.been.called;
            });
            return after(function() {
              Application.userSignnedIn = false;
              return stubbedShowInfoBar.reset();
            });
          });
          describe('passwordResetRequested', function() {
            before(function() {
              Application.events.trigger('passwordResetRequested');
              return stubbedDelay.callArg(0);
            });
            it('shows info bar', function() {
              return expect(stubbedShowInfoBar).to.have.been.called;
            });
            return after(function() {
              return stubbedShowInfoBar.reset();
            });
          });
          describe('signedUp', function() {
            before(function() {
              Application.events.trigger('signedUp');
              return stubbedDelay.callArg(0);
            });
            it('shows info bar', function() {
              return expect(stubbedShowInfoBar).to.have.been.called;
            });
            return after(function() {
              return stubbedShowInfoBar.reset();
            });
          });
          describe('passwordChanged', function() {
            before(function() {
              Application.events.trigger('passwordChanged');
              return stubbedDelay.callArg(0);
            });
            it('shows info bar', function() {
              return expect(stubbedShowInfoBar).to.have.been.called;
            });
            return after(function() {
              return stubbedShowInfoBar.reset();
            });
          });
          describe('signedOut', function() {
            before(function() {
              Application.userSignnedIn = true;
              Application.events.trigger('signedOut');
              return stubbedDelay.callArg(0);
            });
            it('sets #userSignnedIn to false', function() {
              return expect(Application.userSignnedIn).to.be["false"];
            });
            it('shows info bar', function() {
              return expect(stubbedShowInfoBar).to.have.been.called;
            });
            return after(function() {
              Application.userSignnedIn = false;
              return stubbedShowInfoBar.reset();
            });
          });
          return after(function() {
            stubbedShowInfoBar.restore();
            return stubbedDelay.restore();
          });
        });
      });
      it('creates router', function() {
        return expect(Application.router).to.exist;
      });
      return after(function() {
        stubbedMembershipView.restore();
        stubbedProfileView.restore();
        spiedEventsTrigger.restore();
        return stubbedRouter.restore();
      });
    });
  });

}).call(this);
