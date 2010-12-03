exports['+'] = function(){
  return Array.prototype.reduce.call(arguments,function(x,y){
    return x+y;
  });
}

exports['-'] = function(){
  return Array.prototype.reduce.call(arguments,function(x,y){
    return x-y;
  });
}

exports['*'] = function(){
  return Array.prototype.reduce.call(arguments,function(x,y){
    return x*y;
  });
}

exports['/'] = function(){
  return Array.prototype.reduce.call(arguments,function(x,y){
    return x/y;
  });
}

exports['not'] = function(a){
  return !a;
}

exports['<'] = function(){
  return Array.prototype.every.call(arguments,function(el,ind,list){ return ind == 0 || ( list[ind-1]<el ) });
}

exports['<='] = function(){
  return Array.prototype.every.call(arguments,function(el,ind,list){ return ind == 0 || ( list[ind-1]<=el ) });
}

exports['>'] = function(){
  return Array.prototype.every.call(arguments,function(el,ind,list){ return ind == 0 || ( list[ind-1]>el ) });
}

exports['>='] = function(){
  return Array.prototype.every.call(arguments,function(el,ind,list){ return ind == 0 || ( list[ind-1]>=el ) });
}

exports['append'] = function(){
  var l = [];
  Array.prototype.forEach.call(arguments,function(el){
    Array.prototype.push.apply(l,el);
  });
  return l;
}

exports['car'] = function(pair){
  return pair[0];
}

exports['cdr'] = function(pair){
  return pair.slice(1);
}

exports['cons'] = function(pair){
  return pair.slice(1);
}

exports['eq?'] = function(x,y){
  return x===y;
}

exports['equal?'] = function(x,y){
  return x==y;
}

exports['length'] = function(obj){
  return obj && obj.length;
}

exports['list'] = function(){
  return Array.prototype.slice.apply(arguments);
}

exports['list?'] = function(obj){
  return Array.isArray(obj); 
}

exports['null?'] = function(obj){
  return l.length == 0;
}

exports['symbol?'] = function(obj){
  return obj instanceof Symbol;
}
