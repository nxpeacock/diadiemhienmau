Template.locations_create.rendered = function(){
    $(document).ready(function(){
        var options = {
            timePicker: true,
            format : 'DD/MM/YYYY HH:MM',
            timePickerIncrement: 1
        }
        $('#availableRange').daterangepicker(options)
    })
}