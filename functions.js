$(function (){

    var $resultshtmldiv=$('#somedivinhtml');
    var $name=$('#somedivinhtml2');
    var idOfOperation
    var countryOfChoice = Germany
    var typeOfAggregation

    //encodeURIComponent(countryOfChoice)
    

//GET in table format
    $.ajax({
    type:'GET',
    url:'/api/v1/data/{operation_id}/table?page={?}',
    success:function(data){
        $.each(data,function(i,element){
            $resultshtmldiv.append(element.someproperty);
        })
    },
    error:function(){
        alert(500);
    }
})
//GET in diagram format
$.ajax({
    type:'GET',
    url:'/api/v1/data/{operation_id}/diagram?country=countryOfChoice&page=0',
    success:function(data){
        $.each(data,function(i,element){
            $resultshtmldiv.append(element.someproperty);
        })
    },
    error:function(){
        alert(500);
    }
})
//GET in heatmap format
$.ajax({
    type:'GET',
    url:'/api/v1/data/{operation_id}/heatmap?page=2&aggregate_by=week',
    success:function(data){
        $.each(data,function(i,element){
            $resultshtmldiv.append(element.someproperty);
        })
    },
    error:function(){
        alert(500);
    }
})
//GET analysis operation status with polling
(function() {
   var poll = function(){
    $.ajax({
        type:'GET',
        url:'',
            success: function(response) {
             console.log(response);   
             
            //$("#result").html(response);//$( "#result" ).empty().append( response );
        
        },
            error:function(){
                alert(500);
            }
        })
   } // infinite polling - fix to condition polling

   setInterval(function() {
       poll();
    },2000) 
})    


//POST analysis with existing data:
$('#some-button').on('click',function(){
    var countriesToOmmit = {
        name: $nqkakvopole.val()// ili textbox
    };
        $.ajax({
        type:'POST',
        url:'',
        data:countriesToOmmit,

            success:function(response){
                idOfOperation=response.id
            },
            error:function(){
                alert(500);
            }
        })

    })
})