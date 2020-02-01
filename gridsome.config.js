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
