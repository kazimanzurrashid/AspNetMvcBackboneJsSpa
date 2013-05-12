/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>

/// <reference path='../../helpers.ts'/>

/// <reference path="../../../application/models/forgotpassword.ts" />

var expect = chai.expect;

describe('Models.ForgotPassword', () => {

    var forgotPassword: Application.Models.ForgotPassword;

    beforeEach(() => forgotPassword = new Application.Models.ForgotPassword);

    describe('#defaults', () => {
        it('has email', () => {
            expect(forgotPassword.defaults()).to.have.property('email');
        });
    });

    describe('#urlRoot', () => {
        it('is set', () => {
            expect(forgotPassword.urlRoot()).to.exist;
        });
    });

    describe('validation', () => {

        describe('valid', () => {
            beforeEach(() => forgotPassword.set({
                email: 'user@example.com'
            }));
            
            it('is ok', () => {
                expect(forgotPassword.isValid()).to.be.ok;
            });
        });

        describe('invalid', () => {

            describe('email', () => {
                describe('missing', () => {
                    it('is invalid', () => {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });

                describe('blank', () => {
                    beforeEach(() => forgotPassword.set({
                        email: ''
                    }));

                    it('is invalid', () => {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });

                describe('incorrect format', () => {
                    beforeEach(() => forgotPassword.set({
                        email: 'foo-bar'
                    }));

                    it('is invalid', () => {
                        expect(forgotPassword.isValid()).to.not.be.ok;
                        expect(forgotPassword.validationError)
                            .to.have.property('email');
                    });
                });
            });
        });
    });
});