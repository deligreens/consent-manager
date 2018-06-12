import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled('div')`
  ${fontStyles};
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px;
  padding-right: 120px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  border-top: 4px solid #ed715a;
`

const Content = styled('div')`
  a,
  button {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const CloseButton = styled('button')`
  position: absolute;
  right: 16px;
  top: 8px;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: #f9fafc;
  background-color: #ed715a;
  border-radius: 2px;
  padding: 4px 8px;
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

export default class Banner extends PureComponent {
  static displayName = 'Banner'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onChangePreferences: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
  }

  render() {
    const {
      innerRef,
      onAccept,
      onChangePreferences,
      content,
      backgroundColor,
      textColor
    } = this.props

    return (
      <Root
        innerRef={innerRef}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <Content>
          <P>
            {content}{' '}
            <button type="button" onClick={onChangePreferences}>
              Gérer mes préférences
            </button>{' '}
          </P>
        </Content>

        <CloseButton
          type="button"
          title="Accepter la politique de gestion des données de deligreens.com"
          aria-label="Accepter la politique de gestion des données de deligreens.com"
          onClick={onAccept}
        >
          ÇA ME VA !
        </CloseButton>
      </Root>
    )
  }
}
