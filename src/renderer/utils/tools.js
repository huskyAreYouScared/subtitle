import route from '@/router'
// mp4,webm,ogg
export function checkAllowFile (file) {
  return /\.(mp4|webm|ogg)$/.test(file)
}

export function quickRouter (path){
  route.push(path)
}
