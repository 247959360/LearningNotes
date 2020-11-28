function loader3(source) {
  console.log('loader3')
  source = source.replace('people', 'dog')
  return source
}

loader3.pitch = function() {
  console.log('loader3.pitch')
  return '123456'
}

module.exports = loader3
