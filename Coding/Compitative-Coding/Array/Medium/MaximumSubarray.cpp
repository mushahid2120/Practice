// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.

#include <iostream>
#include <vector>
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

int Optimal(vector<int> &arr){
    int n=arr.size();
    int maxSum=arr[0],sum=0;
    for(int i=0;i<n;i++){
        sum+=arr[i];
        if(sum>maxSum){
            maxSum=sum;
        }
        if(sum<0){
            sum=0;
        }
    }
    return maxSum;
}
int main()
{
    vector<int> arr = {-2};
    // int result=BruteFroce(arr);
    int result=Optimal(arr);
    cout<<result;
    return 0;
}