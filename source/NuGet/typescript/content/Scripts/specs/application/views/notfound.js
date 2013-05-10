var expect = this.chai.expect;
describe('Views.NotFound', function () {
    var view;
    before(function () {
        return view = new Application.Views.NotFound();
    });
    it('can activate', function () {
        expect(view).to.respondTo('activate');
    });
    it('can deactivate', function () {
        expect(view).to.respondTo('deactivate');
    });
});
