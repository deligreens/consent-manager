import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'react-emotion'
import nanoid from 'nanoid'
import fontStyles from './font-styles'

const ANIMATION_DURATION = '200ms'
const ANIMATION_EASING = 'cubic-bezier(0.0, 0.0, 0.2, 1)'

const Overlay = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 31, 61, 0.7);
`

const openAnimation = keyframes`
  from {
    transform: translateY(-16px);
    opacity: 0;
  }
  to {
    transform: translatY(0);
    opacity: 1;
  }
`

const Root = styled('section')`
  ${fontStyles};
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 16px);
  max-height: calc(100vh - 16px);
  width: ${props => props.width};
  margin: 8px;
  background: #fff;
  border-radius: 2px;
  animation: ${openAnimation} ${ANIMATION_DURATION} ${ANIMATION_EASING} both;
`

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const Header = styled('div')`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 2px solid #e5e1ec;
`

const Title = styled('h2')`
  margin: 0;
  color: #494457;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
`

const HeaderCancelButton = styled('button')`
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`

const Content = styled('div')`
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 0;
  min-height: 0;
  font-size: 14px;
  line-height: 1.3;

  p {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 0.7em;
    }
  }

  a {
    color: #64afab;
    &:hover {
      color: #4d8885;
    }
    &:active {
      color: #4d8885;
    }
  }
`

const Buttons = styled('div')`
  padding: 16px;
  text-align: right;
`

export default class Dialog extends PureComponent {
  static displayName = 'Dialog'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    buttons: PropTypes.node.isRequired,
    width: PropTypes.string
  }

  static defaultProps = {
    onCancel: undefined,
    width: '750px'
  }

  constructor() {
    super()

    this.titleId = nanoid()

    this.container = document.createElement('div')
    this.container.setAttribute('data-consent-manager-dialog', '')
    document.body.appendChild(this.container)
  }

  render() {
    const {onCancel, onSubmit, title, children, buttons, width} = this.props

    const dialog = (
      <Overlay onClick={this.handleOverlayClick}>
        <Root
          innerRef={this.handleRootRef}
          role="dialog"
          aria-modal
          aria-labelledby={this.titleId}
          width={width}
        >
          <Header>
            <Title id={this.titleId}>{title}</Title>
            {onCancel && (
              <HeaderCancelButton
                onClick={onCancel}
                title="Cancel"
                aria-label="Cancel"
              >
                ✕
              </HeaderCancelButton>
            )}
          </Header>

          <Form innerRef={this.handleFormRef} onSubmit={onSubmit}>
            <Content>{children}</Content>

            <Buttons>{buttons}</Buttons>
          </Form>
        </Root>
      </Overlay>
    )

    return ReactDOM.createPortal(dialog, this.container)
  }

  componentDidMount() {
    const {innerRef} = this.props

    this.form.querySelector('input,button').focus()
    document.body.addEventListener('keydown', this.handleEsc, false)
    document.body.style.overflow = 'hidden'

    innerRef(this.container)
  }

  componentWillUnmount() {
    const {innerRef} = this.props

    document.body.removeEventListener('keydown', this.handleEsc, false)
    document.body.style.overflow = ''

    document.body.removeChild(this.container)
    innerRef(null)
  }

  handleRootRef = node => {
    this.root = node
  }

  handleFormRef = node => {
    this.form = node
  }

  handleOverlayClick = e => {
    const {onCancel} = this.props

    // Ignore propogated clicks from inside the dialog
    if (onCancel && !this.root.contains(e.target)) {
      onCancel()
    }
  }

  handleEsc = e => {
    const {onCancel} = this.props

    // Esc key
    if (onCancel && e.keyCode === 27) {
      onCancel()
    }
  }
}
