$(document).ready(function() {


    var preselectedTopic  = $('#preselectedTopic').val();
    var selectedTopic = null;
    $('.forTopics > :first-child').css("color", "white");

    setVideos(preselectedTopic, selectedTopic);
    
    $(document).on('click', '.topic' , function() {
        selectedTopic = $(this).text();
        $(this).siblings("a").css("color", "black");
        $(this).css("color", "white");

        setVideos(preselectedTopic, selectedTopic);
    });

});

function setVideos(preselectedTopic, selectedTopic) {
    var topic;

    if(selectedTopic == null){
        topic = preselectedTopic
    } else{
        topic = selectedTopic
    }

    $.ajax({
        url: "http://localhost:3000/mentalAbility",
        type: "POST",
        data: {
            "Topic": topic
        },
        complete: function(data){
            var Response = JSON.parse(data.responseText);
            var i;
            $('#numberOfVideos').text(Response.length+" Videos");
            $('#topicName').text(Response[0].Topic);
            $('#videos').html("<div class='col-md-4'><a href="+Response[0].VideoLink+" target='_blank'><img class='link-images' src="+Response[0].ImageSource+"><p class='img-text'>"+Response[0].Title+"</p></a></div>");
            for(i = 1; i<Response.length;i++){
                $('#videos').append("<div class='col-md-4'><a href="+Response[i].VideoLink+" target='_blank'><img class='link-images' src="+Response[i].ImageSource+"><p class='img-text'>"+Response[i].Title+"</p></a></div>");
            }

        },
        success: function(data){
            // console.log(data);
        },
        error: function(err){
            console.log(err)
        }
    });
}