// You are given a sorted array consisting of only integers 
// where every element appears exactly twice, 
// except for one element which appears exactly once.
// Return the single element that appears only once.
// Your solution must run in O(log n) time and O(1) space.

// Example 1:
// Input: nums = [1,1,2,3,3,4,4,8,8]
// Output: 2

#include <iostream>
#include <vector>
using namespace std;


// Solution: Go to the mid and check the sum of number in left and numbers in right you got the answer
// go where the count of is odd 


int Optimal(vector<int> arr){
    int n=arr.size(),low=0,high=n-1,mid=0,ml=0,mr=0;
    // cout<<n;
    while(low<=high){
        cout<<" "<<arr[low]<<" "<<arr[mid]<<" "<<arr[high]<<"\n";
        mid=low + (high-low)/2;
        if(low==high) return arr[low];
        if(arr[mid-1]==arr[mid]){
            ml=mid-1;
            mr=mid;
        }else {
            mr=mid+1;
            ml=mid;
        }
        // cout<<ml<<","<<mr;
        if(arr[mr]!=arr[ml]) return ml;
        int dl=ml-low,dr=high-mr;
        if(dl%2==1) high=ml-1;
        else low=mr+1;
    }
    return -1;
}

int main(){
    vector<int> arr={};
    int result=Optimal(arr);
    cout<<result;
    return 0;
}