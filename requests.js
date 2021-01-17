console.log('js file loaded');

    var $resultshtmldiv=$('#somedivinhtml')
    var $name=$('#somedivinhtml2')

    var tableButton=$('#tableButton')
    var chartButton=$('#chartButton')
    var heatmapButton=$('#heatmapButton')

    var idOfOperation
    var countryOfChoiceHeatmap
    var countryOfChoiceChart  
    var typeOfAggregation


// lambda in ecma script
//GET in table format
const getTableData = function() {

    console.log("just entered getTabkeData function")

    
    $.ajax({
    type:'GET',
    url:'/api/v1/data/'+idOfOperation+'/table?page=0',
    header:{"x-session-id":"testSessionId"},

    success:function(data){
        $.each(data.resources,function(i,element){
            $resultshtmldiv.append(element.someproperty);   //data.resourses
        })
    },
    error:function(){
        alert(500);
    }
    })
}

//GET in diagram format
const getChartData = function() {
    
    console.log("just entered getChartData function")

    encodeURIComponent(countryOfChoiceChart)

    $.ajax({
        type:'GET',
        headers:{"X-Session-Id":"testSessionId"},
        url:'/api/v1/data/'+idOfOperation+'/diagram?country='+countryOfChoiceChart+'&page=0',

            success:function(data){
                $.each(data,function(i,element){
            $resultshtmldiv.append(element.someproperty);
        })
    },
        error:function(){
            alert(500);
    }    
    })
}

//GET in heatmap format
const getHeatmapData = function() {

    console.log("just entered getHeatmapData function")

    //
    ncodeURIcomponent(countryOfChoiceHeatmap)
    console.log(countryOfChoiceHeatmap)

    $.ajax({
    type:'GET',
    headers:{"X-Session-Id":"testSessionId"},
    url:'/api/v1/data/'+idOfOperation+'/heatmap?page=2&aggregate_by='+typeOfAggregation,

    success:function(data){
        $.each(data,function(i,element){
            $resultshtmldiv.append(element.someproperty);
    })
    },
    error:function(){
        alert(500);
    }    
    })
}
//GET analysis operation status with polling
// const getStatusOperation = function() 
// {     
    
var completed = false

var poll = function() {
    

    console.log("poll function loaded")  
    let pollingTimeout=setTimeout(function() {

        $.ajax({
        type:'GET',
        url:'api/v1/status/'+idOfOperation,
        headers:{
            "X-Session-Id":"testSessionId"},
    
        
        statusCode: {    //statusCode handling
            204: function(response) {
                console.log("Operation is still running!")
                
            },
            201: function(response) {
                console.log("Operation is complete!")
                completed=true
                getTableData()
            }
             
        },
        error: function(response) {
            console.log(response)
        },              
        complete: poll,
        timeout: 2000
        })
    }, 5000);
    

    if(completed==true) {
        console.log("izliza ot timeouta")
        window.clearTimeout(pollingTimeout)
    }
}
   

$(function() {

    console.log( "document ready!" );

    $("#tableButton").click(() => {
    alert(" table button clicked")

    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
    }
    for(i=0;i<array.length;i++)
    {
        console.log(array[i])
    }
    var countriesToOmmit = {
        "excluded":array       
    }
    $.ajax({
        type:'POST',
        headers:{
            "Content-Type": "application/json",
            "X-Session-Id":"testSessionId"},
        
        data:JSON.stringify(countriesToOmmit),
        url:'http://localhost/api/v1/analyze_existing_data',
        
        success:function(response){   // response.data
            idOfOperation=response
            //console.log(idOfOperation)

            setTimeout(() => {console.log("ID of operation:"+idOfOperation)}, 2000);

            //getStatusOperation()
            poll()
            //getTableData()
        },
        error:function(){
            alert(500);
        }
    })
    
})//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#chartButton").click(() => {
    alert(" chart button clicked")

    countryOfChoiceChart = $("#chartCountriesToChooseFrom :selected").text()
    console.log(countryOfChoiceChart)

    $.ajax({
    type:'POST',
    headers:{
        "Content-Type": "application/json",
        "X-Session-Id":"testSessionId"},
    
    //data:JSON.stringify(countriesToOmmit),
    url:'http://localhost/api/v1/analyze_existing_data',
    
        success:function(response){   // response.data
            idOfOperation=response.data
            //console.log(idOfOperation)

             setTimeout(() => {console.log(idOfOperation)}, 2000);
            
            
            getStatusOperation()
            getChartData()
        },
        error:function(){
            alert(500);
        }
    })
    // setTimeout(() => {getStatusOperation() }, 2000);
    // setTimeout(() => {getChartData() }, 2000);
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#heatmapButton").click(() => {
    alert(" heatmap button clicked")

    typeOfAggregation = $("#formatsOfAggregation :selected").val();
    console.log(typeOfAggregation)

    countryOfChoiceHeatmap = $("#heatmapCountriesToChooseFrom :selected").text()

    $.ajax({
    type:'POST',
    headers:{
        "Content-Type": "application/json",
        "X-Session-Id":"testSessionId"},

    //data:JSON.stringify(countriesToOmmit),
    url:'http://localhost/api/v1/analyze_existing_data',

    success:function(response){   // response.data
        idOfOperation=response.data
        //console.log(idOfOperation)

        setTimeout(() => {console.log(idOfOperation)}, 2000);

        getStatusOperation()
        getHeatmapData()
    },
        error:function(){
            alert(500);
            }
        })
    })

})




