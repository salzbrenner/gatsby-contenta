import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { css } from 'glamor'
import { colors } from '../utils/colors'

import Header from './header'
import './normalize.css'
import SEO from './SEO'

css.global('html, body', {
  padding: 0,
  background: 'white',
  fontFamily: 'Libre Franklin',
  color: colors.black,
})

css.global('a', {
  color: colors.black,
  textDecoration: 'none',
})

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
