import React from 'react';

const GridContainer = props => (
    <div
        css={{
          display: `flex`,
          flexWrap: `wrap`,
          maxWidth: `1400px`,
          margin: `0 auto`,
          padding: `0 15px`,
          justifyContent: `space-between`
        }}
    >
        {props.children}
    </div>
);

export default GridContainer;