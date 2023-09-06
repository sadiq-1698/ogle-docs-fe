/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["www.gstatic.com", "ssl.gstatic.com"],
  },
  webpack: (config) => {
    config.experiments = {
      layers: true,
      topLevelAwait: true,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/auth/login/",
        permanent: false,
      },
      {
        source: "/auth/:mode((?!login$|register$).*)",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "/docs/new/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
