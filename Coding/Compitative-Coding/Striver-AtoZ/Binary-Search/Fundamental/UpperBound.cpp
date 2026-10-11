// Given a sorted array arr[] and a number target,
// the task is to find the upper bound of the target in this given array.

// The upper bound is the smallest index in the sorted array
//  where the element is greater than the given target.
// If all the elements in the given array are smaller than or equal to the target,
// the upper bound will be the length of the array.
// Examples :

// Input: arr[] = [2, 3, 7, 10, 11, 11, 25], target = 9
// Output: 3
// Explanation: 3 is the smallest index in arr[], at which element (arr[3] = 10) is larger than 9.

#include <iostream>
#include <vector>
using namespace std;

int Optimal(vector<int> arr, int target)
{
    int n = arr.size(), low = 0, high = n - 1, mid = 0;
    if (target >= arr[high])
        return n;
    if (target<arr[0]) return 0;
    while(low<=high){
        mid=(low+high)/2;
        if(arr[mid]==target){
            while(mid<n && arr[mid]==target) ++mid;
            return mid;
        }
        else if(arr[mid]>target) high=mid-1;
        else low=mid+1;
    }
    return low;
}

int main()
{
    vector<int> arr = {2, 3, 7, 10, 11, 11, 25};
    int target = 9;
    int result = Optimal(arr, target);
    cout << result;
    return 0;
}