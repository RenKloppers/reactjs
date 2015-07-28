/**
 * Created with IntelliJ IDEA.
 * User: Ren
 * Date: 2014/10/30
 * Time: 12:00 PM
 */

/// <reference path="../../TypedReact.ts" />
/// <reference path="../../../defs/karma-jasmine.d.ts" />
/// <reference path="../view/BowlingGameView.ts" />

describe('Bowling Game', function () {

    var game;

    beforeEach(function () {
        game = new ui.view.BowlingGameView();
    })

    it("should work", function () {
        expect(true).toBe(true);
    });

    it("x should be false", function () {
        var x = false;
        expect(x).toBe(false);
    });

    /*
         it('can roll gutter game', function () {
     rollMany(0, 20);
     expect(game.score()).toBe(0);
     })

    it('can roll bad score', function () {
        game.roll(1);
        game.roll(1);
        rollMany(0, 20);
        expect(game.score()).toBe(2);
    })

    it('can roll a spare', function () {
        game.roll(5);
        game.roll(5);
        game.roll(3);
        rollMany(0, 17);
        expect(game.score()).toBe(18);
    })

    it('can roll strike', function () {
        game.roll(10);
        game.roll(4);
        game.roll(3);
        rollMany(0, 20);
        expect(game.score()).toBe(24);
    })

    it('can roll perfect game', function () {
        rollMany(10, 12);
        expect(game.score()).toBe(300);
    })

    var rollMany = function (pins, rolls) {
        for (var i = 0; i < rolls; i++) {
            game.roll(pins);
        }
    }

    */

});