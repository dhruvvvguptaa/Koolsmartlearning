$(document).ready(function() {

    
    var preselectedClass = 7;
    var selectedClass = null;
    var preselectedTopic  = $('#preselectedTopic').val();
    var selectedTopic = null;
    $('.forTopics > :first-child').css("color", "white");

    $('.forClass7').on('click', function(){
        selectedClass = 7;
        setTopicForVideos(selectedClass)
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass7 img').css("opacity", "initial");
    });
    $('.forClass8').on('click', function(){
        selectedClass = 8;
        setTopicForVideos(selectedClass)
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass8 img').css("opacity", "initial");
    });
    $('.forClass9').on('click', function(){
        selectedClass = 9;
        setTopicForVideos(selectedClass)
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass9 img').css("opacity", "initial");
    });
    $('.forClass10').on('click', function(){
        selectedClass = 10;
        setTopicForVideos(selectedClass)
        $('.fadedImage').css("opacity", "0.5");
        $('.forClass10 img').css("opacity", "initial");
    });
    
    setVideos(preselectedTopic, selectedTopic, preselectedClass, selectedClass);
    
    $(document).on('click', '.topic' , function() {
        selectedTopic = $(this).text();
        $(this).siblings("a").css("color", "black");
        $(this).css("color", "white");

        
        setVideos(preselectedTopic, selectedTopic, preselectedClass, selectedClass);
    });
});



// this function sets topics in sidebar based on class selected
function setTopicForVideos(selectedClass){

    $.ajax({
        url: "http://localhost:3000/classes",
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
        url: "http://localhost:3000/courses",
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