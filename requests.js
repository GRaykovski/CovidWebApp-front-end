console.log('asdasdsadasdasasdasdassd');

    var $resultshtmldiv=$('#somedivinhtml')
    var $name=$('#somedivinhtml2')

    var tableButton=$('#button1')
    var chartButton=$('#chartButton')
    var heatmapButton=$('#heatmapButton')

    var idOfOperation
    var countryOfChoice
    var typeOfAggregation

const encodeInformation = function(){
    encodeURIComponent()
}

// lambda in ecma script
//GET in table format
const getTableData = function() {
    $.ajax({
        type:'GET',
        url:'/api/v1/data/'+idOfOperation+'/table?page={?}',
        header:{"x-session-id":idOfOperation},
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
const getDiagramData = function() {
    $.ajax({
            type:'GET',
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
        $.ajax({
            type:'GET',
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

         $("#button1").click(() => {
            alert("kur")
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
            "X-Session-Id":"dsadasdas"},
        
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
         })
});

// $("#button1").click(() => {
//     alert("kur")
//     var array = []
//     var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

//     for (var i = 0; i < checkboxes.length; i++) {
//     array.push(checkboxes[i].value)
//     }
//     var countriesToOmmit = {
//         "excluded":array       
//         }
//         $.ajax({
//         type:'POST',
//         data:JSON.stringify(countriesToOmmit),
//         url:'http://localhost/api/v1/analyze_existing_data',
//             data:countriesToOmmit,
//             success:function(response){   // response.data
//                 idOfOperation=response.data
//             },
//             error:function(){
//                 alert(500);
//             }
//         })
// })

//POST analysis with existing data:
// $(tableButton).on('click',function(){
//     var array = []
//     var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

//     for (var i = 0; i < checkboxes.length; i++) {
//     array.push(checkboxes[i].value)
//     }
//     var countriesToOmmit = {
//         "excluded":array       
//         }
//         $.ajax({
//         type:'POST',
//         data:JSON.stringify(countriesToOmmit),
//         url:'http://localhost/api/v1/analyze_existing_data',
//             data:countriesToOmmit,
//             success:function(response){   // response.data
//                 idOfOperation=response.data
//             },
//             error:function(){
//                 alert(500);
//             }
//         })
    
// })   



///////////////////////////////////////////////////////////////////////////////                     

// var selected = new Array();

// $(document).ready(function() {

//   $("input:checkbox[name=type]:checked").each(function() {
//        selected.push($(this).val());
//   });

// });
//////////////////////////////////////////////////////////////////////////////


