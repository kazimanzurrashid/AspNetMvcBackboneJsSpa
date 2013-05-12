(function() {
  var expect;

  expect = this.chai.expect;

  describe('Views.Page', function() {
    var model, view;
    model = null;
    view = null;
    before(function() {
      model = new Backbone.Model({
        message: 'Hello world'
      });
      return view = new Application.Views.Page({
        model: model,
        template: _('<span>{{message}}</span>').template()
      });
    });
    it('can activate', function() {
      return expect(view).to.respondTo('activate');
    });
    it('can deactivate', function() {
      return expect(view).to.respondTo('deactivate');
    });
    return it('renders model attributes', function() {
      return expect(view.render().$el.html()).to.contain(model.get('message'));
    });
  });

}).call(this);
