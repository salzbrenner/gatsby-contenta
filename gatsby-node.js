/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const allSlugs = []

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions

  switch (node.internal.type) {
    // add some additional fields to our drupal data
    case `node__article`:
      // adding a field to article
      createNodeField({
        node,
        name: `hello`,
        value: `WORLD`,
      })
      break

    case `node__recipe`:
      const recipeSlug = `${node.path.alias}`

      createNodeField({
        node,
        name: `slug`,
        value: recipeSlug,
      })

      // allSlugs.push({
      //   id: node.internalId,
      //   slug: recipeSlug,
      // })
      break

    // case `menuLinks`:
    //   const linkId = parseInt(node.link.split('/').pop(), 10);
    //   const match = allSlugs.filter(slug => slug.id === linkId)[0];
    //   if (match) {
    //     createNodeField({
    //       node,
    //       name: `appLink`,
    //       value: match.slug,
    //     })
    //   }
    //   break;
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const recipeTemplate = path.resolve(`src/templates/recipe.js`)
    // query for recipe nodes to use in creating pages
    resolve(
      graphql(
        `
          {
            allNodeRecipe {
              edges {
                node {
                  drupal_internal__nid
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
        result.data.allNodeRecipe.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: recipeTemplate,
            context: {
              slug: node.fields.slug,
              limit: 2,
            },
          })
        })

      })
    )
  })
}
