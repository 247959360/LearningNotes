function loader1(source) {
  console.log('loader1')
  source = source.replace('people', 'dog')
  return source
}

loader1.pitch = function() {
  console.log('loader1.pitch')
}

module.exports = loader1
