import { isBrowser } from "~/lib/is-browser";

function shouldUseTinaEditor(defaultValue = false) {
  return isBrowser()
    ? new URLSearchParams(window.location.search).has('tina')
    : defaultValue;
}

export default shouldUseTinaEditor;
