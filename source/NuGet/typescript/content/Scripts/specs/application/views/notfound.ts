/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>

/// <reference path="../../../application/views/notfound.ts" />

var expect = chai.expect;

describe('Views.NotFound', () => {
    var view: Application.Views.NotFound;

    before(() => view = new Application.Views.NotFound);

    it('can activate', () => {
        expect(view).to.respondTo('activate');
    });

    it('can deactivate', () => {
        expect(view).to.respondTo('deactivate')
    });
});