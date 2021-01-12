console.log('js file loaded');

    var $resultshtmldiv=$('#somedivinhtml')
    var $name=$('#somedivinhtml2')

    var tableButton=$('#tableButton')
    var chartButton=$('#chartButton')
    var heatmapButton=$('#heatmapButton')

    var idOfOperation
    var countryOfChoice 
    var typeOfAggregation


    //encodeURIComponent()


// lambda in ecma script
//GET in table format
const getTableData = function() {
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
    countryOfChoice = encodeURIComponent($("#chartCountriesToChooseFrom :selected").val());
    $.ajax({
            type:'GET',
            headers:{"X-Session-Id":"testSessionId"},
            url:'/api/v1/data/'+idOfOperation+'/diagram?country='+countryOfChoice+'&page=0',
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

    typeOfAggregation = $("#formatsOfAggregation :selected").val();
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
const getStatusOperation = function() 
{                                                       
    var ready = false
    var poll = function()
    {
        while(ready==false)
       {
            $.ajax({
                type:'GET',
                url:'api/v1/status/'+idOfOperation,

                    statusCode: {    //statusCode handling
                        204: function() {
                            alert("No content, operation is still running!");
                        },
                        201: function() {
                            alert("Created! Operation is complete!");
                            ready = true
                        }
                    }
                
                    
            })            
        }
   } 
   setInterval(function() {   // ili conditiona da e tuk 
       poll();
    },2000)
}   

$(function() {

    console.log( "ready!" );

    $("#tableButton").click(() => {
    alert(" table button clicked")

    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
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
                idOfOperation=response.data
                console.log(idOfOperation)
            },
            error:function(){
                alert(500);
            }
        })
        getStatusOperation
        getTableData
    })


    $("#chartButton").click(() => {
    alert(" chart button clicked")

        $.ajax({
            type:'POST',
            headers:{
                "Content-Type": "application/json",
                "X-Session-Id":"testSessionId"},
            
            //data:JSON.stringify(countriesToOmmit),
            url:'http://localhost/api/v1/analyze_existing_data',
            
                success:function(response){   // response.data
                    idOfOperation=response.data
                    console.log(idOfOperation)
                },
                error:function(){
                    alert(500);
                }
            })
            getStatusOperation
            getChartData
    })

    $("#heatmapButton").click(() => {
    alert(" heatmap button clicked")

    $.ajax({
        type:'POST',
        headers:{
            "Content-Type": "application/json",
            "X-Session-Id":"testSessionId"},
        
        //data:JSON.stringify(countriesToOmmit),
        url:'http://localhost/api/v1/analyze_existing_data',
        
            success:function(response){   // response.data
                idOfOperation=response.data
                console.log(idOfOperation)
            },
            error:function(){
                alert(500);
            }
        })
        getStatusOperation
        getHeatmapData
     })

})

// $("#button1").click(() => {
//     
//    
// })

//
// $(tableButton).on('click',function(){
//     
    
// })   



///////////////////////////////////////////////////////////////////////////////                     

// var selected = new Array();

// $(document).ready(function() {

//   $("input:checkbox[name=type]:checked").each(function() {
//        selected.push($(this).val());
//   });

// });
//////////////////////////////////////////////////////////////////////////////


