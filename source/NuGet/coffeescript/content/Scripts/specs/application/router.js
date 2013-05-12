(function() {
  var $, expect;

  expect = this.chai.expect;

  $ = jQuery;

  describe('Router', function() {
    var container, router, stubbedNavigationView, stubbedNotFoundView, stubbedPageView, templete;

    templete = null;
    container = null;
    stubbedNavigationView = null;
    stubbedPageView = null;
    stubbedNotFoundView = null;
    router = null;
    before(function() {
      var contentView, navigationView;

      templete = $('<div/>', {
        id: 'page-template'
      }).appendTo('body').append('<p/>');
      container = $('<div/>', {
        id: 'container'
      }).appendTo('body');
      navigationView = {
        select: function(menu) {},
        deselectAll: function() {}
      };
      contentView = (function() {
        function contentView() {}

        contentView.prototype.el = $('<div/>');

        contentView.prototype.render = function() {
          return this;
        };

        contentView.prototype.activate = function() {};

        contentView.prototype.deactivate = function() {};

        return contentView;

      })();
      stubbedNavigationView = sinon.stub(Application.Views, 'Navigation').returns(navigationView);
      stubbedPageView = sinon.stub(Application.Views, 'Page', function() {
        return new contentView;
      });
      stubbedNotFoundView = sinon.stub(Application.Views, 'NotFound', function() {
        return new contentView;
      });
      return router = new Application.Router;
    });
    describe('new', function() {
      it('creates navigation view', function() {
        return expect(router.navigationView).to.exist;
      });
      it('creates home view', function() {
        return expect(router.homeView).to.exist;
      });
      it('creates about view', function() {
        return expect(router.homeView).to.exist;
      });
      return it('creates not found view', function() {
        return expect(router.notFoundView).to.exist;
      });
    });
    describe('navigation', function() {
      var stubbedActivate;

      stubbedActivate = null;
      before(function() {
        stubbedActivate = sinon.stub(router, 'activate', function() {});
        return router.currentView = void 0;
      });
      describe('#about', function() {
        before(function() {
          return router.about();
        });
        it('activates home view', function() {
          return expect(stubbedActivate).to.have.been.calledWith(router.aboutView, 'about');
        });
        return after(function() {
          router.currentView = void 0;
          return stubbedActivate.reset();
        });
      });
      describe('#home', function() {
        before(function() {
          return router.home();
        });
        it('activates home view', function() {
          return expect(stubbedActivate).to.have.been.calledWith(router.homeView, 'home');
        });
        return after(function() {
          router.currentView = void 0;
          return stubbedActivate.reset();
        });
      });
      describe('#notFound', function() {
        before(function() {
          return router.notFound();
        });
        it('activates not found view', function() {
          return expect(stubbedActivate).to.have.been.calledWith(router.notFoundView);
        });
        return after(function() {
          router.currentView = void 0;
          return stubbedActivate.reset();
        });
      });
      return after(function() {
        return stubbedActivate.restore();
      });
    });
    describe('#activate', function() {
      describe('other view', function() {
        var spiedAboutViewActivate, spiedHomeViewDeactivate, spiedSelectMenu;

        spiedHomeViewDeactivate = null;
        spiedAboutViewActivate = null;
        spiedSelectMenu = null;
        before(function() {
          spiedSelectMenu = sinon.spy(router.navigationView, 'select');
          spiedHomeViewDeactivate = sinon.spy(router.homeView, 'deactivate');
          spiedAboutViewActivate = sinon.spy(router.aboutView, 'activate');
          router.currentView = router.homeView;
          return router.activate(router.aboutView, 'about');
        });
        it('deactivates current view', function() {
          return expect(spiedHomeViewDeactivate).to.have.been.calledOnce;
        });
        it('activates other view', function() {
          return expect(spiedAboutViewActivate).to.have.been.calledOnce;
        });
        it('selects other view menu', function() {
          return expect(spiedSelectMenu).to.have.been.calledWith('about');
        });
        it('sets other view as current view', function() {
          return expect(router.currentView).to.equal(router.aboutView);
        });
        return after(function() {
          spiedSelectMenu.restore();
          spiedHomeViewDeactivate.restore();
          return spiedAboutViewActivate.restore();
        });
      });
      describe('same view', function() {
        var spiedHomeViewDeactivate, spiedSelectMenu;

        spiedHomeViewDeactivate = null;
        spiedSelectMenu = null;
        before(function() {
          spiedSelectMenu = sinon.spy(router.navigationView, 'select');
          spiedHomeViewDeactivate = sinon.spy(router.homeView, 'deactivate');
          router.currentView = router.homeView;
          return router.activate(router.homeView, 'home');
        });
        it('does nothing', function() {
          expect(spiedHomeViewDeactivate).to.not.have.been.called;
          expect(spiedSelectMenu).to.not.have.been.called;
          return expect(router.currentView).to.equal(router.homeView);
        });
        return after(function() {
          spiedSelectMenu.restore();
          return spiedHomeViewDeactivate.restore();
        });
      });
      return describe('not found view', function() {
        var spiedDeselectMenu;

        spiedDeselectMenu = null;
        before(function() {
          spiedDeselectMenu = sinon.spy(router.navigationView, 'deselectAll');
          router.currentView = router.homeView;
          return router.activate(router.notFoundView);
        });
        it('deselects menu', function() {
          return expect(spiedDeselectMenu).to.have.been.calledOnce;
        });
        return after(function() {
          return spiedDeselectMenu.restore();
        });
      });
    });
    return after(function() {
      stubbedNavigationView.restore();
      stubbedPageView.restore();
      stubbedNotFoundView.restore();
      container.remove();
      return templete.remove();
    });
  });

}).call(this);
