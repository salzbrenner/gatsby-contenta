import React, { Component } from 'react'
import { graphql } from 'gatsby'
import GridContainer from '../components/grid-container'
import GridRow from '../components/grid-row'
import RecipeCard from '../components/recipe-card'
import { colors } from '../utils/colors'
import Layout from '../components/layout'

class IndexPage extends Component {
  render() {
    const { firstRecipe, nextThreeRecipes } = this.props.data
    const { title: firstTitle } = firstRecipe['edges'][0].node
    const slug = firstRecipe['edges'][0].node.fields.slug
    const firstImageSrc =
      firstRecipe['edges'][0].node.relationships.field_image.localFile
        .childImageSharp.resize.src
    return (
      <Layout>
        <GridContainer>
          <GridRow>
            <div
              css={{
                position: `relative`,
                display: `flex`,
                flexDirection: `column`,
                background: colors.white,
                height: `100%`,
                border: `solid 1px ${colors.black}`,
                transition: `transform 0.2s ease`,
              }}
            >
              <a href={slug} css={{ display: 'block' }}>
                <img
                  css={{ width: `100%` }}
                  src={firstImageSrc}
                  alt={firstTitle}
                />
                <h1 css={{ textAlign: 'center' }}>{firstTitle}</h1>
              </a>
            </div>
          </GridRow>

          {nextThreeRecipes.edges.map(recipe => {
            const {
              title,
              id,
              field_cooking_time: cookTime,
              field_preparation_time: prepTime,
              field_difficulty: difficulty,
            } = recipe.node
            const { slug } = recipe.node.fields
            const imageSrc =
              recipe.node.relationships.field_image.localFile.childImageSharp
                .resize.src
            return (
              <GridRow key={id} width={32}>
                <RecipeCard
                  title={title}
                  slug={slug}
                  imageSrc={imageSrc}
                  totalTime={cookTime + prepTime}
                  difficulty={difficulty}
                />
              </GridRow>
            )
          })}
        </GridContainer>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    firstRecipe: allNodeRecipe(sort: { fields: [created] }, limit: 1) {
      edges {
        node {
          id
          title
          fields {
            slug
          }
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  resize(height: 300, width: 1200) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
    nextThreeRecipes: allNodeRecipe(
      sort: { fields: [created] }
      limit: 3
      skip: 1
    ) {
      edges {
        node {
          id
          title
          field_preparation_time
          field_cooking_time
          field_difficulty
          fields {
            slug
          }
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  resize(height: 200) {
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
