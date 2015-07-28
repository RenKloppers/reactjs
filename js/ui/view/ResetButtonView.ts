/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 03:10 PM
 */
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.view {
    import _signals = origami.signals;
    //region << Template >>
    class ResetButtonTempl extends TypedReact.Component<ResetButtonViewProps, ResetButtonViewState> {
        public _onResetSelected:_signals.Signal;

        public constructed():void {
            this._onResetSelected = new _signals.Signal();
        }

        public render():React.Descriptor<any> {

            return React.DOM.div(null,
                React.DOM.button({
                        onClick: () => this._onResetSelected.dispatch()
                    },
                    this.props.buttonText
                ), (<any>this.props).children
            );
        }
    }

    interface ResetButtonViewState {
    }

    interface ResetButtonViewProps {
        buttonText:string;
    }

    var ResetButtonFactory = ViewBase.createFactory(ResetButtonTempl);
    //endregion

    export class ResetButtonView extends ViewBase implements ui.IResetButtonView {
        constructor() {
            super(ResetButtonFactory);
        }

        private get component():ResetButtonTempl {
            return <any>this._component;
        }

        public _setPropOverrides():any {
            return <ResetButtonViewProps>{
                buttonText: "Reset"
            };
        }

        public get onResetSelected():origami.signals.ISignal {
            return this.component._onResetSelected;
        }
    }
}