// You are given an array nums with n objects colored red, white, or blue,
// sort them in-place so that objects of the same color are adjacent,
// with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.

// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
// Explanation:
// The array has two 0s, two 1s, and two 2s. Sorting them in-place places all 0s first, then all 1s, then all 2s.

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

void BruteForce(vector<int> &arr)
{
    // Time Complexity - O(nlogn)
    sort(arr.begin(), arr.end());
}
void Better(vector<int> &arr)
{
    int zero = 0, one = 0, two = 0;
    int n = arr.size();
    for (int i = 0; i < n; i++)
    {
        if (arr[i] == 0)
        {
            zero++;
        }
        else if (arr[i] == 1)
        {
            one++;
        }
        else
        {
            two++;
        }
    }
    for (int i = 0; i < n; i++)
    {
        if (zero > 0)
        {
            arr[i] = 0;
            --zero;
        }
        else if (one > 0)
        {
            arr[i] = 1;
            --one;
        }
        else
        {
            arr[i] = 2;
            --two;
        }
    }
}
void Optimal(vector<int> &arr)
{
    int left = 0, n = arr.size(), right = n-1;
    while(right>0 && arr[right]==2){
        --right;
    }
    n=right;
    for (int i = 0; i <= right && left<=right; i++)
    {
        if (arr[i] == 0)
        {
            swap(arr[i], arr[left]);
            ++left;
        }
        else if (arr[i] == 2)
        {
            swap(arr[i], arr[right]);
            --right;
            --i;
        }
    }
}

int main()
{
    vector<int> arr = {2,0,1};
    Optimal(arr);
    for (int i : arr)
    {
        cout << i << ", ";
    }
    return 0;
}