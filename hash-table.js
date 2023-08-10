const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4)  {
   this.count = 0
   this.capacity = numBuckets
   this.data = new Array(numBuckets).fill(null)
  }

  hash(key) {
    let hexHash = sha256(key).slice(0,8)
    return parseInt(`0x${hexHash}`)
  }

  hashMod(key) {
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    const collision = new KeyValuePair(key, value)
    const index = this.hashMod(key)
    if(this.data[index]) {
      throw new Error('hash collision or same key/value pair already exists!')
    } else {
      this.data[index] = collision;
      this.count++

    }
  }

  insertWithHashCollisions(key, value) {
    const collision = new KeyValuePair(key, value);
    const index = this.hashMod(key);
    
    if (this.data[index]) {
     collision.next = this.data[index];
     this.data[index] = collision
    } else {
      this.data[index] = collision;
     
    }
    this.count++
    

  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;
