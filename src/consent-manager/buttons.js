import styled, {css} from 'react-emotion'

const baseStyles = css`
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: #f9fafc;
  background-color: #7bd7d2;
  border-radius: 2px;
  height: 62px;
  padding: 20px 25px;
  white-space: nowrap;
  border: none;
  transition: all 120ms cubic-bezier(0.215, 0.61, 0.355, 1); /* easeOutCubic */

  &:not(.disabled):hover,
  &:not([disabled]):hover,
  &:not(.disabled):focus,
  &:not([disabled]):focus {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
    outline: none;
    cursor: pointer;
  }

  &[disabled],
  &.disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`

export const DefaultButton = styled('button')`
  ${baseStyles};
  background-color: transparent;
  color: #494457;
`

export const GreenButton = styled('button')`
  ${baseStyles};
  color: #f9fafc;
  background-color: #7bd7d2;
`

export const RedButton = styled('button')`
  ${baseStyles};
  background-color: #ed4241;
`
