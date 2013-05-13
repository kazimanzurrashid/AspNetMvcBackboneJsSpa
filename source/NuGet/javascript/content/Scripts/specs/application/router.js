var expect = chai.expect;

describe('Router', function() {
    var templete;
    var container;
    var stubbedNavigationView;
    var stubbedPageView;
    var stubbedNotFoundView;
    var router;

    before(function() {
        templete = $('<div/>', {
            id: 'page-template'
        }).appendTo('body').append('<p/>');

        container = $('<div/>', {
            id: 'container'
        }).appendTo('body');

        var navigationView = {
            select: function(menu) {
            },
            deselectAll: function() {
            }
        };

        var contentView = function() {
            this.$el = $('<div/>');
        };

        contentView.prototype = {
            render: function() { return this; },
            activate: function() {
            },
            deactivate: function() {
            }
        };

        stubbedNavigationView = sinon.stub(Application.Views, 'Navigation').returns(navigationView);
        stubbedPageView = sinon.stub(Application.Views, 'Page', function() {
            return new contentView();
        });

        stubbedNotFoundView = sinon.stub(Application.Views, 'NotFound', function() {
            return new contentView();
        });

        router = new Application.Router();
    });

    describe('new', function() {
        it('creates navigation view', function() {
            expect(router.navigationView).to.exist;
        });

        it('creates home view', function() {
            expect(router.homeView).to.exist;
        });

        it('creates about view', function() {
            expect(router.homeView).to.exist;
        });

        it('creates not found view', function() {
            expect(router.notFoundView).to.exist;
        });
    });

    describe('navigation', function() {
        var stubbedActivate;

        before(function() {
            stubbedActivate = sinon.stub(router, 'activate', function() {
            });
            router.currentView = undefined;
        });

        describe('#about', function() {
            before(function() {
                return router.about();
            });

            it('activates home view', function() {
                expect(stubbedActivate).to.have.been.calledWith(router.aboutView, 'about');
            });

            after(function() {
                router.currentView = undefined;
                stubbedActivate.reset();
            });
        });

        describe('#home', function() {
            before(function() {
                return router.home();
            });

            it('activates home view', function() {
                expect(stubbedActivate).to.have.been.calledWith(router.homeView, 'home');
            });

            after(function() {
                router.currentView = undefined;
                stubbedActivate.reset();
            });
        });

        describe('#notFound', function() {
            before(function() {
                return router.notFound();
            });

            it('activates not found view', function() {
                expect(stubbedActivate).to.have.been.calledWith(router.notFoundView);
            });

            after(function() {
                router.currentView = undefined;
                stubbedActivate.reset();
            });
        });

        after(function() {
            return stubbedActivate.restore();
        });
    });

    describe('#activate', function() {
        describe('other view', function() {
            var spiedHomeViewDeactivate;
            var spiedAboutViewActivate;
            var spiedSelectMenu;

            before(function() {
                spiedSelectMenu = sinon.spy(router.navigationView, 'select');
                spiedHomeViewDeactivate = sinon.spy(router.homeView, 'deactivate');
                spiedAboutViewActivate = sinon.spy(router.aboutView, 'activate');
                router.currentView = router.homeView;
                router.activate(router.aboutView, 'about');
            });

            it('deactivates current view', function() {
                expect(spiedHomeViewDeactivate).to.have.been.calledOnce;
            });

            it('activates other view', function() {
                expect(spiedAboutViewActivate).to.have.been.calledOnce;
            });

            it('selects other view menu', function() {
                expect(spiedSelectMenu).to.have.been.calledWith('about');
            });

            it('sets other view as current view', function() {
                expect(router.currentView).to.equal(router.aboutView);
            });

            after(function() {
                spiedSelectMenu.restore();
                spiedHomeViewDeactivate.restore();
                spiedAboutViewActivate.restore();
            });
        });

        describe('same view', function() {
            var spiedHomeViewDeactivate;
            var spiedSelectMenu;

            before(function() {
                spiedSelectMenu = sinon.spy(router.navigationView, 'select');
                spiedHomeViewDeactivate = sinon.spy(router.homeView, 'deactivate');
                router.currentView = router.homeView;
                router.activate(router.homeView, 'home');
            });

            it('does nothing', function() {
                expect(spiedHomeViewDeactivate).to.not.have.been.called;
                expect(spiedSelectMenu).to.not.have.been.called;
                expect(router.currentView).to.equal(router.homeView);
            });

            after(function() {
                spiedSelectMenu.restore();
                spiedHomeViewDeactivate.restore();
            });
        });

        describe('not found view', function() {
            var spiedDeselectMenu;

            before(function() {
                spiedDeselectMenu = sinon.spy(router.navigationView, 'deselectAll');
                router.currentView = router.homeView;
                router.activate(router.notFoundView);
            });

            it('deselects menu', function() {
                expect(spiedDeselectMenu).to.have.been.calledOnce;
            });

            after(function() {
                spiedDeselectMenu.restore();
            });
        });
    });

    after(function() {
        stubbedNavigationView.restore();
        stubbedPageView.restore();
        stubbedNotFoundView.restore();
        container.remove();
        templete.remove();
    });
});