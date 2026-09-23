// Given an integer array nums, return all the triplets [nums[i], nums[j],
// nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.
// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
using namespace std;

vector<vector<int>> BruteForce(vector<int> &arr)
{
    int n = arr.size();
    set<vector<int>> result;
    if (n < 3)
    {
        return {{}};
    }
    for (int i = 0; i < n - 2; i++)
    {
        for (int j = i + 1; j < n - 1; j++)
        {
            for (int k = j + 1; k < n; k++)
            {
                int sum = arr[i] + arr[j] + arr[k];
                if (sum == 0)
                {
                    vector<int> unique = {arr[i], arr[j], arr[k]};
                    sort(unique.begin(), unique.end());
                    result.insert(unique);
                }
            }
        }
    }
    return vector<vector<int>>(result.begin(), result.end());
}

vector<vector<int>> Optimal(vector<int> &arr)
{
    int n = arr.size();
    if (n < 3)
    {
        return {{}};
    }
    set<vector<int>> result;
    sort(arr.begin(), arr.end());
    for (int i = 0; i < n - 2; i++)
    {
        int fixed = arr[i];
        if (i > 0 && arr[i] == arr[i - 1])
            continue;
        int left = i + 1;
        int right = n - 1;
        while (left < right)
        {
            long long sum = (long long)(arr[left] + arr[right]);
            if (sum + fixed > 0)
                --right;
            else if (sum + fixed < 0)
                ++left;
            else
            {
                result.insert({arr[left], fixed, arr[right]});
                --right;
                ++left;
            }
            while (left !=i+1 && arr[left] == arr[left - 1])
            {
                left++;
            }
            while (right!=n-1 && arr[right] == arr[right + 1])
            {
                right--;
            }
        }
    }
    return vector<vector<int>>(result.begin(), result.end());
}


int main()
{
    vector<int> arr = {1, 2, 0, 1, 0, 0, 0, 0};
    vector<vector<int>> result = Optimal(arr);
    for (auto v : result)
    {
        for (int i : v)
        {
            cout << i << ", ";
        }
        cout << "\n";
    }
    return 0;
}