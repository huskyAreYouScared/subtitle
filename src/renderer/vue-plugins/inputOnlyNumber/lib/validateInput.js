export default function (el) {
  el.onkeyup = () => {
    el.value = el.value.replace(/[^\d]/g, '')
  }
}
