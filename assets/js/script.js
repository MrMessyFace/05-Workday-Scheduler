$(document).ready(function(){
  function updateTime() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY hh:mm:ss A"))

  $(function () {
    var everyRow = $(".container-lg").find(".time-block");
    var currentHour = dayjs().hour()
    var everyButton = $(".container-lg").find(".saveBtn")
  
    for(var i = 0; i < everyRow.length; i++) {
      var idRow = $(everyRow[i]).prop('id');
      var blockTime = parseInt(idRow.slice(5));
      var currentClass = $(everyRow[i]).prop('class');
      var savedData = localStorage.getItem("block-" + blockTime);

      if (blockTime < currentHour) {
        $(everyRow[i]).removeClass(currentClass).addClass('row time-block past')
      }

      if(blockTime === currentHour) {
        $(everyRow[i]).removeClass(currentClass).addClass('row time-block present')
      }

      if(blockTime > currentHour){
        $(everyRow[i]).removeClass(currentClass).addClass('row time-block future')
      }

      if (savedData) {
        $(everyRow[i]).find("textarea").val(savedData);
      }
    }

    everyButton.on('click', function() {
      var timeBlock = $(this).parent().prop('id');
      var blockText = $(this).siblings('.description').val();
      localStorage.setItem("block-" + timeBlock.slice(5), blockText);
    });
  });
  }
  setInterval(updateTime, 1000);
});
