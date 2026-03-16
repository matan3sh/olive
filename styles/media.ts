import { css } from 'styled-components'
import { theme } from './theme'

export const media = {
  belowXl: (strings: TemplateStringsArray, ...interpolations: any[]) =>
    css`@media (max-width: ${theme.breakpoints.xl}) { ${css(strings, ...interpolations)} }`,
  belowLg: (strings: TemplateStringsArray, ...interpolations: any[]) =>
    css`@media (max-width: ${theme.breakpoints.lg}) { ${css(strings, ...interpolations)} }`,
  belowMd: (strings: TemplateStringsArray, ...interpolations: any[]) =>
    css`@media (max-width: ${theme.breakpoints.md}) { ${css(strings, ...interpolations)} }`,
  belowSm: (strings: TemplateStringsArray, ...interpolations: any[]) =>
    css`@media (max-width: ${theme.breakpoints.sm}) { ${css(strings, ...interpolations)} }`,
  aboveLg: (strings: TemplateStringsArray, ...interpolations: any[]) =>
    css`@media (min-width: calc(${theme.breakpoints.lg} + 1px)) { ${css(strings, ...interpolations)} }`,
}
