// Given two integer arrays nums1 and nums2, return an array of their intersection.
// Each element in the result must be unique and you may return the result in any order.
// Example 1:

// Input: nums1 = [1,2,2,1], nums2 = [2,2]
// Output: [2]
// Example 2:

// Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Output: [9,4]
// Explanation: [4,9] is also accepted.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> arr1 = {1, 2, 2, 1}, arr2 = {2, 2};
    vector<int> result;
    int n = arr1.size(), m = arr2.size(), i = 0, j = 0;
    sort(arr2.begin(), arr2.end());
    sort(arr1.begin(), arr1.end());
    while (i < n && j < m)
    {
        if (i > 0 && arr1[i] == arr1[i - 1])
        {
            i++;
            continue;
        }
        if (j > 0 && arr2[j] == arr2[j - 1])
        {
            j++;
            continue;
        }
        if (arr1[i] > arr2[j])
            j++;
        else if (arr1[i] < arr2[j])
            i++;
        else
        {
            result.push_back(arr1[i]);
            i++;
            j++;
        }
    }
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}