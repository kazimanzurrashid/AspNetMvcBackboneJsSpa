var Application;

(function (_, Application) {
    var Views = Application.Views || (Application.Views = {});
    
    Views.Activable = {

        activate: function () {
            var self = this;
            var el = this.$el;
            this.clearAnimationTimer();
            this.animationTimer = _.defer(function () {
                el.show()
                    .css({ marginLeft: el.outerWidth() })
                    .hide()
                    .show(function() {
                        el.animate({ marginLeft: 0 }, 400, function () {
                            self.animationTimer = void(0);
                            if (_.isFunction(self.onActivate)) {
                                self.onActivate();
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

})(_, Application || (Application = {}));
