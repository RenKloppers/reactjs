
var origami;
(function (origami) {
    /// <reference path="ISignal.ts"/>
    /// <reference path="Binding.ts"/>
    /// <reference path="../../../defs/Reflector.d.ts"/>
    /// <reference path="../../../defs/collections.d.ts"/>
    /// <reference path="../../../defs/Debugging.d.ts"/>
    (function (signals) {
        var Signal = (function () {
            function Signal() {
                var expectedParams = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    expectedParams[_i] = arguments[_i + 0];
                }
                this.expectedParams = expectedParams;
                this.bindings = [];
                this._chained = new collections.Dictionary();
            }
            Signal.prototype.has = function (listener, context) {
                return this.indexOfListener(listener, context) !== -1;
            };

            Signal.prototype.indexOfListener = function (listener, context) {
                var n = this.bindings.length;
                var cur;
                while (n--) {
                    cur = this.bindings[n];
                    if (cur.listener === listener && cur.listenerContext === context) {
                        return n;
                    }
                }

                return -1;
            };

            Signal.prototype.chain = function (signal) {
                var fn = function () {
                    var params = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        params[_i] = arguments[_i + 0];
                    }
                    signal.dispatch.apply(signal, params);
                };
                this._chained.setValue(signal, fn);
                this.add(fn);
            };

            Signal.prototype.unchain = function (signal) {
                if (!this._chained.containsKey(signal)) {
                    return;
                }

                this.remove(this._chained.getValue(signal));
                this._chained.remove(signal);
            };

            Signal.prototype.chainOnce = function (signal) {
                this.addOnce(function () {
                    var params = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        params[_i] = arguments[_i + 0];
                    }
                    signal.dispatch.apply(signal, params);
                });
            };

            Signal.prototype.add = function (listener, listenerContext) {
                this.validateListener(listener);
                this.registerListener(listener, false, listenerContext);
            };

            Signal.prototype.addOnce = function (listener, listenerContext) {
                this.validateListener(listener);
                this.registerListener(listener, true, listenerContext);
            };

            Signal.prototype.remove = function (listener, context) {
                var i = this.indexOfListener(listener, context);
                if (i !== -1) {
                    this.bindings.splice(i, 1)[0].destroy();
                }
            };

            Signal.prototype.removeAll = function () {
                var n = this.bindings.length;
                while (n--) {
                    this.bindings[n].destroy();
                }
                this.bindings.length = 0;
            };

            Object.defineProperty(Signal.prototype, "numListeners", {
                get: function () {
                    return this.bindings.length;
                },
                enumerable: true,
                configurable: true
            });

            Signal.prototype.validateListener = function (listener) {
                if (typeof listener !== "function") {
                    D.error("Listener is required to be a Function.");
                    throw new Error("Listener is required to be a Function.");
                }

                var params = origami.reflector.Reflector.getFunctionParameterNamesArray(listener);

                // TODO Add "type checking" here
                var unevenParamCount = params.length !== this.expectedParams.length;
                var thereAreExpectedParams = params[0] !== "";
                var thereAreMoreExpectedParams = this.expectedParams.length > params.length;
                if (unevenParamCount && thereAreExpectedParams && thereAreMoreExpectedParams) {
                    D.error("Listener does not support the same number of parameters as the signal. [" + params.join(",") + "] :: [" + this.expectedParams.join(",") + "]");
                }
            };

            Signal.prototype.registerListener = function (listener, isOnce, listenerContext) {
                var prevIndex = this.indexOfListener(listener, listenerContext);
                var binding;

                if (prevIndex !== -1) {
                    binding = this.bindings[prevIndex];
                    if (binding.isOnce !== isOnce) {
                        D.error("You cannot add" + (isOnce ? "" : "Once") + "() then add" + (!isOnce ? "" : "Once") + "() the same listener without removing the relationship first.");
                        throw new Error("You cannot add" + (isOnce ? "" : "Once") + "() then add" + (!isOnce ? "" : "Once") + "() the same listener without removing the relationship first.");
                    }
                } else {
                    binding = new signals.Binding(this, listener, isOnce, listenerContext);
                    this.bindings.push(binding);
                }

                return binding;
            };

            Signal.prototype.dispatch = function () {
                var params = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    params[_i] = arguments[_i + 0];
                }
                var numBindings = this.bindings.length;

                if (!numBindings) {
                    return;
                }

                var clone = this.bindings.slice(0);

                // execute all callbacks until end of the list or until a callback returns `false`
                var bindingX = 0;
                var currentBinding;
                while (clone[bindingX] && (currentBinding = clone[bindingX]) && (currentBinding.execute.apply(currentBinding, params) !== false)) {
                    bindingX++;
                }
            };

            Signal.prototype.dispose = function () {
                this.removeAll();
                this.bindings = null;
            };

            Object.defineProperty(Signal.prototype, "id", {
                get: function () {
                    return this._id || (this._id = (Signal.IDCount++).toString());
                },
                enumerable: true,
                configurable: true
            });
            Signal.IDCount = 0;
            return Signal;
        })();
        signals.Signal = Signal;
    })(origami.signals || (origami.signals = {}));
    var signals = origami.signals;
})(origami || (origami = {}));
var origami;
(function (origami) {
    /// <reference path="Signal.ts"/>
    /// <reference path="ISignal.ts"/>
    /// <reference path="../../../defs/Debugging.d.ts"/>
    (function (signals) {
        var Binding = (function () {
            function Binding(signal, listener, isOnce, listenerContext) {
                this.signal = signal;
                this.listener = listener;
                this.isOnce = isOnce;
                this.listenerContext = listenerContext;
            }
            Binding.prototype.destroy = function () {
                delete this.signal;
                delete this.listener;
                delete this.listenerContext;
            };

            Binding.prototype.execute = function () {
                var params = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    params[_i] = arguments[_i + 0];
                }
                var handlerReturn;
                if (this.listener) {
                    try  {
                        handlerReturn = this.listener.apply(this.listenerContext, params);
                    } catch (err) {
                        D.error("Failed to invoke signal listener ", err);
                        D.error(err.stack);
                    }

                    if (this.isOnce) {
                        this.detach();
                    }
                }
                if (typeof (handlerReturn) === "boolean") {
                    return handlerReturn;
                }
                return true;
            };

            Binding.prototype.detach = function () {
                if (this.signal) {
                    this.signal.remove(this.listener, this.listenerContext);
                }
            };
            return Binding;
        })();
        signals.Binding = Binding;
    })(origami.signals || (origami.signals = {}));
    var signals = origami.signals;
})(origami || (origami = {}));
//# sourceMappingURL=Signals.js.map
