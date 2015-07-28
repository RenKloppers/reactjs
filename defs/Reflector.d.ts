
declare module origami.reflector {
    class Reflector {
        private static _regex;
        private static _genID;
        private static regex;
        static getClassName(object: any): string;
        static getGenID(): string;
        static getClassNameAsVariableName(object: any): string;
        static getConstructorParameterNamesCSV(object: any): string;
        static getConstructorParameterNamesArray(object: any): string[];
        static getFunctionParameterNamesArray(func: Function): string[];
        static hasFunction(object: any, functionName: string): boolean;
        private static csvToArray(csv);
        private static executeRegexAgainstObject(object);
        private static getConstructor(object);
        private static executeRegexAgainstFunction(func);
    }
}
