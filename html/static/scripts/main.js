/**
    Author: konker <konker@gmai.com>
    Version: 0.1 February 26, 2010
    License: GNU GPL v2 or later

*/

var main = (function() {
    return {
        _curPage: 1,
        _isIPhone: false,

        init: function() {
            main._isIPhone = (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i));

            $('.refresh').bind('click', function() {
                main.renderHeadline();
                main.renderCopy();
                return false;
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
            $('#wrapper' + main._curPage + ' .headline').fadeOut('fast', function() {
                $('#wrapper' + main._curPage + ' .headline').html(headlines.getHeadline(), 9).fadeIn();
            });
        },
        renderCopy: function() {
            $('#wrapper' + main._curPage + ' .copy').fadeOut('fast', function() {
                $('#wrapper' + main._curPage + ' .copy .col1').html(drivel.drivel({ maxwords: 40, maxwordlen: 11, dwords: ['dirvel'], 'break2': ' '}));
                $('#wrapper' + main._curPage + ' .copy .col2').html(drivel.drivel({ maxwords: 40, maxwordlen: 11, dwords: ['dirvel'], 'break2': ' ', strongStart: '"', strongEnd: '"'}));
                $('#wrapper' + main._curPage + ' .copy .col3').html(drivel.drivel({ maxwords: 40, maxwordlen: 11, dwords: ['dirvel'], 'break2': ' ', strongStart: '"', strongEnd: '"'}));
                $('#wrapper' + main._curPage + ' .copy').fadeIn();
            });
        }
    }
})();
$(main.init);
