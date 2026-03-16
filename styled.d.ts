// Module augmentation for styled-components DefaultTheme.
// The `export {}` makes this a module file so declare module augments (not replaces) the package.
export {}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string
      textDark: string
      textNav: string
      textSubtitle: string
      btnDark: string
      sectionGreen: string
      quoteGreen: string
      dotDark: string
      navBorder: string
      sectionBorder: string
      muted: string
      imageBg: string
      borderMuted: string
    }
    fonts: { inter: string }
    breakpoints: { xl: string; lg: string; md: string; sm: string }
    header: { row1Height: string; divider: string; row2Height: string; mobileHeight: string }
  }
}
