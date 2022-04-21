var deleteAndEarn = function (nums) {
  let points = 0;
  while (nums.length > 0) {
    let value = nums.splice(0, 1).join('')
    console.log(value)
    points += +value;
    let max = +value + 1
    let min = +value - 1
    copyNum = nums.filter(value => value!==max && value!==min)
    nums = copyNum;
  }
  console.log(points)
  return nums;
};

console.log(deleteAndEarn([3,4,2]))