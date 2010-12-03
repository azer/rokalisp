var instanceCounter = 0;
var HashTable = exports.HashTable = function HashTable(ctx){
  this.context = ctx || {};
  this.parent = null;
  instanceCounter++;
};

HashTable.prototype.get = function(key){
  return this.context[key];
};

HashTable.prototype.find = function(sym){
  
  logger.debug('Seeking symbol:',sym,' at ',this);

  var key = sym.getName(),
      value = this.context.hasOwnProperty(key) && this.context[key] || ( this.parent && this.parent.find(sym) || undefined );
  return value;
}

HashTable.prototype.set = function(key,value){
  return this.context[key] = value;
};

HashTable.prototype.toString = function(){
  return '[HashTable #'+instanceCounter+']';
};

