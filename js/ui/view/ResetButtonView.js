/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 03:10 PM
 */
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ui;
(function (ui) {
    var view;
    (function (view) {
        var _signals = origami.signals;
        //region << Template >>
        var ResetButtonTempl = (function (_super) {
            __extends(ResetButtonTempl, _super);
            function ResetButtonTempl() {
                _super.apply(this, arguments);
            }
            ResetButtonTempl.prototype.constructed = function () {
                this._onResetSelected = new _signals.Signal();
            };
            ResetButtonTempl.prototype.render = function () {
                var _this = this;
                return React.DOM.div(null, React.DOM.button({
                    onClick: function () { return _this._onResetSelected.dispatch(); }
                }, this.props.buttonText), this.props.children);
            };
            return ResetButtonTempl;
        })(TypedReact.Component);
        var ResetButtonFactory = ui.ViewBase.createFactory(ResetButtonTempl);
        //endregion
        var ResetButtonView = (function (_super) {
            __extends(ResetButtonView, _super);
            function ResetButtonView() {
                _super.call(this, ResetButtonFactory);
            }
            Object.defineProperty(ResetButtonView.prototype, "component", {
                get: function () {
                    return this._component;
                },
                enumerable: true,
                configurable: true
            });
            ResetButtonView.prototype._setPropOverrides = function () {
                return {
                    buttonText: "Reset"
                };
            };
            Object.defineProperty(ResetButtonView.prototype, "onResetSelected", {
                get: function () {
                    return this.component._onResetSelected;
                },
                enumerable: true,
                configurable: true
            });
            return ResetButtonView;
        })(ui.ViewBase);
        view.ResetButtonView = ResetButtonView;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ResetButtonView.js.map