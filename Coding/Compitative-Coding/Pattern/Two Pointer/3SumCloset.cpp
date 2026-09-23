// You are given an integer array nums of length n and an integer target.
// Find three integers at distinct indices in nums such that the sum is closest to target.
// Return the sum of the three integers.
// You may assume that each input would have exactly one solution.

// Example 1:

// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

// sort(arr.begin(), arr.end());
//         int n = arr.size(),closet = arr[0] + arr[1] + arr[2];
//         for (int i = 0; i < n - 2; i++) {
//             if (i > 0 && arr[i] == arr[i - 1]) {
//                 continue;
//             }
//             int left = i + 1;
//             int right = n - 1;
//             while (left < right) {
//                 int sum = arr[i] + arr[left] + arr[right];
//                 if (abs(sum - target) < abs(closet - target)) {
//                     closet = sum;
//                 }
//                 if (sum < target) left++; 
//                 else if (sum > target) right--;
//                 else return target;
                
//                 while (left < right && left != i + 1 &&
//                        arr[left] == arr[left - 1]) left++;

//                 while (left < right && right != n - 1 &&
//                        arr[right] == arr[right + 1]) 
//                     right--;

//             }
//         }
//         return closet;

#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int Optimal(vector<int> arr, int target)
{
    sort(arr.begin(),arr.end());
    int n=arr.size(),minDiff=INT_MAX,closet=arr[0]+arr[1]+arr[2];
    if(n<3){
        return -1;
    }
    for(int i=0;i<n-2;i++){
        if(i>0 && arr[i]==arr[i-1]){
            continue;
        }
        int left=i+1;
        int right=n-1;
        while(left<right){
            long long sum = arr[i];
            sum+=arr[left];
            sum+=arr[right];
            int diff;
            if(sum<target){
                left++;
                diff=target-sum;
            }
            else if(sum>target){
                right--;
                diff=sum-target;
            }else{
                left++;
                right--;
                diff=0;
            }
            if(diff<minDiff){
                minDiff=diff;
                closet=sum;
            }
            while(left<right && left!=i+1 && arr[left]==arr[left-1]){
                left++;
            }
            while(left<right && right!=n-1 && arr[right]==arr[right+1]){
                right--;
            }
        }
    }
    return closet;
}

int main()
{
    vector<int> arr={10,20,30,40,50,60,70,80,90};
    int target=1;
    int result=Optimal(arr,target);
    cout<<result;

    return 0;
}