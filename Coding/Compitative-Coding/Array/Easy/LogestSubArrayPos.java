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

import java.util.*;

public class LogestSubArrayPos {
    public static void main(String[] args) {
        int[] nums = {0,0,0,0,0,0,0,0,0,0};
        int k = 0, sum = 0, count = 0;
        int n = nums.length;
        // for (int i = 0; i < n; i++) {
        //     sum = 0;
        //     for (int j = i; j < n; j++) {
        //         sum += nums[j];
        //         if (sum == k) {
        //             count++;
        //         }
        //     }
        // }

        // int left=0,right=0;
        // sum=nums[0];
        // while(right<n){
        //     while(left<=right && sum>k){
        //         sum-=nums[left++];
        //     }
        //     if(sum==k){
        //         sum-=nums[left++];
        //         ++count;
        //     }
        //     ++right;
        //     if(right<n){
        //         sum+=nums[right];
        //     }
        // }

        HashMap<Integer,Integer> PrefixSum=new HashMap<>();
        PrefixSum.put(0,1);
        for(int i=0;i<n;i++){
            sum+=nums[i];
            int rem=sum-k;
            if(PrefixSum.containsKey(rem)){
                count+=PrefixSum.get(rem);
            }
            PrefixSum.put(sum,PrefixSum.getOrDefault(sum, 0)+1);
        }
        System.out.println(count);
    }
}
