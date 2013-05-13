var expect = chai.expect;

describe('Views.Page', function() {
    var model;
    var view;

    before(function() {
        model = new Backbone.Model({
            message: 'Hello world'
        });
        view = new Application.Views.Page({
            model: model,
            template: _.template('<span>{{message}}</span>')
        });
    });

    it('can activate', function() {
        expect(view).to.respondTo('activate');
    });

    it('can deactivate', function() {
        expect(view).to.respondTo('deactivate');
    });

    it('renders model attributes', function() {
        expect(view.render().$el.html()).to.contain(model.get('message'));
    });
});