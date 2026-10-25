// Given two sorted arrays nums1 and nums2 of size m and n respectively,
// return the median of the two sorted arrays.
// The overall run time complexity should be O(log (m+n)).
// Example 1:

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

double Optimal(vector<int> arr1, vector<int> arr2)
{
    int n = arr1.size(), m = arr2.size(), low = 0, high = n, mid, halfOfTotal = (n + m + 1) / 2;
    if (m < n)
        return Optimal(arr2, arr1);
    if (n == 0)
    {
        if (m % 2 == 0)
            return (arr2[m / 2] + arr2[(m / 2) - 1]) / 2.0;
        else
            return arr2[m / 2];
    }

    while (low <= high)
    {
        int cut1 = low + (high - low) / 2;
        int cut2 = halfOfTotal - cut1;
        int left1 = cut1 == 0 ? INT_MIN : arr1[cut1 - 1];
        int right1 = cut1 == n ? INT_MAX : arr1[cut1];
        int left2 = cut2 == 0 ? INT_MIN : arr2[cut2 - 1];
        int right2 = cut2 == m ? INT_MAX : arr2[cut2];

        if (left1 > right2)
            high = cut1 - 1;
        else if (left2 > right1)
            low = cut1 + 1;
        else
        {
            if ((n + m) % 2 == 0)
                return (max(left1, left2) + min(right1, right2)) / 2.0;
            return max(left1, left2);
        }
    }
}

int main()
{
    vector<int> arr1 = {1, 2, 3, 5, 6}, arr2 = {};
    double result = Optimal(arr1, arr2);
    cout << result;
    return 0;
}