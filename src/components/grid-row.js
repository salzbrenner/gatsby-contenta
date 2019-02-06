import React from 'react'

const GridRow = props => (
  <div
    css={{
      width: `100%`,
      marginBottom: `20px`,
      '@media(min-width: 700px)': {
        width: `${props.width}%`,
      },
    }}
  >
    {props.children}
  </div>
)

export default GridRow
