(function() {
  var expect;

  expect = this.chai.expect;

  describe('Views.helpers', function() {
    var Helpers;

    Helpers = Application.Views.Helpers;
    describe('.hasModelErrors', function() {
      describe('status 400', function() {
        return it('returns true', function() {
          return expect(Helpers.hasModelErrors({
            status: 400
          })).to.be.ok;
        });
      });
      return describe('status others', function() {
        return it('returns false', function() {
          return expect(Helpers.hasModelErrors({
            status: 500
          })).to.not.be.ok;
        });
      });
    });
    describe('.getModelErrors', function() {
      describe('empty response', function() {
        return it('returns nothing', function() {
          return expect(Helpers.getModelErrors({
            responseText: ''
          })).to.be.undefined;
        });
      });
      describe('invalid response', function() {
        return it('returns nothing', function() {
          return expect(Helpers.getModelErrors({
            responseText: '<html><body>Error</body></html>'
          })).to.be.undefined;
        });
      });
      describe('incorrect json response', function() {
        return it('returns nothing', function() {
          return expect(Helpers.getModelErrors({
            responseText: JSON.stringify({
              foo: 'bar'
            })
          })).to.be.undefined;
        });
      });
      describe('camel cased model state', function() {
        return it('returns errors', function() {
          return expect(Helpers.getModelErrors({
            responseText: JSON.stringify({
              modelState: {}
            })
          })).to.be.ok;
        });
      });
      describe('title cased model state', function() {
        return it('returns errors', function() {
          return expect(Helpers.getModelErrors({
            responseText: JSON.stringify({
              ModelState: {}
            })
          })).to.be.ok;
        });
      });
      return describe('lower cased model state', function() {
        return it('returns errors', function() {
          return expect(Helpers.getModelErrors({
            responseText: JSON.stringify({
              modelstate: {}
            })
          })).to.be.ok;
        });
      });
    });
    return describe('.subscribeModelInvalidEvent', function() {
      var model, spiedOn, stubbedShowFieldErrors;

      stubbedShowFieldErrors = null;
      model = null;
      spiedOn = null;
      before(function() {
        var el;

        el = $('<form/>');
        stubbedShowFieldErrors = sinon.stub(el, 'showFieldErrors', function() {});
        model = new Backbone.Model;
        spiedOn = sinon.spy(model, 'on');
        Helpers.subscribeModelInvalidEvent(model, el);
        return model.trigger('invalid');
      });
      it('subscribes to model invalid event', function() {
        return expect(spiedOn).to.have.been.calledWith('invalid');
      });
      it('shows field errors', function() {
        return expect(stubbedShowFieldErrors).to.have.been.calledOnce;
      });
      return after(function() {
        stubbedShowFieldErrors.restore();
        return spiedOn.restore();
      });
    });
  });

}).call(this);
