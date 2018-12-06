import React from 'react';

import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../storiesHierarchy';

import { MessageBoxMarketerialLayout } from 'wix-style-react/MessageBox';
import IllustrationIcon from './AnnouncementExamples/IllustrationIcon';

import styles from './AnnouncementTestStory.scss';
import { storySettings } from './storySettings';

import { Snapshot } from './Snapshot';

const Announcement = props => {
  return (
    <MessageBoxMarketerialLayout
      title="Looking good! Your site is on Google"
      content="All of your pages are indexed and now come up as separate search results on Google. This is great for your visbility!"
      confirmText="Button"
      theme="blue"
      primaryButtonLabel="Button"
      secondaryButtonLabel="Secondary action"
      {...props}
    />
  );
};

const AnnouncementTests = storiesOf(
  getTestStoryKind({
    category: storySettings.category,
    storyName: storySettings.storyName,
  }),
  module,
);

AnnouncementTests.add(storySettings.tests.illustration.testName, () => {
  return (
    <div>
      <Snapshot name="standard">
        <Announcement illustration={<IllustrationIcon />} />
      </Snapshot>

      <Snapshot name="purple">
        <Announcement illustration={<IllustrationIcon />} theme="purple" />
      </Snapshot>

      <Snapshot name="highestImage">
        <Announcement
          illustration={<img src="https://picsum.photos/100/150?image=0" />}
        />
      </Snapshot>
    </div>
  );
});

AnnouncementTests.add(storySettings.tests.imageComponent.testName, () => {
  return (
    <div className={styles.container}>
      <Snapshot name="standard">
        <Announcement
          imageComponent={<img src="https://picsum.photos/100/100?image=0" />}
        />
      </Snapshot>
    </div>
  );
});
