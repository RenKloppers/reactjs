/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 03:38 PM
 */
/// <reference path="../../../defs/MVC.d.ts"/>
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.mediator {
    import _view = origami.mvc.view;
    export class BowlingGameMediator extends _view.Mediator {

        public $IBowlingGameRollModel:model.IBowlingGameRollModel = null;
        public parentName:string = null;
        public indexCounter:number = 0;
        public frameCounter:number = 0;
        public randomRollNum:number = 0;
        public currentFrameScore:any = [];
        public rolls:any = [];

        constructor() {
            super();
        }

        public getRandomInt(min, max)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        public onRegister():void {
            this.subscribeTo(this.$IBowlingGameRollModel.onRollBall,  this.setBowlingScore, this);
        }

        public setBowlingScore(parentName:string){

            if(this.$IBowlingGameRollModel.getFrameCounter < 9)
            {
                if(this.indexCounter === 0)
                {
                    this.gameFrameStartIndex();
                }
                 else if(this.indexCounter === 1)
                {
                    this.gameFrameFirstIndex();
                }
                else{
                    //reset
                    this.indexCounter = 0;
                    this.view.reset();
                }
            }
            //last frame
            else if(this.$IBowlingGameRollModel.getFrameCounter == 9) {
                this.lastFrameStartIndex();
            } else  if(this.$IBowlingGameRollModel.getFrameCounter == 10) {
                if(this.indexCounter === 1) {
                    this.lastFrameFirstIndex();
                }
                else if(this.indexCounter === 2) {
                    this.lastFrameSecondIndex();
                }
                else if (this.indexCounter === 3)
                {
                    this.lastFrameThirdIndex();
                }
            }
        }

        private gameFrameFirstIndex() {
            this.randomRollNum = this.getRandomInt(0, (10 - this.randomRollNum))
            this.currentFrameScore.push(this.randomRollNum);
            this.doRollAndIncreaseCounter();
            //display score
            this.view.score(this.$IBowlingGameRollModel.getCurrentScore);
            this.frameCounter++;
            this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
        }

        private gameFrameStartIndex() {
            this.randomRollNum = this.getRandomInt(0, 10);
            this.doRollAndIncreaseCounter();
            this.currentFrameScore.push(this.randomRollNum);
        }

        private lastFrameStartIndex() {
            this.indexCounter = 1;
            this.view.reset();
            this.frameCounter++;
            this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
        }

        private lastFrameFirstIndex() {
            this.randomRollNum = this.getRandomInt(0, 10);
            this.doRollAndIncreaseCounter();
            this.currentFrameScore.push(this.randomRollNum);
        }

        private lastFrameSecondIndex() {
            this.randomRollNum = this.getRandomInt(0, (10 - this.randomRollNum))
            this.doRollAndIncreaseCounter();
            this.currentFrameScore.push(this.randomRollNum);
            var totalLastFrameScore = this.currentFrameScore[0] + this.currentFrameScore[1];
            if (totalLastFrameScore < 10) {
                this.view.score(this.$IBowlingGameRollModel.getCurrentScore);
                //game over & set max score
                this.view.maxScore(this.$IBowlingGameRollModel.getCurrentScore);
                this.frameCounter++;
                this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
            }
        }

        private lastFrameThirdIndex() {
            this.view.reset();
            this.randomRollNum = this.getRandomInt(0, 10);
            this.doRoll();
            //display score
            this.view.score(this.$IBowlingGameRollModel.getCurrentScore);
            //game over & set max score
            this.view.maxScore(this.$IBowlingGameRollModel.getCurrentScore);
            this.frameCounter++;
            this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
        }

        private doRoll()
        {
            this.$IBowlingGameRollModel.setCurrentScore(this.randomRollNum);
            this.setRollIndex(this.randomRollNum);
            this.view.roll(this.randomRollNum);
        }

        private doRollAndIncreaseCounter()
        {
            this.doRoll();
            this.indexCounter++;
        }

        public setRollIndex(num:number){
            this.view.rolledAmount(num);
            this.rolls.push(num);
        }

        public onRemove():void {
        }

        private get view():IBowlingGameView {
            return <IBowlingGameView>this.viewComponent;
        }
    }
}