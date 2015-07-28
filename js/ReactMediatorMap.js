///ts:ref=reference.ts
/// <reference path="./reference.ts"/> ///ts:ref:generated
var origami;
(function (origami) {
    var mvc;
    (function (mvc) {
        var view;
        (function (view_1) {
            var ReactMediatorMap = (function () {
                function ReactMediatorMap(injector) {
                    this.injector = injector;
                    this.mediatorByViewClassName = new collections.Dictionary();
                    this.mediatorByView = new collections.Dictionary();
                }
                ReactMediatorMap.prototype.getViewClass = function (viewClassOrName) {
                    var name = this.getViewName(viewClassOrName);
                    return this.injector.getMappedClass(name);
                };
                ReactMediatorMap.prototype.getViewName = function (viewClassOrName) {
                    if (typeof (viewClassOrName) === "string") {
                        return viewClassOrName;
                    }
                    return origami.reflector.Reflector.getClassNameAsVariableName(viewClassOrName);
                };
                ReactMediatorMap.prototype.mapView = function (viewClassOrName, mediatorClass) {
                    var _this = this;
                    var viewClassName = this.getViewName(viewClassOrName);
                    var viewClass = this.getViewClass(viewClassOrName);
                    this.injector.replaceMapping(viewClassName, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        var args = [null].concat(args);
                        var view = new (Function.prototype.bind.apply(viewClass, args));
                        _this.injector.injectInto(view);
                        view.onRendered.addOnce(function (component) {
                            _this.createMediator(view, viewClassName);
                        });
                        return view;
                    });
                    if (this.mediatorByViewClassName.getValue(viewClassName) != null) {
                        D.error("View " + viewClassName + " already mapped.");
                    }
                    // TODO Check a Mediator is in fact a Mediator.
                    this.mediatorByViewClassName.setValue(viewClassName, mediatorClass);
                };
                ReactMediatorMap.prototype.unmapView = function (viewClassOrName) {
                    var viewClassName = this.getViewName(viewClassOrName);
                    this.mediatorByViewClassName.remove(viewClassName);
                };
                ReactMediatorMap.prototype.createMediator = function (viewComponent, viewClassName) {
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
                ReactMediatorMap.prototype.registerMediator = function (viewComponent, mediator) {
                    this.mediatorByView.setValue(viewComponent, mediator);
                    mediator.setViewComponent(viewComponent);
                    mediator.preRegister();
                    mediator.onRegister();
                };
                ReactMediatorMap.prototype.hasMapping = function (viewClassOrName) {
                    return this.mediatorByViewClassName.containsKey(this.getViewName(viewClassOrName));
                };
                ReactMediatorMap.prototype.hasMediatorForView = function (viewComponent) {
                    return this.mediatorByView.containsKey(viewComponent);
                };
                return ReactMediatorMap;
            })();
            view_1.ReactMediatorMap = ReactMediatorMap;
        })(view = mvc.view || (mvc.view = {}));
    })(mvc = origami.mvc || (origami.mvc = {}));
})(origami || (origami = {}));
//# sourceMappingURL=ReactMediatorMap.js.map