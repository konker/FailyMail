/* Daily Mail headline generator script

 Author: Chris Applegate (www.qwghlm.co.uk)
 Version: 1.1 January 7, 2009
 License: GNU GPL v2 or later
 
 Changelog:
 
   1.1 [Jan 2009]
     - Added past/present tenses
     - Updated with 2009-relevant terms
     - Added sarcastic comments to code
   1.0 [2003]
     - Original version
*/

/*
 Adapted by konker <konker@gmail.com>

 Changelog:
    
    - re-arranged for scoping
*/

var headlines = (function() {
    // Objects for nouns, modifier verbs and phrases
    function Verb(plural, singular, tense) {
        this.singular = singular;
        this.plural = plural;
        this.tense = tense;
    }

    function Noun(word,person,number) {
        this.word = word;
        this.person = person;
        this.number = number;
    }

    function Phrase(present, past, active, object) {
        this.present = present;
        this.past = past;
        this.active = active;
        this.object = object;
    }

    // Auxiliary verbs (the first word in the sentence)
    auxiliary_verbs = [
        new Verb("will", "will", "present"), 
        new Verb("could", "could", "present"),
        new Verb("are", "is", "active"),
        new Verb("have", "has", "past")
    ];


    // Subjects (i.e. bad things)
    subjects = [

        new Noun("new labour",3,1),
        new Noun("brussels",3,1),
        new Noun("the bbc",3,1),
        new Noun("the e.u.",3,1),
        new Noun("the euro",3,1),
        new Noun("the loony left",3,1),
        new Noun("the unions",3,2),       // May be a bit quaint this one
        new Noun("channel 4",3,1),
        new Noun("your local council",3,1),


        new Noun("the french",3,2),
        new Noun("the germans",3,2),
        new Noun("the poles",3,2),
        new Noun("brussels bureaucrats",3,2),
        new Noun("muslims",3,2),
        new Noun("immigrants",3,2),        // Except those from the UK to Spain & the Algarve of course
        new Noun("teachers",3,2),
        new Noun("the unemployed",3,2),
        new Noun("gypsies",3,2),
        new Noun("yobs",3,2),
        new Noun("hoodies",3,2),
        new Noun("feral children",3,2),    // They hate children *and* paedophiles FFS, make your minds up
        new Noun("chavs",3,2),
        new Noun("the p.c. brigade",3,2),
        new Noun("cyclists",3,2),          // Thanks to Chris Richards for this suggestion

        
        new Noun("asylum seekers",3,2),    // Nicer way of saying 'brown people'
        new Noun("gays",3,2),
        new Noun("lesbians",3,2),
        new Noun("single mothers",3,2),
        new Noun("paedophiles",3,2),
        
        new Noun("working mothers",3,2),   // Thanks to Maggie A for this suggestion

        new Noun("gordon brown",3,1),
        new Noun("alistair darling",3,1),
        new Noun("jacqui smith",3,1),
        new Noun("russell brand",3,1),     // FIXME: Delete when latest moral panic is over
        
        new Noun("teenage sex",3,1),
        new Noun("political correctness",3,1),
        new Noun("health &amp; safety",3,1),
        new Noun("feminism",3,1),
        new Noun("the metric system",3,1),    // For fuck's sake
        new Noun("dumbing-down",3,1),
        new Noun("rip-off britain",3,1),
        new Noun("the internet",3,1),
        new Noun("facebook",3,1),             // I CAN'T BELIEVE THE MAIL ACTUALLY SAID FACEBOOK COULD GIVE YOU CANCER, FOR REAL
        new Noun("filth on television",3,1),
        new Noun("the human rights act",3,1),
        new Noun("the nanny state",3,1),
        new Noun("cancer",3,1),               // Could cancer give you cancer?
        new Noun("binge drinking",3,1),
        new Noun("the MMR jab",3,1),          // Murdering cunts
        new Noun("the house price crash",3,1) // Hahahaha
    ];

    // Transitive phrases (i.e. bad thing they do)
    transitive_phrases = [
        new Phrase("give", "given", "giving", "cancer"),
        new Phrase("give", "given", "giving", "cancer"), // Have it twice as they're so bloody obsessed by it
        new Phrase("infect", "infected", "infecting", "with AIDS"),
        new Phrase("give", "given", "giving", "swine flu"),
        new Phrase("make", "made", "making", "obese"),
        new Phrase("give", "given", "giving", "diabetes"),
        new Phrase("make", "made", "making", "impotent"),

        new Phrase("turn","turned","turning","gay"),    // Cunts

        new Phrase("scrounge off","scrounged off","scrounging off",""),
        new Phrase("tax", "taxed", "taxing", ""),
        new Phrase("cheat", "cheated", "cheating", ""),
        new Phrase("defraud", "defrauded", "defrauding", ""),
        new Phrase("steal from","stolen from","stealing from",""),
        new Phrase("burgle","burgled","burgling",""),
        new Phrase("devalue","devalued","devaluing",""),
        new Phrase("rip off","ripped off","ripping off",""),
        
        new Phrase("molest","molested","molesting",""),
        new Phrase("have sex with","had sex with","having sex with",""),
        new Phrase("impregnate", "impregnated", "impregnating", ""),

        
        new Phrase("steal the identity of","stolen the identity of","stealing the identity of",""),

        new Phrase("destroy","destroyed","destroying",""),
        new Phrase("kill","killed", "killing",""),
        new Phrase("ruin","ruined","ruining",""),
        new Phrase("hurt","hurt", "hurting","")
    ];

    // Objects (i.e. saintly, saintly things)
    objects = [
        "the british people",
        "the middle class",
        "middle britain", // Cunts
        "england",

        "hard-working families",
        "home-owners",
        "pensioners",
        "drivers",
        "tax-payers",
        "tax-payers' money",

        "house prices",
        "property prices", // Hahahahahahahaa
        
        "britain's farmers",
        "the country-side",

        "british justice",
        "british sovereignty",
        "common sense and decency",

        "the queen",    // God bless 'er
        "the royal family",
        "the church",

        "you",
        "your mortgage",
        "your pension",
        "your daughters",
        "your children",
        "your house",
        "your pets",

        "the conservative party",  // FAIL
        "cliff richard",           // Should this be in here?
        "the memory of diana",
        "Britain's swans"          // This always stays
    ];

    return {

        // Returns a Daily Mail Headline as a string
        getHeadline: function() {
            var sentence = [];

            var subject = headlines.util.getRandom(subjects);
            var phrase = headlines.util.getRandom(transitive_phrases);
            var verb = headlines.util.getRandom(auxiliary_verbs);
            var object = headlines.util.getRandom(objects);

            sentence[0] = headlines.util.match_verb_and_subject(subject, verb);
            sentence[1] = subject.word;
            sentence[2] = headlines.util.match_verb_and_tense(verb, phrase);
            sentence[3] = object;
            if (phrase.object != "") sentence[4] = phrase.object;

            var s = sentence.join(" ").toUpperCase();
            s += "?";

            return s;
        },

        util: {
            // break up words longer than n chars long using sep (default '-')
            breakWords: function(s, n, sep) {
                var sep = sep || '-';
                var words = s.split(' ');
                var ret = '';
                for (w in words) {
                    if (words[w].length > n) {
                        if (words[w].indexOf(sep) != -1) {
                            ret += words[w];
                        }
                        else if (words[w].length < n+3) {
                            var i = Math.floor(words[w].length / 2);
                            ret += words[w].substring(0, i);
                            ret += sep;
                            ret += words[w].substring(i);
                        }
                        else {
                            ret += words[w].substring(0, n);
                            ret += sep;
                            ret += words[w].substring(n);
                        }
                        ret += ' ';
                    }
                    else {
                        ret += words[w];
                        ret += ' ';
                    }
                }
                return ret;
            },

            // A more random random generator
            getRandom: function(a) {
                var n = new Array(50);

                for (var i=0; i<n.length; i++) {
                    n[i] = Math.random();
                }

                var m = n[Math.floor(Math.random() * n.length)];
                var o = Math.floor(m * a.length);

                return a[o];
            },

            // Matches an auxiliary verb with the subject
            match_verb_and_subject: function(subject, verb) {
                if (subject.number == 1 && subject.person == 3) {
                     return(verb.singular);
                }
                else {
                     return(verb.plural);
                }
            },

            // Matchs the transitive verb's tense with that of the verb
            match_verb_and_tense: function(verb, phrase) {
                if (verb.tense == "present") {
                    return phrase.present;
                }
                else if (verb.tense == "past") {
                    return phrase.past;
                }
                else if (verb.tense  == "active") {
                    return phrase.active;
                }
            }
        }
    }
})();
