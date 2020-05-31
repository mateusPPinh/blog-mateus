var plugins = [{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Mateus Blog","short_name":"CodeStack BR","description":"Get envolved with JS","start_url":"/","background_color":"#F2F3F4","theme_color":"#000000","display":"standalone","icon":"static/favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"d98ebc6b5b87c14218cc11762ca28ac3"},
    },{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"**-********-*"},
    },{
      plugin: require('/Users/mateus/Documents/www/mateus-blog/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  limit: 1000,\n                  sort: { order: DESC, fields: [frontmatter___date] },\n                  filter: {frontmatter: { draft: { ne: true } }}\n                ) {\n                  edges {\n                    node {\n                      excerpt\n                      html\n                      fields { slug }\n                      frontmatter {\n                        title\n                        date\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml","title":"Gatsby RSS Feed"}]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
