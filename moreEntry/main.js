console.log('main')

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  import('./index').then(res => {
    console.log(res.default(1, 2))
  })
})