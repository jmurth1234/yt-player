module.exports = createGifsicle
const ffmpegBinary = require('ffmpeg-static')
const spawn = require('child_process').spawn

function createGifsicle (args) {
  var process = spawn(ffmpegBinary.path, args)

  return process
}