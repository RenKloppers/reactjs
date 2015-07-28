var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated
var controller;
(function (controller) {
    var LogModelUpdateCommand = (function (_super) {
        __extends(LogModelUpdateCommand, _super);
        function LogModelUpdateCommand() {
            _super.apply(this, arguments);
            this.parent = null;
            this.$IBowlingGameRollModel = null;
        }
        LogModelUpdateCommand.prototype.execute = function () {
            D.log("Model changed", this.parent, this.$IBowlingGameRollModel);
        };
        return LogModelUpdateCommand;
    })(origami.mvc.controller.Command);
    controller.LogModelUpdateCommand = LogModelUpdateCommand;
})(controller || (controller = {}));
//# sourceMappingURL=LogModelUpdateCommand.js.map