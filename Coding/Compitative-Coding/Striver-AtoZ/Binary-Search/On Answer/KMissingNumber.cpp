// Given a sorted array of unique positive integers arr, 
// your task is to return the kᵗʰ missing positive number that is not present in arr.

// The array is guaranteed to be strictly increasing, 
// and the missing numbers are those positive integers 
// that do not appear in arr but would appear in a full sequence starting from 1.

// Example 1:
// Input: arr = [3, 5, 7, 10], k = 6

// Output: 9
// Explanation:
// The missing numbers are [1, 2, 4, 6, 8, 9, 11, ...]. The 6ᵗʰ missing number is 9.

#include<iostream>
#include<vector>
using namespace std;

int Optimal(vector<int> arr,int k){
    int n=arr.size(),low=1,high=n-1;
    if(arr[n-1]<k) return k+n;
    while(low<=high){
        int mid=(low+high)/2;
        if(arr[mid]==k) return k+mid+1;
        if(arr[mid]>k) high=mid-1;
        else low=mid+1;
    }
    return k+low+1;
}

int main(){
    vector<int> arr={1,2,3,4};
    int k=2;
    int result=Optimal(arr,k);
    cout<<result;
    return 0;
}