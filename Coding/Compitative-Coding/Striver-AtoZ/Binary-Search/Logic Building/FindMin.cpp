// Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
//  For example, the array nums = [0,1,2,4,5,6,7] might become:

// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time
// results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

// Given the sorted rotated array nums of unique elements, return the minimum element of
//  this array.

// You must write an algorithm that runs in O(log n) time.

// Example 1:
// Input: nums = [3,4,5,1,2]
// Output: 1
// Explanation: The original array was [1,2,3,4,5] rotated 3 times.

#include <iostream>
#include <vector>
using namespace std;

int Optimal(vector<int> arr)
{
    int n = arr.size(), low = 0, high = n - 1, mid = 0;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (low == high)
            return arr[low];
        if (arr[low] <= arr[mid])     // ^Checking starting to mid is sorted or not
        {                             // till mid is sorted
            if (arr[low] > arr[high]) // Checking The whole array is sorted ?
            {
                low = mid + 1; // Whole array is not sorted (Smallest element is lies after mid)
            }
            else
            {
                return arr[low]; // Whoel array is not sorted that means lowest element is frist index
            }
        }
        else
        {                                // ^After Mid is sorted that means array is not sorted
            if (arr[mid] > arr[mid - 1]) // iss their any number before mid is lesser than mid or not
            {
                high = mid - 1; // Their are some number is lesser than mid before mid that mins smallest  lies before mid
            }
            else
                return arr[mid]; // That means mid is the smallest one
        }
    }
    return -1;
}

int main()
{
    vector<int> arr = {3, 4, 5, 1, 2};
    int result = Optimal(arr);
    cout << result;
    return 0;
}