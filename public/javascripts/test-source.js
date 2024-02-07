$(document).ready(function() {
    $('.source-input-submit').click(function(event) {
        event.preventDefault();

        $("#output").val("Testing source... \n")

        var host = $(".source-input-host").val();
        var port = $(".source-input-port").val();

        var jqxhr = $.ajax({
                type: "POST",
                url: "../test",
                data: {host, port},
                dataType: "json" 
                }).done(function(result) {
                    //alert("success");
                    console.log(result);
                    console.log(result.message);
                    $("#output").val($("#output").val() + result.message);

                }).fail(function(xhr, status, error) {
                    //alert("error");
                    $("#output").val($("#output").val() + "Test Failed");
                });
    })
});