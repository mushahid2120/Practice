// Given an array of integers nums which is sorted in ascending order, 
// and an integer target, write a function to search target in nums. 
// If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.
// Example 1:
// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4

#include <iostream>
#include <vector>
using namespace std;

int Optimal(vector<int> arr,int target){
    int n=arr.size(),low=0,high=n-1,mid=0;
    while(low<=high){
        mid=(low+high)/2;
        if(arr[mid]==target) return mid;
        else if(arr[mid]<target) low=mid+1;
        else high=mid-1;
    }
    return -1;
}

int main(){
    vector<int> arr={-1,0,3,5,9,12};
    int target=2;
    int result=Optimal(arr,target);
    cout<<result;
    return 0;
}