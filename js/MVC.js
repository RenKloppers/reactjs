
var origami;
(function (origami) {
	(function (mvc) {
		/// <reference path="../../../../defs/Signals.d.ts"/>
		(function (view) {
		})(mvc.view || (mvc.view = {}));
		var view = mvc.view;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));
/// <reference path="IMediator.ts"/>
var origami;
(function (origami) {
	(function (mvc) {
			/// <reference path="../../../../defs/Signals.d.ts"/>
			/// <reference path="../../../../defs/collections.d.ts"/>
			/// <reference path="../../../../defs/Injector.d.ts"/>
			/// <reference path="ICommandMap.ts"/>
		(function (controller) {
			var CommandMap = (function () {
				function CommandMap(injector) {
					this.injector = injector;
					this.signalMap = new collections.Dictionary();
				}

				CommandMap.prototype.mapSignal = function (signal, commandClass, oneShot) {
					var _this = this;
					if (typeof oneShot === "undefined") {
						oneShot = false;
					}
					if (this.hasSignalCommand(signal, commandClass)) {
						return;
					}

					var signalCommandMap = this.signalMap.getValue(signal.id);
					if (!signalCommandMap) {
						signalCommandMap = new collections.Dictionary();
						this.signalMap.setValue(signal.id, signalCommandMap);
					}

					var callback = function (a, b, c, d, e, f, g) {
						if (typeof a === "undefined") {
							a = null;
						}
						if (typeof b === "undefined") {
							b = null;
						}
						if (typeof c === "undefined") {
							c = null;
						}
						if (typeof d === "undefined") {
							d = null;
						}
						if (typeof e === "undefined") {
							e = null;
						}
						if (typeof f === "undefined") {
							f = null;
						}
						if (typeof g === "undefined") {
							g = null;
						}
						_this.routeSignalToCommand(signal, arguments, commandClass, oneShot);
					};
					signalCommandMap.setValue(commandClass, callback);
					signal.add(callback);
				};

				CommandMap.prototype.routeSignalToCommand = function (signal, args, commandClass, oneShot) {
					this.mapSignalValues(signal.expectedParams, args);
					var command = this.createCommandInstance(commandClass);
					this.unmapSignalValues(signal.expectedParams);
					try {
						command.execute();
					}
					catch (err) {
						D.error("Failed to execute command.");
						throw err;
					}

					if (oneShot) {
						this.unmapSignal(signal, commandClass);
					}
				};

				CommandMap.prototype.unmapSignalValues = function (valueClasses) {
					for (var i = 0, length = valueClasses.length; i < length; i++) {
						this.injector.unmap(valueClasses[i]);
					}
				};

				CommandMap.prototype.mapSignalValues = function (names, valueClasses) {
					for (var i = 0, length = valueClasses.length; i < length; i++) {
						this.injector.mapValue(valueClasses[i], names[i]);
					}
				};

				CommandMap.prototype.unmapSignal = function (signal, commandClass) {
					var callbacksByCommandClass = this.signalMap.getValue(signal.id);
					if (callbacksByCommandClass == null) {
						return;
					}

					var callback = callbacksByCommandClass.getValue(commandClass);
					if (callback == null) {
						return;
					}
					signal.remove(callback);
					callbacksByCommandClass.remove(commandClass);
				};

				CommandMap.prototype.hasSignalCommand = function (signal, commandClass) {
					var callbacksByCommandClass = this.signalMap.getValue(signal.id);
					if (callbacksByCommandClass == null) {
						return false;
					}
					var callback = callbacksByCommandClass.getValue(commandClass);
					return callback != null;
				};

				CommandMap.prototype.createCommandInstance = function (commandClass) {
					return this.injector.instantiate(commandClass);
				};

				CommandMap.prototype.execute = function (commandClass, payload, payloadName) {
					//Todo: Add support for passing an array as a payload with multiple params to inject
					if (payload) {
						this.injector.mapValue(payload, payloadName);
					}

					var command = this.injector.instantiate(commandClass);

					this.injector.unmap(payloadName || payload);

					command.execute();
				};
				return CommandMap;
			})();
			controller.CommandMap = CommandMap;
		})(mvc.controller || (mvc.controller = {}));
		var controller = mvc.controller;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));
var origami;
(function (origami) {
	(function (mvc) {
		(function (_view) {
				/// <reference path="../../../../../defs/easeljs.d.ts" />
				/// <reference path="../../../../../defs/collections.d.ts" />
				/// <reference path="../../../../../defs/Reflector.d.ts" />
				/// <reference path="../../../../../defs/Injector.d.ts" />
				/// <reference path="../../../../../defs/underscore.d.ts" />
				/// <reference path="../IMediator.ts" />
				/// <reference path="../IMediatorMap.ts" />
			(function (easeljs) {
				var EaselJSMediatorMap = (function () {
					function EaselJSMediatorMap(injector) {
						this.injector = injector;
						this.mediatorByViewClassName = new collections.Dictionary();
						this.mediatorByView = new collections.Dictionary();
					}

					EaselJSMediatorMap.prototype.mapView = function (viewClassOrName, mediatorClass) {
						var _this = this;
						var viewClassName = this.getViewName(viewClassOrName);
						var viewClass = this.getViewClass(viewClassOrName);

						this.injector.replaceMapping(viewClassName, function () {
							var args = [];
							for (var _i = 0; _i < (arguments.length - 0); _i++) {
								args[_i] = arguments[_i + 0];
							}
							// Easeljs doesn't have addedToStageEvents we need to go outside the box for autoMediation
							// we wrap the constructor of the view so that immediately after the construction call we can mediate
							// the view.
							var args = [null].concat(args);
							var view = new (Function.prototype.bind.apply(viewClass, args));
							_this.injector.injectInto(view);

							_this.createMediator(view, viewClassName);

							return view;
						});

						if (this.mediatorByViewClassName.getValue(viewClassName) != null) {
							D.error("View " + viewClassName + " already mapped.");
						}

						// TODO Check a Mediator is in fact a Mediator.
						this.mediatorByViewClassName.setValue(viewClassName, mediatorClass);
					};

					EaselJSMediatorMap.prototype.getViewClass = function (viewClassOrName) {
						var name = this.getViewName(viewClassOrName);

						return this.injector.getMappedClass(name);
					};

					EaselJSMediatorMap.prototype.getViewName = function (viewClassOrName) {
						if (typeof (viewClassOrName) === "string") {
							return viewClassOrName;
						}

						return origami.reflector.Reflector.getClassNameAsVariableName(viewClassOrName);
					};

					EaselJSMediatorMap.prototype.unmapView = function (viewClassOrName) {
						var viewClassName = this.getViewName(viewClassOrName);
						this.mediatorByViewClassName.remove(viewClassName);
					};

					EaselJSMediatorMap.prototype.createMediator = function (viewComponent, viewClassName) {
						var mediator = this.mediatorByView.getValue(viewComponent);
						if (mediator && mediator.viewComponent === viewComponent) {
							return mediator;
						}

						if (viewClassName) {
							mediator = this.injector.instantiate(this.mediatorByViewClassName.getValue(viewClassName));
						}

						if (!mediator) {
							var viewInstanceName = this.getViewName(viewComponent);
							mediator = this.injector.instantiate(this.mediatorByViewClassName.getValue(viewInstanceName));
						}

						if (!mediator) {
							D.error("No mediator mapped for " + viewInstanceName + " with the name " + viewClassName);
						}

						this.registerMediator(viewComponent, mediator);

						return mediator;
					};

					EaselJSMediatorMap.prototype.hasMapping = function (viewClassOrName) {
						return this.mediatorByViewClassName.containsKey(this.getViewName(viewClassOrName));
					};

					EaselJSMediatorMap.prototype.hasMediatorForView = function (viewComponent) {
						return this.mediatorByView.containsKey(viewComponent);
					};

					EaselJSMediatorMap.prototype.registerMediator = function (viewComponent, mediator) {
						this.mediatorByView.setValue(viewComponent, mediator);
						mediator.setViewComponent(viewComponent);
						mediator.preRegister();
						mediator.onRegister();
					};
					return EaselJSMediatorMap;
				})();
				easeljs.EaselJSMediatorMap = EaselJSMediatorMap;
			})(_view.easeljs || (_view.easeljs = {}));
			var easeljs = _view.easeljs;
		})(mvc.view || (mvc.view = {}));
		var view = mvc.view;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));

var origami;
(function (origami) {
	/// <reference path="../../../defs/Injector.d.ts"/>
	/// <reference path="../../../defs/Signals.d.ts"/>
	/// <reference path="IContext.ts"/>
	/// <reference path="view/IMediatorMap.ts"/>
	/// <reference path="controller/ICommandMap.ts"/>
	/// <reference path="controller/CommandMap.ts"/>
	/// <reference path="view/easeljs/EaselJSMediatorMap.ts"/>
	(function (mvc) {
		var _view = origami.mvc.view;
		var _controller = origami.mvc.controller;
		var signals = origami.signals;
		var _inj = origami.injector;
		var Context = (function () {
			function Context(contextView, parentInjector, autoStartup) {
				this._onStartupComplete = new signals.Signal();
				this._parentInjector = parentInjector;

				this.contextView = contextView;
				this.autoStartup = autoStartup;
				if (this.contextView) {
					this.mapInjections();
					this.checkAutoStartup();
				}
			}

			Context.prototype.mapInjections = function () {
				var injector = this.injector;
				injector.mapValue(injector, "injector");
				injector.mapValue(this.contextView, "contextView");
				injector.mapValue(this.commandMap, "commandMap");
				injector.mapValue(this.mediatorMap, "mediatorMap");
			};

			Context.prototype.checkAutoStartup = function () {
				if (this.autoStartup && this.contextView) {
					this.startup();
				}
			};

			Object.defineProperty(Context.prototype, "injector", {
				get: function () {
					return this._injector = this._injector || new _inj.Container(this._parentInjector);
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(Context.prototype, "commandMap", {
				get: function () {
					return this._commandMap = this._commandMap || new _controller.CommandMap(this.injector);
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(Context.prototype, "mediatorMap", {
				get: function () {
					// TODO - Move the construction of these out into factories..
					return this._mediatorMap = this._mediatorMap || new window["ReactMediatorMap"](this.injector);
				},
				enumerable: true,
				configurable: true
			});

			Context.prototype.startup = function () {
				this._onStartupComplete.dispatch();
			};

			Context.prototype.onStartupComplete = function () {
				return this._onStartupComplete;
			};
			return Context;
		})();
		mvc.Context = Context;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));

var origami;
(function (origami) {
	(function (mvc) {
			/// <reference path="ICommand.ts"/>
			/// <reference path="../view/IMediatorMap.ts"/>
			/// <reference path="../../../../defs/Injector.d.ts"/>
			/// <reference path="../controller/CommandMap.ts"/>
		(function (controller) {
			var Command = (function () {
				function Command() {
					this.injector = null;
					this.mediatorMap = null;
					this.contextView = null;
					this.commandMap = null;
					this.$inject = ["injector", "mediatorMap", "contextView", "commandMap"];
				}

				Command.prototype.execute = function () {
					// Override me.
				};
				return Command;
			})();
			controller.Command = Command;
		})(mvc.controller || (mvc.controller = {}));
		var controller = mvc.controller;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));
/// <reference path="../../../../defs/Injector.d.ts"/>

var origami;
(function (origami) {
	(function (mvc) {
		/// <reference path="IModule.ts"/>
		/// <reference path="../Context.ts"/>
		(function (module) {
			var Module = (function () {
				function Module() {
				}

				Module.prototype.setup = function (contextView, parentInjector) {
					this.context = this.createContext(contextView, parentInjector);
				};

				Module.prototype.createContext = function (contextView, parentInjector) {
					throw new Error("Modules must override the createContext() function");
				};

				Module.prototype.dispose = function () {
				};
				return Module;
			})();
			module.Module = Module;
		})(mvc.module || (mvc.module = {}));
		var module = mvc.module;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));
var origami;
(function (origami) {
	(function (mvc) {
		/// <reference path="IMediator.ts"/>
		/// <reference path="../../../../defs/Debugging.d.ts"/>
		/// <reference path="../../../../defs/Signals.d.ts"/>
		/// <reference path="../../../../defs/Mural.d.ts"/>
		(function (_view) {
			var Mediator = (function () {
				function Mediator() {
					this._subscriptions = [];
				}

				Mediator.prototype.setViewComponent = function (view) {
					this.viewComponent = view;
				};

				Mediator.prototype.preRegister = function () {
					if ("onDispose" in this.viewComponent) {
						this.viewComponent.onDispose.add(this.disposeHandler, this);
					}
					else {
						D.error("viewComponent doesn't have an onDispose function");
					}
				};

				Mediator.prototype.disposeHandler = function () {
					this.viewComponent.onDispose.remove(this.disposeHandler, this);
					this.onRemove();
					this.unsubscribe();
				};

				Mediator.prototype.onRegister = function () {
				};

				Mediator.prototype.onRemove = function () {
				};

				Mediator.prototype.unsubscribe = function () {
					this._subscriptions.forEach(function (sub) {
						sub.signal.remove(sub.func, sub.scope);
					});
				};

				Mediator.prototype.subscribeTo = function (signal, func, scope) {
					this._subscriptions.push({signal: signal, func: func, scope: scope});
					signal.add(func, scope);
				};
				return Mediator;
			})();
			_view.Mediator = Mediator;
		})(mvc.view || (mvc.view = {}));
		var view = mvc.view;
	})(origami.mvc || (origami.mvc = {}));
	var mvc = origami.mvc;
})(origami || (origami = {}));
//# sourceMappingURL=MVC.js.map
