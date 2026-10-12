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

int BinarySearch(vector<int> arr, int target, int& low, int& high)
{
    int n = arr.size(), mid = 0;

    while (low <= high)
    {
        mid = (low + high) / 2;
        if (arr[mid] == target)
            return mid;
        if (arr[mid] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }
}

vector<int> Optimal(vector<int> arr, int target)
{

    int n = arr.size(), low = 0, high = n - 1;
    if (n == 0)
        return {-1, -1};
    int result = BinarySearch(arr,target,low,high);
    if(arr[result-1]==target){
        
    }else if(arr[result+1]==target){

    }
}

int main()
{
    vector<int> arr = {3, 4, 4, 7, 8, 10};
    int target = 4;
    vector<int> result = Optimal(arr, target);
    cout << result[0] << " " << result[1];
    return 0;
}
