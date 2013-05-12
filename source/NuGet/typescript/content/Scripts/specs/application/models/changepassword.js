var expect = this.chai.expect;
describe('Models.ChangePassword', function () {
    var changePassword;
    beforeEach(function () {
        return changePassword = new Application.Models.ChangePassword();
    });
    describe('#defaults', function () {
        it('has oldPassword', function () {
            expect(changePassword.defaults()).to.have.property('oldPassword');
        });
        it('has newPassword', function () {
            expect(changePassword.defaults()).to.have.property('newPassword');
        });
        it('has confirmPassword', function () {
            expect(changePassword.defaults()).to.have.property('confirmPassword');
        });
    });
    describe('#urlRoot', function () {
        it('is set', function () {
            expect(changePassword.urlRoot()).to.exist;
        });
    });
    describe('validation', function () {
        describe('valid', function () {
            beforeEach(function () {
                return changePassword.set({
                    oldPassword: 'secret',
                    newPassword: '$ecre8',
                    confirmPassword: '$ecre8'
                });
            });
            it('is ok', function () {
                expect(changePassword.isValid()).to.be.ok;
            });
        });
        describe('invalid', function () {
            describe('oldPassword', function () {
                describe('missing', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            newPassword: '$ecre8',
                            confirmPassword: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('oldPassword');
                    });
                });
                describe('blank', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: '',
                            newPassword: '$ecre8',
                            confirmPassword: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('oldPassword');
                    });
                });
            });
            describe('newPassword', function () {
                describe('missing', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            confirmPassword: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('newPassword');
                    });
                });
                describe('blank', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: '',
                            confirmPassword: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('newPassword');
                    });
                });
                describe('less than minimum length', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: repeatString(5),
                            confirmPassword: repeatString(5)
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('newPassword');
                    });
                });
                describe('more than maximum length', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: repeatString(65),
                            confirmPassword: repeatString(65)
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('newPassword');
                    });
                });
            });
            describe('confirmPassword', function () {
                describe('missing', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('confirmPassword');
                    });
                });
                describe('blank', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: '$ecre8',
                            confirmPassword: ''
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('confirmPassword');
                    });
                });
                describe('do not match', function () {
                    beforeEach(function () {
                        return changePassword.set({
                            oldPassword: 'secret',
                            newPassword: '$ecre8',
                            confirmPassword: 'foo-bar'
                        });
                    });
                    it('is invalid', function () {
                        expect(changePassword.isValid()).to.not.be.ok;
                        expect(changePassword.validationError).to.have.property('confirmPassword');
                    });
                });
            });
        });
    });
});
