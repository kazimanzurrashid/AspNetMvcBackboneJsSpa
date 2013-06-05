var expect = chai.expect;

describe('Models.User', function() {
    var user;

    beforeEach(function() {
        user = new Application.Models.User();
    });

    describe('#defaults', function() {
        it('has email', function() {
            expect(user.defaults()).to.have.property('email');
        });
        it('has password', function() {
            expect(user.defaults()).to.have.property('password');
        });
        it('has confirmPassword', function() {
            expect(user.defaults()).to.have.property('confirmPassword');
        });
    });

    describe('#urlRoot', function() {
        it('is set', function() {
            expect(user.urlRoot()).to.exist;
        });
    });

    describe('validation', function() {
        describe('valid', function() {
            beforeEach(function() {
                user.set({
                    email: 'user@example.com',
                    password: '$ecre8',
                    confirmPassword: '$ecre8'
                });
            });
            it('is ok', function() {
                expect(user.isValid()).to.be.ok;
            });
        });

        describe('invalid', function() {

            describe('email', function() {

                describe('missing', function() {
                    beforeEach(function() {
                        user.set({
                            password: '$ecre8',
                            confirmPassword: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError).to.have.property('email');
                    });
                });

                describe('blank', function() {
                    beforeEach(function() {
                        user.set({
                            email: '',
                            password: '$ecre8',
                            confirmPassword: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError).to.have.property('email');
                    });
                });

                describe('incorrect format', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'foo-bar',
                            password: '$ecre8',
                            confirmPassword: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError).to.have.property('email');
                    });
                });
            });

            describe('password', function() {

                describe('missing', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            confirmPassword: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('password');
                    });
                });

                describe('blank', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: '',
                            confirmPassword: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('password');
                    });
                });

                describe('less than minimum length', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: repeatString(5),
                            confirmPassword: repeatString(5)
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('password');
                    });
                });

                describe('more than maximum length', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: repeatString(65),
                            confirmPassword: repeatString(65)
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('password');
                    });
                });
            });

            describe('confirmPassword', function() {

                describe('missing', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: '$ecre8'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError).to.have.property('confirmPassword');
                    });
                });

                describe('blank', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: '$ecre8',
                            confirmPassword: ''
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('confirmPassword');
                    });
                });

                describe('do not match', function() {
                    beforeEach(function() {
                        user.set({
                            email: 'user@example.com',
                            password: '$ecre8',
                            confirmPassword: 'foo-bar'
                        });
                    });

                    it('is invalid', function() {
                        expect(user.isValid()).to.not.be.ok;
                        expect(user.validationError)
                            .to.have.property('confirmPassword');
                    });
                });
            });
        });
    });
});