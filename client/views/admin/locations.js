Template.insertLocationForm.onCreated(function(){
    availableTime = new ReactiveVar({})
});

Template.insertLocationForm.rendered = function(){
    $(document).ready(function(){
        var options = {
            timeZone : 'Asia/Ho_Chi_Minh',
            timePicker: true,
            format : 'DD/MM/YYYY HH:mm',
            timePicker12Hour : false,
            timePickerSeconds : false,
            timePickerIncrement : 30
        }
        $('#availableRange').daterangepicker(options);

        $('#availableRange').on('cancel.daterangepicker', function(ev, picker) {
            //do something, like clearing an input
            $('#availableRange').val('');
            availableTime.set({});
        });

        $('#availableRange').on('apply.daterangepicker', function(ev, picker) {
            availableTime.set({
                fromTime : picker.startDate.toDate(),
                toTime : picker.endDate.toDate()
            });
        });

        $('.editor').code('<b>Thời gian : </b> </br>');
    })
}

AutoForm.hooks({
    insertLocationForm: {
        formToDoc: function(doc) {
            doc = _.extend(doc,availableTime.get());
            return doc;
        },

        // Called when any submit operation succeeds
        onSuccess: function(formType, result) {
            FlowRouter.go('/admin');
        }
    }
});