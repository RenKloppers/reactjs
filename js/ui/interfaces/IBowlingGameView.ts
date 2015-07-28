/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 03:28 PM
 */
module ui {
    export interface IBowlingGameView {
        roll(val:number):void;
        score(val:number):void;
        maxScore(val:number):void;
        rolledAmount(num:number):void;
        reset():void;
    }
}