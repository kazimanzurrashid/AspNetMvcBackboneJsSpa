(function() {
  var expect;

  expect = this.chai.expect;

  describe('Models.ForgotPassword', function() {
    var forgotPassword;
    forgotPassword = null;
    beforeEach(function() {
      return forgotPassword = new Application.Models.ForgotPassword;
    });
    describe('#defaults', function() {
      return it('has email', function() {
        return expect(forgotPassword.defaults()).to.have.property('email');
      });
    });
    describe('#urlRoot', function() {
      return it('is set', function() {
        return expect(forgotPassword.urlRoot()).to.exist;
      });
    });
    return describe('validation', function() {
      describe('valid', function() {
        beforeEach(function() {
          return forgotPassword.set({
            email: 'user@example.com'
          });
        });
        return it('is ok', function() {
          return expect(forgotPassword.isValid()).to.be.ok;
        });
      });
      return describe('invalid', function() {
        return describe('email', function() {
          describe('missing', function() {
            return it('is invalid', function() {
              expect(forgotPassword.isValid()).to.not.be.ok;
              return expect(forgotPassword.validationError).to.have.property('email');
            });
          });
          describe('blank', function() {
            beforeEach(function() {
              return forgotPassword.set({
                email: ''
              });
            });
            return it('is invalid', function() {
              expect(forgotPassword.isValid()).to.not.be.ok;
              return expect(forgotPassword.validationError).to.have.property('email');
            });
          });
          return describe('incorrect format', function() {
            beforeEach(function() {
              return forgotPassword.set({
                email: 'foo-bar'
              });
            });
            return it('is invalid', function() {
              expect(forgotPassword.isValid()).to.not.be.ok;
              return expect(forgotPassword.validationError).to.have.property('email');
            });
          });
        });
      });
    });
  });

}).call(this);
