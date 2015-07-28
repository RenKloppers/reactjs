/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/30
 * Time: 08:42 AM
 */
///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated

module model {
    import _signals = origami.signals;

    export class BowlingGameRollModel implements IBowlingGameRollModel {
        private rolled:boolean = true;
        private _onBallRolled:origami.signals.Signal;
        private _playerCurrentScore:number = 0;
        private _currentFrameCounter:number = 0;

        constructor() {
            this._onBallRolled = new _signals.Signal("parent");
        }

        public resetGame():void {
            window.open("index.html", "_self");
        }

        public rollBall():string {
            this.rolled = !this.rolled;
            var parentName:string = "bowling" ;
            this._onBallRolled.dispatch(parentName);
            return parentName;
        }

        public get onRollBall():origami.signals.ISignal {
            return this._onBallRolled;
        }

        public setCurrentScore(currentScore:number)
        {
            this._playerCurrentScore += currentScore;
        }

        public get getCurrentScore():number
        {
            return this._playerCurrentScore;
        }

        public setFrameCounter(frameCounter:number)
        {
            this._currentFrameCounter = frameCounter;
        }

        public get getFrameCounter():number
        {
            return this._currentFrameCounter;
        }
    }
}