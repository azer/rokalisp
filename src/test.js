var lisp = require('./lisp'),
    puts = require('sys').puts;

//var foobar = exports.foobar = "(+ 3.14 2 ;; sum pi with 2\
//                    (* 0 2 3)) ;; and multiplication of 0 2 3"
                  
puts(lisp.evaluate(lisp.read(lisp.tokenize("(+ 1 2 3)"))));
