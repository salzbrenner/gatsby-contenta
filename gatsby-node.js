/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);
const allSlugs = [];

// You can delete this file if you're not using it
exports.onCreateNode = ({node, actions}) => {
  const { createNode, createNodeField } = actions;

  switch (node.internal.type) {
    case `recipes`:
      const recipeSlug = `/recipes/${node.internalId}`;

      createNodeField({
        node,
        name: `slug`,
        value: recipeSlug,
      });
      allSlugs.push({
        id: node.internalId,
        slug: recipeSlug
      });
      break;

    case `pages`:
      let pagesSlug = `/${node.internalId}`;

      if (node.hasOwnProperty('path')) {
        pagesSlug = node.path.alias;
      }

      createNodeField({
        node,
        name: `slug`,
        value: pagesSlug,
      });

      allSlugs.push({
        id: node.internalId,
        slug: pagesSlug
      });
      break;

    case `tutorials`:
      const tutorialSlug = `tutorials/${node.internalId}`;
      createNodeField({
        node,
        name: `slug`,
        value: tutorialSlug,
      });
      allSlugs.push({
        id: node.internalId,
        slug: tutorialSlug
      });
      break;

    case `menuLinks`:
      const linkId = parseInt(node.link.split('/').pop(), 10);
      const match = allSlugs.filter(slug => slug.id === linkId)[0];
      if (match) {
        createNodeField({
          node,
          name: `appLink`,
          value: match.slug,
        })
      }
      break;
  }

};

exports.createPages = ({ graphql, actions}) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const recipeTemplate = path.resolve(`src/templates/recipe.js`);
    const tutorialTemplate = path.resolve(`src/templates/tutorial.js`);
    // query for recipe nodes to use in creating pages
    resolve(
      graphql(
        `
          {
            allRecipes {
              edges {
                node {
                  internalId
                  fields {
                    slug
                  }
                }
              }
            }
            
            allTutorials {
              edges {
                node {
                  internalId
                  fields {
                    slug
                  }
                }
              }
            }
            
            allPages {
              edges {
                node {
                  internalId
                  path {
                    alias
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create pages for each recipe.
        result.data.allRecipes.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: recipeTemplate,
            context: {
              slug: node.fields.slug,
              limit: 2
            },
          })
        });

        // Create pages for each tutorial.
        result.data.allTutorials.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: tutorialTemplate,
            context: {
              slug: node.fields.slug,
            },
          })
        });

        // Create pages for each pages type.
        // result.data.allPages.edges.forEach(({ node }) => {
        //   createPage({
        //     path: node.fields.slug,
        //     component: pagesTemplate,
        //     context: {
        //       slug: node.fields.slug,
        //     },
        //   })
        // });

      })
    )
  })
}