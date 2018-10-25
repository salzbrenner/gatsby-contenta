import React from 'react'
import { Link } from 'gatsby'
import { colors } from '../utils/colors'

const Header = ({ siteTitle }) => (
  <div
    css={{
      marginBottom: '1.45rem',
      padding: `10px`,
      borderBottom: `solid 1px ${colors.black}`,
    }}
  >
    <div
      css={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
        maxWidth: `1400px`,
        margin: `0 auto`,
      }}
    >
      <h2 css={{ margin: 0 }}>
        <Link to="/">{siteTitle}</Link>
      </h2>
      <Link css={{ fontFamily: 'source code pro' }} to="/recipes">
        Recipes
      </Link>
    </div>
  </div>
)

export default Header
