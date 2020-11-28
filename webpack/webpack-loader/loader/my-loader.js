function myLoader(source) {
  source = source.replace('world', 'people')
  return source
}

module.exports = myLoader
