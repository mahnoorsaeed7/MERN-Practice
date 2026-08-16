const numbers = [4, 1, 7, 3, 9, 2, 8];
const secondLargest = (numbers) =>{
   const maxi = Math.max(...numbers);

    const s = numbers.filter( n => n !== maxi)
   return Math.max(...s)
}

const num = secondLargest(numbers);
console.log(num);