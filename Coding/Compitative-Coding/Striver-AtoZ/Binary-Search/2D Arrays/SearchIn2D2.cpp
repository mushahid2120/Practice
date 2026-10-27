// Given a 2-D array mat where the elements of each row are sorted in non-decreasing order,
// and the first element of a row is greater than the last element of the previous row (if it exists),
// and an integer target, determine if the target exists in the given mat or not.

// Example 1:
// Input: mat = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ], target = 8
// Output: True
// Explanation: The target = 8 exists in the 'mat' at index (1, 3).

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int SearchRow(vector<int> arr, int target, int lastIndex)
{
    int result = lower_bound(arr.begin(), arr.begin() + lastIndex, target) - arr.begin();
    int low = 0, high = lastIndex, mid;
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
    return high;
}

int SearchCol(vector<vector<int>> arr, int target, int startingRow, int currentWorkingCol)
{
    int n = arr.size();
    int low = startingRow, high = n - 1, mid;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (arr[mid][currentWorkingCol] == target)
            return mid;
        if (arr[mid][currentWorkingCol] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return low;
}

bool Optimal(vector<vector<int>> arr, int target)
{
    int n = arr.size(), m = arr[0].size();
    int currentWorkingRow = 0, currentWorkingCol = m - 1;
    if (arr[0][0] > target || arr[n - 1][m - 1] < target)
        return false;
    while (currentWorkingRow < n && currentWorkingCol >= 0)
    {

        cout << "Upper-----" << "row=" << currentWorkingRow << " " << "col=" << currentWorkingCol << "\n";
        currentWorkingCol = SearchRow(arr[currentWorkingRow], target, currentWorkingCol);
        cout << "Middle---" << "row=" << currentWorkingRow << " " << "col=" << currentWorkingCol << "\n";
        if (currentWorkingCol < 0)
            break;
        if (arr[currentWorkingRow][currentWorkingCol] == target)
        {
            cout << "Answer: " << currentWorkingRow << "," << currentWorkingCol << "\n";
            return true;
        }

        currentWorkingRow = SearchCol(arr, target, currentWorkingRow, currentWorkingCol);
        cout << "Below---" << "row=" << currentWorkingRow << " " << "col=" << currentWorkingCol << "\n";
        if(currentWorkingRow>=n){
            return false;
        }
        if (arr[currentWorkingRow][currentWorkingCol] == target)
        {
            cout << "Answer: " << currentWorkingRow << "," << currentWorkingCol << "\n";
            return true;
        }

        // cout <<"Below---"<<"row=" << currentWorkingRow << " "<<"col=" << currentWorkingCol << "\n";
    }
    return false;
}

int main()
{
    vector<vector<int>> arr = {{1, 4, 7, 11, 15}, {2, 5, 8, 12, 19}, {3, 6, 9, 16, 22}, {10, 13, 14, 17, 24}, {18, 21, 23, 26, 30}};
    int target = 20;
    bool result = Optimal(arr, target);
    cout << result;
    return 0;
}