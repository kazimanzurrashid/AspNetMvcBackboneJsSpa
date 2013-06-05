var expect = chai.expect;

describe('Models.ForgotPassword', function() {
    var forgotPassword;

    beforeEach(function() {
        forgotPassword = new Application.Models.ForgotPassword();
    });

    describe('#defaults', function() {
        it('has email', function() {
            expect(forgotPassword.defaults()).to.have.property('email');
        });
    });

    describe('#urlRoot', function() {
        it('is set', function() {
            expect(forgotPassword.urlRoot()).to.exist;
        });
    });

    describe('validation', function() {

        describe('valid', function() {
            beforeEach(function () {
                forgotPassword.set({
                    email: 'user@example.com'
                });
            });

            it('is ok', function() {
                expect(forgotPassword.isValid()).to.be.ok;
            });
        });

        describe('invalid', function() {

            describe('email', function() {

                describe('missing', function() {
                    it('is invalid', function() {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });

                describe('blank', function() {
                    beforeEach(function() {
                        forgotPassword.set({
                            email: ''
                        });
                    });

                    it('is invalid', function() {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });

                describe('incorrect format', function() {
                    beforeEach(function() {
                        forgotPassword.set({
                            email: 'foo-bar'
                        });
                    });

                    it('is invalid', function() {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });
            });
        });
    });
});