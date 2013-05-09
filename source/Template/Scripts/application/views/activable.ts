/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />

module Application.Views {
    export interface IActivable {
        activate(): void;
        deactivate(): void;
    }

    var animationDuration = 400;

    export var Activable = {
        activate: function () {
            this.clearAnimationTimer();
            this.animationTimer = _.defer(() => {
                var el = <JQuery>this.$el;
                el.show()
                  .css({ marginLeft: el.outerWidth() })
                  .hide()
                  .show(() => {
                      el.animate({ marginLeft: 0 }, animationDuration, () => {
                          this.animationTimer = void(0);
                          if (_.isFunction(this.onActivate)) {
                              this.onActivate();
                          }
                      });
                  });
            });
        },

        deactivate: function () {
            if (_.isFunction(this.onDeactivate)) {
                this.onDeactivate();
            }
            this.$el.hide();
            this.clearAnimationTimer();
        },

        clearAnimationTimer: function () {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
                this.animationTimer = void(0);
            }
        }
    };
}