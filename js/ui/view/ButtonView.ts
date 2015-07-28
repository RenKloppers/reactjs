/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 02:36 PM
 */
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.view {
	import _signals = origami.signals;
	//region << Template >>
	class ButtonViewTempl extends TypedReact.Component<ButtonViewProps, ButtonViewState> {
		public _onSwitchSelected:_signals.Signal;

		public constructed():void {
			this._onSwitchSelected = new _signals.Signal();
		}

		public render():React.Descriptor<any> {

			return React.DOM.div(null,
			                     React.DOM.button({
				                                      onClick: () => this._onSwitchSelected.dispatch()
			                                      },
			                                      this.props.blah
			                     ), (<any>this.props).children
			);
		}
	}

	interface ButtonViewState {
	}

	interface ButtonViewProps {
		blah:string;
	}

	var ButtonViewFactory = ViewBase.createFactory(ButtonViewTempl);
	//endregion

	export class ButtonView extends ViewBase implements ui.IButtonView {
		constructor() {
			super(ButtonViewFactory);
		}

		private get component():ButtonViewTempl {
			return <any>this._component;
		}

		public _setPropOverrides():any {
			return <ButtonViewProps>{
				blah: "Roll Ball"
			};
		}

		public get onSwitchSelected():origami.signals.ISignal {
			return this.component._onSwitchSelected;
		}
	}
}