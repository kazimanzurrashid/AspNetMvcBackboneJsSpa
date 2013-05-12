(function() {
  var expect;

  expect = this.chai.expect;

  describe('Views.NotFound', function() {
    var view;
    view = null;
    before(function() {
      return view = new Application.Views.NotFound;
    });
    it('can activate', function() {
      return expect(view).to.respondTo('activate');
    });
    return it('can deactivate', function() {
      return expect(view).to.respondTo('deactivate');
    });
  });

}).call(this);
