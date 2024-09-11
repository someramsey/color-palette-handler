type BaseStyle<T> = {
    [key: string]: T | BaseStyle<T>;
};
type AppliedStyle<Base, Palette extends Record<string, string>> = {
    [Key in keyof Base]: (Base[Key] extends string ? Palette[Base[Key]] : AppliedStyle<Base[Key], Palette>);
};
export type Palette = Record<string, string>;
export declare const createStyleRuleSet: <PaletteKey extends keyof Palettes, Palettes extends Record<string, Palette>, Base extends BaseStyle<keyof Palettes[PaletteKey]>>(palettes: Palettes, base: Base) => {
    palettes: Palettes;
    base: Base;
    apply<Palette extends Palettes[PaletteKey], Style extends AppliedStyle<Base, Palette>>(paletteKey: PaletteKey): {
        palette: Palette;
        style: Style;
    };
};
export {};
