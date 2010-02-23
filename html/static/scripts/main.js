/*

*/

var main = (function() {
    return {
        _curPage: 1,

        init: function() {
            $('.refresh').bind('click', function() {
                if (main._curPage == 1) {
                    main._curPage = 2;
                }
                else {
                    main._curPage = 1;
                }

                main.clearHeadline();
                main.clearCopy();

                main.renderHeadline();
                main.renderCopy();

                return true; // want to bubble to jQtouch events
            });
            main.renderHeadline();
            main.renderCopy();
        },
        clearHeadline: function() {
            $('#wrapper' + main._curPage + ' .headline').html('');
        },
        clearCopy: function() {
            $('#wrapper' + main._curPage + ' .copy .col').html('');
        },
        renderHeadline: function() {
            $('#wrapper' + main._curPage + ' .headline').html(headlines.util.breakWords(headlines.getHeadline(), 9));
            //$('.headline').html(headlines.getHeadline());
        },
        renderCopy: function() {
            $('#wrapper' + main._curPage + ' .copy .col1').html(drivel.drivel({ maxwords: 40, maxwordlen: 12, dwords: ['dirvel'], 'break2': ' '}));
            $('#wrapper' + main._curPage + ' .copy .col2').html(drivel.drivel({ maxwords: 40, maxwordlen: 12, dwords: ['dirvel'], 'break2': ' ', strongStart: '"', strongEnd: '"'}));
            $('#wrapper' + main._curPage + ' .copy .col3').html(drivel.drivel({ maxwords: 40, maxwordlen: 12, dwords: ['dirvel'], 'break2': ' ', strongStart: '"', strongEnd: '"'}));
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
