interface D {
    error(...messages: any[]): void;
    warn(...messages: any[]): void;
    log(...messages: any[]): void;
    info(...messages: any[]): void;
    debug(...messages: any[]): void;
    group(name: string, groupFunction: Function): void;
    groupExpanded(name: string): void;
    groupEnd(): void;
    exception(exception: any): void;
    dir(obj: any): void;
    stackTrace(err: Error): void;
    setEnabled(toggle: boolean): void;
}
declare var D: D;
