import { css } from 'styled-components'

/**
 * Smooth underline reveal from left — for nav & text links.
 * Requires no extra markup; uses a ::after pseudo-element.
 */
export const hoverUnderline = css`
  position: relative;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.25s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`

/**
 * Subtle lift + brightness shift — for solid dark CTA buttons.
 */
export const hoverButton = css`
  transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    filter: brightness(1.35);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(17, 38, 12, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
    filter: brightness(1.1);
  }
`

/**
 * Shared base for all solid dark CTA buttons (links or native buttons).
 * Handles colours, typography, reset and hover — consumers add sizing only.
 */
export const darkButtonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  border-radius: 0;
  white-space: nowrap;
  ${hoverButton}
`
