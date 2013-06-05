var expect = chai.expect;

describe('Models.Validation', function() {
    var Validation = Application.Models.Validation;

    describe('.addError', function() {
        var errors;

        beforeEach(function() {
            errors = { };
            Validation.addError(errors, 'name', 'Name is required.');
        });

        it('creates new attribute', function() {
            expect(errors.name).to.exist;
        });

        it('appends new message', function() {
            expect(errors.name).to.include('Name is required.');
        });
    });

    describe('.isValidEmailFormat', function() {

        describe('valid', function() {
            it('returns true', function() {
                expect(Validation.isValidEmailFormat('user@example.com'))
                    .to.be.ok;
            });
        });

        describe('invalid', function() {
            it('returns false', function() {
                expect(Validation.isValidEmailFormat('foo-bar'))
                    .to.not.be.ok;
            });
        });
    });

    describe('.isValidPasswordLength', function() {

        describe('valid', function() {
            it('returns true', function() {
                expect(Validation.isValidPasswordLength('$ecre8')).to.be.ok;
            });
        });

        describe('invalid', function() {

            describe('less than six characters', function() {
                it('returns false', function() {
                    expect(Validation.isValidPasswordLength(repeatString(5)))
                        .to.not.be.ok;
                });
            });

            describe('more than sixty four characters', function() {
                it('returns false', function() {
                    expect(Validation.isValidPasswordLength(repeatString(65)))
                        .to.not.be.ok;
                });
            });
        });
    });
});