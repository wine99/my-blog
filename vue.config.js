module.exports = {
  devServer: {
    hot: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
};
