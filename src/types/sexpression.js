var logger = require('../logger');

var SExpression = exports.SExpression = function SExpression(){
  this.context = Array.prototype.slice(arguments);
};

SExpression.prototype.evaluate = function(scope){
  var fn = scope.find(this.context[0]);
  var args = this.context.slice(1).map(function(el,ind){
    return el instanceof SExpression?el.evaluate(scope):el;
  });

  return fn.apply(null,args);
};

SExpression.prototype.toString = function(){
  return '[SExpression :context '+this.context+']'
};
