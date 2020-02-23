
// mp4,webm,ogg
export function checkAllowFile (file) {
  return /\.(mp4|webm|ogg)$/.test(file)
}
