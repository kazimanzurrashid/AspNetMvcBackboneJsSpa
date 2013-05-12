/// <reference path='../../../typings/mocha/mocha.d.ts'/>
/// <reference path='../../../typings/chai/chai.d.ts'/>

/// <reference path='../../helpers.ts'/>

/// <reference path="../../../application/models/changepassword.ts" />

var expect = chai.expect;

describe('Models.ChangePassword', () => {

    var changePassword: Application.Models.ChangePassword;

    beforeEach(() => changePassword = new Application.Models.ChangePassword);

    describe('#defaults', () => {
        it('has oldPassword', () => {
            expect(changePassword.defaults()).to.have.property('oldPassword');
        });

        it('has newPassword', () => {
            expect(changePassword.defaults()).to.have.property('newPassword');
        });

        it('has confirmPassword', () => {
            expect(changePassword.defaults())
                .to.have.property('confirmPassword');
        });
    });

    describe('#urlRoot', () => {
        it('is set', () => {
            expect(changePassword.urlRoot()).to.exist;
        });
    });

    describe('validation', () => {

        describe('valid', () => {
            beforeEach(() => changePassword.set({
                oldPassword: 'secret',
                newPassword: '$ecre8',
                confirmPassword: '$ecre8'
            }));

            it('is ok', () => {
                expect(changePassword.isValid()).to.be.ok;
            });
        });

        describe('invalid', () => {

            describe('oldPassword', () => {

                describe('missing', () => {
                    beforeEach(() => changePassword.set({
                        newPassword: '$ecre8',
                        confirmPassword: '$ecre8'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('oldPassword');
                    });
                });

                describe('blank', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: '',
                        newPassword: '$ecre8',
                        confirmPassword: '$ecre8'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('oldPassword');
                    });
                });
            });

            describe('newPassword', () => {

                describe('missing', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        confirmPassword: '$ecre8'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('newPassword');
                    });
                });

                describe('blank', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword: '',
                        confirmPassword: '$ecre8'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('newPassword');
                    });
                });

                describe('less than minimum length', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword: repeatString(5),
                        confirmPassword: repeatString(5)
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('newPassword');
                    });
                });

                describe('more than maximum length', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword:repeatString(65),
                        confirmPassword: repeatString(65)
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('newPassword');
                    });
                });
            });

            describe('confirmPassword', () => {

                describe('missing', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword: '$ecre8'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('confirmPassword');
                    });
                });

                describe('blank', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword: '$ecre8',
                        confirmPassword: ''
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('confirmPassword');
                    });
                });

                describe('do not match', () => {
                    beforeEach(() => changePassword.set({
                        oldPassword: 'secret',
                        newPassword: '$ecre8',
                        confirmPassword: 'foo-bar'
                    }));

                    it('is invalid', () => {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError)
                            .to.have.property('confirmPassword');
                    });
                });
            });
        });
    });
});