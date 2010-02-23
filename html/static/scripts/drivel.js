/**
    drivel engine
    Author: konker <konker@gmai.com>

*/
/*
    TODO:
        - pictures: some kind of random placeholder?
*/

var drivel = (function() {
    var DEFAULT_DRIVEL = ['drivel'];
    var DEFAULT_MAXWORDS = 128; // default maximum words of drivel
    var DEFAULT_MAXWORDLEN = 12; // default maximum length of word
    var LOREM = ['lorem', 'ipsum']; // fill this out

    var DEFAULT_BREAK_1 = ' ';
    var DEFAULT_BREAK_2 = '<br/>';

    var DEFAULT_PARAGRAPH_START = '<p>';
    var DEFAULT_PARAGRAPH_END = '</p>';

    var DEFAULT_STRONG_START = '<strong>';
    var DEFAULT_STRONG_END = '</strong>';

    var DEFAULT_EM_START = '<em>';
    var DEFAULT_EM_END = '</em>';

    var DEFAULT_WORDS_INTACT = false;

    var OPS = ['b1', 'b2', 'p', 's', 'e', 'ps', 'pe', 'se'];

    return {
        /* dword: string repeated, or array of words. Defaults to DEFAULT_DRIVEL.
           maxwords: maximum words of drivel. Deafults to DEFAULT_MAXWORDS.
        */
        drivel: function(specs) {
            var ret = [];
            
            specs = specs || {};
            var d = specs['dwords'] || DEFAULT_DRIVEL;
            if (d == 'lorem') {
                d = LOREM;
            }

            var mw = specs['maxwords'] || DEFAULT_MAXWORDS;
            var mwl = specs['maxwordlen'] || DEFAULT_MAXWORDLEN;

            var b1 = specs['break1'] || DEFAULT_BREAK_1;
            var b2 = specs['break2'] || DEFAULT_BREAK_2;
            var ps = specs['paragraphStart'] || DEFAULT_PARAGRAPH_START;
            var pe = specs['paragraphEnd'] || DEFAULT_PARAGRAPH_END;
            var ss = specs['strongStart'] || DEFAULT_STRONG_START;
            var se = specs['strongEnd'] || DEFAULT_STRONG_END;
            var es = specs['emStart'] || DEFAULT_EM_START;
            var ee = specs['emEnd'] || DEFAULT_EM_END;

            /* build at most mw words of drivel.
               words are randomly broken up by wither b1 or b2,
               words are divided randomly into blocks wrapped by ps..pe
               random blocks are wrapped by ss...se
               random blocks are wrapped by es...ee
               [TODO: wi?]
            */
            var words = '';
            for (var w in d) {
                words += d[w];
                --mw;
                if (mw == 0) {
                    break;
                }
            }
            if (mw > 0) {
                var j = 0;
                for (var i=0; i<mw; i++) {
                    words += d[j];
                    if (++j >= d.length) {
                        j = 0;
                    }
                }
            }

            var ret = '';
            /*
                - get random index i
                - get substring 0..i s
                - choose random op
                - apply op to s
            */

            var _retBuf = d[0] + b1;
            var lastIndex = 0;
            var str = '';
            while (lastIndex < words.length) {
                var index = drivel.util.getRandomInt(0, mwl + 1);
                if (lastIndex + index < words.length) {
                    str = words.substring(lastIndex, lastIndex + index);
                }
                else {
                    str = words.substring(lastIndex); // what's left
                    lastIndex = words.length; // to terminate loop
                }

                if (str.length >= mwl || _retBuf.length >= mwl) {
                    _retBuf += str;

                    var op = OPS[drivel.util.getRandomInt(0, OPS.length)];
                    switch (op) {
                        case 'p':
                            ret += (ps + _retBuf + pe + "\n");
                            break;
                        case 's':
                            ret += (ss + _retBuf + se + "\n");
                            break;
                        case 'e':
                            ret += (es + _retBuf + ee + "\n");
                            break;
                        case 'ps':
                            ret += (ps + ss + _retBuf + se + pe + "\n");
                            break;
                        case 'pe':
                            ret += (ps + es + _retBuf + ee + pe + "\n");
                            break;
                        case 'se':
                            ret += (ss + es + _retBuf + ee + se + "\n");
                            break;
                        case 'b2':
                            ret += (_retBuf + b2);
                            break;
                        default:
                            ret += (_retBuf + b1);
                    }
                    _retBuf = '';
                }
                else {
                    _retBuf += (str + b1);
                }
                lastIndex += index;
            }

            return ret;
        },
        util: {
            // Returns a random integer between min and max
            // Using Math.round() will give you a non-uniform distribution!
            getRandomInt: function(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
    }
})();
