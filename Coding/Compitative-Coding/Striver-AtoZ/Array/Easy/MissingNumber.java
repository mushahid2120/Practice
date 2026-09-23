// Given an array arr[] of size n-1 with distinct integers in the range of [1 n].
// This array represents a permutation of the integers from 1 to n with one element missing. 
// Find the missing element in the array.

// Examples: 

// Input: arr[] = [8,2,4,5,3,7,1]
// Output: 6
// Explanation: All the numbers from 1 to 8 are present except 6.

// Input: arr[] = [1,2,3,5]
//Output: 4
// Explanation: Here the size of the array is 4 so the range will be [1 5]. 
// The missing number between 1 to 5 is 4

public class MissingNumber {
    public static void main(String[] args) {
        int[] arr = { 8, 2, 4, 5, 3, 7, 1 };
        Integer Missing = null;
        // This Solution is Time=O(N*N),Space=O(1)
        // for(int i=1;i<=arr.length;i++){
        // int j=0;
        // for(j=0;j<arr.length;j++){
        // if(i==arr[j]){
        // break;
        // }
        // }
        // if(j==arr.length){
        // Missing=i;
        // break;
        // }
        // }
        // if(Missing==null){
        // Missing=arr[arr.length-1];
        // }

        // This Solution is Time=O(N) Space=O(N);
        // Integer[] newArr=new Integer[arr.length+1];
        // for(int i=0;i<arr.length;i++){
        // newArr[arr[i]-1]=arr[i];
        // }
        // for(int i =0;i<newArr.length;i++){
        // if(newArr[i]==null){
        // Missing=i+1;
        // }
        // }
        // if(Missing==null){
        // Missing=arr[arr.length-1];
        // }
        // for(Integer i:newArr){
        // System.out.print(i+", ");
        // }

        // This Solution has Time=O(N) Space=O(1)
        int sum = 0;
        long n=arr.length+1;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        // By default if constant varaible are int,double all the calculation is doing
        // in Int then convert into long
        // int sumofn=((arr.length+1)*(arr.length+1+1))/2;
        long sumofn=n*(n+1)/2;
        System.out.println(sumofn - sum);
        // System.out.println("\n"+Missing);
    }
}
