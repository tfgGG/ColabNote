import Hashids from 'hashids'

module.exports = {

   hashes:function(id){
        var hashids = new Hashids("",6)
        var newhash = hashids.encode(id)
        return newhash
   },
   
   dec:function(hashes){
    
    var hashids = new Hashids("",6);
    var numbers = hashids.decode(hashes); // [1, 2, 3]
    return numbers[0]
   }
}

