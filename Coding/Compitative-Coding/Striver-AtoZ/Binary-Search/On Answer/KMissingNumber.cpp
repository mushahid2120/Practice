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

    int n=arr.size(),low=0,high=n-1,answer=k;
    while(low<=high){
        int mid=(high+low)/2;

        if(arr[mid]<=answer){
            //When you encounter something smaller than answer then change the answet extend the high value.
            answer=mid+k+1;
            low=mid+1;
            high=n-1;
        }
        else {
            high=mid-1;
        }
    }
    return answer;
}

int main(){
    vector<int> arr={3,4,9,10,12,19,24,25,27,30};
    int k=8;
    int result=Optimal(arr,k);
    cout<<result;
    return 0;
}