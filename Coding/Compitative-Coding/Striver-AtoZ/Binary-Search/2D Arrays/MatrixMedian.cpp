// Given a row-wise sorted matrix mat[][], where the number of rows and columns is always odd.
// Return the median of the matrix.
// Examples:
// Input: mat[][] = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]
// Output: 5
// Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Main Idea is if we store all the element in one array and sort them then middle one is always
// in the (left_half==right_half+1) count 

pair<int, int> FindMaxMin(vector<vector<int>> arr)
{
    int n = arr.size(), m = arr[0].size();
    int maxi = arr[0][m - 1], mini = arr[0][0];
    for (int i = 0; i < n; i++)
    {
        maxi = max(maxi, arr[i][m - 1]);
        mini = min(mini, arr[i][0]);
    }
    return {maxi, mini};
}

int CountX(vector<vector<int>> arr, int n, int m, int x)
{
    //Counting the number which is less than x and equal to x
    int count = 0;
    for (int i = 0; i < n; i++)
    {
        count += upper_bound(arr[i].begin(), arr[i].end(), x) - arr[i].begin();
    }
    return count;
}

int Optimal(vector<vector<int>> arr)
{
    int n = arr.size(), m = arr[0].size(), total = (m * n);
    pair<int, int> max_min = FindMaxMin(arr);
    int low = max_min.second, high = max_min.first;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        int cut1 = CountX(arr, n, m, mid);
        int cut2 = total - cut1;
        cout << mid << "--" << cut1 << " " << cut2 << "\n";
        if (cut1 >= cut2 + 1)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return low;
}

int main()
{
    vector<vector<int>> arr = {{1}, {2}, {3}};
    int result = Optimal(arr);
    cout << result;
    return 0;
}