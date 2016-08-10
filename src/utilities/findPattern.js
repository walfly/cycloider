function findPattern(pattern, str) {
  pattern = pattern.split('');
  var partLengths = pattern.reduce(function (memo, item) { 
    memo[item] = 1; 
    return memo; 
  }, {});

  var successful = [];

  (function testAll(pattern, str, lengths) {
    if(successful.length){
      return;
    }

    var ends = createPatternEnds(pattern, lengths);
    if(ends[ends.length - 1 ] > str.length){
      return;
    } 

    if (ends[ends.length - 1] === str.length) {
      var hash = {};
      var bool = true;
      for(var i = 0; i < ends.length; i ++){
        var subStr = str.substring(ends[i - 1] || 0, ends[i]);
        if(!hash[pattern[i]]){
          hash[pattern[i]] = subStr;
        } else if (hash[pattern[i]] !== subStr) {
          bool = false;
        }
      }
      if(bool) {
        successful = ends;
      }
    }

    if (ends[ends.length - 1] < str.length) {
      var keys = Object.keys(lengths);
      for(var i = 0; i < keys.length; i++){
        var newLengths = Object.assign({}, lengths, {[keys[i]] : lengths[keys[i]] + 1})
        testAll(pattern, str, newLengths);
      }
    }
  }(pattern, str, partLengths));

  return successful;
};

function createPatternEnds(pattern, partLengths) {
  var patternEnds = [];
  for(var i = 0; i < pattern.length; i ++){
    var previous = patternEnds[i - 1] || 0;
    patternEnds[i] = previous + partLengths[pattern[i]];
  }
  return patternEnds;
};
