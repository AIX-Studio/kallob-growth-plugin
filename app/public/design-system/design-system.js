const storageKey = 'kgs-design-system-theme'
const root = document.documentElement
// File previews / restricted browsers may deny storage. Theme controls should
// still work for this page even when a preference cannot be persisted.
let saved
try { saved = localStorage.getItem(storageKey) } catch { /* Use the HTML default. */ }
if (saved === 'dark' || saved === 'light') root.classList.toggle('dark', saved === 'dark')
document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  const sync = () => { button.textContent = root.classList.contains('dark') ? 'Dùng giao diện sáng' : 'Dùng giao diện tối' }
  sync()
  button.addEventListener('click', () => {
    root.classList.toggle('dark')
    try { localStorage.setItem(storageKey, root.classList.contains('dark') ? 'dark' : 'light') } catch { /* Keep the in-page theme. */ }
    sync()
  })
})
