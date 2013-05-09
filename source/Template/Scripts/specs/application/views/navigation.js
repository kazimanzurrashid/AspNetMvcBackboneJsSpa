var expect = this.chai.expect;
describe('Views.Navigation', function () {
    var view;
    before(function () {
        fixtures.load('/navigation.html');
        view = new Application.Views.Navigation({
            el: $(fixtures.window().document.body).find('#navigation')
        });
    });
    describe('#select', function () {
        beforeEach(function () {
            return view.select('test-1');
        });
        it('adds css class active', function () {
            expect(view.$('li').first()).to.have.class('active');
        });
    });
    describe('#deselectAll', function () {
        beforeEach(function () {
            view.select('test-1');
            view.deselectAll();
        });
        it('removes css class active', function () {
            expect(view.$('li').first()).to.not.have.class('active');
        });
    });
    describe('application events', function () {
        var stubbedTrigger;
        beforeEach(function () {
            return stubbedTrigger = sinon.stub(Application.events, 'trigger');
        });
        describe('menu item clicks', function () {
            describe('has data-command attribute', function () {
                beforeEach(function () {
                    return view.$('a').first().trigger('click');
                });
                it('triggers the event', function () {
                    expect(stubbedTrigger).to.have.been.calledWith('dummy-event');
                });
            });
            describe('no data-command attribute', function () {
                beforeEach(function () {
                    return view.$('a').last().trigger('click');
                });
                it('does not trigger any event', function () {
                    expect(stubbedTrigger).to.not.have.been.called;
                });
            });
        });
        afterEach(function () {
            return stubbedTrigger.restore();
        });
    });
    after(function () {
        view.undelegateEvents();
        view.stopListening();
        fixtures.cleanUp();
    });
});
