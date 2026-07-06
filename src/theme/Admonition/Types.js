import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import AdmonitionLayout from '@theme/Admonition/Layout';
import MyCustomIcon from '@site/static/img/OS_logo_no_text_square.svg';


function GuideAdmonition(props) {
  return (
    <AdmonitionLayout
      {...props}
      type="guide"
      icon={<MyCustomIcon />}
      title={props.title || 'Guide'}
    >
      {props.children}
    </AdmonitionLayout>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  'guide': GuideAdmonition, // Maps :::guide to your component
};

export default AdmonitionTypes;