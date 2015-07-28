/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 02:18 PM
 */
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
    var view;
    (function (view) {
        //region << Template >>
        var BowlingGameViewTempl = (function (_super) {
            __extends(BowlingGameViewTempl, _super);
            function BowlingGameViewTempl() {
                _super.apply(this, arguments);
            }
            BowlingGameViewTempl.prototype.render = function () {
                return React.DOM.div(null, React.DOM.i(null, this.state.displayScore));
            };
            BowlingGameViewTempl.prototype.getDefaultProps = function () {
                return {};
            };
            BowlingGameViewTempl.prototype.getInitialState = function () {
                return { displayScore: "" };
            };
            return BowlingGameViewTempl;
        })(TypedReact.Component);
        var factory = ui.ViewBase.createFactory(BowlingGameViewTempl);
        //endregion
        var BowlingGameView = (function (_super) {
            __extends(BowlingGameView, _super);
            function BowlingGameView() {
                _super.call(this, factory);
                this.divIndex = 0;
                this.frameDivIndex = 0;
                this.counter = 0;
                this.bowledAmount = 0;
                this.bowlAmount = 10;
                this.reset();
            }
            Object.defineProperty(BowlingGameView.prototype, "component", {
                get: function () {
                    return this._component;
                },
                enumerable: true,
                configurable: true
            });
            BowlingGameView.prototype.reset = function () {
                this.bowledAmount = 0;
                this.bowl(this.bowlAmount, 'white');
            };
            BowlingGameView.prototype.roll = function (val) {
                var output = React.createClass({
                    render: function () {
                        return React.DOM.div(null, "", this.props.name);
                    }
                });
                if (this.divIndex < 21) {
                    var concatStr = ("frame" + (this.divIndex).toString()).toString();
                    if (val === 0) {
                        React.renderComponent(output({ name: "-" }), document.getElementById(concatStr));
                    }
                    else if (val === 10) {
                        React.renderComponent(output({ name: "X" }), document.getElementById(concatStr));
                    }
                    else {
                        React.renderComponent(output({ name: val }), document.getElementById(concatStr));
                    }
                    this.divIndex++;
                }
                else {
                }
            };
            BowlingGameView.prototype.score = function (val) {
                var scoreOutput = React.createClass({
                    render: function () {
                        return React.DOM.div(null, "", this.props.name);
                    }
                });
                var concatStr = ("score" + (this.frameDivIndex).toString()).toString();
                React.renderComponent(scoreOutput({ name: val }), document.getElementById(concatStr));
                this.frameDivIndex++;
            };
            BowlingGameView.prototype.maxScore = function (val) {
                var scoreOutput = React.createClass({
                    render: function () {
                        return React.DOM.div(null, "", this.props.name);
                    }
                });
                var concatStr = ("maxscore").toString();
                React.renderComponent(scoreOutput({ name: val }), document.getElementById(concatStr));
                this.frameDivIndex++;
            };
            BowlingGameView.prototype.bowl = function (val, colour) {
                for (var i = 0; i < val; i++) {
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                    ctx.beginPath();
                    if (i >= 6 && i <= 9) {
                        ctx.arc(-140 + (30 * i), 25, 10, 0, 2 * Math.PI);
                    }
                    else if (i >= 3 && i <= 5) {
                        ctx.arc(-35 + (30 * i), 50, 10, 0, 2 * Math.PI);
                    }
                    else if (i >= 1 && i <= 2) {
                        ctx.arc(40 + (30 * i), 75, 10, 0, 2 * Math.PI);
                    }
                    else if (i == 0) {
                        ctx.arc(85, 100, 10, 0, 2 * Math.PI);
                    }
                    ctx.fillStyle = colour;
                    ctx.fill();
                    ctx.stroke();
                }
            };
            BowlingGameView.prototype.rolledAmount = function (amount) {
                this.bowledAmount += amount;
                this.bowl(this.bowledAmount, 'blue');
            };
            return BowlingGameView;
        })(ui.ViewBase);
        view.BowlingGameView = BowlingGameView;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
//# sourceMappingURL=BowlingGameView.js.map