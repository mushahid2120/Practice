// Given an array of integers nums sorted in non-decreasing order, 
// find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

#include <iostream>
#include <vector>
using namespace std;

vector<int> Optimal(vector<int> arr, int target)
{
    int n = arr.size(), low = 0, high = n - 1, mid = 0;
    if(n==0) return {-1,-1};
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (arr[mid] == target)
            break;
        if (arr[mid] > target)
            high = mid - 1;
        else
            low = mid + 1;
    }
    if(low<=high){
        low=mid;
        high=mid;
        while(low>=0 && arr[low]==target) low--;
        while(high<n && arr[high]==target) high++;
        return {low+1,high-1};
    }
    else {
        return {-1,-1};
    }
}

int main(){
        vector<int> arr = {3, 4, 4, 7, 8, 10};
    int target = 4;
    vector<int> result = Optimal(arr, target);
    cout << result[0] << " " << result[1];
    return 0;
}
