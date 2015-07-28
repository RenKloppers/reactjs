/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/30
 * Time: 08:42 AM
 */
///ts:ref=reference
/// <reference path="../reference.ts"/> ///ts:ref:generated
var model;
(function (model) {
    var _signals = origami.signals;
    var BowlingGameRollModel = (function () {
        function BowlingGameRollModel() {
            this.rolled = true;
            this._playerCurrentScore = 0;
            this._currentFrameCounter = 0;
            this._onBallRolled = new _signals.Signal("parent");
        }
        BowlingGameRollModel.prototype.resetGame = function () {
            window.open("index.html", "_self");
        };
        BowlingGameRollModel.prototype.rollBall = function () {
            this.rolled = !this.rolled;
            var parentName = "bowling";
            this._onBallRolled.dispatch(parentName);
            return parentName;
        };
        Object.defineProperty(BowlingGameRollModel.prototype, "onRollBall", {
            get: function () {
                return this._onBallRolled;
            },
            enumerable: true,
            configurable: true
        });
        BowlingGameRollModel.prototype.setCurrentScore = function (currentScore) {
            this._playerCurrentScore += currentScore;
        };
        Object.defineProperty(BowlingGameRollModel.prototype, "getCurrentScore", {
            get: function () {
                return this._playerCurrentScore;
            },
            enumerable: true,
            configurable: true
        });
        BowlingGameRollModel.prototype.setFrameCounter = function (frameCounter) {
            this._currentFrameCounter = frameCounter;
        };
        Object.defineProperty(BowlingGameRollModel.prototype, "getFrameCounter", {
            get: function () {
                return this._currentFrameCounter;
            },
            enumerable: true,
            configurable: true
        });
        return BowlingGameRollModel;
    })();
    model.BowlingGameRollModel = BowlingGameRollModel;
})(model || (model = {}));
//# sourceMappingURL=BowlingGameRollModel.js.map