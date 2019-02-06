import React from 'react'
import { graphql } from 'gatsby'

const TutorialTemplate = ({ data }) => {
  console.log(data)
  return <div />
}

export default TutorialTemplate

// export const query = graphql`
//     query tutorials($slug: String!) {
//      recipes(fields: {slug: {eq: $slug } }) {
//       title
//      }
//     }
// `;
