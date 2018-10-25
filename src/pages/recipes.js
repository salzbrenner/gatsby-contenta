import React from 'react';
import RecipeCard from '../components/recipe-card';
import GridContainer from '../components/grid-container';
import GridRow from '../components/grid-row';
import { graphql } from 'gatsby';
import Layout from '../components/layout'

const RecipesPage = ({data}) => {
  const { edges: recipes } = data.allRecipes;
  return (
    <Layout>
      <GridContainer>
        {recipes.map(recipe => {
          const { title, id, totalTime, difficulty } = recipe.node;
          const { slug } = recipe.node.fields;
          const imageSrc =  recipe.node.relationships.image.relationships
            .imageFile.localFile.childImageSharp.resize.src;
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
  );

};

export default RecipesPage

export const recipesPageQuery = graphql`
  query RecipesPageQuery {
    allRecipes {
      edges {
        node {
          id,
          title,
          totalTime,
          difficulty
          fields {
            slug
          }
          relationships {
            image {
              relationships {
                imageFile {
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
        },
      }
    }
  }
`;