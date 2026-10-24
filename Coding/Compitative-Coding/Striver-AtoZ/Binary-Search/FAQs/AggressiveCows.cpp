// Given an integer array arr[], which denotes the positions of stalls.
//  All the positions are distinct. There are k aggressive cows.
// Assign the cows to the stalls such that the minimum distance between any two cows is maximized.

// Examples:
// Input: arr[] = [1, 2, 4, 8, 9], k = 3
// Output: 3
// Explanation: The first cow can be placed at arr[0], the second at arr[2],
// and the third at arr[3].
// The minimum distance between any two cows is 3 (between arr[0] and arr[2]),
// which is the maximum possible among all valid arrangements.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int Optimal(vector<int> arr, int k)
{
    sort(arr.begin(), arr.end());
    int n = arr.size(), low = 1, high = arr[n - 1] - arr[0], mid, ans = -1;
    if (n == 0)
        return -1;
    if (n == 1)
        return 0;
    while (low <= high)
    {
        mid = (low + high) / 2;
        int start = 0, no_of_cows = 1;
        bool isBigGap = false;
        cout << mid << "--";
        for (int i = 1; i < n; i++)
        {
            cout << arr[i] << ",";
            if (arr[i] - arr[start] >= mid)
            {
                cout << "    ";
                start = i;
                no_of_cows++;
            }
        }
        // if (isBigGap)
        // {
        //     low = mid + 1;
        //     cout << "---" << no_of_cows << "\n";
        //     continue;
        // }
        // else if (start != n - 1)
        // {
        //     no_of_cows++;
        // }

        cout << "---" << no_of_cows << "\n";
        if(no_of_cows==k){
            ans=mid;
            low=mid+1;
        }
        else if (no_of_cows < k)
        {
            high = mid - 1;
        }
        else
        {
            ans=mid;
            low = mid + 1;
        }
    }
    return ans;
}

int main()
{
    vector<int> arr = {10, 1, 2, 7, 5};
    int k = 3;
    int result = Optimal(arr, k);
    cout << result;
    return 0;
}