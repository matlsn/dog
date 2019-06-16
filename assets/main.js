fetch('https://commits.mat.dog/?columns=23')
  .then(response => {
    return response.text()
  })
  .then(res => {
    document.querySelector('#commits').innerHTML = res
    document.querySelector('.content').className += " loaded"
    document.querySelectorAll('.commitscrape-block').forEach(e => {
      e.addEventListener('mouseenter', x => {
        doTipsy(x.target.getAttribute('aria-label'))
      })
      e.addEventListener('mouseleave', x => {
        hideTipsy()
      })
    })
  })

const doTipsy = cont => {
  const tipsy = document.getElementsByClassName('tipsy')[0]
  tipsy.innerHTML = cont
  tipsy.classList.add('shown')
}

const hideTipsy = () => document.getElementsByClassName('tipsy')[0].classList.remove('shown')

