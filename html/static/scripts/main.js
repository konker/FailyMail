/*

*/

var main = (function() {
    return {
        init: function() {
            $('#refresh').unbind('click').bind('click', function() {
                main.renderHeadline();
                return false;
            });
            main.renderHeadline();
        },
        renderHeadline: function() {
            $('#headline').html(headlines.getHeadline());
        }
    }
})();
$.jQTouch({
    icon: 'jqtouch.png',
    statusBar: 'black-translucent',
    preloadImages: [
        'static/jqtouch/themes/konker/img/chevron_white.png',
        'static/jqtouch/themes/konker/img/bg_row_select.gif',
        'static/jqtouch/themes/konker/img/back_button_clicked.png',
        'static/jqtouch/themes/konker/img/button_clicked.png'
        ]
});
$(main.init);
