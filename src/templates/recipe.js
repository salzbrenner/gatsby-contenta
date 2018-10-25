import React from 'react'
import GridContainer from '../components/grid-container'
import GridRow from '../components/grid-row'
import { colors } from '../utils/colors'
import { graphql } from 'gatsby';
import Layout from '../components/layout'

const RecipeTemplate = ({ data }) => {
  const {
    title,
    totalTime,
    preparationTime,
    instructions,
    ingredients,
    difficulty,
  } = data.recipes

  const imageSrc =
    data.recipes.relationships.image.relationships.imageFile.localFile
      .childImageSharp.sizes.src;

  return (
    <Layout>
      <GridContainer>
        <div
          css={{
            position: `relative`,
            transform: `translate(20px, -20px)`,
            width: `80%`,
            margin: `40px auto`,

            ':after': {
              position: `absolute`,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -1,
              background: colors.black,
              transform: `translate(-20px, 20px)`,
              content: '""',
            },
          }}
        >
          <img
            css={{
              width: `100%`,
              border: `solid 1px ${colors.black}`,
            }}
            src={imageSrc}
          />
        </div>

        <div
          css={{
            maxWidth: `800px`,
            margin: `0 auto`,

            '& h2': {
              position: `relative`,
              display: `inline-block`,
              fontFamily: `source code pro`,
              fontSize: `2rem`,
              margin: `40px 0 20px`,

              ':after': {
                position: `absolute`,
                left: 0,
                right: 0,
                bottom: `-5px`,
                borderBottom: `solid 3px ${colors.black}`,
                content: '""',
              },
            },

            '& span, & p, & li': {
              fontSize: `1.3rem`,
              lineHeight: 1.9,
            },
          }}
        >
          <h1
            css={{
              fontFamily: `source code pro`,
              fontSize: `5rem`,
              lineHeight: 1.05,
              marginBottom: `30px`,
            }}
          >
            {title}
          </h1>

          <div>
          <span css={{ textTransform: `capitalize` }}>
            <strong>Difficulty:</strong> {difficulty} /{' '}
          </span>
            <span>
            <strong>Prep time:</strong> {preparationTime} /{' '}
          </span>
            <span>
            <strong>Total time:</strong> {totalTime}
          </span>
          </div>

          <h2>Ingredients</h2>

          <ul
            css={{
              marginLeft: 0,
              paddingLeft: `20px`,
              lineHeight: 1.4,
            }}
          >
            {ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <p>{instructions}</p>
        </div>
      </GridContainer>
    </Layout>
  )
}

export default RecipeTemplate

export const query = graphql`
  query RecipeTemplate($slug: String!) {
    recipes(fields: { slug: { eq: $slug } }) {
      title
      difficulty
      totalTime
      preparationTime
      instructions
      ingredients
      relationships {
        image {
          relationships {
            imageFile {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 1400, maxHeight: 800) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
