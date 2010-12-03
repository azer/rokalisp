var SExpression = require('./types/sexpression').SExpression;
    HashTable = require('./types/hashtable').HashTable,
    Symbol = require('./types/symbol').Symbol,
    pop = require('./utils').pop,
    match = require('./utils').match,
    logger = require('./logger'),
    library = require('./library');

/**
 * Token Table
 */
var tokenTable = exports.tokenTable = [];

/**
 * Global Scope
 */
var globalScope = new HashTable(library);
globalScope.parent = new HashTable(typeof window === 'undefined' && global || window);

/**
 * Create new function extending an abstract token type.
 */
var createType = exports.createType = function createType(pattern,callback){
  return function(tokens){
    var matching = match(pattern,tokens[0]);
    if(matching){
      tokens.splice(0,1);
      callback(tokens,matching);
    }
  }
}

/**
 * Evaluate an expression in an environment.
 */
var evaluate = exports.evaluate = function evaluate(exp,env){
  !env && ( env = globalScope );
  
  logger.debug('Evaluating expression:',exp,' with environment:',env);

  return exp.evaluate(env);
}

/**
 * Read and parse given sequence of tokens.
 */
var read = exports.read = function read(tokens){
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
var tokenize = exports.tokenize = function tokenize(input){
  
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

/**
 * undefined
 */
tokenTable.push(createType(/^undefined$/,function(tokens,matching){
  throw undefined;
}));

/**
 * null
 */
tokenTable.push(createType(/^null$/),function(){
  return null;
});

/**
 * Numbers
 * > 314
 * > 3.14
 */
tokenTable.push(createType(/(^\d[\d\.e\+]*)$/,function(tokens,matching){
  throw Number(matching.input);
}));

/**
 * Strings
 * > "hello world"
 */
tokenTable.push(createType(/^"(.*)"$/,function(tokens,matching){
  throw matching[0];
}));

/**
 * Booleans
 * > #t
 * > #f
 */
tokenTable.push(createType(/#(t|f)/,function(tokens,matching){
  throw matching[0] == 't';
}));

/**
 * S-Expressions
 * > (....)
 */
tokenTable.push(createType(/^\(/,function(tokens,matching){
  var tree = new SExpression();

  while(tokens[0] != ')'){
    tree.context.push( read(tokens) );
  };
  pop(tokens,0);

  throw tree;
}));

tokenTable.push(createType(/^\)/,function(tokens,matching){
  throw new Error('Unexpected ")"');
}));

/**
 * Arrays
 * > [....]
 */
tokenTable.push(createType(/^\[/,function(tokens,matching){
  var list = [];

  while(tokens[0] != ']'){
    list.push( read(tokens) );
  };
  pop(tokens,0);

  throw list;
}));

tokenTable.push(createType(/^\]/,function(tokens,matching){
  throw new Error('Unexpected "]"');
}));

/**
 * Hash Tables
 * > { ..... }
 */
tokenTable.push(createType(/^\{/,function(tokens,matching){


  var token = pop(tokens,0);
  while(token != '}'){
    if(token.substring(0,1)==':'){
      ht[token.substring(1)] = read(pop(tokens,0));
    }
  };

  throw ht;
}));

tokenTable.push(createType(/^\}/,function(tokens,matching){
  throw new Error('Unexpected "}"');
}));

/**
 * Symbols
 * > foobar
 */
tokenTable.push(createType(/([\w\*\+\!\-_\?<>]+)/,function(tokens,matching){
  throw new Symbol(matching[0]);
}));
