var Symbol = exports.Symbol = function Symbol(name,value){
  this._name_ = name;
  this._value_ = value;
};

Symbol.prototype.getName = function(){
  return this._name_;
};

Symbol.prototype.setName = function(name){
  this._name_ = name;
  return name;
};

Symbol.prototype.getValue = function(ns){
  return ns[this.getName()];
}

Symbol.prototype.setValue = function(value){
  throw new Error('Not Implemented');
}

Symbol.prototype.toString = function(){
  return '[Symbol :name '+this.getName()+']'
};
