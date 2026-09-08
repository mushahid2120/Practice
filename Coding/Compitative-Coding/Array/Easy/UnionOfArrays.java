// Given two sorted arrays a[]and b[],where each array may contain duplicate elements,the task is to return the elements in the union of the two arrays in sorted order.Union of two arrays can be defined as the set containing distinct elements that are present in either of the arrays.

// Examples:

// Input:a[]=[1,2,3,4,5],b[]=[1,2,3,6,7]Output:[1,2,3,4,5,6,7]Explanation:Distinct elements including both the arrays are:1 2 3 4 5 6 7.

import java.util.*;

public class UnionOfArrays {
    public static void main(String[] args) {
        int[] a = { 2, 5, 6, 6, 9, 10 };
        int[] b = { 1, 2, 3, 5, 6, 8, 9, 10, 12, 14 };
        // Set<Integer> set=new HashSet<>();
        // for(int i:arr1){
        // set.add(i);
        // }
        // for(int i:b){
        // set.add(i);
        // }
        // System.out.println(set);
        ArrayList<Integer> newArr = new ArrayList<>();
        int fai = 0, sai = 0;
        while (fai < a.length && sai < b.length) {
            if ( fai + 1 < a.length && a[fai] == a[fai + 1]) {
                fai++;
            }
            if ( sai + 1 < b.length && b[sai] == b[sai + 1]) {
                sai++;
            }

            if (a[fai] < b[sai]) {
                newArr.add(a[fai]);
                fai++;
            } else if (a[fai] > b[sai]) {
                newArr.add(b[sai]);
                sai++;
            } else {
                newArr.add(a[fai]);
                sai++;
                fai++;
            }
        }

        while (sai < b.length) {
            if (b[sai] != newArr.getLast()) {
                newArr.add(b[sai]);
            }
            sai++;
        }

        while (fai < a.length) {
            if (a[fai] != newArr.getLast()) {
                newArr.add(a[fai]);
            }
            fai++;
        }
        System.out.println(newArr);
    }
}
