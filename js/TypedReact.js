///ts:ref=reference.ts
/// <reference path="./reference.ts"/> ///ts:ref:generated
var TypedReact;
(function (TypedReact) {
    var NotImplementedError = (function () {
        function NotImplementedError(methodName) {
            this.name = "NotImplementedError";
            this.message = methodName + " should be implemented by React";
        }
        return NotImplementedError;
    })();
    TypedReact.NotImplementedError = NotImplementedError;
    var Component = (function () {
        function Component() {
        }
        Component.prototype.getDomNode = function () {
            throw new NotImplementedError("getDomNode");
        };
        Component.prototype.setState = function (nextState, callback) {
            throw new NotImplementedError("setState");
        };
        Component.prototype.replaceState = function (nextState, callback) {
            throw new NotImplementedError("replaceState");
        };
        Component.prototype.forceUpdate = function (callback) {
            throw new NotImplementedError("forceUpdate");
        };
        Component.prototype.isMounted = function () {
            throw new NotImplementedError("isMounted");
        };
        Component.prototype.transferPropsTo = function (target) {
            throw new NotImplementedError("transferPropsTo");
        };
        Component.prototype.setProps = function (nextProps, callback) {
            throw new NotImplementedError("setProps");
        };
        Component.prototype.replaceProps = function (nextProps, callback) {
            throw new NotImplementedError("replaceProps");
        };
        Component.prototype.render = function () {
            return null;
        };
        return Component;
    })();
    TypedReact.Component = Component;
    function createFactory(factoryGenerator, component, mixins) {
        if (mixins === void 0) { mixins = []; }
        var displayName = component.prototype.constructor.name;
        // Do not override React
        delete component.prototype.constructor;
        delete component.prototype.getDomNode;
        delete component.prototype.setState;
        delete component.prototype.replaceState;
        delete component.prototype.forceUpdate;
        delete component.prototype.isMounted;
        delete component.prototype.transferPropsTo;
        delete component.prototype.setProps;
        delete component.prototype.replaceProps;
        var spec = component.prototype;
        spec.displayName = displayName;
        spec.mixins = mixins;
        return factoryGenerator.createClass(spec);
    }
    TypedReact.createFactory = createFactory;
    function createMixin(mixin) {
        delete mixin.prototype.constructor;
        var mixinLiteral = mixin.prototype;
        return mixinLiteral;
    }
    TypedReact.createMixin = createMixin;
})(TypedReact || (TypedReact = {}));
//# sourceMappingURL=TypedReact.js.map