$(document).ready(function(){
    
    var preselectedClass = 5;
    var selectedClass = null;
    var preselectedTopic  = $('#preselectedTopic').val();
    var selectedTopic = null;
    $('.forTopics > :first-child').css("color", "white");
    $('#topicName').text(preselectedTopic);

    $('.forClass5').on('click', function(){
        selectedClass = 5;
        setTopicForVideos(selectedClass);
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass5 img').css("opacity", "initial");
    });
    $('.forClass8').on('click', function(){
        selectedClass = 8;
        setTopicForVideos(selectedClass);
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass8 img').css("opacity", "initial");
        
    });

    setVideos(preselectedTopic, selectedTopic, preselectedClass, selectedClass);
    
    $(document).on('click', '.topic' , function() {
        selectedTopic = $(this).text();
        $(this).siblings("a").css("color", "black");
        $(this).css("color", "white");
        $('#topicName').text(selectedTopic);

        
        setVideos(preselectedTopic, selectedTopic, preselectedClass, selectedClass);
    });

});

// this function sets topics in sidebar based on class selected
function setTopicForVideos(selectedClass){

    $.ajax({
        url: "http://localhost:3000/keys",
        type: "POST",
        data: {
            "Class": selectedClass
        },
        complete: function(data){
            var Response = JSON.parse(data.responseText);
            // console.log(Response);
            $('.forTopics').html("<a class='topic'>"+Response[0]+"</a><hr>");
            for(var i = 1; i<Response.length;i++){
                $('.forTopics').append("<a class='topic'>"+Response[i]+"</a><hr>");
            }
            $('.forTopics > :first-child ').css("color", "white");
            firstTopic = ($('.forTopics > :first-child ').text());
            $('#currentClass').text("Class "+ selectedClass);
            setVideos("something", firstTopic, 0, selectedClass);
            $('#topicName').text(Response[0]);

        },
        success: function(data){
            // console.log(data);
        },
        error: function(err){
            console.log(err)
        }
    });
}



//this function sets videos according to the topic selected
function setVideos(preselectedTopic, selectedTopic, preselectedClass, selectedClass) {
    var topic;
    var whichClass;
    

    if(selectedClass == null){
        whichClass = preselectedClass
    } else{
        whichClass = selectedClass
    }

    if(selectedTopic == null){
        topic = preselectedTopic
    } else{
        topic = selectedTopic
    }

    // var data = {
    //     Class: whichClass,
    //     Topic: topic
    // };

    $.ajax({
        url: "http://localhost:3000/solutionVideos",
        type: "POST",
        data: {
            "Class": whichClass,
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