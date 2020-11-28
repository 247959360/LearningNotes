module.exports = {
  plugins: {
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 3,
      minPixelValue: 1,
      selectorBlackList: [//将vant标准改成750px
      // ".van-", ".ignore-"
      ]
    }
  }
}