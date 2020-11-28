function loader4(source) {
  console.log('inline-loader')
  source = source.replace('people', 'dog')
  return source
}

module.exports = loader4
