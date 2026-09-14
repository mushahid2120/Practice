// You are given an array of integers nums and an integer target,
// return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution,
// and you may not use the same element twice.

// You can return the answer in any order.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

vector<int> BruteForce(vector<int> &arr, int target)
{
    int n = arr.size();
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            int sum = arr[i] + arr[j];
            if (sum == target)
            {
                return {i, j};
            }
        }
    }
}

vector<int> Better(vector<int> &arr, int target)
{
    map<int, int> hashValue;
    int n = arr.size();
    for (int i = 0; i < n; i++)
    {
        hashValue[arr[i]] = i;
    }
    for (int i = 0; i < n; i++)
    {
        int need = target - arr[i];
        auto it = hashValue.find(need);
        if (it != hashValue.end() && it->second != i)
        {
            return {i, it->second};
        }
    }
    return {-1, -1};
}

vector<int> Optimal(vector<int> &arr,int target){
    int n=arr.size();
    map<int,int> hashTable;
    for(int i=0;i<n;i++){
        int need=target-arr[i];
        auto it=hashTable.find(need);
        if(it!=hashTable.end()){
            return {i,it->second};
        }
        hashTable[arr[i]]=i;
    }
    return {-1,-1};
}

int main()
{
    vector<int> arr = {3, 2, 4};
    int target = 6;
    vector<int> result = Optimal(arr, target);
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}