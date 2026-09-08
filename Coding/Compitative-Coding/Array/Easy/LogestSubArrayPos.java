// Longest Subarray with given Sum K(Positives)
// Problem Statement: Given an array nums of size n and an integer k, 
// find the length of the longest sub-array that sums to k. If no such sub-array exists, 
// return 0.
// Examples
// Example 1:
// Input:
//  nums = [10, 5, 2, 7, 1, 9], k = 15  
// Output:
//  4  
// Explanation:
//  The longest sub-array with a sum equal to 15 is [5, 2, 7, 1], 
//  which has a length of 4. This sub-array starts at index 1 and ends at index 4, and 
//  the sum of its elements (5 + 2 + 7 + 1) equals 15. 
//  Therefore, the length of this sub-array is 4.

import java.util.ArrayList;
import java.util.TreeSet;

public class LogestSubArrayPos {
    public static void main(String[] args) {
        int []nums={1,2,3};
        int k=3,sum=0,left=0,right=0;
        ArrayList<Integer> subArrayLenght=new ArrayList<>();
        for(int i=0;i<nums.length;i++){
            if(sum+nums[i]<k){
                sum+=nums[i];
                right++;
            }
            else if(sum+nums[i]>k){
                sum-=nums[left];
                left++;
                sum+=nums[i];
                right++;
            }
            
            if(sum+nums[i]==k){
                right=i;
                subArrayLenght.add(right-left+1);
                left=i;
                sum=nums[i];
            }
        }
        System.out.println(subArrayLenght);
    }
}
