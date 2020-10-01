// append markers
$(document).ready(function() {
  let range = document.querySelector('.range')
  let bubble = document.querySelector('.bubble')
  let markers = ['00:10:00', '00:25:00', '00:40:00', '00:50:00']
  let min = parseInt($('.range').attr('min'))
  let max = parseInt($('.range').attr('max'))
  // show start end end timecode
  $('.start-timecode').html(timeToTimeCode(min))
  $('.end-timecode').html(timeToTimeCode(max))

  setBubble(range, bubble)

  markers.map((marker, index) => {
    let marketTime = timeCodeToTime(marker)
    let id = 'marker_' + index
    let html = '<div id="' + id + '" class="marker"></div>'
    $('.range-wrap').append(html)
    let position = Number(((marketTime - min) * 100) / (max - min + 1))
    $('#'+id).css('left', `calc(${position}% + (${5 - position * 0.25}px))`)
  })

  range.addEventListener('input', () => {
    setBubble(range, bubble)
  })

  function setBubble(range, bubble) {
    let currentTime = range.value
    let timeCode = timeToTimeCode(currentTime)
    let indexTimeCode = markers.indexOf(timeCode)
    if (indexTimeCode != -1) {
      $('#marker_text').html(markers[indexTimeCode])
    } else {
      $('#marker_text').html('Marker text is displayed here')
    }
    let position = Number(((currentTime - min) * 100) / (max - min + 1))
    bubble.innerHTML = timeCode
    bubble.style.left = `calc(${position}% + (${8 - position * 0.2}px))`
  }

  function timeToTimeCode(time) {
    let hour = parseInt(time / 3600)
    let minutes = parseInt((time - 3600 * hour) / 60)
    let seconds = (time - 3600 * hour) % 60
    hour = hour > 9 ? hour : '0' + hour
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds
    return hour + ':' + minutes + ':' + seconds
  }

  function timeCodeToTime(timeCode) {
    let times = timeCode.split(":")
    let hour = parseInt(times[0])
    let minutes = parseInt(times[1])
    let seconds = parseInt(times[2])
    return hour * 3600 + minutes * 60 + seconds
  }

  $('input[type="range"]').on('input', function () {
    let timeCode = ($(this).val() - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"))
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + timeCode + ', rgb(39, 153, 255)), '
                + 'color-stop(' + timeCode + ', rgb(240, 249, 255))'
                + ')'
              )
  })
})
