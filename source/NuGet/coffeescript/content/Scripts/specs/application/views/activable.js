(function() {
  var $, DummmyView, expect;

  expect = this.chai.expect;

  $ = jQuery;

  DummmyView = (function() {
    function DummmyView() {
      this.$el = $('<div/>');
      this.activated = this.deactivated = false;
    }

    DummmyView.prototype.onActivate = function() {
      return this.activated = true;
    };

    DummmyView.prototype.onDeactivate = function() {
      return this.deactivated = true;
    };

    return DummmyView;

  })();

  _(DummmyView.prototype).extend(Application.Views.Activable);

  describe('Views.Activable', function() {
    var activable;

    activable = null;
    describe('#activate', function() {
      var stubbedAnimate, stubbedClearTimer, stubbedCss, stubbedHide, stubbedOuterWidth, stubbedShow;

      stubbedClearTimer = null;
      stubbedShow = null;
      stubbedCss = null;
      stubbedOuterWidth = null;
      stubbedHide = null;
      stubbedAnimate = null;
      before(function(done) {
        activable = new DummmyView();
        stubbedClearTimer = sinon.stub(activable, 'clearAnimationTimer', function() {});
        stubbedShow = sinon.stub(activable.$el, 'show', function() {
          return activable.$el;
        });
        stubbedCss = sinon.stub(activable.$el, 'css', function() {
          return activable.$el;
        });
        stubbedOuterWidth = sinon.stub(activable.$el, 'outerWidth', function() {
          return 0;
        });
        stubbedHide = sinon.stub(activable.$el, 'hide', function() {
          return activable.$el;
        });
        stubbedAnimate = sinon.stub(activable.$el, 'animate', function() {
          return activable.$el;
        });
        activable.activate();
        return _(function() {
          stubbedShow.getCall(1).args[0]();
          stubbedAnimate.getCall(0).args[2]();
          return done();
        }).defer();
      });
      it('clears animation timer', function() {
        return expect(stubbedClearTimer).to.have.been.calledOnce;
      });
      it('shows the view initially', function() {
        return expect(stubbedShow).to.have.been.calledWith();
      });
      it('moves the view to right', function() {
        expect(stubbedCss).to.have.been.calledWith({
          marginLeft: sinon.match.number
        });
        return expect(stubbedOuterWidth).to.have.been.calledOnce;
      });
      it('then hides the view', function() {
        return expect(stubbedHide).to.have.been.calledOnce;
      });
      it('then again shows the view', function() {
        return expect(stubbedShow).to.have.been.calledWith(sinon.match.func);
      });
      it('animates the view from right to left', function() {
        return expect(stubbedAnimate).to.have.been.calledWith({
          marginLeft: 0
        }, sinon.match.number, sinon.match.func);
      });
      return it('invokes #onActivate', function() {
        return expect(activable.activated).to.be["true"];
      });
    });
    return describe('#deactivate', function() {
      var stubbedClearTimer, stubbedHide;

      stubbedHide = null;
      stubbedClearTimer = null;
      before(function() {
        activable = new DummmyView();
        stubbedHide = sinon.stub(activable.$el, 'hide', function() {});
        stubbedClearTimer = sinon.stub(activable, 'clearAnimationTimer', function() {});
        return activable.deactivate();
      });
      it('invokes #onDeactivate', function() {
        return expect(activable.deactivated).to.be["true"];
      });
      it('hides the view', function() {
        return expect(stubbedHide).to.have.been.calledOnce;
      });
      return it('clears animation timer', function() {
        return expect(stubbedClearTimer).to.have.been.calledOnce;
      });
    });
  });

}).call(this);
