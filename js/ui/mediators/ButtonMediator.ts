///ts:ref=reference
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.mediator {
	import _view = origami.mvc.view;
	export class ButtonMediator extends _view.Mediator {

		public $IBowlingGameRollModel:model.IBowlingGameRollModel = null;

		private count:number = 0;

		constructor() {
			super();
		}

		public onRegister():void {
			this.subscribeTo(this.view.onSwitchSelected, this.$IBowlingGameRollModel.rollBall, this.$IBowlingGameRollModel);
		}

		public onRemove():void {

		}

		private get view():ui.IButtonView {
			return <ui.IButtonView>this.viewComponent;
		}
	}
}