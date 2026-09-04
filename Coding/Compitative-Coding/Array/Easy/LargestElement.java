// Input: arr[] = [1, 8, 7, 56, 90]
// Output: 90
// Explanation: The largest element of the given array is 90.

import java.util.*;

public class LargestElement {
    public static void main(String[] args) {
        // List<Integer> arr=new ArrayList<>(List.of(1, 8, 7, 56, 90));
        int []arr={1, 8, 7, 56, 90};
        Arrays.sort(arr);
        System.out.println(arr[arr.length-1]);
        // method 1 
        // System.out.println(Collections.max(arr));

        // Method 2
        // TreeSet<Integer> tset=new TreeSet<>(List.of(1, 8, 7, 56, 90));
        // System.out.println(tset.last());
    }
}
