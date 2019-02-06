import React from 'react'
import RecipeCard from '../components/recipe-card'
import GridContainer from '../components/grid-container'
import GridRow from '../components/grid-row'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const RecipesPage = ({ data }) => {
  const { edges: recipes } = data.allNodeRecipe
  return (
    <Layout>
      <SEO
        title={`Recipes`}
        description={`Recipes page`}
      />
      <GridContainer>
        {recipes.map(recipe => {
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

export default RecipesPage

export const recipesPageQuery = graphql`
  query RecipesPageQuery {
    allNodeRecipe {
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
                  resize(height: 300, width: 400) {
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
