///ts:ref=reference.ts
/// <reference path="./reference.ts"/> ///ts:ref:generated

module origami.mvc.view {
	import _injector = origami.injector;

	export class ReactMediatorMap implements origami.mvc.view.IMediatorMap {
		private mediatorByViewClassName:collections.Dictionary<string, any>;
		private mediatorByView:collections.Dictionary<any, any>;
		private injector:_injector.IContainer;

		constructor(injector:_injector.IContainer) {
			this.injector = injector;
			this.mediatorByViewClassName = new collections.Dictionary<string, any>();
			this.mediatorByView = new collections.Dictionary<any, any>();
		}

		private getViewClass(viewClassOrName:any):any {
			var name:string = this.getViewName(viewClassOrName);

			return this.injector.getMappedClass(name);
		}

		private getViewName(viewClassOrName:any):string {
			if (typeof(viewClassOrName) === "string") {
				return viewClassOrName;
			}

			return reflector.Reflector.getClassNameAsVariableName(viewClassOrName);
		}

		public mapView(viewClassOrName:any, mediatorClass:any):void {
			var viewClassName:string = this.getViewName(viewClassOrName);
			var viewClass:any = this.getViewClass(viewClassOrName);

			this.injector.replaceMapping(viewClassName, (...args:Array<any>) => {
				var args = [null].concat(args);
				var view = new (Function.prototype.bind.apply(viewClass, args));
				this.injector.injectInto(view);

				view.onRendered.addOnce((component:any) => {
					this.createMediator(view, viewClassName);
				});

				return view;
			});

			if (this.mediatorByViewClassName.getValue(viewClassName) != null) {
				D.error("View " + viewClassName + " already mapped.");
			}

			// TODO Check a Mediator is in fact a Mediator.
			this.mediatorByViewClassName.setValue(viewClassName, mediatorClass);
		}

		public unmapView(viewClassOrName:any):void {
			var viewClassName:string = this.getViewName(viewClassOrName);
			this.mediatorByViewClassName.remove(viewClassName);
		}

		public createMediator(viewComponent:any, viewClassName?:string):IMediator {
			var mediator:IMediator = this.mediatorByView.getValue(viewComponent);
			if (mediator && mediator.viewComponent === viewComponent) {
				return mediator;
			}

			if (viewClassName) {
				mediator = this.injector.instantiate(this.mediatorByViewClassName.getValue(viewClassName));
			}

			if (!mediator) {
				var viewInstanceName:string = this.getViewName(viewComponent);
				mediator = this.injector.instantiate(this.mediatorByViewClassName.getValue(viewInstanceName));
			}

			if (!mediator) {
				D.error("No mediator mapped for " + viewInstanceName + " with the name " + viewClassName);
			}

			this.registerMediator(viewComponent, mediator);

			return mediator;
		}

		public registerMediator(viewComponent:any, mediator:IMediator):void {
			this.mediatorByView.setValue(viewComponent, mediator);
			mediator.setViewComponent(viewComponent);
			mediator.preRegister();
			mediator.onRegister();
		}

		public hasMapping(viewClassOrName:any):boolean {
			return this.mediatorByViewClassName.containsKey(this.getViewName(viewClassOrName));
		}

		public hasMediatorForView(viewComponent:any):boolean {
			return this.mediatorByView.containsKey(viewComponent);
		}
	}
}