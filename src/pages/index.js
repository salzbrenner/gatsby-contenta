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
    const { title: firstTitle } = firstRecipe['edges'][0].node
    const slug = firstRecipe['edges'][0].node.fields.slug
    const firstImageSrc = firstRecipe['edges'][0].node.relationships.image.relationships.imageFile.localFile.childImageSharp.resize.src
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
              <a href={slug} css={{ display: 'block' }}>
                <img css={{width: `100%`}} src={firstImageSrc} alt={firstTitle}/>
                <h1 css={{ textAlign: 'center' }}>{firstTitle}</h1>
              </a>
            </div>
          </GridRow>

          {nextThreeRecipes.edges.map(recipe => {
            const { title, id, totalTime, difficulty } = recipe.node
            console.log(recipe.node)
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
                        resize(width: 1200, height: 500) {
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
          totalTime,
          difficulty,
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