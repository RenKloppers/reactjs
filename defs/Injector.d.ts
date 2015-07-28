/// <reference path="../defs/Signals.d.ts" />
/// <reference path="../defs/Reflector.d.ts" />
/// <reference path="../defs/Debugging.d.ts" />

declare module origami.injector {
    class LifeCycleType {
        static PER_REQUEST: string;
        static SINGLETON: string;
        static UNIQUE: string;
    }
}
declare module origami.injector.container {
    class CacheItem {
        public registration: Registration;
        public instance: any;
        public tag: number;
        constructor(registration: Registration, instance: any, tag: number);
    }
}
declare module origami.injector.lifecycle {
    interface ILifecycle {
        get(key: string): any;
        cacheInstance(cacheItem: container.CacheItem): void;
    }
}
declare module origami.injector {
    interface IContainer {
        register(key: string, value: any, lifecycleType?: string): void;
        replaceMapping(key: string, value: any): void;
        get(key: string): any;
        getMappedClass(key: string): any;
        getLifecycle(type: string): lifecycle.ILifecycle;
        mapSingleton(value: any, name?: string): void;
        mapValue(value: any, name?: string): void;
        mapClass(value: any, name?: string): void;
        hasMapping(nameOrClass: any): boolean;
        instantiate(classToInstantiate: any): any;
        unmap(nameOrClass: any): void;
        injectInto(instance: any, currentContainer?: IContainer): void;
        getParent(): IContainer;
        getRegistry(): {
            [key: string]: container.Registration;
        };
        getLifecycles(): {
            [key: string]: lifecycle.ILifecycle;
        };
        whenStartedResolving(): signals.ISignal;
    }
}
declare module origami.injector.container {
    class Registration {
        public key: string;
        public container: IContainer;
        public value: any;
        public lifecycleType: string;
        public constructorParams: string[];
        constructor(key: string, container: IContainer, value: any, lifecycleType: string, constructorParams: string[]);
    }
}
declare module origami.injector.lifecycle {
    class PerRequestLifecycle implements ILifecycle {
        private cache;
        private tag;
        private visitedKeys;
        private visitedKeysArray;
        constructor(container: IContainer);
        public get(key: string): any;
        public cacheInstance(cacheItem: container.CacheItem): void;
        private onResolveStarted();
    }
}
declare module origami.injector.lifecycle {
    class SingletonLifecycle implements ILifecycle {
        private parentContainer;
        private parentLifecycle;
        private cache;
        constructor(parentContainer: IContainer);
        public get(key: string): any;
        public cacheInstance(cacheItem: container.CacheItem): void;
    }
}
declare module origami.injector.lifecycle {
    class UniqueLifecycle implements ILifecycle {
        private parentContainer;
        constructor(parentContainer: Container);
        public get(key: string): any;
        public cacheInstance(cacheItem: container.CacheItem): void;
    }
}
declare module origami.injector {
    class Container implements IContainer {
        public parent: IContainer;
        private registry;
        private lifecycles;
        private children;
        private startedResolving;
        private tmpCount;
        constructor(parent?: IContainer);
        public register(key: string, value: any, lifecycleType?: string): void;
        public replaceMapping(key: string, value: any): void;
        public get(key: string): any;
        public getMappedClass(key: string): any;
        public mapSingleton(value: any, name?: string): void;
        public mapValue(value: any, name?: string): void;
        public mapClass(value: any, name?: string): void;
        public hasMapping(nameOrClass: any): boolean;
        public instantiate(classToInstantiate: any): any;
        public unmap(nameOrClass: any): void;
        public injectInto(instance: any, currentContainer?: IContainer): void;
        private resolveDependency(injectionContainer, key, started?);
        private createInstance(reg, instance, injectionContainer);
        private inject$Variables(instance, injectionContainer);
        private getInjectableVariables(instance);
        private getObjectKeys(instance);
        private injectListOfInjections(instance, injectionContainer);
        private injectIntoVariables(injections, instance, injectionContainer);
        public getLifecycle(type: string): lifecycle.ILifecycle;
        public getParent(): IContainer;
        public getRegistry(): {
            [key: string]: container.Registration;
        };
        public getLifecycles(): {
            [key: string]: lifecycle.ILifecycle;
        };
        public whenStartedResolving(): signals.ISignal;
    }
}
