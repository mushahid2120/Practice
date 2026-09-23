// Input: nums = [3,4,5,1,2]
// Output: true
// Explanation: [1,2,3,4,5] is the original sorted array.
// You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].
// edgeCases===[5,1,5,1],[1,2,1,1],[10,1,1,10]

import java.lang.reflect.Array;
import java.util.*;
public class isSorted {
    public static void main(String[] args) {
        // int arr[]={1,2,1,1,1};
        int arr[]={2,1};

    // This Solution have Time complexity = O(N*N) and Space Complexity= O(N) 
    //     int []newArr=new int[arr.length];
    //     for(int r=0;r<arr.length;r++){
    //         for(int i=0;i<arr.length;i++){
    //             if(i+r>=arr.length){
    //                 newArr[i+r-arr.length]=arr[i];
    //             }else{
    //                 newArr[i+r]=arr[i];
    //             }
    //         }
    //         boolean isSorted=true;
    //         for(int i=1;i<arr.length;i++){
    //             if(newArr[i-1]>newArr[i]){
    //                 isSorted=false;
    //                 break;
    //             }
    //         }
            
    //         if(isSorted){
    //             System.out.println("This is a sorted array it is rotate "+r+" times.");
    //             break;
    //         }
    //     }
    // }


    // int smallest=0;
    // for(int i=0;i<arr.length;i++){
    //     if(arr[smallest]>=arr[i]){
    //         System.out.println(i);
    //         smallest=i;
    //         while(i<arr.length-1 && arr[i]==arr[i+1]){++i;};
    //     }
    // }
    // System.out.println(smallest);
    // boolean isSorted=true;
    // for(int i=smallest;i<arr.length-1;i++){
    //     if(arr[i]>arr[i+1]){
    //         isSorted=false;
    //         break;
    //     }
    // }
    // for(int i=0;i<smallest-1;i++){
    //     if(arr[i]>arr[i+1]){
    //         isSorted=false;
    //         break;
    //     }
    // }
    // System.out.println(isSorted);
    // System.out.println(5%12);

//Best Solution
    int count=0;
    for(int i=0;i<arr.length-1;i++){
        if(arr[i]>arr[i+1]){
            count++;
        }
    }
    if(arr[0]<arr[arr.length-1]){
        count++;
    }
    System.out.println(count<=1?true:false);
}
}
