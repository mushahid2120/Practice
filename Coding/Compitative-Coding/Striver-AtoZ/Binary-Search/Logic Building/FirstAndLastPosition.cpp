// Given an array of integers nums sorted in non-decreasing order,
// find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

#include <iostream>
#include <vector>
using namespace std;



vector<int> Optimal(vector<int> arr, int target)
{

    int n = arr.size(), low = 0, high = n - 1, mid = 0,left=-1,right=-1;
    if (n == 0)
        return {-1, -1};

    while (low <= high)
    {

        mid = (low + high) / 2;
        if (arr[mid] == target){    // Go and Check left side is their target number is present if present then again go to the left that is how i got the first  
            left=mid;
            high=mid-1;
            }
        else if (arr[mid] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }

    low = 0, high = n - 1;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (arr[mid] == target){   //Same way as above go and check the right most elemet which is equal to target every time when you encounter number==target stores in right variable
            right=mid;
            low=mid+1;
            }
        else if (arr[mid] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return {left,right};
}

int main()
{
    vector<int> arr = {4, 4, 4, 4, 4, 10};
    int target = 4;
    vector<int> result = Optimal(arr, target);
    cout << result[0] << " " << result[1];
    return 0;
}
