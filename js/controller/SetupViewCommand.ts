///ts:ref=reference.ts
/// <reference path="../reference.ts"/> ///ts:ref:generated

module controller {
	export class SetupViewCommand extends origami.mvc.controller.Command {
		public $BowlingGameView:ui.IBowlingGameView = null;
		public $ButtonView:ui.IButtonView = null;
		public $ResetButtonView:ui.IResetButtonView = null;

		public execute():void {
			(<any>this.$BowlingGameView)._renderComponentTo(document.getElementById("bowling"));
			(<any>this.$ButtonView)._renderComponentTo(document.getElementById("buttons"));
			(<any>this.$ResetButtonView)._renderComponentTo(document.getElementById("resetbutton"));
		}
	}
}