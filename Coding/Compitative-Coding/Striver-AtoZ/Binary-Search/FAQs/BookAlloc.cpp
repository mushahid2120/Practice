// Given an integer array nums and an integer k,
// split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.
// Return the minimized largest sum of the split.
// A subarray is a contiguous part of the array.

// Example 1:

// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8],
// where the largest sum among the two subarrays is only 18.

#include <iostream>
#include <vector>
using namespace std;

pair<int, long> minSum(vector<int> arr)
{
    int maxi = arr[0];
    long total = 0;
    for (int i : arr)
    {
        maxi = max(maxi, i);
        total += i;
    }
    return {maxi, total};
}

int Optimal(vector<int> arr, int k)
{
    pair<int, long> min_sum = minSum(arr);
    int n = arr.size(), low = min_sum.first, high = min_sum.second, mid, ans = -1;
    while (low <= high)
    {
        mid = (low + high) / 2;
        long sum = 0, no_of_split = 1;
        for (int i : arr)
        {
            if (sum + i > mid)
            {
                no_of_split++;
                sum = i;
            }
            else
            {
                sum += i;
            }
        }
        // cout<<mid<<"=="<<no_of_split<<"\n";

        if (no_of_split <= k)
        {
            ans = mid;
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    return ans;
}

int main()
{
    vector<int> arr = {5, 5, 5, 5};
    int k = 3;
    int result = Optimal(arr, k);
    cout << result;
    return 0;
}