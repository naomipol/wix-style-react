import eyes from 'eyes.it';
import {
  calendarTestkitFactory,
  waitForVisibilityOf,
} from '../../testkit/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { TESTS_PREFIX } from '../../stories/storiesHierarchy';

describe('Calendar', () => {
  const storyUrl = ({ selectedDays }) => {
    const baseUrl = createStoryUrl({
      kind: `${TESTS_PREFIX}/3. Inputs/3.13 Calendar`,
      story: '1. selectedDays',
    });
    return `${baseUrl}&selectedDays=${global.encodeURIComponent(
      JSON.stringify(selectedDays),
    )}`;
  };
  const dataHook = 'calendar';
  const driver = calendarTestkitFactory({ dataHook });

  eyes.it(
    'should correctly render when selectedDays is a single date',
    async () => {
      await browser.get(storyUrl({ selectedDays: new Date('2017/05/01') }));
      await waitForVisibilityOf(driver.getElement(), 'Cannot find Calendar');
    },
    { enableSnapshotAtBrowserGet: false },
  );

  eyes.it(
    'should correctly render when selectedDays is a date range',
    async () => {
      await browser.get(
        storyUrl({
          selectedDays: {
            from: new Date('2017/05/02'),
            to: new Date('2017/05/06'),
          },
        }),
      );
      await waitForVisibilityOf(driver.getElement(), 'Cannot find Calendar');
    },
    { enableSnapshotAtBrowserGet: false },
  );

  eyes.it(
    'should correctly render when selectedDays is an infinite date range starting in the current month',
    async () => {
      await browser.get(
        storyUrl({
          selectedDays: {
            from: new Date('2017/05/02'),
          },
        }),
      );
      await waitForVisibilityOf(driver.getElement(), 'Cannot find Calendar');
    },
    { enableSnapshotAtBrowserGet: false },
  );

  eyes.it(
    'should correctly render when selectedDays is an infinite date range ending in the current month',
    async () => {
      await browser.get(
        storyUrl({
          selectedDays: {
            to: new Date('2017/05/02'),
          },
        }),
      );
      await waitForVisibilityOf(driver.getElement(), 'Cannot find Calendar');
    },
    { enableSnapshotAtBrowserGet: false },
  );

  eyes.it(
    'should correctly render when selectedDays is aa range of one day',
    async () => {
      await browser.get(
        storyUrl({
          selectedDays: {
            from: new Date('2017/05/02'),
            to: new Date('2017/05/02'),
          },
        }),
      );
      await waitForVisibilityOf(driver.getElement(), 'Cannot find Calendar');
    },
    { enableSnapshotAtBrowserGet: false },
  );
});
