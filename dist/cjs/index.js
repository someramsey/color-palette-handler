"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleRuleSet = void 0;
const createStyleRuleSet = (palettes, base) => ({
    palettes,
    base,
    apply(paletteKey) {
        const palette = palettes[paletteKey];
        function apply(style) {
            const result = {};
            for (const [key, value] of Object.entries(style)) {
                if (typeof value === 'string') {
                    result[key] = palette[value];
                }
                else {
                    result[key] = apply(value);
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
exports.createStyleRuleSet = createStyleRuleSet;
