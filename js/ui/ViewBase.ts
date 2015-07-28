///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated

module ui {
	import _signals = origami.signals;

	export class ViewBase {
		public _component:TypedReact.Component<any, any>;
		private _lastState:any;
		private _factory:any;

		private _onRendered:_signals.Signal;
		private _onDispose:_signals.Signal;

		private _children:Array<any>;

		private _containerElement:Element;

		private static key_index:number = 0;
		private _key:number;

		constructor(factory:any) {
			this._factory = factory;
			this._key = ViewBase.key_index++;
			this._onDispose = new _signals.Signal();
			this._onRendered = new _signals.Signal("component");
			this._onRendered.addOnce((component:TypedReact.Component<any, any>) => {
				this._component = component;

				if (this._component["constructed"]) {
					this._component["constructed"]();
				}
			});
			this._children = [];
		}

		public _setState(state:any):void {
			this._lastState = state;
			if (!this._component) {
				return;
			}

			this._component.setState(state);
		}

		public get onRendered():_signals.ISignal {
			return this._onRendered;
		}

		public _setPropOverrides():any {
			return {};
		}

		public _renderComponentTo(element:Element):void {
			if (!element) {
				return;
			}

			this._containerElement = element;
			this._component =
				<any>React.renderComponent(this.createComponentInstance(), element);
			if (this._lastState) {
				this._component.setState(this._lastState);
			}
		}

		private createComponentInstance() {
			var props = this._setPropOverrides();
			props["key"] = this._key;
			props["_onRendered"] = this._onRendered;
			return this._factory(props, this._children);
		}

		public addChild(child:ViewBase):void {
			var childComp = child.createComponentInstance();
			this._children.push(childComp);
			if (!this._component) {
				return;
			}
			this._renderComponentTo(this._containerElement);
		}

		public static createFactory(component:{ new(): TypedReact.Component<any, any> }):React.Factory<any> {
			ViewBase.applySignalMixin(<any>component);
			return TypedReact.createFactory(React, component);
		}

		private static applySignalMixin(component:React.Specification<any, any>):void {
			//(component.mixins || (component.mixins = [])).push({
			//	                                                   componentDidMount: function () {
			//		                                                   this._onRendered.dispatch();
			//	                                                   }
			//                                                   });

			component["prototype"].componentDidMount = function () {
				this.props._onRendered.dispatch(this);
			};
		}

		public get onDispose():_signals.ISignal {
			return this._onDispose;
		}
	}
}