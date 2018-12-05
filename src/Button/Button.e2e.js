import { eyesItInstance } from '../../test/utils/eyes-it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from '../../stories/Button/storySettings';
import { disableCSSAnimation } from '../../test/utils/protractor-helpers';

describe('Button', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
    await browser.executeScript(disableCSSAnimation);
  });

  afterEach(() => {
    return autoExampleDriver.remount();
  });

  const eyes = eyesItInstance({ enableSnapshotAtBrowserGet: false });

  eyes.it('Make a screenshoft of all Button examples', () => {
    expect(true).toBeTruthy();
  });
});
