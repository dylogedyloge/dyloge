// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   i18n: {
//     locales: ["en", "fa"],
//     defaultLocale: "en",
//     localeDetection: false,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         port: "",
//         pathname: "/a/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
const withTM = require("next-transpile-modules")(["jsdom"]);

module.exports = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
});
