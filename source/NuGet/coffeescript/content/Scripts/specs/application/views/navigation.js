(function() {
  var $, expect;

  expect = this.chai.expect;

  $ = jQuery;

  describe('Views.Navigation', function() {
    var view;
    view = null;
    before(function() {
      fixtures.load('/navigation.html');
      return view = new Application.Views.Navigation({
        el: $(fixtures.window().document.body).find('#navigation')
      });
    });
    describe('#select', function() {
      beforeEach(function() {
        return view.select('test-1');
      });
      return it('adds css class active', function() {
        return expect(view.$('li').first()).to.have["class"]('active');
      });
    });
    describe('#deselectAll', function() {
      beforeEach(function() {
        view.select('test-1');
        return view.deselectAll();
      });
      return it('removes css class active', function() {
        return expect(view.$('li').first()).to.not.have["class"]('active');
      });
    });
    describe('application events', function() {
      var stubbedTrigger;
      stubbedTrigger = null;
      beforeEach(function() {
        return stubbedTrigger = sinon.stub(Application.events, 'trigger');
      });
      describe('menu item clicks', function() {
        describe('has data-command attribute', function() {
          beforeEach(function() {
            return view.$('a').first().trigger('click');
          });
          return it('triggers the event', function() {
            return expect(stubbedTrigger).to.have.been.calledWith('dummy-event');
          });
        });
        return describe('no data-command attribute', function() {
          beforeEach(function() {
            return view.$('a').last().trigger('click');
          });
          return it('does not trigger any event', function() {
            return expect(stubbedTrigger).to.not.have.been.called;
          });
        });
      });
      return afterEach(function() {
        return stubbedTrigger.restore();
      });
    });
    return after(function() {
      view.undelegateEvents();
      view.stopListening();
      return fixtures.cleanUp();
    });
  });

}).call(this);
