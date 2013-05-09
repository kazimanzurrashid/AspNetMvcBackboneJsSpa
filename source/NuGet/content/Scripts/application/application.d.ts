module Application {
    export var serverUrlPrefix: string;
    export function clientUrl(...segments: string[]): string;
}