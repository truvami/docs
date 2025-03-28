import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Truvami docs",
  tagline: "docs for Truvami",
  favicon:
    "https://truvami.com/wp-content/uploads/2023/08/T_Farbig-150x150.png",

  // Set the production url of your site here
  url: "https://docs.truvami.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Truvami", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/truvami/docs/tree/main/packages/create-docusaurus/templates/shared/",
          docItemComponent: "@theme/ApiItem",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/truvami/docs/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api", // plugin id
        docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
        config: {
          solver: {
            // the <id> referenced when running CLI commands
            specPath: "openapi/solver-api-1.0.yaml", // path to OpenAPI spec, URLs supported
            outputDir: "docs/solver-api", // output directory for generated files
            sidebarOptions: {
              // optional, instructs plugin to generate sidebar.js
              // groupPathsBy: "tag", // group sidebar items by operation "tag"
            },
          },
          Truvami: {
            // the <id> referenced when running CLI commands
            specPath: "openapi/truvami-api-1.0.0.yaml", // path to OpenAPI spec, URLs supported
            outputDir: "docs/truvami-api", // output directory for generated files
            sidebarOptions: {
              // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
            },
          },
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Truvami docs",
      logo: {
        alt: "docs for Truvami",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "Docs",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/truvami/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/98419274",
            },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Truvami, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
