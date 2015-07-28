var origami;
(function (origami) {
    (function (reflector) {
        var Reflector = (function () {
            function Reflector() {
            }
            Object.defineProperty(Reflector, "regex", {
                // TODO add code to traverse prototypes to build an inheritance tree.
                // TODO see if theres a way to determine if the base class has a constructor and if not, get params from super
                // for getConstructorParams
                get: function () {
                    // Captures function name(0) and parameter names(1)
                    return Reflector._regex = Reflector._regex || new RegExp("function ?([^\\(]*)\\(([^)]*)\\)", "i");
                },
                enumerable: true,
                configurable: true
            });

            Reflector.getClassName = function (object) {
                if (object && object.__autoGenName) {
                    return object.__autoGenName;
                }

                var name = Reflector.executeRegexAgainstObject(object)[1];

                if (name.length === 1) {
                    object.__autoGenName = name = Reflector.getGenID();
                }

                return name;
            };

            Reflector.getGenID = function () {
                Reflector._genID++;

                return "autoGen" + Reflector._genID;
            };

            Reflector.getClassNameAsVariableName = function (object) {
                var className = this.getClassName(object);
                return className.replace(className.charAt(0), className.charAt(0).toLowerCase());
            };

            Reflector.getConstructorParameterNamesCSV = function (object) {
                return Reflector.executeRegexAgainstObject(object)[2];
            };

            Reflector.getConstructorParameterNamesArray = function (object) {
                var result = Reflector.executeRegexAgainstObject(object);

                return Reflector.csvToArray(result[2]);
            };

            Reflector.getFunctionParameterNamesArray = function (func) {
                return Reflector.csvToArray(Reflector.executeRegexAgainstFunction(func)[2]);
            };

            Reflector.hasFunction = function (object, functionName) {
                var constructorFunc = this.getConstructor(object);
                return !!constructorFunc.prototype[functionName];
            };

            Reflector.csvToArray = function (csv) {
                return csv.replace(/\s/, "").split(",").filter(function (element) {
                    return element !== "";
                });
            };

            Reflector.executeRegexAgainstObject = function (object) {
                var blank = ["", "", ""];
                if (object === null || object === undefined) {
                    return blank;
                }

                return Reflector.executeRegexAgainstFunction(Reflector.getConstructor(object)) || blank;
            };

            Reflector.getConstructor = function (object) {
                var signature = ("" + object.constructor);

                if (signature.indexOf("Function") !== -1) {
                    // We've received a class, it is the constructor.
                    return object;
                }

                return object.constructor;
            };

            Reflector.executeRegexAgainstFunction = function (func) {
                if (func === null || func === undefined) {
                    return ["", "", ""];
                }

                var signature = ("" + func);

                return signature.match(Reflector.regex);
            };
            Reflector._genID = 0;
            return Reflector;
        })();
        reflector.Reflector = Reflector;
    })(origami.reflector || (origami.reflector = {}));
    var reflector = origami.reflector;
})(origami || (origami = {}));
//# sourceMappingURL=Reflector.js.map
