/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/30
 * Time: 08:44 AM
 */
///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated
module model {
    import _signals = origami.signals;
    export interface IBowlingGameRollModel {
        resetGame():void;
        rollBall():string;
        onRollBall: _signals.ISignal;
        getCurrentScore: number;
        getFrameCounter: number;
        setCurrentScore(currentScore:number);
        setFrameCounter(frameCounter:number);
    }
}