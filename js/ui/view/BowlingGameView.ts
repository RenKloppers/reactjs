/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/29
 * Time: 02:18 PM
 */
///ts:ref=reference.ts
/// <reference path="../../reference.ts"/> ///ts:ref:generated

module ui.view {
    //region << Template >>
    class BowlingGameViewTempl extends TypedReact.Component<BowlingGameViewProps, BowlingGameViewState> {
        public render():React.Descriptor<any> {
            return React.DOM.div(null, React.DOM.i(null, this.state.displayScore));
        }

        public getDefaultProps():BowlingGameViewProps {
            return {};
        }

        public getInitialState():BowlingGameViewState {
            return {displayScore: ""};
        }
    }

    interface BowlingGameViewState {
        displayScore:string;
    }

    interface BowlingGameViewProps {
    }

    var factory:any = ViewBase.createFactory(BowlingGameViewTempl);
    //endregion

    export class BowlingGameView extends ViewBase implements ui.IBowlingGameView {

        private divIndex:number = 0;
        private frameDivIndex:number = 0;
        public counter:number = 0;
        public bowledAmount:number = 0;
        public bowlAmount:number = 10;

        constructor() {
            super(factory);
            this.reset();
        }

        private get component():BowlingGameViewTempl {
            return <any>this._component;
        }

        public reset(){
            this.bowledAmount = 0;
            this.bowl(this.bowlAmount, 'white');
        }

        public roll(val:number) {
            var output = React.createClass({
                render: function () {
                    return React.DOM.div(null, "", this.props.name);
                }
            });

            if(this.divIndex < 21) {
                var concatStr:string = ("frame" + (this.divIndex).toString()).toString();
                if( val === 0)
                {
                    React.renderComponent(output({name: "-"}), document.getElementById(concatStr));
                }else if (  val === 10)  {
                    React.renderComponent(output({name: "X"}), document.getElementById(concatStr));
                }
                else
                {
                    React.renderComponent(output({name: val}), document.getElementById(concatStr));
                }
                this.divIndex++;
            }
            else
            {
                //reset game
            }
        }

        public score(val:number) {
            var scoreOutput = React.createClass({
                render: function () {
                    return React.DOM.div(null, "", this.props.name);
                }
            });
            var concatStr:string = ("score" + (this.frameDivIndex).toString()).toString();
            React.renderComponent(scoreOutput({name: val}), document.getElementById(concatStr));
            this.frameDivIndex++;
        }

        public maxScore(val:number) {
            var scoreOutput = React.createClass({
                render: function () {
                    return React.DOM.div(null, "", this.props.name);
                }
            });

            var concatStr:string = ("maxscore").toString();
            React.renderComponent(scoreOutput({name: val}), document.getElementById(concatStr));
            this.frameDivIndex++;
        }

        public bowl(val:number, colour:string){
            for (var i = 0; i < val; i++) {
                var c : any = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.beginPath();
                if (i >= 6 && i <= 9) {
                    ctx.arc(-140 + (30 * i), 25, 10, 0, 2 * Math.PI);
                } else if (i >= 3 && i <= 5) {
                    ctx.arc(-35 + (30 * i), 50, 10, 0, 2 * Math.PI);
                } else if (i >= 1 && i <= 2) {
                    ctx.arc(40 + (30 * i), 75, 10, 0, 2 * Math.PI);
                } else if (i == 0) {
                    ctx.arc(85, 100, 10, 0, 2 * Math.PI);
                }
                ctx.fillStyle = colour;
                ctx.fill();
                ctx.stroke();
            }
        }

        public rolledAmount(amount:number)
        {
            this.bowledAmount += amount;
            this.bowl(this.bowledAmount, 'blue');
        }
    }
}