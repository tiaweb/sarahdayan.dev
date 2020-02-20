const selectorParser = require("postcss-selector-parser");

const breakpoints = require("./tailwind/breakpoints");
const spacing = require("./tailwind/spacing");
const fontSize = require("./tailwind/font-size");

const screens = Object.assign(
  {},
  ...Object.keys(breakpoints).map(breakpoint => ({
    [breakpoint]: `${breakpoints[breakpoint]}px`
  }))
);

module.exports = {
  theme: {
    screens,
    spacing,
    minHeight: spacing,
    maxWidth: spacing,
    fontSize,
    letterSpacing: {
      tightest: "-3px",
      tighter: "-2px",
      tight: "-1px",
      normal: "0",
      wide: "1px",
      wider: "2px",
      widest: "3px"
    },
    extend: {
      colors: {
        background: "var(--color-background)",
        primary: "var(--color-primary)",
        card: "var(--color-card)",
        secondary: "var(--color-secondary)",
      },
      opacity: {
        important: "1 !important"
      }
    },
    fontFamily: {
      sans: [
        "'Gothic A1'",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "sans-serif"
      ]
    }
  },
  variants: {
    opacity: ["group-hover", "hover", "responsive"],
    backgroundColor: ["group-hover"],
    width: ["responsive", "hover", "focus", "group-hover"]
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".transition": {
          transition: "all 0.2s ease-in-out"
        },
        ".scale-3\\/2x": {
          transform: "scale(1.5)"
        },
        ".scale-6\\/5x": {
          transform: "scale(1.2)"
        },
        ".scale-11\\/10x": {
          transform: "scale(1.1)"
        },
        ".scale-2x": {
          transform: "scale(2)"
        },
        ".shift-0": {
          transform: `translateY(${spacing["0"]})`
        },
        ".shift-y-16": {
          transform: `translateY(${spacing["16"]})`
        },
        ".-shift-y-64": {
          transform: `translateY(-${spacing["64"]})`
        },
        ".-shift-y-96": {
          transform: `translateY(-${spacing["96"]})`
        },
        ".gradient-y-background-to-transparent": {
          background:
            "linear-gradient(to bottom, var(--color-background), rgba(var(--color-background-rgb), 0))"
        },
        ".gradient-y-transparent-to-background": {
          background:
            "linear-gradient(to top, var(--color-background), rgba(var(--color-background-rgb), 0))"
        },
        ".gradient-y-card-to-transparent": {
          background:
            "linear-gradient(to bottom, var(--color-card), rgba(var(--color-card-rgb), 0))"
        },
        ".gradient-y-transparent-to-card": {
          background:
            "linear-gradient(to top, var(--color-card), rgba(var(--color-card-rgb), 0))"
        }
      };

      addUtilities(newUtilities, [
        "responsive",
        "hover",
        "group-hover",
        "group-2-hover"
      ]);
    },
    function({ addVariant }) {
      addVariant("group-2-hover", ({ modifySelectors, separator }) => {
        return modifySelectors(({ selector }) => {
          return selectorParser(selectors => {
            selectors.walkClasses(sel => {
              sel.value = `group-2-hover${separator}${sel.value}`;
              sel.parent.insertBefore(
                sel,
                selectorParser().astSync(".group-2:hover ")
              );
            });
          }).processSync(selector);
        });
      });
    }
  ]
};
