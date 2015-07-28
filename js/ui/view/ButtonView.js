/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 02:36 PM
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
        var ButtonViewTempl = (function (_super) {
            __extends(ButtonViewTempl, _super);
            function ButtonViewTempl() {
                _super.apply(this, arguments);
            }
            ButtonViewTempl.prototype.constructed = function () {
                this._onSwitchSelected = new _signals.Signal();
            };
            ButtonViewTempl.prototype.render = function () {
                var _this = this;
                return React.DOM.div(null, React.DOM.button({
                    onClick: function () { return _this._onSwitchSelected.dispatch(); }
                }, this.props.blah), this.props.children);
            };
            return ButtonViewTempl;
        })(TypedReact.Component);
        var ButtonViewFactory = ui.ViewBase.createFactory(ButtonViewTempl);
        //endregion
        var ButtonView = (function (_super) {
            __extends(ButtonView, _super);
            function ButtonView() {
                _super.call(this, ButtonViewFactory);
            }
            Object.defineProperty(ButtonView.prototype, "component", {
                get: function () {
                    return this._component;
                },
                enumerable: true,
                configurable: true
            });
            ButtonView.prototype._setPropOverrides = function () {
                return {
                    blah: "Roll Ball"
                };
            };
            Object.defineProperty(ButtonView.prototype, "onSwitchSelected", {
                get: function () {
                    return this.component._onSwitchSelected;
                },
                enumerable: true,
                configurable: true
            });
            return ButtonView;
        })(ui.ViewBase);
        view.ButtonView = ButtonView;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ButtonView.js.map