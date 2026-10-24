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
    int n = arr1.size(), m = arr2.size(), low = 0, high = n - 1, mid, halfOfTotal = (n + m + 1) / 2;
    if (arr1[n - 1] < arr2[0])
    {
        if ((n + m) % 2 == 0)
        {
            if (halfOfTotal == n)
            {
                return (arr1[n - 1] + arr2[0]) / 2.0;
            }
            else if (halfOfTotal > n)
            {
                return (arr2[halfOfTotal - n - 1] + arr2[halfOfTotal - n]) / 2.0;
            }
            else
                return (arr1[halfOfTotal - 1] + arr1[halfOfTotal]) / 2.0;
        }
        else
        {
            if (halfOfTotal == n)
            {
                return arr1[n - 1];
            }
            else if (halfOfTotal > n)
            {
                return arr2[halfOfTotal - n - 1];
            }
            else
                return arr1[halfOfTotal - 1];
        }
    }
    
    else if (arr2[m - 1] < arr1[0])
    {
        if ((n + m) % 2 == 0)
        {
            if (halfOfTotal == m)
            {
                return (arr2[m - 1] + arr1[0]) / 2.0;
            }
            else if (halfOfTotal > m)
            {
                return (arr1[halfOfTotal - m - 1] + arr1[halfOfTotal - m]) / 2.0;
            }
            else
                return (arr2[halfOfTotal - 1] + arr2[halfOfTotal]) / 2.0;
        }
        else
        {
            if (halfOfTotal == m)
            {
                return arr1[m - 1];
            }
            else if (halfOfTotal > m)
            {
                return arr1[halfOfTotal - m - 1];
            }
            else
                return arr2[halfOfTotal - 1];
        }
    }
    while (low <= high)
    {
        mid = (low + high) / 2;
        int cut1 = mid;
        int cut2 = halfOfTotal - mid - 2;
        int left1 = arr1[cut1];
        int left2 = arr2[cut2];
        int right1, right2;

        right1 = arr1[cut1 + 1];
        right2 = arr2[cut2 + 1];

        if (left1 > right2)
            high = mid - 1;
        else if (left2 > right1)
            low = mid + 1;
        else
        {
            if ((n + m) % 2 == 1)
            {

                return max(left1, left2);
            }
            else
            {
                return (max(left1, left2) + min(right1, right2)) / (float)2;
            }
        }
    }
}

int main()
{
    vector<int> arr1 = {20, 30, 40, 50}, arr2 = {2, 4, 12, 18};
    double result = Optimal(arr1, arr2);
    cout << result;
    return 0;
}