/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>
/// <reference path='../../../typings/sinon/sinon-1.5.d.ts'/>
/// <reference path='../../../typings/sinon-chai/sinon-chai.d.ts'/>

/// <reference path='../../../typings/jquery/jquery.d.ts'/>
/// <reference path='../../../typings/backbone/backbone.d.ts'/>

/// <reference path="../../../application/views/helpers.ts" />

var expect = chai.expect;

describe('Views.helpers', () => {
    var Helpers = Application.Views.Helpers;

    describe('.hasModelErrors', () => {
        describe('status 400', () => {
            it('returns true', () => {
                expect(Helpers.hasModelErrors({ status: 400 })).to.be.ok;
            });
        });

        describe('status others', () => {
            it('returns false', () => {
                expect(Helpers.hasModelErrors({ status: 500 })).to.not.be.ok;
            });
        });
    });

    describe('.getModelErrors', () => {
        describe('empty response', () => {
            it('returns nothing', () => {
                expect(Helpers.getModelErrors({
                    responseText: ''
                })).to.be.undefined;
            });
        });

        describe('invalid response', () => {
            it('returns nothing', () => {
                expect(Helpers.getModelErrors({
                    responseText: '<html><body>Error</body></html>'
                })).to.be.undefined;
            });
        });

        describe('incorrect json response', () => {
            it('returns nothing', () => {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({ foo: 'bar' })
                })).to.be.undefined;
            });
        });

        describe('camel cased model state', () => {
            it('returns errors', () => {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({ modelState: {} })
                })).to.be.ok;
            });
        });

        describe('title cased model state', () => {
            it('returns errors', () => {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({ ModelState: {} })
                })).to.be.ok;
            });
        });

        describe('lower cased model state', () => {
            it('returns errors', () => {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({ modelstate: {} })
                })).to.be.ok;
            });
        });
    });

    describe('.subscribeModelInvalidEvent', () => {
        var stubbedShowFieldErrors: SinonStub;
        var model: Backbone.Model;
        var spiedOn: SinonSpy;

        before(() => {
            var el = $('<form/>');
            stubbedShowFieldErrors = sinon.stub(
                el,
                'showFieldErrors',
                () => { });

            model = new Backbone.Model
            spiedOn = sinon.spy(model, 'on');
            Helpers.subscribeModelInvalidEvent(model, el);
            model.trigger('invalid');
        });

        it('subscribes to model invalid event', () => {
            expect(spiedOn).to.have.been.calledWith('invalid');
        });

        it('shows field errors', () => {
            expect(stubbedShowFieldErrors).to.have.been.calledOnce;
        });

        after(() => {
            stubbedShowFieldErrors.restore();
            spiedOn.restore();
        });
    });
});