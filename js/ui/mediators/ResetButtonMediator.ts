///ts:ref=reference
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.mediator {
    import _view = origami.mvc.view;
    export class ResetButtonMediator extends _view.Mediator {

        public $IBowlingGameRollModel:model.IBowlingGameRollModel = null;

        private count:number = 0;

        constructor() {
            super();
        }

        public onRegister():void {
            this.subscribeTo(this.view.onResetSelected, this.$IBowlingGameRollModel.resetGame, this.$IBowlingGameRollModel);
        }

        public onRemove():void {

        }

        private get view():ui.IResetButtonView {
            return <ui.IResetButtonView>this.viewComponent;
        }
    }
}