type BaseStyle<T> = {
    [key: string]: T | BaseStyle<T>
};

type AppliedStyle<Base, Palette extends Record<string, string>> = {
    [Key in keyof Base]: (
        Base[Key] extends string ? Palette[Base[Key]] : AppliedStyle<Base[Key], Palette>
    )
};

export type Palette = Record<string, string>;

export const createStyleRuleSet = <
    PaletteKey extends keyof Palettes,
    Palettes extends Record<string, Palette>,
    Base extends BaseStyle<keyof Palettes[PaletteKey]>
>(palettes: Palettes, base: Base) => ({
    palettes,
    base,
    apply<Palette extends Palettes[PaletteKey], Style extends AppliedStyle<Base, Palette>>(paletteKey: PaletteKey): { palette: Palette, style: Style } {
        const palette = palettes[paletteKey] as Palette;

        function apply(style: Base): Style {
            const result: any = {};

            for (const [key, value] of Object.entries(style)) {
                if (typeof value === 'string') {
                    result[key] = palette[value];
                } else {
                    result[key] = apply(value as Base);
                }
            }

            return result;
        }

        return {
            palette,
            style: apply(base)
        };
    }
});


const lightPalette = {
    gray: "#f0f0f0",
    lightGray: "#f8f8f8",
    darkGray: "#d0d0d0",
    primary: "#007bff",
    secondary: "#6c757d",
} as const satisfies Palette;

const darkPalette = {
    gray: "#d1d1d1",
    lightGray: "#d8d8d8",
    darkGray: "#b0b0b0",
    primary: "#007bff",
    secondary: "#6c757d"
} as const satisfies Palette;

const ruleSet = createStyleRuleSet({ lightPalette, darkPalette }, {
    text: "lightGray",
    background: "gray",
    panel: "secondary",
    button: {
        active: "primary",
        disabled: "gray",
    }

});

console.log(ruleSet.apply("lightPalette").style.button.active); // #007bff