# Mini Typesafe Color Palette Handler

This is a simple color palette handler that allows you to define a rule set and use safely use a color palette in your project. Mostly in react like projects.

## Installation
```bash
npm i pallette
```

## Usage

```typescript
import { createStyleRuleSet, Palette } from ".";

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
```

This is just a single file utility lib, and it is not that well thought out. You probably shouldn't use this in production. But it's nice if you are obsessed with type safety on everything.