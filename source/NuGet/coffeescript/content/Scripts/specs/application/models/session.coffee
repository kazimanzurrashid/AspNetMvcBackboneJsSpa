expect = @chai.expect

describe 'Models.Session', ->
  session = null

  beforeEach -> session = new Application.Models.Session

  describe '#defaults', ->

    it 'has email', -> expect(session.defaults()).to.have.property 'email'

    it 'has password', ->
      expect(session.defaults()).to.have.property 'password'

    it 'has rememberMe', ->
      expect(session.defaults()).to.have.property 'rememberMe'

  describe '#urlRoot', ->
    it 'is set', -> expect(session.urlRoot()).to.exist

  describe 'validation', ->

    describe 'valid', ->
      beforeEach ->
        session.set
          email: 'user@example.com'
          password: '$ecre8'

      it 'is ok', -> expect(session.isValid()).to.be.ok

    describe 'invalid', ->

      describe 'email', ->

        describe 'missing', ->
          beforeEach -> session.set password: '$ecre8'

          it 'is invalid', ->
            expect(session.isValid()).to.not.be.ok
            expect(session.validationError).to.have.property 'email'

        describe 'blank', ->
          beforeEach ->
            session.set
              email: '',
              password: '$ecre8'

          it 'is invalid', ->
            expect(session.isValid()).to.not.be.ok
            expect(session.validationError).to.have.property 'email'

      describe 'password', ->

        describe 'missing', ->
          beforeEach -> session.set email: 'user@example.com'

          it 'is invalid', ->
            expect(session.isValid()).to.not.be.ok
            expect(session.validationError).to.have.property 'password'

        describe 'blank', ->
          beforeEach ->
            session.set
              email: 'user@example.com',
              password: ''

          it 'is invalid', ->
            expect(session.isValid()).to.not.be.ok
            expect(session.validationError).to.have.property 'password'