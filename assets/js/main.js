

$('#horse-row').hide();
$('#bet-row').hide();
$('#extra-row').hide();
$('#details-row').hide();
$('#button-row').hide();


$(document).ready( function () {
    $('#myTable').DataTable({aaSorting: [[0, 'asc']]});//{responsive: true}
    $('.select2').select2({width: 'resolve'});
});

$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $("#topbtn").removeClass('d-none');
    } else {
        $("#topbtn").addClass('d-none');
    }
});


$("#race").change(function(){
    var race=$(this).val();
    $('#spinner-loading-content').removeClass('d-none');

    $.ajax({
        url: 'functions/fetch_horses.php',
        type:"POST",
        data:{race:race},
        dataType:"json",
        success:function(data) {
            if(data.status=='success'){
                $('#horse-row').show();
                $('#horses').html('<option value="">Select Horses</option>');
                $.each(data.horses, function(key,value){
                    $('#horses').append('<option value="'+ value +'">' + value + '</option>');
                });
                $('#bet-row').hide();
                $('#extra-row').hide();
                $('#details-row').hide();
                $('#button-row').hide();
            }else if(data.status=='empty'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No horses found!'
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
            }
            $('#spinner-loading-content').addClass('d-none');
        }
    });
    
});

$("#horses").change(function(){
    var horse=$(this).val();
    $('#spinner-loading-content').removeClass('d-none');
    $.ajax({
        url: 'functions/horse_details.php',
        type:"POST",
        data:{horse:horse},
        dataType:"json",
        success:function(data) {
            if(data.status=='success'){
                $('#current-odds').html(data.horse.Bet365);
                $('#current-odds-field').val(data.horse.Bet365);
                $('#current-form').html('<b>Current Form:</b>'+data.horse.currentForm);
                $('#current-form-field').val(data.horse.currentForm);

                $('#bet-row').show();
                var bet=$("#bet").val();
                if(bet!=''){
                    var odd=$('#current-odds').html();
                    $('#potential-winning').html('<b>Potential Winning:</b> €'+parseFloat(odd)*parseInt(bet));
                }
            }else if(data.status=='empty'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No horses found!'
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
            }
            $('#spinner-loading-content').addClass('d-none');
        }
    });
    
});

$("input[name='EachWay'").change(function(){
    var bet=$("#bet").val();
    if(this.checked) {
        $('#total-stakes').html('<b>Total Stakes:</b> €'+parseInt(bet)*2);
        $('#current-stakes-field').val(parseInt(bet)*2);
    }else{
        $('#total-stakes').html('<b>Total Stakes:</b> €'+parseInt(bet));
        $('#current-stakes-field').val(parseInt(bet));
    }
});

$('#bet').keyup(function(){
    var bet=$(this).val();
    if(bet!=''){
        $('#extra-row').show();
        $('#details-row').show();
        $('#button-row').show();
        var odd=$('#current-odds').html();
        $('#potential-winning').html('<b>Potential Winning:</b> €'+parseFloat(odd)*parseInt(bet));
    }else{
        $('#extra-row').hide();
        $('#details-row').hide();
        $('#button-row').hide();
    }

    if ($("input[name='EachWay'").is(':checked')) {
        $('#total-stakes').html('<b>Total Stakes:</b> €'+parseInt(bet)*2);
        $('#potential-winning').html('<b>Total Stakes:</b> €'+parseInt(bet)*2);
        $('#current-stakes-field').val(parseInt(bet)*2);
    }else{
        $('#total-stakes').html('<b>Total Stakes:</b> €'+parseInt(bet));
        $('#current-stakes-field').val(parseInt(bet));
    }


});





