const fs = require('fs')
const sharp = require('sharp')

module.exports = function resize(path, format, width, height) {


  var d = new Date();
  var n = d.getTime();
  console.log(d, '\n', n)
  const readStream = fs.createReadStream(path)
  let transform = sharp()

  if (format) {
    transform = transform.toFormat(format)
  }

  if (width || height) {
    transform = transform.resize(width, height)
  }

  var dd = new Date();
  var nn = dd.getTime();
  console.log(dd, '\n', nn)



  return readStream.pipe(transform)
}
