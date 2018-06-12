import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'react-emotion'
import Dialog from './dialog'
import {DefaultButton, GreenButton} from './buttons'

const hideOnMobile = css`
  @media (max-width: 600px) {
    display: none;
  }
`

const TableScroll = styled('div')`
  overflow-x: auto;
  margin-top: 32px;
`

const Table = styled('table')`
  border-collapse: collapse;
  font-size: 12px;
`

const ColumnHeading = styled('th')`
  background: #f7f8fa;
  color: #494457;
  font-weight: 600;
  text-align: left;
  border-width: 2px;
`

const RowHeading = styled('th')`
  font-weight: normal;
  text-align: left;
`

const Row = styled('tr')`
  th,
  td {
    vertical-align: top;
    padding: 8px 12px;
    border: 1px solid #e5e1ec;
    border-top: none;
  }
`

const InputCell = styled('td')`
  input {
    vertical-align: middle;
  }
  label {
    display: block;
    margin-bottom: 4px;
    white-space: nowrap;
  }
`

export default class PreferenceDialog extends PureComponent {
  static displayName = 'PreferenceDialog'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    marketingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    advertisingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    functionalDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    marketingAndAnalytics: PropTypes.bool,
    advertising: PropTypes.bool,
    functional: PropTypes.bool,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
  }

  static defaultProps = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null
  }

  render() {
    const {
      innerRef,
      onCancel,
      marketingDestinations,
      advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      advertising,
      functional,
      title,
      content
    } = this.props

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onCancel}>
          Annuler
        </DefaultButton>
        <GreenButton type="submit">Enregistrer</GreenButton>
      </div>
    )

    return (
      <Dialog
        innerRef={innerRef}
        title={title}
        buttons={buttons}
        onCancel={onCancel}
        onSubmit={this.handleSubmit}
      >
        {content}
        <br />
        <br />
        <p>
          En utilisant notre site vous consentez à notre{' '}
          <a
            href="https://deligreens.com/pages/politique-de-confidentialite"
            target="_blank"
            rel="noopener noreferrer"
          >
            politique de confidentialité.
          </a>
        </p>
        <br />
        <p>
          Le tableau ci-dessous détaille notre utilisation des données. Vous y
          avez la possibilité de désactiver une catégorie de données collectées
          en sélectionnant &lquote;Non&rquote; dans la ligne correspondante puis
          en sauvegardant vos préférences.
        </p>
        <TableScroll>
          <Table>
            <thead>
              <Row>
                <ColumnHeading scope="col">Autoriser</ColumnHeading>
                <ColumnHeading scope="col">Catégories</ColumnHeading>
                <ColumnHeading scope="col">Objectifs</ColumnHeading>
                <ColumnHeading scope="col" className={hideOnMobile}>
                  Outils
                </ColumnHeading>
              </Row>
            </thead>

            <tbody>
              <Row>
                <InputCell>
                  <label>
                    <input
                      type="radio"
                      name="functional"
                      value="true"
                      checked={functional === true}
                      onChange={this.handleChange}
                      aria-label="Autoriser la collecte de données à but de support"
                      required
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="functional"
                      value="false"
                      checked={functional === false}
                      onChange={this.handleChange}
                      aria-label="Interdire la collecte de données à but de support"
                      required
                    />{' '}
                    Non
                  </label>
                </InputCell>
                <RowHeading scope="row">Support</RowHeading>
                <td>
                  <p>
                    Pour être en mesure de vous apporter les meilleurs réponses
                    possibles lorsque vous nous contactez pour du support ou
                    SAV. Ainsi que pour prendre connaissance des éventuels bugs
                    que vous pouvez rencontrer sur notre site et pouvoir ensuite
                    les corriger.
                  </p>
                  <p>
                    Nous vous conseillons fortement de nous autoriser à
                    collecter ces données.
                  </p>
                  {/* <p className={hideOnMobile}>
                    For example, these tools enable you to communicate with us
                    via live chat.
                  </p> */}
                </td>
                <td className={hideOnMobile}>
                  {functionalDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <InputCell>
                  <label>
                    <input
                      type="radio"
                      name="marketingAndAnalytics"
                      value="true"
                      checked={marketingAndAnalytics === true}
                      onChange={this.handleChange}
                      aria-label="Autoriser la collecte de données à but de marketing et d'analyses"
                      required
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="marketingAndAnalytics"
                      value="false"
                      checked={marketingAndAnalytics === false}
                      onChange={this.handleChange}
                      aria-label="Interdire la collecte de données à but de marketing et d'analyses"
                      required
                    />{' '}
                    Non
                  </label>
                </InputCell>
                <RowHeading scope="row">Marketing et analyses</RowHeading>
                <td>
                  <p>
                    Pour comprendre les comportements de nos clients afin de
                    vous proposer une expérience de navigation plus pertinente
                    et personnalisée.
                  </p>
                  {/* <p className={hideOnMobile}>
                    For example, we collect information about which pages you
                    visit to help us present more relevant information.
                  </p> */}
                </td>
                <td className={hideOnMobile}>
                  {marketingDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <InputCell>
                  <label>
                    <input
                      type="radio"
                      name="advertising"
                      value="true"
                      checked={advertising === true}
                      onChange={this.handleChange}
                      aria-label="Autoriser la collecte de données à but publicitaire"
                      required
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="advertising"
                      value="false"
                      checked={advertising === false}
                      onChange={this.handleChange}
                      aria-label="Interdire la collecte de données à but publicitaire"
                      required
                    />{' '}
                    Non
                  </label>
                </InputCell>
                <RowHeading scope="row">Publicité</RowHeading>
                <td>
                  <p>
                    Pour personnaliser et analyser l&apos;efficacité de notre
                    publicité sur Facebook.
                  </p>
                  {/* <p className={hideOnMobile}>
                    For example, we may serve you a personalized ad based on the
                    pages you visit on our site.
                  </p> */}
                </td>
                <td className={hideOnMobile}>
                  {advertisingDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <td>N/A</td>
                <RowHeading scope="row">Essentiel</RowHeading>
                <td>
                  <p>
                    Certains des cookies de notre site son nécessaires au
                    fonctionnement du magasin. Vous pouvez les éviter depuis les
                    paramètres de votre navigateur mais dans ce cas il est
                    probable que nos services ne fonctionnent plus correctement.
                  </p>
                  {/* <p>
                    For example, we store your website data collection
                    preferences so we can honor them if you return to our site.
                    You can disable these cookies in your browser settings but
                    if you do the site may not work as intended.
                  </p> */}
                </td>
                <td className={hideOnMobile} />
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    )
  }

  handleChange = e => {
    const {onChange} = this.props

    onChange(e.target.name, e.target.value === 'true')
  }

  handleSubmit = e => {
    const {onSave, marketingAndAnalytics, advertising, functional} = this.props

    e.preventDefault()

    // Safe guard against browsers that don't prevent the
    // submission of invalid forms (Safari < 10.1)
    if (
      marketingAndAnalytics === null ||
      advertising === null ||
      functional === null
    ) {
      return
    }

    onSave()
  }
}
