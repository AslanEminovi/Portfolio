// next.config.mjs
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable image optimization
  },
  distDir: 'build', // Ensure this directory is outside OneDrive to avoid sync issues
  // Optional configurations
  // trailingSlash: true, // Uncomment if you want to add trailing slashes to URLs
  // skipTrailingSlashRedirect: true, // Uncomment if you want to preserve href without automatic redirects
};

export default nextConfig;