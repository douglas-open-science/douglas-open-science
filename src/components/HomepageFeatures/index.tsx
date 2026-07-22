import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.findtherightpractices.title">Find the right practices for you</Translate>,
    Svg: require('@site/static/img/undraw/undraw_ideas-flow_lwpa.svg').default,
    description: (
      <Translate id="homepage.features.findtherightpractices.description">
        At any stage of the research cycle, our guide contains ideas to make your project more open and impactful.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.gettailoredguidance.title">Get tailored guidance</Translate>,
    Svg: require('@site/static/img/undraw/undraw_open_book_mod_2.svg').default,
    description: (
      <Translate id="homepage.features.gettailoredguidance.description">
        The Douglas Open Science Team has curated these resources to help you navigate open science at our institution.
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.facilitatecollaboration.title">Facilitate collaboration</Translate>,
    Svg: require('@site/static/img/undraw/undraw_engineering-team_13ax.svg').default,
    description: (
      <Translate id="homepage.features.facilitatecollaboration.description">
        Learn how incorporating open science practices can help make your research project more accessible to collaborators.
      </Translate>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
