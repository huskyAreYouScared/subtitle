const minute = 60
const hour = 3600
/**
 *
 * @param {Number} second
 */
export function timeFilter (second) {
  if (second % minute === 0 && second % hour === 0) {
    return `${second / hour}h`
  } else if (second % minute === 0 && second % hour !== 0) {
    return `${second / minute}m`
  } else {
    return `${second % minute}s`
  }
}
