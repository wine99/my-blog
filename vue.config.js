module.exports = {
  devServer: {
    open: true,
    hot: true,
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
};
