///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated
module controller {
	export class LogModelUpdateCommand extends origami.mvc.controller.Command {

		public parent:string = null;
		public $IBowlingGameRollModel:model.IBowlingGameRollModel = null;

		public execute():void {
			D.log("Model changed", this.parent, this.$IBowlingGameRollModel);
		}
	}
}
