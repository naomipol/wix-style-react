import React from 'react';

import LiveCodeExample from '../../utils/Components/LiveCodeExample';

import ExamplesFilled from '!raw-loader!./ExamplesFilled';
import ExamplesGhost from '!raw-loader!./ExamplesGhost';
import ExamplesSizes from '!raw-loader!./ExamplesSizes';
import ExamplesPrefix from '!raw-loader!./ExamplesPrefix';
import ExamplesSuffix from '!raw-loader!./ExamplesSuffix';
import ExamplesLoading from '!raw-loader!./ExamplesLoading';

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
              title="Button - filled buttons (primary)"
              initialCode={ExamplesFilled}
            />
          </Box>
          <Box>
            <LiveCodeExample
              compact
              previewRow
              title="Button - ghost buttons (secondary)"
              initialCode={ExamplesGhost}
            />
          </Box>
        </Container>
        <Container>
          <Box>
            <LiveCodeExample
              compact
              previewRow
              title="Button - sizes"
              initialCode={ExamplesSizes}
            />
          </Box>
          <Box>
            <LiveCodeExample
              compact
              previewRow
              title="Button - prefix icon"
              initialCode={ExamplesPrefix}
            />
          </Box>
        </Container>
        <Container>
          <Box>
            <LiveCodeExample
              compact
              previewRow
              title="Button - suffix icon"
              initialCode={ExamplesSuffix}
            />
          </Box>
          <Box>
            <LiveCodeExample
              compact
              title="Button - loading"
              initialCode={ExamplesLoading}
            />
          </Box>
        </Container>
      </div>
    );
  }
}

export default ButtonStory;
