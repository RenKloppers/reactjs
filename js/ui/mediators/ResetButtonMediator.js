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
        var ResetButtonMediator = (function (_super) {
            __extends(ResetButtonMediator, _super);
            function ResetButtonMediator() {
                _super.call(this);
                this.$IBowlingGameRollModel = null;
                this.count = 0;
            }
            ResetButtonMediator.prototype.onRegister = function () {
                this.subscribeTo(this.view.onResetSelected, this.$IBowlingGameRollModel.resetGame, this.$IBowlingGameRollModel);
            };
            ResetButtonMediator.prototype.onRemove = function () {
            };
            Object.defineProperty(ResetButtonMediator.prototype, "view", {
                get: function () {
                    return this.viewComponent;
                },
                enumerable: true,
                configurable: true
            });
            return ResetButtonMediator;
        })(_view.Mediator);
        mediator.ResetButtonMediator = ResetButtonMediator;
    })(mediator = ui.mediator || (ui.mediator = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ResetButtonMediator.js.map