/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>
/// <reference path='../../../typings/js-fixtures/fixtures.d.ts'/>
/// <reference path='../../../typings/sinon/sinon-1.5.d.ts'/>
/// <reference path='../../../typings/sinon-chai/sinon-chai.d.ts'/>
/// <reference path='../../../typings/chai-jquery/chai-jquery.d.ts'/>

/// <reference path='../../../typings/jquery/jquery.d.ts'/>

/// <reference path="../../../application/events.ts" />
/// <reference path="../../../application/views/navigation.ts" />

var expect = chai.expect;

describe('Views.Navigation', () => {
    var view: Application.Views.Navigation;

    before(() => {
        fixtures.load('/navigation.html');

        view = new Application.Views.Navigation({
            el: $(fixtures.window().document.body).find('#navigation')
        });
    });

    describe('#select', () => {
        beforeEach(() => view.select('test-1'));

        it('adds css class active', () => {
            expect(view.$('li').first()).to.have.class('active');
        })
    });

    describe('#deselectAll', () => {
        beforeEach(() => {
            view.select('test-1');
            view.deselectAll();
        });

        it('removes css class active', () => {
            expect(view.$('li').first()).to.not.have.class('active');
        })
    });

    describe('application events', () => {
        var stubbedTrigger: SinonStub;

        beforeEach(() =>
            stubbedTrigger = sinon.stub(Application.events, 'trigger'));

        describe('menu item clicks', () => {

            describe('has data-command attribute', () => {
                beforeEach(() =>
                    view.$('a').first().trigger('click'));

                it('triggers the event', () => {
                    expect(stubbedTrigger).to.have.been.calledWith('dummy-event');
                });
            });

            describe('no data-command attribute', () => {
                beforeEach(() =>
                    view.$('a').last().trigger('click'));

                it('does not trigger any event', () => {
                    expect(stubbedTrigger).to.not.have.been.called;
                });
            });
        });

        afterEach(() => stubbedTrigger.restore());
    });

    after(() => {
        view.undelegateEvents();
        view.stopListening();
        fixtures.cleanUp();
    });
});