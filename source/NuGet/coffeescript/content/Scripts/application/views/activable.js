(function() {
  var App, Views, animationDuration, exports;

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  animationDuration = 400;

  Views.Activable = {
    activate: function() {
      var animate, el,
        _this = this;
      this.clearAnimationTimer();
      el = this.$el;
      animate = function() {
        return el.show().css({
          marginLeft: el.outerWidth()
        }).hide().show(function() {
          return el.animate({
            marginLeft: 0
          }, animationDuration, function() {
            _this.animationTimer = void 0;
            return typeof _this.onActivate === "function" ? _this.onActivate() : void 0;
          });
        });
      };
      return this.animationTimer = _(animate).defer();
    },
    deactivate: function() {
      if (typeof this.onDeactivate === "function") {
        this.onDeactivate();
      }
      this.$el.hide();
      return this.clearAnimationTimer();
    },
    clearAnimationTimer: function() {
      if (this.animationTimer) {
        clearTimeout(this.animationTimer);
      }
      return this.animationTimer = void 0;
    }
  };

}).call(this);
