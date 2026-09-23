// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:

// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> nums = {-7,-3,0,2,3,11};
    int n = nums.size(), middle = -1;
    vector<int> result;
    for (int i = 0; i < n; i++)
    {
        if (nums[i] >= 0)
        {
            middle = i;
            break;
        }
    }
    for(int i=0;i<n;i++){
        nums[i]=nums[i]*nums[i];
    }
    if (middle == -1)
    {
        return 0;
    }
    int i = middle-1,j = middle;
    while (i >=0 && j < n)
    {
        if(nums[i]<nums[j]){
            result.push_back(nums[i]);
            i--;
        }else if(nums[i]>nums[j]){
            result.push_back(nums[j]);
            j++;
        }
        else {
            result.push_back(nums[i]);
            result.push_back(nums[j]);
            i--;
            j++;
        }
    }
    while(i >=0){
        result.push_back(nums[i]);
        i--;
    }
    while(j<n){
        result.push_back(nums[j]);
        j++;
    }
    for(int i:result){
        cout<<i<<", ";
    }
    return 0;
}