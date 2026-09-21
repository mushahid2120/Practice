// Given an array nums of n integers, return an array of all
// the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

// Example 1:

// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:

// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]

#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
using namespace std;

vector<vector<int>> BruteForce(vector<int> &arr, int target)
{
    int n = arr.size();
    set<vector<int>> result;
    if (n < 3)
    {
        return {{}};
    }
    for (int i = 0; i < n - 3; i++)
    {
        for (int j = i + 1; j < n - 2; j++)
        {
            for (int k = j + 1; k < n - 1; k++)
            {
                for (int l = k + 1; l < n; l++)
                {
                    int sum = arr[i] + arr[j] + arr[k] + arr[l];
                    if (sum == target)
                    {
                        vector<int> unique = {arr[i], arr[j], arr[k], arr[l]};
                        sort(unique.begin(), unique.end());
                        result.insert(unique);
                    }
                }
            }
        }
    }
    return vector<vector<int>>(result.begin(), result.end());
}

vector<vector<int>> Optimal(vector<int> &arr,int target)
{
    int n = arr.size();
    if (n < 4)
    {
        return {};
    }
    vector<vector<int>> result;
    sort(arr.begin(), arr.end());
    for (int i = 0; i < n - 3; i++)
    {
        if (i > 0 && arr[i] == arr[i - 1])
            continue;
        for (int j = i + 1; j < n - 2; j++)
        {
            long long fixed = arr[i]+arr[j];
            int left = j + 1;
            int right = n - 1;
            while (left < right)
            {
                long long sum = (long long)(arr[left] + arr[right]);
                if (sum + fixed > target)
                    --right;
                else if (sum + fixed < target)
                    ++left;
                else
                {
                    result.push_back({arr[i],arr[j],arr[left], arr[right]});
                    --right;
                    ++left;
                }
                while (left < right && arr[left] == arr[left - 1])
                {
                    left++;
                }
                while (right > left && arr[right] == arr[right + 1])
                {
                    right--;
                }
            }
        }
    }
    return result;
}

int main()
{
    vector<int> arr = {0,0,0,0,0,0,0};
    int target = 0;
    vector<vector<int>> result = Optimal(arr, target);
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