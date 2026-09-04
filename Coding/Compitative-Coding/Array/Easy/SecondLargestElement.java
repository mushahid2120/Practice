// Input: arr[] = [12, 35, 1, 10, 34, 1]
// Output: 34
// Explanation: The largest element of the array is 35 and the second largest element is 34.

import java.util.*;

public class SecondLargestElement {
    public static void main(String[] args) {
        int []arr={10, 10, 10};
        TreeSet<Integer> tset=new TreeSet<>();
        for(int i:arr){
            tset.add(i);
        }
        if(tset.lower(tset.last())==null){
            System.out.println(-1);
        }
        System.out.println(tset.lower(tset.last()));
        
    }
}
