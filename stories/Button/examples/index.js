import React from 'react';

import LiveCodeExample from '../../utils/Components/LiveCodeExample';

import ExamplesFilled from '!raw-loader!./ExamplesFilled';

const controlledWidth = {
  height: 'auto',
  width: '100%',
  display: 'flex',
};

const halfColumn = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  width: '48%',
  lineHeight: '1.6',
};

const Container = ({ children }) => <div style={controlledWidth}>{children}</div>; //eslint-disable-line

const Box = ({ children }) => <div style={halfColumn}>{children}</div>; //eslint-disable-line

class ButtonStory extends React.Component {
  render() {
    return (
      <div style={{ margin: '0px 0 16px', paddingLeft: '20px' }}>
        <Container>
          <Box>
            <LiveCodeExample
              compact
              previewRow
              title="Button - filled buttons"
              initialCode={ExamplesFilled}
            />
          </Box>
        </Container>
      </div>
    );
  }
}

export default ButtonStory;
