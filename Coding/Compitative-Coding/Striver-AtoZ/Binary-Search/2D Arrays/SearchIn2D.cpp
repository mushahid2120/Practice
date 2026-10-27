// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findRow(vector<vector<int>> &arr, int target)
{
    int n = arr.size(), m = arr[0].size();
    int low = 0, high = n - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        if (arr[mid][m - 1] == target)
            return mid;
        if (arr[mid][m - 1] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return low;
}

bool Optimal(vector<vector<int>> arr, int target)
{
    int n = arr.size(), m = arr[0].size();
    if (arr[0][0] > target || arr[n - 1][m - 1] < target)
        return false;

    // Search in the last Col
    int row;
    row = findRow(arr, target);
    cout<<row<<" ";
    if (arr[row][m - 1] == target)
        return true;

    // Search in the Choosen Row
    int col;
    col = lower_bound(arr[row].begin(), arr[row].end(), target) - arr[row].begin();
    if (arr[row][col] == target)
        return true;
    return false;
}

int main()
{
    vector<vector<int>> arr = {{1}, {3}, {5}, {7}};
    int target = 5;
    bool result = Optimal(arr, target);
    cout << result;
    return 0;
}