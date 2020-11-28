function loader2(source) {
  console.log('loader2')
  source = source.replace('people', 'dog')
  return source
}

loader2.pitch = function() {
  console.log('loader2.pitch')
}

module.exports = loader2
