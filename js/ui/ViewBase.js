///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated
var ui;
(function (ui) {
    var _signals = origami.signals;
    var ViewBase = (function () {
        function ViewBase(factory) {
            var _this = this;
            this._factory = factory;
            this._key = ViewBase.key_index++;
            this._onDispose = new _signals.Signal();
            this._onRendered = new _signals.Signal("component");
            this._onRendered.addOnce(function (component) {
                _this._component = component;
                if (_this._component["constructed"]) {
                    _this._component["constructed"]();
                }
            });
            this._children = [];
        }
        ViewBase.prototype._setState = function (state) {
            this._lastState = state;
            if (!this._component) {
                return;
            }
            this._component.setState(state);
        };
        Object.defineProperty(ViewBase.prototype, "onRendered", {
            get: function () {
                return this._onRendered;
            },
            enumerable: true,
            configurable: true
        });
        ViewBase.prototype._setPropOverrides = function () {
            return {};
        };
        ViewBase.prototype._renderComponentTo = function (element) {
            if (!element) {
                return;
            }
            this._containerElement = element;
            this._component =
                React.renderComponent(this.createComponentInstance(), element);
            if (this._lastState) {
                this._component.setState(this._lastState);
            }
        };
        ViewBase.prototype.createComponentInstance = function () {
            var props = this._setPropOverrides();
            props["key"] = this._key;
            props["_onRendered"] = this._onRendered;
            return this._factory(props, this._children);
        };
        ViewBase.prototype.addChild = function (child) {
            var childComp = child.createComponentInstance();
            this._children.push(childComp);
            if (!this._component) {
                return;
            }
            this._renderComponentTo(this._containerElement);
        };
        ViewBase.createFactory = function (component) {
            ViewBase.applySignalMixin(component);
            return TypedReact.createFactory(React, component);
        };
        ViewBase.applySignalMixin = function (component) {
            //(component.mixins || (component.mixins = [])).push({
            //	                                                   componentDidMount: function () {
            //		                                                   this._onRendered.dispatch();
            //	                                                   }
            //                                                   });
            component["prototype"].componentDidMount = function () {
                this.props._onRendered.dispatch(this);
            };
        };
        Object.defineProperty(ViewBase.prototype, "onDispose", {
            get: function () {
                return this._onDispose;
            },
            enumerable: true,
            configurable: true
        });
        ViewBase.key_index = 0;
        return ViewBase;
    })();
    ui.ViewBase = ViewBase;
})(ui || (ui = {}));
//# sourceMappingURL=ViewBase.js.map