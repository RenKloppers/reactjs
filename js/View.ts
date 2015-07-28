///ts:ref=reference.ts
/// <reference path="./reference.ts"/> ///ts:ref:generated

class View {
    constructor() {
        D.setEnabled(true);
        window["ReactMediatorMap"] = origami.mvc.view.ReactMediatorMap;
        var context = new origami.mvc.Context(document.body, null, false);

        context.onStartupComplete().add(() => {

            context.injector.mapSingleton(model.BowlingGameRollModel, "IBowlingGameRollModel");

            context.injector.mapClass(ui.view.BowlingGameView, "BowlingGameView");
            context.mediatorMap.mapView("BowlingGameView", ui.mediator.BowlingGameMediator);

            context.injector.mapClass(ui.view.ButtonView, "ButtonView");
            context.mediatorMap.mapView("ButtonView", ui.mediator.ButtonMediator);

            context.injector.mapClass(ui.view.ResetButtonView, "ResetButtonView");
            context.mediatorMap.mapView("ResetButtonView", ui.mediator.ResetButtonMediator);

            context.commandMap.execute(controller.SetupViewCommand);

            var bowlingModel:model.IBowlingGameRollModel = context.injector.get("IBowlingGameRollModel");
            context.commandMap["mapSignal"](bowlingModel.onRollBall, controller.LogModelUpdateCommand, true);
        });
        context.startup();
    }
}