import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Open Science in Mental Health Research',
  tagline: 'Welcome to our guide to practicing open science at the Douglas',
  favicon: 'img/OS_icon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://douglas-open-science.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'douglas-open-science', // Usually your GitHub org/user name.
  projectName: 'douglas-open-science.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','fr'],
    localeConfigs: {
      en: { label: 'English' },
      fr: { label: 'Français' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          admonitions: {
            keywords: ['guide'], // Registers :::guide
            extendDefaults: true, // Retains default keywords like tip, note, etc.
          },
          routeBasePath:'guide',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // add open measures plug-in
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'open-measures-section', // Unique ID for the separate section
        path: 'open-measures-content', // Directory where the content will live
        routeBasePath: 'open-measures-registry', // URL route (e.g., mysite.com/special-section)
        sidebarPath: './sidebarsRegistry.js',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/OS_logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Douglas Open Science Program',
      logo: {
        alt: 'Douglas Open Science Logo',
        src: 'img/OS_logo_no_text_square.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Open Science Guide',
        },
        {
        type: 'localeDropdown',
        position: 'right',
        },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Open Science Guide',
              to: '/guide/Persistent_Identifiers/',
            },
          ],
        },
        
        {
          title: 'Useful links',
          items: [
            
            
            {
              label: 'Open Science at the Douglas',
              href: 'https://douglas.research.mcgill.ca/open-science-douglas',
            },
            {
              label: 'Open Science GitHub',
              href: 'https://github.com/douglas-open-science',
            },
          ],
        },
        {
          title: 'Need help?',
          items: [
            {
              label: 'Send us an email',
              href: 'mailto:open.science.ouverte.comtl@ssss.gouv.qc.ca',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Douglas Open Science Program`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
