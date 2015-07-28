/// <reference path="Signals.d.ts" />
/// <reference path="../js/collections.ts" />
/// <reference path="../defs/Injector.d.ts" />
/// <reference path="../defs/Reflector.d.ts" />
/// <reference path="../defs/Debugging.d.ts" />

declare module origami.mvc {
	interface IContext {
		startup(): void;
	}
}
declare module origami.mvc.view {
	interface IMediator {
		setViewComponent(view:any): void;
		preRegister(): void;
		onRegister(): void;
		onRemove(): void;
		subscribeTo(signal:signals.ISignal, func:Function, scope?:any): void;
		viewComponent: any;
	}
}
declare module origami.mvc.view {
	interface IMediatorMap {
		mapView(viewClassOrName:any, mediatorClass:any): void;
		unmapView(viewClassOrName:any): void;
		createMediator(viewComponent:any): IMediator;
		hasMapping(viewClassOrName:any): boolean;
		hasMediatorForView(viewComponent:any): boolean;
	}
}

declare module origami.mvc.controller {
	interface ICommandMap {
		execute(command:any, payload?:any, payloadName?:string): void;
	}
}
declare module origami.mvc.controller {
	class CommandMap implements ICommandMap {
		private signalMap;
		private injector;

		constructor(injector:injector.IContainer);

		public mapSignal(signal:signals.ISignal, commandClass:any, oneShot?:boolean):void;

		private routeSignalToCommand(signal, args, commandClass, oneShot);

		private unmapSignalValues(valueClasses);

		private mapSignalValues(names, valueClasses);

		public unmapSignal(signal:signals.ISignal, commandClass:any):void;

		private hasSignalCommand(signal, commandClass);

		private createCommandInstance(commandClass);

		public execute(commandClass:any, payload?:any, payloadName?:string):void;
	}
}
//declare module origami.mvc.view.easeljs {
//	class EaselJSMediatorMap implements IMediatorMap {
//		private mediatorByViewClassName;
//		private mediatorByView;
//		private injector;
//
//		constructor(injector:injector.IContainer);
//
//		public mapView(viewClassOrName:any, mediatorClass:any):void;
//
//		private getViewClass(viewClassOrName);
//
//		private getViewName(viewClassOrName);
//
//		public unmapView(viewClassOrName:any):void;
//
//		public createMediator(viewComponent:any, viewClassName?:string):IMediator;
//
//		public hasMapping(viewClassOrName:any):boolean;
//
//		public hasMediatorForView(viewComponent:any):boolean;
//
//		public registerMediator(viewComponent:any, mediator:IMediator):void;
//	}
//}
declare module origami.mvc {
	class Context implements IContext {
		private _injector;
		private contextView;
		private autoStartup;
		private _commandMap;
		private _mediatorMap;
		private _parentInjector;
		private _onStartupComplete;

		constructor(contextView:any, parentInjector:injector.IContainer, autoStartup?:boolean);

		private mapInjections();

		private checkAutoStartup();

		public injector:injector.IContainer;
		public commandMap:controller.ICommandMap;
		public mediatorMap:view.IMediatorMap;

		public startup():void;

		public onStartupComplete():origami.signals.ISignal;
	}
}

declare module origami.mvc.controller {
	interface ICommand {
		execute(): void;
	}
}
declare module origami.mvc.controller {
	class Command implements ICommand {
		public injector:injector.IContainer;
		public mediatorMap:view.IMediatorMap;
		public contextView:any;
		public commandMap:CommandMap;
		public $inject:string[];

		public execute():void;
	}
}
declare module origami.mvc.module {
	interface IModule {
		setup(contextView:any, parentInjector:injector.IContainer): void;
		dispose(): void;
	}
}
declare module origami.mvc.module {
	class Module implements IModule {
		public context:Context;

		constructor();

		public setup(contextView:any, parentInjector:injector.IContainer):void;

		public createContext(contextView:any, parentInjector:injector.IContainer):Context;

		public dispose():void;
	}
}

declare module origami.mvc.view {
}
declare module origami.mvc.view {
	class Mediator implements IMediator {
		public viewComponent:any;
		private _subscriptions;

		constructor();

		public setViewComponent(view:any):void;

		public preRegister():void;

		private disposeHandler();

		public onRegister():void;

		public onRemove():void;

		private unsubscribe();

		public subscribeTo(signal:signals.ISignal, func:Function, scope?:any):void;
	}
}
