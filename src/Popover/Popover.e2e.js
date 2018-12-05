import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { popoverTestkitFactory } from '../../testkit/protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import {
  storySettings,
  testStories,
  placements,
} from '../../stories/Popover/storySettings';

describe('Popover', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = popoverTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      `Cannot find Popover component ${dataHook}`,
    );

    await scrollToElement(driver.element());
    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  beforeEach(async () => {
    await autoExampleDriver.reset();
  });

  eyes.it('should render with dark theme', async () => {
    await autoExampleDriver.setProps({ theme: 'dark' });
    await createDriver();
  });

  describe('examples', () => {
    eyes.it('AppendTo prop example', async () => {
      await createDriver('story-popover-append-to');
    });

    eyes.it('positioning example', async () => {
      const examplePlacements = placements.filter(p => !p.includes('auto'));

      for (const placement of examplePlacements) {
        const driver = await createDriver(
          `story-popover-positioning-${placement}`,
        );
        await driver.mouseEnter();
        eyes.checkWindow(`${placements} position`);
      }
    });
  });

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check auto positioning', async () => {
      await checkTestStory(testStories.AUTO_POSITIONING);
    });

    eyes.it('check arrow adjusting', async () => {
      await checkTestStory(testStories.ARROW_ADJUSTING);
    });

    eyes.it('check arrow edge adjusting', async () => {
      await checkTestStory(testStories.ARROW_EDGE_ADJUSTING);
    });
  });
});
