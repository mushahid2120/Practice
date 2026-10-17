// Given an array of integers nums sorted in non-decreasing order,
// find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> Optimal(vector<int> arr, int target)
{

        int n = arr.size(), low = 0, high = n - 1, mid = 0,left=-1,right=-1;
        if (n == 0)
            return {-1, -1};

        while (low <= high)
        {

            mid = (low + high) / 2;
    // Go and Check left side is their target number is present
    //if present then again go to the left that is how i got the first
            if (arr[mid] == target){
                left=mid;
                high=mid-1;
                }
            else if (arr[mid] > target)
                high = mid - 1;
            else
                low = mid + 1;
        }

        low = 0, high = n - 1;
        while (low <= high)
        {
            mid = (low + high) / 2;
            //Same way as above go and check the right most elemet which is equal to target every time
            //when you encounter number==target stores in right variable
            if (arr[mid] == target){
                right=mid;
                low=mid+1;
                }
            else if (arr[mid] > target)
                high = mid - 1;
            else
                low = mid + 1;
        }
        return {left,right};

    int left = lower_bound(arr.begin(), arr.end(), target) - arr.begin();
    cout<<left;
    if (left>=arr.size() || arr[left] != target)
    {
        return {-1, -1};
    }
    int right = upper_bound(arr.begin(), arr.end(), target) - arr.begin();
    return {left,right-1};
}

int main()
{
    vector<int> arr = {2,3, 4, 4, 4, 10};
    int target =0;
    vector<int> result = Optimal(arr, target);
    cout << result[0] << " " << result[1];
    return 0;
}
