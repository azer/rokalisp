var logger = require('./logger');

/**
 * Read and parse given sequence of tokens.
 */
function read(tokens){
  if(tokens.length == 0) throw new Error('Unexpected EOF while reading');

  logger.debug('Reading tokens:',tokens);

  for(var i = -1, len=tokenTable.length; ++i < len;){
    try {
      tokenTable[i](tokens);
    } catch(result) {
      if(result instanceof Error) throw new Error('Parsing Error: '+result.message);
      return result;
    }
  };
  throw new Error('Invalid Character:'+tokens.slice(0,3).join(''));
}

/**
 * Convert a string into a list of tokens
 */
function tokenize(input){
  
  logger.debug('starting to tokenize');

  var tokens = [];

  (function(s){

    var match = tokenizer.exec(s),
        token = match[1],
        rest = match[2];

    token && tokens.push(token);
    rest && arguments.callee(rest);
    
  })(input);

 logger.info('Tokenized: ',tokens);

 return tokens;
};

var tokenizer = /\s*([()]|[\{\}]|[\[\]]|"(?:[\\].|[^\\"])*"|;.*|[^\s'"`,;\[\]\{\}()]*)([\s\S]*)/;
