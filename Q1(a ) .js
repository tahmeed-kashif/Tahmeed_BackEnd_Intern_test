const numbers = [10,20,30,20,40,10,50,30]

const seen = new Set();
const duplicates=[]

for (const number of numbers){
    if(seen.has(number)) {
        duplicates.push(number);
    } else{
        seen.add(number);
    }
}

console.log("Duplicate values:", duplicates)