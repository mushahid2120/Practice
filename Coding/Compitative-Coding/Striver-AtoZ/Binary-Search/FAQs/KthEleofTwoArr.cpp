// Given two sorted arrays a[] and b[] and an element k,
// find the element that would be at the kth position of the combined sorted array.
// Examples :
// Input: a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
// Output: 6
// Explanation: The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10].
//              The 5th element of this array is 6.

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int Optimal(vector<int> arr1, vector<int> arr2, int k)
{
    int n = arr1.size(), m = arr2.size(), low = 0, high = n, mid;
    if(k>m+n) return -1;
    if (m < n)
        return Optimal(arr2, arr1, k);
    if (n == 0)
        return arr2[k + 1];

    while (low <= high)
    {
        int cut1 = low + (high - low) / 2;
        int cut2 = abs(k - cut1);
        int left1 = cut1 == 0 ? INT_MIN : arr1[cut1 - 1];
        int right1 = cut1 == n ? INT_MAX : arr1[cut1];
        int left2 = cut2 == 0 ? INT_MIN : arr2[cut2 - 1];
        int right2 = cut2 == m ? INT_MAX : arr2[cut2];

        // cout << left1 << " " << right1 << " " << left2 << " " << right2 << "\n";

        if (left1 > right2)
            high = cut1 - 1;
        else if (left2 > right1)
            low = cut1 + 1;
        else
        {
            return max(left1, left2);
        }
    }
}

int main()
{
    vector<int> arr1 = {1, 4, 8, 10, 12}, arr2 = {};
    int k = 6;
    int result = Optimal(arr1, arr2, k);
    cout << result;
    return 0;
}
