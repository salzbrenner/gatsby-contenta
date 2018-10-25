import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import GridContainer from '../components/grid-container'
import GridRow from '../components/grid-row'
import RecipeCard from '../components/recipe-card'
import { colors } from '../utils/colors'
import Layout from '../components/layout'

class IndexPage extends Component {
  render() {
    const { firstRecipe, nextThreeRecipes } = this.props.data
    const { title: firstTitle } = firstRecipe['edges'][0]['node']
    console.log(firstRecipe['edges'][0]['node'])
    return (
      <Layout>
        <GridContainer>
          <GridRow>
            <div css={{
              position: `relative`,
              display: `flex`,
              flexDirection: `column`,
              background: colors.white,
              height: `100%`,
              border: `solid 1px ${colors.black}`,
              transition: `transform 0.2s ease`,
            }}>
              {firstRecipe.edges.title}
            </div>

          </GridRow>


          {nextThreeRecipes.edges.map(recipe => {
            const { title, id, totalTime, difficulty } = recipe.node
            const { slug } = recipe.node.fields
            const imageSrc = recipe.node.relationships.image.relationships.imageFile.localFile.childImageSharp.resize.src
            return (
              <GridRow key={id}
                       width={32}
              >
                <RecipeCard
                  title={title}
                  slug={slug}
                  imageSrc={imageSrc}
                  totalTime={totalTime}
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
    firstRecipe: allRecipes(
    sort: {fields: [createdAt]},
    limit: 1,
  ) {
      edges {
        node {
          id,
          title,
          fields {
            slug
          }
          relationships {
            image {
              relationships {
                imageFile {
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
        },
      }
    }
  nextThreeRecipes: allRecipes(
    sort: {fields: [createdAt]},
    limit: 3,
    skip: 1,
  ) {
      edges {
        node {
          id,
          title,
          fields {
            slug
          }
          relationships {
            image {
              relationships {
                imageFile {
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
        },
      }
    }
  allMenus {
    edges {
      node {
        label
        id
        
      }
    }
  }
  allMenuLinks {
    edges {
      node {
        title
        link
        bundle
      }
    }
  }
}
`