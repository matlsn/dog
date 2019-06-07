superagent
  .get('https://commits.mat.dog/')
  .end((err, res) => {
    if (err) return
    if (!res || !res.text || res.text.length < 10) return
    let prep = res.text
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