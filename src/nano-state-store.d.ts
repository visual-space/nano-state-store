declare module 'nano-state-store' {
    export var nanoBind: (parent: HTMLElement, ...selectors: any[]) => HTMLElement[];
    export var nanoBindAll: (parent: HTMLElement, ...selectors: string[]) => HTMLElement[];
}
