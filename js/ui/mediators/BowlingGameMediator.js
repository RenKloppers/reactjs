/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 03:38 PM
 */
/// <reference path="../../../defs/MVC.d.ts"/>
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ui;
(function (ui) {
    var mediator;
    (function (mediator) {
        var _view = origami.mvc.view;
        var BowlingGameMediator = (function (_super) {
            __extends(BowlingGameMediator, _super);
            function BowlingGameMediator() {
                _super.call(this);
                this.$IBowlingGameRollModel = null;
                this.parentName = null;
                this.indexCounter = 0;
                this.frameCounter = 0;
                this.randomRollNum = 0;
                this.currentFrameScore = [];
                this.rolls = [];
            }
            BowlingGameMediator.prototype.getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            BowlingGameMediator.prototype.onRegister = function () {
                this.subscribeTo(this.$IBowlingGameRollModel.onRollBall, this.setBowlingScore, this);
            };
            BowlingGameMediator.prototype.setBowlingScore = function (parentName) {
                if (this.$IBowlingGameRollModel.getFrameCounter < 9) {
                    if (this.indexCounter === 0) {
                        this.gameFrameStartIndex();
                    }
                    else if (this.indexCounter === 1) {
                        this.gameFrameFirstIndex();
                    }
                    else {
                        //reset
                        this.indexCounter = 0;
                        this.view.reset();
                    }
                }
                else if (this.$IBowlingGameRollModel.getFrameCounter == 9) {
                    this.lastFrameStartIndex();
                }
                else if (this.$IBowlingGameRollModel.getFrameCounter == 10) {
                    if (this.indexCounter === 1) {
                        this.lastFrameFirstIndex();
                    }
                    else if (this.indexCounter === 2) {
                        this.lastFrameSecondIndex();
                    }
                    else if (this.indexCounter === 3) {
                        this.lastFrameThirdIndex();
                    }
                }
            };
            BowlingGameMediator.prototype.gameFrameFirstIndex = function () {
                this.randomRollNum = this.getRandomInt(0, (10 - this.randomRollNum));
                this.currentFrameScore.push(this.randomRollNum);
                this.doRollAndIncreaseCounter();
                //display score
                this.view.score(this.$IBowlingGameRollModel.getCurrentScore);
                this.frameCounter++;
                this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
            };
            BowlingGameMediator.prototype.gameFrameStartIndex = function () {
                this.randomRollNum = this.getRandomInt(0, 10);
                this.doRollAndIncreaseCounter();
                this.currentFrameScore.push(this.randomRollNum);
            };
            BowlingGameMediator.prototype.lastFrameStartIndex = function () {
                this.indexCounter = 1;
                this.view.reset();
                this.frameCounter++;
                this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
            };
            BowlingGameMediator.prototype.lastFrameFirstIndex = function () {
                this.randomRollNum = this.getRandomInt(0, 10);
                this.doRollAndIncreaseCounter();
                this.currentFrameScore.push(this.randomRollNum);
            };
            BowlingGameMediator.prototype.lastFrameSecondIndex = function () {
                this.randomRollNum = this.getRandomInt(0, (10 - this.randomRollNum));
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
            };
            BowlingGameMediator.prototype.lastFrameThirdIndex = function () {
                this.view.reset();
                this.randomRollNum = this.getRandomInt(0, 10);
                this.doRoll();
                //display score
                this.view.score(this.$IBowlingGameRollModel.getCurrentScore);
                //game over & set max score
                this.view.maxScore(this.$IBowlingGameRollModel.getCurrentScore);
                this.frameCounter++;
                this.$IBowlingGameRollModel.setFrameCounter(this.frameCounter);
            };
            BowlingGameMediator.prototype.doRoll = function () {
                this.$IBowlingGameRollModel.setCurrentScore(this.randomRollNum);
                this.setRollIndex(this.randomRollNum);
                this.view.roll(this.randomRollNum);
            };
            BowlingGameMediator.prototype.doRollAndIncreaseCounter = function () {
                this.doRoll();
                this.indexCounter++;
            };
            BowlingGameMediator.prototype.setRollIndex = function (num) {
                this.view.rolledAmount(num);
                this.rolls.push(num);
            };
            BowlingGameMediator.prototype.onRemove = function () {
            };
            Object.defineProperty(BowlingGameMediator.prototype, "view", {
                get: function () {
                    return this.viewComponent;
                },
                enumerable: true,
                configurable: true
            });
            return BowlingGameMediator;
        })(_view.Mediator);
        mediator.BowlingGameMediator = BowlingGameMediator;
    })(mediator = ui.mediator || (ui.mediator = {}));
})(ui || (ui = {}));
//# sourceMappingURL=BowlingGameMediator.js.map