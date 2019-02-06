import React from 'react'
import { Link } from 'gatsby'
import { colors } from '../utils/colors'

const RecipeCard = ({ title, slug, imageSrc, totalTime, difficulty }) => (
  <Link
    to={slug}
    css={{
      position: `relative`,
      display: `flex`,
      flexDirection: `column`,
      background: colors.white,
      height: `100%`,
      border: `solid 1px ${colors.black}`,
      transition: `transform 0.2s ease`,

      ':after': {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: colors.black,
        content: '""',
        transition: `transform 0.2s ease`,
      },
      ':hover': {
        transform: `translate(15px, -15px)`,
        ':after': {
          transform: `translate(-15px, 15px)`,
        },
      },
    }}
  >
    <img
      css={{
        width: `100%`,
        borderBottom: `solid 1px ${colors.black}`,
      }}
      src={imageSrc}
      alt={title}
    />

    <div
      className="card-meta"
      css={{
        padding: `10px`,
        background: colors.white,
        height: `100%`,
      }}
    >
      <h2
        css={{
          padding: `10px 0`,
          fontSize: `1.1rem`,
          fontFamily: 'source code pro',
          fontWeight: `bold`,
        }}
      >
        {title}
      </h2>

      <div
        css={{
          display: `flex`,
          justifyContent: `space-between`,

          '& p': {
            margin: 0,
            textTransform: `capitalize`,
          },
        }}
      >
        <p>Time: {totalTime} mins</p>
        <p>Level: {difficulty}</p>
      </div>
    </div>
  </Link>
)

export default RecipeCard
