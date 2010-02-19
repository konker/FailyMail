/**
    drivel engine
    Author: konker <konker@gmai.com>

*/
/*
    TODO:
        - pictures: some kind of random placeholder?
*/

var drivel = (function() {
    DEFAULT_DRIVEL = 'drivel';
    DEFAULT_MAXWORDS = 128; // default maximum words of drivel
    LOREM = ['lorem', 'ipsum']; // fill this out

    DEFAULT_PARAGRAPH_START = '<p>';
    DEFAULT_PARAGRAPH_END = '</p>';

    DEFAULT_STRONG_START = '<strong>';
    DEFAULT_STRONG_END = '</strong>';

    DEFAULT_EM_START = '<em>';
    DEFAULT_EM_END = '</em>';

    DEFAULT_WORDS_INTACT = false;


    return {
        /* dword: string repeated, or array of words. Defaults to DEFAULT_DRIVEL.
           maxwords: maximum words of drivel. Deafults to DEFAULT_MAXWORDS.
        */
        drivel: function(dwords, maxwords, paragraphStart, paragraphEnd, strongStart, strongEnd, emStart, emEnd, wordsIntact) {
            var ret = [];
            
            var d = dwords || DEFAULT_DRIVEL;
            var w = maxwords || DEFAULT_MAXWORDS;
            var ps = paragraphStart || DEFAULT_PARAGRAPH_START;
            var pe = paragraphEnd || DEFAULT_PARAGRAPH_END;
            var ss = strongStart || DEFAULT_STRONG_START;
            var se = strongEnd || DEFAULT_STRONG_END;
            var es = emStart || DEFAULT_EM_START;
            var ee = emEnd || DEFAULT_EM_END;
            var wi = wordsIntact || DEFAULT_WORDS_INTACT;

            /* build at most w words of drivel, punctuated */

        }
    }
})();
