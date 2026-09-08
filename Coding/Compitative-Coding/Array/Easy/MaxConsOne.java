// Given a binary array nums, return the maximum number of consecutive 1's in the array.

 

// Example 1:

// Input: nums = [1,1,0,1,1,1]
// Output: 3
// Explanation: The first two digits or the last three digits are consecutive 1s.
//  The maximum number of consecutive 1s is 3.
// Example 2:

public class MaxConsOne {
    public static void main(String[] args) {
        int[]nums={1,1,0,1,1,1};
        int count=0,currentCount=0;
        for(int i:nums){
            if(i==1){
                currentCount++;
            }else{
                currentCount=0;
            }
            if(currentCount>count){
                count=currentCount;
            }
        }
        System.out.println(count);
    }
}
