/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>

/// <reference path="../../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../../typings/backbone/backbone.d.ts" />

/// <reference path="../../../application/views/page.ts" />

var expect = chai.expect;

describe('Views.Page', () => {
    var model: Backbone.Model;
    var view: Application.Views.Page;

    before(() => {
        model = new Backbone.Model({
            message: 'Hello world'
        });
        view = new Application.Views.Page({
            model: model,
            template: _.template('<span>{{message}}</span>')
        });
    });

    it('can activate', () => {
        expect(view).to.respondTo('activate');
    });

    it('can deactivate', () => {
        expect(view).to.respondTo('deactivate')
    });

    it('renders model attributes', () => {
        expect(view.render().$el.html()).to.contain(model.get('message'));
    });
});