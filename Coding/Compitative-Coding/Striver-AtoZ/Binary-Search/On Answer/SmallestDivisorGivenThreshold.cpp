// Given an array of integers nums and an integer threshold,
// we will choose a positive integer divisor, divide all the array by it,
// and sum the division's result.
//  Find the smallest divisor such that the result mentioned above is less than or equal to threshold.

// Each result of the division is rounded to the nearest integer greater than or equal to that element.
// (For example: 7/3 = 3 and 10/2 = 5).

// The test cases are generated so that there will be an answer.

// Example 1:
// Input: nums = [1,2,5,9], threshold = 6
// Output: 5
// Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1.
// If the divisor is 4 we can get a sum of 7 (1+1+2+3) and
// if the divisor is 5 the sum will be 5 (1+1+1+2).

#include <iostream>
#include <vector>
#include <cmath>
#include<algorithm>
using namespace std;
int MaxMin(vector<int> arr)
{
    int n = arr.size();
    int min = arr[0], max = arr[0];
    for (int i : arr)
    {
        if (i > max)
        {
            max = i;
        }
        if (i < min)
        {
            min = i;
        }
    }
    return max;
}

int Optimal(vector<int> arr, int t)
{
    int max = MaxMin(arr);
    int n = arr.size(), low = 1, high = max, mid;
    if (low == high)
        return arr[0] / t;
    while (low <= high)
    {
        mid = (low + high) / 2;
        long sum = 0;
        for (int i = 0; i < n; i++)
        {
            sum += ceil(arr[i] / (float)mid);
        }
        if (sum <= t)
            high = mid - 1;
        else
            low = mid + 1;
    }
    return low;
}

int main()
{
    vector<int> arr = {21212, 10101, 12121};
    int t = 1000000;
    int result = Optimal(arr, t);
    cout << result;
    return 0;
}