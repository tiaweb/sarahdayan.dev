// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const siteName = "Sarah Dayan";

module.exports = {
  siteName,
  siteUrl: "https://sarahdayan.dev",
  titleTemplate: siteName,
  plugins: [
    {
      use: "gridsome-plugin-typescript"
    },
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js"
      }
    },
    {
      use: "gridsome-plugin-svg",
      options: {
        goesBothWays: true
      }
    },
    {
      use: "@gridsome/plugin-sitemap"
    }
  ]
};
