// Given an integer array nums and an integer k,
// split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.
// Return the minimized largest sum of the split.
// A subarray is a contiguous part of the array.

// Example 1:
// Input: nums = [7,2,5,10,8], k = 2
// Output: 18
// Explanation: There are four ways to split nums into two subarrays.
// The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

pair<int, long long> FindSumMax(vector<int> arr)
{
    int max = arr[0];
    long long sum = 0;
    for (int i : arr)
    {
        if (max < i)
        {
            max = i;
        }
        sum += i;
    }
    return {max, sum};
}

int calculateNOP(vector<int> arr,int mid,int A)
{
    int nop = 1;
    long long sum = 0;
    for (int i : arr)
    {
        if (sum + i > mid)
        {
            sum = i;
            nop++;
        }
        else
        {
            sum += i;
        }
        if (nop > A)
        {
            break;
        }
    }
    return nop;
}

int Optimal(vector<int> arr, int A, int B)
{
    int n = n = arr.size();
    pair<int, long long> max_sum = FindSumMax(arr);
    if (A > n)
        return (max_sum.first * (long long)B) % 10000003;
    int low = max_sum.first, high = max_sum.second, mid, ans = -1;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (calculateNOP(arr,mid,A) <= A)
        {
            ans = mid;
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    return (ans * (long long)B) % 10000003;
}

int main()
{
    vector<int> arr = {19, 20, 19, 11};
    int A = 3, B = 1;
    int result = Optimal(arr, A, B);
    cout << result;
    return 0;
}