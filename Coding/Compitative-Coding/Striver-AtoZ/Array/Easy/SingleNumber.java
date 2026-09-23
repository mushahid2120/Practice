// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
// You must implement a solution with a linear runtime complexity and use only constant extra space.
// Example 1:
// Input: nums = [2,2,1]
// Output: 1
// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4

import java.util.*;

public class SingleNumber {
    public static void main(String[] args) {
        int[] nums = { 4, 1, 2, 1, 2 };
        // Map<Integer, Integer> map = new HashMap<>();
        // for (int i : nums) {
        //     if (map.get(i) == null) {
        //         map.put(i, 1);
        //     } else {
        //         map.remove(i);
        //     }
        // }
        // for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
        //     System.out.println(entry.getKey());
        // }

        int xor=0;
        for(int i:nums){
            xor^=i;
        }
        System.out.println(xor);
    }
}
