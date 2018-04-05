$(document).ready(function () {

    var myStyle = $.jStorage.get('myStyle', '');
    if (myStyle !== '') {
        $("#colors").attr("href", myStyle);
    }

    $('.styleswitch').on('click', function () {
        $("#colors").attr("href", $(this).attr('resource'));
        $.jStorage.set('myStyle', $(this).attr('resource'), { TTL: 28800000 });
        return false;
    });
});

