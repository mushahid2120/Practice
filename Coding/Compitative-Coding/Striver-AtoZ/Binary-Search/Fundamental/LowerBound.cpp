// Given a sorted array arr[] (following 0-based indexing) and a number target,
// find the lower bound of the target in this given array.

// The lower bound of a number is defined as the smallest index in the sorted array
//  where the element is greater than or equal to the given number.
// If all the elements in the given array are smaller than the target,
// the lower bound will be the length of the array.
// Examples :

// Input:  arr[] = [2, 3, 7, 10, 11, 11, 25], target = 9
// Output: 3
// Explanation: 3 is the smallest index in arr[]
//              where element (arr[3] = 10) is greater than or equal to 9.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int Optimal(vector<int> arr, int target)
{
    int n = arr.size(), low = 0, high = n - 1, mid = 0;
    if (target > arr[high])
        return n;
    while (low <= high)
    {
        mid=(low+high)/2;
        if(arr[mid]>=target) high=mid-1;
        else low=mid+1;
    }
    return low;

    return lower_bound(arr.begin(),arr.end(),target)-arr.begin();
}

int main()
{                 
    vector<int> arr = {2,15,15,15,20};
    int target = 11;
    int result = Optimal(arr, target);
    cout << result;
    return 0;
}