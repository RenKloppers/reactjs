///ts:ref=reference.ts
/// <reference path="../reference.ts"/> ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controller;
(function (controller) {
    var SetupViewCommand = (function (_super) {
        __extends(SetupViewCommand, _super);
        function SetupViewCommand() {
            _super.apply(this, arguments);
            this.$BowlingGameView = null;
            this.$ButtonView = null;
            this.$ResetButtonView = null;
        }
        SetupViewCommand.prototype.execute = function () {
            this.$BowlingGameView._renderComponentTo(document.getElementById("bowling"));
            this.$ButtonView._renderComponentTo(document.getElementById("buttons"));
            this.$ResetButtonView._renderComponentTo(document.getElementById("resetbutton"));
        };
        return SetupViewCommand;
    })(origami.mvc.controller.Command);
    controller.SetupViewCommand = SetupViewCommand;
})(controller || (controller = {}));
//# sourceMappingURL=SetupViewCommand.js.map