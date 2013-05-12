/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>
/// <reference path='../../../typings/sinon/sinon-1.5.d.ts'/>
/// <reference path='../../../typings/sinon-chai/sinon-chai.d.ts'/>

/// <reference path='../../../typings/jquery/jquery.d.ts'/>
/// <reference path="../../../typings/underscore/underscore-typed.d.ts" />

/// <reference path="../../../application/views/activable.ts" />

var expect = chai.expect;

class DummmyView {
    $el: JQuery;
    activated: bool;
    deactivated: bool;

    constructor() {
        this.$el = $('<div/>');
        this.activated = this.deactivated = false;
    }

    onActivate() {
        this.activated = true;
    }

    onDeactivate() {
        this.deactivated = true;
    }
}

_.extend(DummmyView.prototype, Application.Views.Activable);

describe('Views.Activable', () => {
    var activable: DummmyView;

    describe('#activate', () => {
        var stubbedClearTimer: SinonStub;
        var stubbedShow: SinonStub;
        var stubbedCss: SinonStub;
        var stubbedOuterWidth: SinonStub;
        var stubbedHide: SinonStub;
        var stubbedAnimate: SinonStub;

        before((done) => {
            activable = new DummmyView();

            stubbedClearTimer = sinon.stub(
                activable,
                'clearAnimationTimer',
                () => { });

            stubbedShow = sinon.stub(
                activable.$el,
                'show',
                () => activable.$el);

            stubbedCss = sinon.stub(activable.$el, 'css', () => activable.$el);

            stubbedOuterWidth = sinon.stub(
                activable.$el,
                'outerWidth',
                () => 0);

            stubbedHide = sinon.stub(
                activable.$el,
                'hide',
                () => activable.$el);

            stubbedAnimate = sinon.stub(
                activable.$el,
                'animate',
                () => activable.$el);

            (<any>activable).activate();

            _.defer(() => {
                stubbedShow.getCall(1).args[0]();
                stubbedAnimate.getCall(0).args[2]();
                done();
            });
        });

        it('clears animation timer', () => {
            expect(stubbedClearTimer).to.have.been.calledOnce;
        });

        it('shows the view initially', () => {
            expect(stubbedShow).to.have.been.calledWith();
        });

        it('moves the view to right', () => {
            expect(stubbedCss)
                .to.have.been.calledWith({ marginLeft: sinon.match.number });
            expect(stubbedOuterWidth).to.have.been.calledOnce;
        });

        it('then hides the view', () => {
            expect(stubbedHide).to.have.been.calledOnce;
        });

        it('then again shows the view', () => {
            expect(stubbedShow).to.have.been.calledWith(sinon.match.func);
        });

        it('animates the view from right to left', () => {
            expect(stubbedAnimate)
                .to
                .have
                .been
                .calledWith(
                    { marginLeft: 0 },
                    sinon.match.number,
                    sinon.match.func);
        });

        it('invokes #onActivate', () => {
            expect(activable.activated).to.be.true;
        });
    });

    describe('#deactivate', () => {
        var stubbedHide: SinonStub;
        var stubbedClearTimer: SinonStub;

        before(() => {
            activable = new DummmyView();
            stubbedHide = sinon.stub(activable.$el, 'hide', () => { });
            stubbedClearTimer = sinon.stub(
                activable,
                'clearAnimationTimer',
                () => { });

            (<any>activable).deactivate();
        });

        it('invokes #onDeactivate', () => {
            expect(activable.deactivated).to.be.true;
        });

        it('hides the view', () => {
            expect(stubbedHide).to.have.been.calledOnce;
        });

        it('clears animation timer', () => {
            expect(stubbedClearTimer).to.have.been.calledOnce;
        });
    });
});