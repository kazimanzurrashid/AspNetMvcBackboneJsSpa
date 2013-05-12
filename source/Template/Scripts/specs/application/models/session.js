var expect = this.chai.expect;
describe('Models.Session', function () {
    var session;
    beforeEach(function () {
        return session = new Application.Models.Session();
    });
    describe('#defaults', function () {
        it('has email', function () {
            expect(session.defaults()).to.have.property('email');
        });
        it('has password', function () {
            expect(session.defaults()).to.have.property('password');
        });
        it('has rememberMe', function () {
            expect(session.defaults()).to.have.property('rememberMe');
        });
    });
    describe('#urlRoot', function () {
        it('is set', function () {
            expect(session.urlRoot()).to.exist;
        });
    });
    describe('validation', function () {
        describe('valid', function () {
            beforeEach(function () {
                return session.set({
                    email: 'user@example.com',
                    password: '$ecre8'
                });
            });
            it('is ok', function () {
                expect(session.isValid()).to.be.ok;
            });
        });
        describe('invalid', function () {
            describe('email', function () {
                describe('missing', function () {
                    beforeEach(function () {
                        return session.set({
                            password: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(session.isValid()).to.not.be.ok;
                        expect(session.validationError).to.have.property('email');
                    });
                });
                describe('blank', function () {
                    beforeEach(function () {
                        return session.set({
                            email: '',
                            password: '$ecre8'
                        });
                    });
                    it('is invalid', function () {
                        expect(session.isValid()).to.not.be.ok;
                        expect(session.validationError).to.have.property('email');
                    });
                });
            });
            describe('password', function () {
                describe('missing', function () {
                    beforeEach(function () {
                        return session.set({
                            email: 'user@example.com'
                        });
                    });
                    it('is invalid', function () {
                        expect(session.isValid()).to.not.be.ok;
                        expect(session.validationError).to.have.property('password');
                    });
                });
                describe('blank', function () {
                    beforeEach(function () {
                        return session.set({
                            email: 'user@example.com',
                            password: ''
                        });
                    });
                    it('is invalid', function () {
                        expect(session.isValid()).to.not.be.ok;
                        expect(session.validationError).to.have.property('password');
                    });
                });
            });
        });
    });
});
