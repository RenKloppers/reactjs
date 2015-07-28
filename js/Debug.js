
(function () {
    var enabled = false;
    var _maxMessages = 0;
    var _msgCount = 0;
    var _groupStack = [];

    var blank = function () {
    };

    var dbg = window["D"] || {};

    dbg["setEnabled"] = function (toggle, maxMessages) {
        if (typeof maxMessages === "undefined") { maxMessages = 100000; }
        enabled = toggle;
        _maxMessages = maxMessages;
        toggleOutput(enabled);
    };

    var fnMap = [
        { name: "error", cons: "error" },
        { name: "warn", cons: "warn" },
        { name: "log", cons: "log" },
        { name: "info", cons: "info" },
        { name: "debug", cons: "debug", fallback: "log" },
        {
            name: "group", cons: null, fallback: "log", fn: function (groupName, groupFunction) {
                _groupStack.push(groupName);
                dbg["groupCollapsed"](groupName);
                try  {
                    groupFunction();
                } catch (e) {
                    var name;
                    var path = "";
                    while (name = _groupStack.pop()) {
                        path += " > " + name;
                        dbg["groupEnd"](name);
                    }

                    dbg["error"]("Error in group: ", path);
                    throw e;
                }
                dbg["groupEnd"](groupName);
                _groupStack.pop();
            } },
        { name: "groupExpanded", cons: "group", fallback: "log" },
        { name: "groupCollapsed", cons: "groupCollapsed", fallback: "log" },
        { name: "groupEnd", cons: "groupEnd", fallback: "log" },
        { name: "dir", cons: "dir" },
        { name: "stackTrace", cons: "trace", fallback: "dir" }
    ];

    // IE doesn't have a console by default, we mock it out.
    if (!window["console"]) {
        window["console"] = (window["console"] || {});
        for (var j = 0; j < fnMap.length; j++) {
            if (console[fnMap[j].cons]) {
                console[fnMap[j].cons] = blank;
            }
        }
    }

    for (var k = 0; k < fnMap.length; k++) {
        if (!dbg[fnMap[k].name]) {
            dbg[fnMap[k].name] = blank;
        }
    }

    function toggleOutput(enabled) {
        if (enabled) {
            for (var i = 0; i < fnMap.length; i++) {
                wrap(fnMap[i].name, fnMap[i].cons, fnMap[i].fallback, fnMap[i].fn);
            }
        }
    }

    function wrap(name, consoleName, fallbackName, fn) {
        var consoleFunc = fn || bindToConsole(consoleName, fallbackName);

        Object.defineProperty(dbg, name, {
            get: function () {
                if (_maxMessages !== 0 && _msgCount++ >= _maxMessages) {
                    _msgCount = 0;
                    console.clear();
                }
                return consoleFunc;
            },
            enumerable: true,
            configurable: true
        });
    }

    function bindToConsole(name, fallbackName) {
        var nameToUse = console[name] ? name : fallbackName;

        if (console[nameToUse].bind) {
            return console[nameToUse].bind(console);
        }

        if (Function.prototype.bind) {
            return Function.prototype.bind.call(console[nameToUse], console);
        }

        return Function.prototype.apply.apply(console[nameToUse], [console]);
    }

    window["D"] = dbg;
})();

var D;
//# sourceMappingURL=Debug.js.map
