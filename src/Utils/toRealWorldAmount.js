export const realworldUint = function(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        var units = ["Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion"]
        var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
        var r = unit%3
        var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
        return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
  }else{
      return num;
  }
}

export const realworldUintshort = function(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        var units = ["M","B","T","Q","Q","S"]
        var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
        var r = unit%3
        var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
        return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
  }else{
      return num;
  }
}