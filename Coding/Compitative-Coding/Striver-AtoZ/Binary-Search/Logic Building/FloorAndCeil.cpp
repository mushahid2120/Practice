
// 899. Floor and Ceil in Sorted Array
// Given a sorted array nums and an integer x.
// Find the floor and ceil of x in nums.
// The floor of x is the largest element in the array which is smaller than or equal to x.
// The ceiling of x is the smallest element in the array greater than or equal to x.
// If no floor or ceil exists, output -1.

// Example 1:
// Input : nums =[3, 4, 4, 7, 8, 10], x= 5
// Output: 4 7
// Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.

#include <iostream>
#include <vector>
using namespace std;

vector<int> Optimal(vector<int> arr, int target)
{
    int n = arr.size(), low = 0, high = n - 1, mid = 0;
    if(target<arr[0]) return {-1,arr[0]};
    if(target>arr[n-1]) return {arr[n-1],-1};
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (arr[mid] == target)
            break;
        if (arr[mid] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }

    if (low <= high)
        return {arr[mid], arr[mid]};
    else
        return {arr[low-1], arr[low]};
}

int main()
{
    vector<int> arr = {3, 4, 4, 7, 8, 10};
    int target = 54;
    vector<int> result = Optimal(arr, target);
    cout << result[0] << " " << result[1];
    return 0;
}