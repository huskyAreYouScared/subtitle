
import validateInput from './validateInput.js'
const inputOnlyNumber = {
  install (Vue, options) {
    Vue.directive('inputOnlyNumber', validateInput)
  }
}

export default inputOnlyNumber
