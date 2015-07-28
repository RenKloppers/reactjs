///ts:ref=reference.ts
/// <reference path="../js/reference.ts"/> ///ts:ref:generated

declare module origami.signals {
	interface ISignal {
		has(listener:Function, context?:any): boolean;
		add(listener:(a:any, b:any, c:any, d:any, e:any, f:any, g:any) => void, listenerContext?:any): void;
		addOnce(listener:Function, listenerContext?:any): void;
		chain(signal:Signal): any;
		chainOnce(signal:Signal): any;
		unchain(signal:Signal): any;
		remove(listener:Function, context?:any): void;
		removeAll(): void;
		numListeners: number;
		dispatch(...params:any[]): void;
		dispose(): void;
		expectedParams: any[];
		id: string;
	}
}
declare module origami.signals {
	class Signal implements ISignal {
		private _chained;
		private bindings;
		public expectedParams:string[];
		private _id;
		private static IDCount;

		constructor(...expectedParams:string[]);

		public has(listener:Function, context?:any):boolean;

		private indexOfListener(listener, context?);

		public chain(signal:Signal):void;

		public unchain(signal:Signal):void;

		public chainOnce(signal:Signal):void;

		public add(listener:Function, listenerContext?:any):void;

		public addOnce(listener:Function, listenerContext?:any):void;

		public remove(listener:Function, context?:any):void;

		public removeAll():void;

		public numListeners:number;

		private validateListener(listener);

		private registerListener(listener, isOnce, listenerContext?);

		public dispatch(...params:any[]):void;

		public dispose():void;

		public id:string;
	}
}
declare module origami.signals {
	class Binding {
		public signal:ISignal;
		public listener:Function;
		public isOnce:boolean;
		public listenerContext:any;

		constructor(signal:ISignal, listener:Function, isOnce?:boolean, listenerContext?:any);

		public destroy():void;

		public execute(...params:any[]):boolean;

		private detach();
	}
}
