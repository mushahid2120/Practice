// A peak element is an element that is strictly greater than its neighbors.
// Given a 0-indexed integer array nums, find a peak element, and return its index. 
// If the array contains multiple peaks, return the index to any of the peaks.
// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is 
// always considered to be strictly greater than a neighbor that is outside the array.
// You must write an algorithm that runs in O(log n) time.
// Example 1:

// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.

#include <iostream>
#include <vector>
using namespace std;

int Optimal(vector<int> arr){
    int n=arr.size();
    if(n==1) return 0;
    if(arr[0]>arr[1]) return 0;
    if(arr[n-1]>arr[n-2]) return n-1;
    int low=1,high=n-2,mid;
    while(low<=high){
        mid=(low+high)/2;
        if(arr[mid]>arr[mid-1] && arr[mid]>arr[mid+1]) return mid;
        else if(arr[mid]>arr[mid-1]){
            low=mid+1;
        }else if(arr[mid]>arr[mid+1]){
            high=mid-1;
        }
        else {
            low=mid+1;
        }
    }
    return -1;
}

int main(){
    vector<int> arr={3,4,3,2,1};
    int result=Optimal(arr);
    cout<<result;
    return 0;
}