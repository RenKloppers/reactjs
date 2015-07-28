///ts:ref=reference
/// <reference path="../../reference.ts"/> ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ui;
(function (ui) {
    var mediator;
    (function (mediator) {
        var _view = origami.mvc.view;
        var ButtonMediator = (function (_super) {
            __extends(ButtonMediator, _super);
            function ButtonMediator() {
                _super.call(this);
                this.$IBowlingGameRollModel = null;
                this.count = 0;
            }
            ButtonMediator.prototype.onRegister = function () {
                this.subscribeTo(this.view.onSwitchSelected, this.$IBowlingGameRollModel.rollBall, this.$IBowlingGameRollModel);
            };
            ButtonMediator.prototype.onRemove = function () {
            };
            Object.defineProperty(ButtonMediator.prototype, "view", {
                get: function () {
                    return this.viewComponent;
                },
                enumerable: true,
                configurable: true
            });
            return ButtonMediator;
        })(_view.Mediator);
        mediator.ButtonMediator = ButtonMediator;
    })(mediator = ui.mediator || (ui.mediator = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ButtonMediator.js.map