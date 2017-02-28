console.log('hellooo')

var $showInput = $('#searchshow');
var $searchBtn = $('#search-button');


var searchShows = function(evt) {
  var input = $showInput.val();

  $.post('/user/shows/search', {input}, function(response) {
    // console.log(response)
    console.log(response) //array of objects
    // response.results.forEach((result) => {
    // $('body').append(result)
    // })
    console.log(response[0].show) //first object 'show'key ['score' key is independent]
    $('body').append(response[0].show.name)
  })
}

$('.search-shows-container').on('click', '#search-button', searchShows);

