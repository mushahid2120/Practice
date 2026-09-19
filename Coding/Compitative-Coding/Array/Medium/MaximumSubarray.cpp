// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int BruteFroce(vector<int> &arr)
{
    int maxSum = 0, n = arr.size();
    int firstIndex, lastIndex;
    for (int i = 0; i < n; i++)
    {
        int sum = 0;
        for (int j = i; j < n; j++)
        {
            sum += arr[j];
            if (sum > maxSum)
            {
                maxSum = sum;
                firstIndex = i;
                lastIndex = j;
            }
        }
    }
    return maxSum;
}

int Optimal(vector<int> &arr)
{
    int n = arr.size();
    int maxSum = arr[0], sum = 0;
    for (int i = 0; i < n; i++)
    {
        sum += arr[i];
        if (sum > maxSum)
        {
            maxSum = sum;
        }
        if (sum < 0)
        {
            sum = 0;
        }
    }
    return maxSum;
}

vector<int> OptimalforSubarray(vector<int> &arr)
{
    long sum = 0, maxSum =0,n=arr.size();
    int first = 0, last = 0,start=0,length=0,maxlength=0;
    for (int i = 0; i < n; i++)
    {
        if (sum == 0)
        {
            start = i;
        }
        sum += arr[i];
        if (maxSum < sum)
        {
            maxSum = sum;
            first = start;
            last=i+1;
        }
        if(sum==maxSum && first==start){
            last=i+1;
        }
        if (arr[i]<0)
        {
            sum = 0;
        }
    }
    if(last<=first){
        return {-1};
    }
        return vector<int>(arr.begin()+first,arr.begin()+last);
}

int main()
{
    vector<int> arr = {-838, -329};
    // int result=BruteFroce(arr);
    vector<int> result= OptimalforSubarray(arr);
    for(int i:result){
        cout <<i<<", ";
    }
    return 0;
}