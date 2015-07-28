///ts:ref=reference.ts
/// <reference path="../reference.ts"/> ///ts:ref:generated
var ui;
(function (ui) {
    var _signals = origami.signals;
    var LifecycleSignalMixin = (function () {
        function LifecycleSignalMixin() {
        }
        LifecycleSignalMixin.prototype.componentWillMount = function () {
            if (this._onComponentWillMount) {
                this._onComponentWillMount.dispatch();
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentWillMount", {
            get: function () {
                return (this._onComponentWillMount || (this._onComponentWillMount = new _signals.Signal()));
            },
            enumerable: true,
            configurable: true
        });
        LifecycleSignalMixin.prototype.componentDidMount = function () {
            if (this._onComponentDidMount) {
                this._onComponentDidMount.dispatch();
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentDidMount", {
            get: function () {
                return (this._onComponentDidMount || (this._onComponentDidMount = new _signals.Signal()));
            },
            enumerable: true,
            configurable: true
        });
        LifecycleSignalMixin.prototype.componentWillReceiveProps = function (nextProps) {
            if (this._onComponentWillReceiveProps) {
                this._onComponentWillReceiveProps.dispatch(nextProps);
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentWillReceiveProps", {
            get: function () {
                return (this._onComponentWillReceiveProps ||
                    (this._onComponentWillReceiveProps = new _signals.Signal("nextProps")));
            },
            enumerable: true,
            configurable: true
        });
        LifecycleSignalMixin.prototype.componentWillUpdate = function (nextProps, nextState) {
            if (this._onComponentWillUpdate) {
                this._onComponentWillUpdate.dispatch(nextProps, nextState);
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentWillUpdate", {
            get: function () {
                return (this._onComponentWillUpdate ||
                    (this._onComponentWillUpdate = new _signals.Signal("nextProps", "nextState")));
            },
            enumerable: true,
            configurable: true
        });
        LifecycleSignalMixin.prototype.componentDidUpdate = function (prevProps, prevState) {
            if (this._onComponentDidUpdate) {
                this._onComponentDidUpdate.dispatch(prevProps, prevState);
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentDidUpdate", {
            get: function () {
                return (this._onComponentDidUpdate ||
                    (this._onComponentDidUpdate = new _signals.Signal("prevProps", "prevState")));
            },
            enumerable: true,
            configurable: true
        });
        LifecycleSignalMixin.prototype.componentWillUnmount = function () {
            if (this._onComponentWillUnmount) {
                this._onComponentWillUnmount.dispatch();
            }
        };
        Object.defineProperty(LifecycleSignalMixin.prototype, "onComponentWillUnmount", {
            get: function () {
                return (this._onComponentWillUnmount || (this._onComponentWillUnmount = new _signals.Signal()));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LifecycleSignalMixin.prototype, "onDispose", {
            get: function () {
                return this.onComponentWillUnmount;
            },
            enumerable: true,
            configurable: true
        });
        return LifecycleSignalMixin;
    })();
    ui.LifecycleSignalMixin = LifecycleSignalMixin;
})(ui || (ui = {}));
//# sourceMappingURL=LifecycleSignalMixin.js.map