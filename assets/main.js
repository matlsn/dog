$.get('https://commits.mat.dog/', function (res) {
  if (!res || res.length < 10) return
  let prep = res
  $('#commits').html(prep)
  $('.content').addClass('loaded')
})

const tipsy = '<div class="tipsy" style="left: %l; top: %t;" aria-hidden="true">%s</div>'
const doTipsy = cont => {
  $('.tipsy').remove()
  $('.links').after(tipsy.replace('%s', cont.text).replace('%l', cont.coords.left).replace('%t', cont.coords.top));
}

$(document).on('mouseenter', '.commitscrape-block', e => {
  let offset = $(e.currentTarget).offset()
  offset.top = offset.top - 409
  offset.left = offset.left - 120
  doTipsy({
    text: $(e.currentTarget).attr('aria-label'),
    coords: offset
  })
}).on('mouseleave', '.commitscrape-block', e => {
  $('.tipsy').remove()
})
