(function() {
  var expect;

  expect = this.chai.expect;

  describe('Models.Validation', function() {
    var Validation;

    Validation = Application.Models.Validation;
    describe('.addError', function() {
      var errors;

      errors = null;
      beforeEach(function() {
        errors = {};
        return Validation.addError(errors, 'name', 'Name is required.');
      });
      it('creates new attribute', function() {
        return expect(errors.name).to.exist;
      });
      return it('appends new message', function() {
        return expect(errors.name).to.include('Name is required.');
      });
    });
    describe('.isValidEmailFormat', function() {
      describe('valid', function() {
        return it('returns true', function() {
          return expect(Validation.isValidEmailFormat('user@example.com')).to.be.ok;
        });
      });
      return describe('invalid', function() {
        return it('returns false', function() {
          return expect(Validation.isValidEmailFormat('foo-bar')).to.not.be.ok;
        });
      });
    });
    return describe('.isValidPasswordLength', function() {
      describe('valid', function() {
        return it('returns true', function() {
          return expect(Validation.isValidPasswordLength('$ecre8')).to.be.ok;
        });
      });
      return describe('invalid', function() {
        describe('less than six characters', function() {
          return it('returns false', function() {
            return expect(Validation.isValidPasswordLength(repeatString(5))).to.not.be.ok;
          });
        });
        return describe('more than sixty four characters', function() {
          return it('returns false', function() {
            return expect(Validation.isValidPasswordLength(repeatString(65))).to.not.be.ok;
          });
        });
      });
    });
  });

}).call(this);
