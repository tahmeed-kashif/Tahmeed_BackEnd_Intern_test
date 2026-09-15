const numbers =[12, 45 ,7, 89, 34, 23];
let largest = numbers[0];

for(const number of numbers){
    if(number > largest){
        largest = number;
    }
}
console.log("Largest number:", largest);




/* Approach:
I started by assuming the first number is the largest,then I compared each number with the current largest number.
if a bigger number was found, I updated the largest value.
Time complexity is O(n)*/