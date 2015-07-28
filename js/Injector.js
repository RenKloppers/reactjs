var origami;
(function (origami) {
    (function (injector) {
        var LifeCycleType = (function () {
            function LifeCycleType() {
            }
            LifeCycleType.PER_REQUEST = "PER_REQUEST";
            LifeCycleType.SINGLETON = "SINGLETON";
            LifeCycleType.UNIQUE = "UNIQUE";
            return LifeCycleType;
        })();
        injector.LifeCycleType = LifeCycleType;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));
var origami;
(function (origami) {
    (function (injector) {
        /// <reference path="Registration.ts"/>
        (function (container) {
            var CacheItem = (function () {
                // TODO - Check if tag can be removed.
                function CacheItem(registration, instance, tag) {
                    this.registration = registration;
                    this.instance = instance;
                    this.tag = tag;
                }
                return CacheItem;
            })();
            container.CacheItem = CacheItem;
        })(injector.container || (injector.container = {}));
        var container = injector.container;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));

/// <reference path="../container/CacheItem.ts"/>

/// <reference path="LifeCycleType.ts"/>
/// <reference path="lifecycle/ILifecycle.ts"/>
/// <reference path="../../../defs/Signals.d.ts"/>
var signals = origami.signals;
var origami;
(function (origami) {
    (function (injector) {
        /// <reference path="../IContainer.ts"/>
        (function (_container) {
            var Registration = (function () {
                function Registration(key, container, value, lifecycleType, constructorParams) {
                    this.key = key;
                    this.container = container;
                    this.value = value;
                    this.lifecycleType = lifecycleType;
                    this.constructorParams = constructorParams;
                }
                return Registration;
            })();
            _container.Registration = Registration;
        })(injector.container || (injector.container = {}));
        var container = injector.container;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));

///<reference path="ILifecycle.ts"/>
///<reference path="../container/CacheItem.ts"/>
///<reference path="../container/Registration.ts"/>
///<reference path="../IContainer.ts"/>
var injector = origami.injector;
var container = origami.injector.container;
var origami;
(function (origami) {
    (function (injector) {
        (function (lifecycle) {
            var PerRequestLifecycle = (function () {
                function PerRequestLifecycle(container) {
                    container.whenStartedResolving().add(this.onResolveStarted, this);
                    this.cache = {};
                }
                PerRequestLifecycle.prototype.get = function (key) {
                    // Gets an instance for 'key' that has already been retrieved during the current resolve. The current resolve is identified by 'tag'.
                    // If there is no available instance, it will also do a check to determine if there's a circular reference during.
                    var cachedItem = this.cache[key];
                    if (cachedItem) {
                        return cachedItem.instance;
                    }

                    this.visitedKeysArray.push(key);
                    this.visitedKeys[key] = true;

                    return null;
                };

                PerRequestLifecycle.prototype.cacheInstance = function (cacheItem) {
                    this.cache[cacheItem.registration.key] = cacheItem;
                    cacheItem.tag = this.tag;
                };

                PerRequestLifecycle.prototype.onResolveStarted = function () {
                    this.tag++;
                    this.visitedKeys = {};
                    this.visitedKeysArray = [];
                    this.cache = {};
                };
                return PerRequestLifecycle;
            })();
            lifecycle.PerRequestLifecycle = PerRequestLifecycle;
        })(injector.lifecycle || (injector.lifecycle = {}));
        var lifecycle = injector.lifecycle;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));
/// <reference path="../Container.ts"/>
/// <reference path="../container/CacheItem.ts"/>
/// <reference path="../IContainer.ts"/>
var origami;
(function (origami) {
    (function (injector) {
        (function (lifecycle) {
            var SingletonLifecycle = (function () {
                function SingletonLifecycle(parentContainer) {
                    this.parentContainer = parentContainer;
                    this.cache = {};
                    this.parentLifecycle = parentContainer.getLifecycle(injector.LifeCycleType.SINGLETON);
                }
                SingletonLifecycle.prototype.get = function (key) {
                    // Re-use any instance that is already available for this dependency
                    var cacheItem = this.cache[key];
                    if (cacheItem && cacheItem.instance) {
                        return cacheItem.instance;
                    }

                    // If the singleton wasn't found, maybe it is available in the parent
                    if (this.parentLifecycle) {
                        return this.parentLifecycle.get(key);
                    } else {
                        return null;
                    }
                };

                SingletonLifecycle.prototype.cacheInstance = function (cacheItem) {
                    this.cache[cacheItem.registration.key] = cacheItem;
                };
                return SingletonLifecycle;
            })();
            lifecycle.SingletonLifecycle = SingletonLifecycle;
        })(injector.lifecycle || (injector.lifecycle = {}));
        var lifecycle = injector.lifecycle;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));

var origami;
(function (origami) {
    (function (injector) {
        /// <reference path="../Container.ts"/>
        (function (lifecycle) {
            var UniqueLifecycle = (function () {
                function UniqueLifecycle(parentContainer) {
                    this.parentContainer = parentContainer;
                }
                UniqueLifecycle.prototype.get = function (key) {
                    return null;
                };

                UniqueLifecycle.prototype.cacheInstance = function (cacheItem) {
                    // We don't cache as all requests should return a unique instance
                };
                return UniqueLifecycle;
            })();
            lifecycle.UniqueLifecycle = UniqueLifecycle;
        })(injector.lifecycle || (injector.lifecycle = {}));
        var lifecycle = injector.lifecycle;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));

var origami;
(function (origami) {
    /// <reference path="LifeCycleType.ts"/>
    /// <reference path="container/Registration.ts"/>
    /// <reference path="container/CacheItem.ts"/>
    /// <reference path="lifecycle/ILifecycle.ts"/>
    /// <reference path="IContainer.ts"/>
    /// <reference path="lifecycle/PerRequestLifecycle.ts"/>
    /// <reference path="lifecycle/SingletonLifecycle.ts"/>
    /// <reference path="lifecycle/UniqueLifecycle.ts"/>
    /// <reference path="../../../defs/Signals.d.ts"/>
    /// <reference path="../../../defs/Reflector.d.ts"/>
    /// <reference path="../../../defs/Debugging.d.ts"/>
    (function (injector) {
        var Container = (function () {
            function Container(parent) {
                if (typeof parent === "undefined") { parent = null; }
                this.parent = parent;
                this.tmpCount = 0;
                // TODO - Split into an injector and a container.
                this.startedResolving = new origami.signals.Signal();

                this.registry = {};
                this.lifecycles = {};
                this.lifecycles[injector.LifeCycleType.PER_REQUEST] = new injector.lifecycle.PerRequestLifecycle(this);
                this.lifecycles[injector.LifeCycleType.SINGLETON] = new injector.lifecycle.SingletonLifecycle(this);
                this.lifecycles[injector.LifeCycleType.UNIQUE] = new injector.lifecycle.UniqueLifecycle(this);

                this.children = [];
            }
            Container.prototype.register = function (key, value, lifecycleType) {
                if (typeof lifecycleType === "undefined") { lifecycleType = injector.LifeCycleType.UNIQUE; }
                if (this.registry[key]) {
                    D.warn("Key " + key + " already mapped.");
                }

                var lifecycle = this.lifecycles[lifecycleType];
                if (!lifecycle) {
                    lifecycleType = injector.LifeCycleType.UNIQUE;
                }

                var constructorParams = origami.reflector.Reflector.getConstructorParameterNamesArray(value);

                this.registry[key] = new injector.container.Registration(key, this, value, lifecycleType, constructorParams);
            };

            Container.prototype.replaceMapping = function (key, value) {
                if (!this.registry[key]) {
                    D.error("Key " + key + " is not mapped.");
                }

                var constructorParams = origami.reflector.Reflector.getConstructorParameterNamesArray(value);
                var reg = this.registry[key];
                reg.value = value;
                reg.constructorParams = constructorParams;
            };

            Container.prototype.get = function (key) {
                return this.resolveDependency(this, key, true);
            };

            Container.prototype.getMappedClass = function (key) {
                return this.registry[key].value;
            };

            Container.prototype.mapSingleton = function (value, name) {
                this.register(name || origami.reflector.Reflector.getClassName(value), value, injector.LifeCycleType.SINGLETON);
            };

            Container.prototype.mapValue = function (value, name) {
                var key = name || origami.reflector.Reflector.getClassName(value);
                this.register(key, value, injector.LifeCycleType.SINGLETON);
                var reg = this.registry[key];
                this.lifecycles[injector.LifeCycleType.SINGLETON].cacheInstance(new injector.container.CacheItem(reg, value, 0));
            };

            Container.prototype.mapClass = function (value, name) {
                var key = name || origami.reflector.Reflector.getClassName(value);
                this.register(key, value, injector.LifeCycleType.UNIQUE);
            };

            Container.prototype.hasMapping = function (nameOrClass) {
                return !!(this.registry[nameOrClass] || this.registry[origami.reflector.Reflector.getClassName(nameOrClass)]);
            };

            Container.prototype.instantiate = function (classToInstantiate) {
                var className = origami.reflector.Reflector.getClassName(classToInstantiate);
                var has = this.hasMapping(className);
                if (has) {
                    return this.get(className);
                }

                this.mapClass(classToInstantiate);
                var result = this.get(className);
                this.unmap(className);

                return result;
            };

            Container.prototype.unmap = function (nameOrClass) {
                if (this.registry[nameOrClass]) {
                    this.registry[nameOrClass] = null;
                    delete this.registry[nameOrClass];
                } else {
                    this.registry[origami.reflector.Reflector.getClassName(nameOrClass)] = null;
                    delete this.registry[origami.reflector.Reflector.getClassName(nameOrClass)];
                }
            };

            Container.prototype.injectInto = function (instance, currentContainer) {
                if (instance["____injected"]) {
                    return;
                }

                if (this.tmpCount > 50) {
                    D.log("injectInto", instance);
                }

                if (!currentContainer) {
                    currentContainer = this;
                }

                // TODO - Check if this impacts performance, must still be idempotent if changed.
                instance["____injected"] = true;

                this.inject$Variables(instance, currentContainer);
                this.injectListOfInjections(instance, currentContainer);

                if (instance.postConstruct) {
                    instance.postConstruct();
                }
            };

            Container.prototype.resolveDependency = function (injectionContainer, key, started) {
                // Try to find the dependency registration in the current injectionContainer.
                // If not found, recursively try the parent injectionContainer.
                if (this.tmpCount > 50) {
                    D.log("resolveDependency", key, started);
                }
                var reg;
                var currentContainer = injectionContainer;
                while (currentContainer) {
                    reg = currentContainer.getRegistry()[key];
                    if (reg) {
                        break;
                    }

                    if (key.length > 1 && key.charAt(0) === "$") {
                        reg = currentContainer.getRegistry()[key.substr(1)];
                        if (reg) {
                            break;
                        }
                    }
                    currentContainer = currentContainer.getParent();
                }

                if (!currentContainer) {
                    D.error("Unknown dependency: " + key);
                    throw new Error("Unknown dependency: " + key);
                }

                var lifecycle = currentContainer.getLifecycles()[reg.lifecycleType];
                if (started) {
                    this.startedResolving.dispatch();
                }

                // Ask the lifecycle if it already has an instance of this dependency
                var instance;
                if (instance = lifecycle.get(key)) {
                    return instance;
                }

                if (key.length > 1 && key.charAt(0) === "$" && (instance = lifecycle.get(key.substr(1)))) {
                    return instance;
                }

                // Lifecycle didn't have an instance, so we need to create it.
                if (reg.value instanceof Function) {
                    // The registered value is a constructor, so we need to construct the object and
                    // inject all the dependencies.
                    instance = this.createInstance(reg, instance, currentContainer);

                    this.injectInto(instance, currentContainer);
                } else {
                    // The registered value is an existing instance.
                    instance = reg.value;
                }

                lifecycle.cacheInstance(new injector.container.CacheItem(reg, instance, 0));

                return instance;
            };

            Container.prototype.createInstance = function (reg, instance, injectionContainer) {
                if (this.tmpCount > 50) {
                    D.log("createInstance", reg, instance);
                }
                var constructorParams = [];
                if (reg.constructorParams && reg.constructorParams.length > 0) {
                    for (var i = 0, length = reg.constructorParams.length; i < length; i++) {
                        constructorParams.push(this.resolveDependency(injectionContainer, reg.constructorParams[i]));
                    }
                }

                // Calls the registered constructor with the supplied params, this is done to preserve
                // new object scope.
                instance = new (Function.prototype.bind.apply(reg.value, [null].concat(constructorParams)));

                return instance;
            };

            Container.prototype.inject$Variables = function (instance, injectionContainer) {
                if (this.tmpCount > 50) {
                    D.log("inject$Variables");
                }
                var injections = this.getInjectableVariables(instance);
                if (injections.length === 0) {
                    return;
                }
                if (this.tmpCount++ > 50) {
                    D.log(injections);
                }
                this.injectIntoVariables(injections, instance, injectionContainer);
                this.tmpCount--;
            };

            Container.prototype.getInjectableVariables = function (instance) {
                var getKeys = Object.keys || this.getObjectKeys;

                return getKeys(instance).filter(function (value, index, collection) {
                    return value.length > 1 && value.charAt(0) === "$" && value !== "$inject";
                });
            };

            Container.prototype.getObjectKeys = function (instance) {
                // TODO Maybe move this to the reflector.
                var keys = [];
                for (var key in instance) {
                    keys.push(key);
                }

                return keys;
            };

            Container.prototype.injectListOfInjections = function (instance, injectionContainer) {
                var injections = instance["$inject"];
                if (this.tmpCount > 50) {
                    D.log("injectListOfInjections", injections, instance);
                }
                this.injectIntoVariables(injections, instance, injectionContainer);
            };

            Container.prototype.injectIntoVariables = function (injections, instance, injectionContainer) {
                if (this.tmpCount > 50) {
                    D.log("injectIntoVariables", injections);
                }
                if (injections && injections instanceof Array) {
                    for (var t = 0, len = injections.length; t < len; t++) {
                        var injectionKey = injections[t];
                        instance[injectionKey] = this.resolveDependency(injectionContainer, injectionKey);
                    }
                }
            };

            Container.prototype.getLifecycle = function (type) {
                return this.lifecycles[type];
            };

            Container.prototype.getParent = function () {
                return this.parent;
            };

            Container.prototype.getRegistry = function () {
                return this.registry;
            };

            Container.prototype.getLifecycles = function () {
                return this.lifecycles;
            };

            Container.prototype.whenStartedResolving = function () {
                return this.startedResolving;
            };
            return Container;
        })();
        injector.Container = Container;
    })(origami.injector || (origami.injector = {}));
    var injector = origami.injector;
})(origami || (origami = {}));
//# sourceMappingURL=Injector.js.map
