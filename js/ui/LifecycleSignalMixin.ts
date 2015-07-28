///ts:ref=reference.ts
/// <reference path="../reference.ts"/> ///ts:ref:generated

module ui {
	import _signals = origami.signals;

	export class LifecycleSignalMixin<P, S> implements React.Mixin<P, S> {
		public componentWillMount():void {
			if (this._onComponentWillMount) {
				this._onComponentWillMount.dispatch();
			}
		}

		private _onComponentWillMount:_signals.Signal;

		public get onComponentWillMount():_signals.ISignal {
			return (this._onComponentWillMount || (this._onComponentWillMount = new _signals.Signal()));
		}

		public componentDidMount():void {
			if (this._onComponentDidMount) {
				this._onComponentDidMount.dispatch();
			}
		}

		private _onComponentDidMount:_signals.Signal;

		public get onComponentDidMount():_signals.ISignal {
			return (this._onComponentDidMount || (this._onComponentDidMount = new _signals.Signal()));
		}

		public componentWillReceiveProps(nextProps:P):void {
			if (this._onComponentWillReceiveProps) {
				this._onComponentWillReceiveProps.dispatch(nextProps);
			}
		}

		private _onComponentWillReceiveProps:_signals.Signal;

		public get onComponentWillReceiveProps():_signals.ISignal {
			return (this._onComponentWillReceiveProps ||
			(this._onComponentWillReceiveProps = new _signals.Signal("nextProps")));
		}

		public componentWillUpdate(nextProps:P, nextState:S):void {
			if (this._onComponentWillUpdate) {
				this._onComponentWillUpdate.dispatch(nextProps, nextState);
			}
		}

		private _onComponentWillUpdate:_signals.Signal;

		public get onComponentWillUpdate():_signals.ISignal {
			return (this._onComponentWillUpdate ||
			(this._onComponentWillUpdate = new _signals.Signal("nextProps", "nextState")));
		}

		public componentDidUpdate(prevProps:P, prevState:S):void {
			if (this._onComponentDidUpdate) {
				this._onComponentDidUpdate.dispatch(prevProps, prevState);
			}
		}

		private _onComponentDidUpdate:_signals.Signal;

		public get onComponentDidUpdate():_signals.ISignal {
			return (this._onComponentDidUpdate ||
			(this._onComponentDidUpdate = new _signals.Signal("prevProps", "prevState")));
		}

		public componentWillUnmount():void {
			if (this._onComponentWillUnmount) {
				this._onComponentWillUnmount.dispatch();
			}
		}

		private _onComponentWillUnmount:_signals.Signal;

		public get onComponentWillUnmount():_signals.ISignal {
			return (this._onComponentWillUnmount || (this._onComponentWillUnmount = new _signals.Signal()));
		}

		public get onDispose():_signals.ISignal {
			return this.onComponentWillUnmount;
		}
	}
}