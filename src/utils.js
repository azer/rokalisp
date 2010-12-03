/**
 * Test the given string whether matches with passed pattern
 */
var match = exports.match = function match(pattern,string){
  var groups = string.match(pattern);
  !(groups==null) && groups.splice(0,1);
  return groups==null?false:groups.length==0&&true||groups;
}

/**
 * Remove and return item at index (default last)
 */
var pop = exports.pop = function pop(list,index){
  index == undefined && ( index = list.length-1 );
  return list.splice(index,1);
};
