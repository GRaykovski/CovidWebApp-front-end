console.log('js file loaded');

var tableButton=$('#tableButton')
var chartButton=$('#chartButton')
var heatmapButton=$('#heatmapButton')

var idOfOperation
var countryOfChoiceHeatmap
var countryOfChoiceChart  
var typeOfAggregation

var tableDataJsonResponse
var heatmapDataJsonResponse
var chartDataJsonResponse


// lambda in ecma script
//GET in table format
const getTableData = function() {

    console.log("just entered getTabkeData function")

     
    $.ajax({
    type:'GET',
    url:'/api/v1/data/'+idOfOperation+'/table',
    headers:{"x-session-id":"testSessionId",
            "Content-Type": "application/json",
            "Accept":"application/json"},

    success:function(data){
        tableDataJsonResponse = data
        console.log(tableDataJsonResponse)

        document.getElementById("hiddenSection31").style.visibility= 'visible'
        
    },
    error:function(){
        alert(500);
    }
    })
}

//GET in chart format
const getChartData = function() {
    
    console.log("just entered getChartData function")

    encodeURIComponent(countryOfChoiceChart)

    $.ajax({
    type:'GET',
    headers:{"x-session-id":"testSessionId",
            "Content-Type": "application/json",
            "Accept":"application/json"},
    url:'/api/v1/data/'+idOfOperation+'/diagram?country='+encodeURIComponent(countryOfChoiceChart)+'&page=1',

        success:function(data){
            chartDataJsonResponse = data,
            console.log(chartDataJsonResponse)

        },
        error:function(){
            alert(500);
    }    
    })
}

//GET in heatmap format
const getHeatmapData = function() {

    console.log("just entered getHeatmapData function")

    
    // encodeURIcomponent(countryOfChoiceHeatmap)
    // console.log(countryOfChoiceHeatmap)

    $.ajax({
    type:'GET',
    headers:{"x-session-id":"testSessionId",
            "Content-Type": "application/json",
            "Accept":"application/json"},
    url:'/api/v1/data/'+idOfOperation+'/heatmap?page=2&aggregate_by='+encodeURIComponent(typeOfAggregation),

    success:function(data){
        heatmapDataJsonResponse = data
        console.log(heatmapDataJsonResponse)
    },
    error:function(){
        alert(500);
    }    
    })
}
/// Poll function
    
var completed = false

var poll = function(executeDataView) {
    

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
                executeDataView()
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

    $("#tableButton").on("click",function () {
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
        
        success:function(response){   
            idOfOperation=response

            setTimeout(() => {console.log("ID of operation:"+idOfOperation)}, 2000);

            poll(getTableData)
            
        },
        error:function(){
            alert(500);
        }
    })
    
})//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#chartButton").on("click",function () {
    alert(" chart button clicked")

    countryOfChoiceChart = $("#chartCountriesToChooseFrom :selected").val()
   
    console.log("country selected:" + encodeURIComponent(countryOfChoiceChart))

    $.ajax({
    type:'POST',
    headers:{
        "Content-Type": "application/json",
        "X-Session-Id":"testSessionId"},
    
    //data:JSON.stringify(countriesToOmmit),
    url:'http://localhost/api/v1/analyze_existing_data',
    
        success:function(response){   
            idOfOperation=response
        
            setTimeout(() => {console.log("ID of operation:"+idOfOperation)}, 2000);
            
            poll(getChartData)
        },
        error:function(){
            alert(500);
        }
    })
    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#heatmapButton").on("click",function () {
    alert(" heatmap button clicked")

    typeOfAggregation = $("#formatsOfAggregation :selected").val();
    console.log("aggregation selected:" + encodeURIComponent(typeOfAggregation))

    countryOfChoiceHeatmap = $("#heatmapCountriesToChooseFrom :selected").val()
    console.log("country selected:" + encodeURIComponent(countryOfChoiceHeatmap))

    $.ajax({
    type:'POST',
    headers:{
        "Content-Type": "application/json",
        "X-Session-Id":"testSessionId"},

    //data:JSON.stringify(countriesToOmmit),
    url:'http://localhost/api/v1/analyze_existing_data',

    success:function(response){   
        idOfOperation=response
        
        setTimeout(() => {console.log("ID of operation:"+idOfOperation)}, 2000);

        poll(getHeatmapData)
    },
        error:function(){
            alert(500);
            }
        })
    })

})




