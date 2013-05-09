var expect = this.chai.expect;
var DummmyView = (function () {
    function DummmyView() {
        this.$el = $('<div/>');
        this.activated = this.deactivated = false;
    }
    DummmyView.prototype.onActivate = function () {
        this.activated = true;
    };
    DummmyView.prototype.onDeactivate = function () {
        this.deactivated = true;
    };
    return DummmyView;
})();
_.extend(DummmyView.prototype, Application.Views.Activable);
describe('Views.Activable', function () {
    var activable;
    describe('#activate', function () {
        var stubbedClearTimer;
        var stubbedShow;
        var stubbedCss;
        var stubbedOuterWidth;
        var stubbedHide;
        var stubbedAnimate;
        before(function (done) {
            activable = new DummmyView();
            stubbedClearTimer = sinon.stub(activable, 'clearAnimationTimer', function () {
            });
            stubbedShow = sinon.stub(activable.$el, 'show', function () {
                return activable.$el;
            });
            stubbedCss = sinon.stub(activable.$el, 'css', function () {
                return activable.$el;
            });
            stubbedOuterWidth = sinon.stub(activable.$el, 'outerWidth', function () {
                return 0;
            });
            stubbedHide = sinon.stub(activable.$el, 'hide', function () {
                return activable.$el;
            });
            stubbedAnimate = sinon.stub(activable.$el, 'animate', function () {
                return activable.$el;
            });
            (activable).activate();
            _.defer(function () {
                stubbedShow.getCall(1).args[0]();
                stubbedAnimate.getCall(0).args[2]();
                done();
            });
        });
        it('clears animation timer', function () {
            expect(stubbedClearTimer).to.have.been.calledOnce;
        });
        it('shows the view initially', function () {
            expect(stubbedShow).to.have.been.calledWith();
        });
        it('moves the view to right', function () {
            expect(stubbedCss).to.have.been.calledWith({
                marginLeft: sinon.match.number
            });
            expect(stubbedOuterWidth).to.have.been.calledOnce;
        });
        it('then hides the view', function () {
            expect(stubbedHide).to.have.been.calledOnce;
        });
        it('then again shows the view', function () {
            expect(stubbedShow).to.have.been.calledWith(sinon.match.func);
        });
        it('animates the view from right to left', function () {
            expect(stubbedAnimate).to.have.been.calledWith({
                marginLeft: 0
            }, sinon.match.number, sinon.match.func);
        });
        it('invokes #onActivate', function () {
            expect(activable.activated).to.be.true;
        });
    });
    describe('#deactivate', function () {
        var stubbedHide;
        var stubbedClearTimer;
        before(function () {
            activable = new DummmyView();
            stubbedHide = sinon.stub(activable.$el, 'hide', function () {
            });
            stubbedClearTimer = sinon.stub(activable, 'clearAnimationTimer', function () {
            });
            (activable).deactivate();
        });
        it('invokes #onDeactivate', function () {
            expect(activable.deactivated).to.be.true;
        });
        it('hides the view', function () {
            expect(stubbedHide).to.have.been.calledOnce;
        });
        it('clears animation timer', function () {
            expect(stubbedClearTimer).to.have.been.calledOnce;
        });
    });
});
