$.get('https://commits.mat.dog/', function (res) {
  if (!res || res.length < 10) return
  let prep = res
  prep = prep.slice(prep.indexOf('<g transform="translate(420'))
  prep = '<svg class="js-calendar-graph-svg" width="285" height="113"><g transform="translate(5, 20)">' + prep
  prep = $(prep).find('g g').each(function (i, e) {
    $(e).attr('transform', `translate(${14*i}, 0)`)
  }).end().find('rect').each(function (_, e) {
    var clr = $(e).attr('fill')
    function change (col) { $(e).attr('fill', col) }
    switch (clr) {
      case '#ebedf0':
        change('#69c7f1')
        break
      case '#196127':
        change('#115371')
        break
      case '#c6e48b':
        change('#1d82af')
        break
      case '#7bc96f':
        change('#2699cc')
        break
    }
  }).end()
  $('#commits').html(prep)
  $('.content').addClass('loaded')
})

const tipsy = '<div class="tipsy" style="left: %l; top: %t;" aria-hidden="true">%s</div>'
const doTipsy = cont => {
  $('.tipsy').remove()
  $('body').append(tipsy.replace('%s', cont.text).replace('%l', cont.coords.left).replace('%t', cont.coords.top));
}

$(document).on('mouseenter', 'rect', e => {
  const dcount =  +$(e.currentTarget).attr('data-count')
  const contr = dcount === 0 ? 'No contributions' : dcount === 1 ? '1 contribution' : `${dcount} contributions`
  const day = new Date($(e.currentTarget).attr('data-date')).toDateString().substr(4)
  let offset = $(e.currentTarget).offset()
  offset.top = offset.top - 409
  offset.left = offset.left - 120
  doTipsy({
    text: `${contr} on ${day}`,
    coords: offset
  })
}).on('mouseleave', 'rect', e => {
  $('.tipsy').remove()
})
