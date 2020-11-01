const express = require('express')
const resize = require('./resize')
const sharp = require('sharp')

const server = express()

server.get('/', (req, res) => {
  // Extract the query-parameter
  const widthString = req.query.width
  const heightString = req.query.height
  const format = req.query.format

  // Parse to integer if possible
  let width, height
  if (widthString) {
    width = parseInt(widthString)
  }
  if (heightString) {
    height = parseInt(heightString)
  }
  // Set the content-type of the response
  res.type(`image/${format || 'png'}`)

  // Get the resized image
  resize('input.jpg', format, width, height).pipe(res)
})



server.get('/make', async (req, res) => {


  var d = new Date();
  var n = d.getTime();
  console.log('entering' + n)



  await sharp('input.jpg')
    .resize({
      fit: sharp.fit.contain,
      width: 10000,
      height: 10000
    })
    .jpeg({ quality: 50 })
    .toFile('img' + n + '.jpg');


  console.log('exiting' + new Date().getTime())



  res.json({ done: 1 });

})

server.listen(8000, () => {
  console.log('Server started!')
})
