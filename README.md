# Gatsby Remark Orphans

This plugin aims to combat widows and orphans on pages generated from markdown files. It can be used with both [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/?=gatsby-trans) and [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx) via its `gatsbyRemarkPlugins` option.

By default it supports polish language. Plugin can be configured to support other languages too.

## Installation

Install with npm:

```sh
npm install gatsby-remark-orphans
```

Install with yarn:

```sh
yarn add gatsby-remark-orphans
```

## How to use

After installing `gatsby-remark-orphans` you can add it to your plugins list in your gatsby-config.js.

Configure with `gatsby-transformer-remark`:

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-orphans`],
    },
  },
],
```

Configure with `gatsby-plugin-mdx`:

```js
// In your gatsby-config.js
plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [`gatsby-remark-orphans`],
      },
    },
],
```

## Configuration

`gatsby-remark-orphans` exposes a set of options that can be used to control and extend the behavior of the plugin.

| Key                          | Default | Description                                                                                          |
| ---------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| disableDefaultLocaleResolver | false   | Disables extension of custom locale resolver with default behavior.                                  |
| customLocaleResolver         | -       | Function that accepts a markdown node and returns a locale or undefined.                             |
| disableBuiltInHandlers       | false   | Disables usage of default orphan handlers when custom ones are specified.                            |
| customHandlers               | -       | An object of key value pairs for locale and array of handlers that should be used to remove orphans. |
| silenceReporting             | false   | Disables reporting in console, which primarily happens in case of missing locale or handlers.        |

### Providing custom locale resolver.

By default `gatsby-remark-orphans` looks for `locale` in `fields` and `frontmatter` properties of the markdown node object. If you use a different marking system for you files you can use the `customLocaleResolver` option.

```js
// In your gatsby-config.js
plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-orphans`,
            options: {
              customLocaleResolver: (markdownNode) => markdownNode.frontmatter.language
              // You can additionally disable the default locale resolver.
              // If that is done the default lookup for `local` in `fields` and `frontmatter`
              // will not be performed if the custom locale resolver fails to identify the language
              disableDefaultLocaleResolver: true,
            }
          }
        ],
      },
    },
],
```

### Providing custom handlers for languages

If you want to use the plugin with other languages than polish you can provide custom handler via plugin options.

```js
// In your gatsby-config.js
plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-orphans`,
            options: {
              customHandlers: {
                en: [{
                  regex: new RegExp(" and ", "g") // It is advised to use the global flag,
                  replacer: (match) => `${match.slice(0, -1)}\u00a0`
                }]
              }
              // You can additionally disable default handlers for a language if you want
              // to take full control over the orphan removal.
              disableBuiltInHandlers: true,
            }
          }
        ],
      },
    },
],
```

### Silencing build logs

By default the plugin will warn about missing locales or missing handlers so you can catch what is not being processed. If you're using some languages that do not require any handling you can disable reporting to get rid of the logs.

```js
// In your gatsby-config.js
plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-orphans`,
            options: {
              silenceReporting: true
            }
          }
        ],
      },
    },
],
```
