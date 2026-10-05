const storageKey = 'kgs-design-system-theme'
const root = document.documentElement
const saved = localStorage.getItem(storageKey)
if (saved === 'dark' || saved === 'light') root.classList.toggle('dark', saved === 'dark')
document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  const sync = () => { button.textContent = root.classList.contains('dark') ? 'Dùng giao diện sáng' : 'Dùng giao diện tối' }
  sync()
  button.addEventListener('click', () => {
    root.classList.toggle('dark')
    localStorage.setItem(storageKey, root.classList.contains('dark') ? 'dark' : 'light')
    sync()
  })
})
