
$('#menu_btn').on('click', function () {
    $('#menu').show();
});

$('#close_menu').on('click', function () {
    $('#menu').hide();
});

$('.show-pane').on('click', function () {
    $('.pane').hide();
    var idArr = $(this).attr('id').split('-');
    var paneToShow = '#pane-'+idArr[1];
    $(paneToShow).show();
    $('#menu').hide();
});

$('.sectionheading').on('click', function () {
    $('.toggle-content').hide();
    if ($(this).attr('class') == 'closed') {
        $('.sectionheading').removeClass('open');
        $('.sectionheading').addClass('closed');
        $(this).removeClass('closed');
        $(this).addClass('open');
    }
    else {
        $('.sectionheading').removeClass('closed');
        $('.sectionheading').addClass('open');
        $(this).removeClass('open');
        $(this).addClass('closed');
    }
    var idArr = $(this).attr('id').split('-');
    var divToShow = '#toggle-'+idArr[1];
    $(divToShow).show();
    $('#menu').hide();
});

$('.tabrow li').on('click', function () {
    $('.tabrow li').removeClass('selected');
    $(this).addClass('selected');
    var idArr = $(this).attr('id').split('-');
    $('.tabcontent').hide();
$('.tabcontent').removeClass('selected');
    var tabToShow = '#tabcontent-' + idArr[1];
    $(tabToShow).addClass('selected');
    $(tabToShow).show();
});