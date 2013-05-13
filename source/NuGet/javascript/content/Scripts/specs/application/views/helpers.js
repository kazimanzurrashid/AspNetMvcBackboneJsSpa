var expect = chai.expect;

describe('Views.helpers', function() {
    var Helpers = Application.Views.Helpers;

    describe('.hasModelErrors', function() {

        describe('status 400', function() {
            it('returns true', function() {
                expect(Helpers.hasModelErrors({
                    status: 400
                })).to.be.ok;
            });
        });

        describe('status others', function() {
            it('returns false', function() {
                expect(Helpers.hasModelErrors({
                    status: 500
                })).to.not.be.ok;
            });
        });
    });

    describe('.getModelErrors', function() {

        describe('empty response', function() {
            it('returns nothing', function() {
                expect(Helpers.getModelErrors({
                    responseText: ''
                })).to.be.undefined;
            });
        });

        describe('invalid response', function() {
            it('returns nothing', function() {
                expect(Helpers.getModelErrors({
                    responseText: '<html><body>Error</body></html>'
                })).to.be.undefined;
            });
        });

        describe('incorrect json response', function() {
            it('returns nothing', function() {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({
                        foo: 'bar'
                    })
                })).to.be.undefined;
            });
        });

        describe('camel cased model state', function() {
            it('returns errors', function() {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({
                        modelState: {
                            
                        }
                    })
                })).to.be.ok;
            });
        });

        describe('title cased model state', function() {
            it('returns errors', function() {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({
                        ModelState: {
                            
                        }
                    })
                })).to.be.ok;
            });
        });

        describe('lower cased model state', function() {
            it('returns errors', function() {
                expect(Helpers.getModelErrors({
                    responseText: JSON.stringify({
                        modelstate: {
                            
                        }
                    })
                })).to.be.ok;
            });
        });
    });

    describe('.subscribeModelInvalidEvent', function() {
        var stubbedShowFieldErrors;
        var model;
        var spiedOn;

        before(function() {
            var el = $('<form/>');
            stubbedShowFieldErrors = sinon.stub(
                el,
                'showFieldErrors',
                function () { });
            model = new Backbone.Model();
            spiedOn = sinon.spy(model, 'on');
            Helpers.subscribeModelInvalidEvent(model, el);
            model.trigger('invalid');
        });

        it('subscribes to model invalid event', function() {
            expect(spiedOn).to.have.been.calledWith('invalid');
        });
        it('shows field errors', function() {
            expect(stubbedShowFieldErrors).to.have.been.calledOnce;
        });

        after(function() {
            stubbedShowFieldErrors.restore();
            spiedOn.restore();
        });
    });
});