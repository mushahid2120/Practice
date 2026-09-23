// Given an array arr[] of distinct integers and an integer sum, 
// count the number of unique triplets of elements whose sum is strictly less than sum.
//  A triplet is identified only by the three elements it contains, 
//  so different permutations of the same three elements are counted as one triplet.

// Examples :

// Input: sum = 2, arr[] = [-2, 0, 1, 3]
// Output:  2
// Explanation: Triplets with sum less than 2 are (-2, 0, 1) and (-2, 0, 3). 
// Input: sum = 12, arr[] = [5, 1, 3, 4, 7]
// Output: 4
// Explanation: Triplets with sum less than 12 are (1, 3, 4), (5, 1, 3), (1, 3, 7) and (5, 1, 4).

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int  Optimal(vector<int> &arr,int target)
{
    sort(arr.begin(),arr.end());
    int n=arr.size(),count=0;
    for(int i=0;i<n;i++){
        if(i>0 && arr[i]==arr[i-1]){
            continue;
        }
        int left=i+1;
        int right=left+1;
        while(right<n){
            int sum = arr[i]+arr[left]+arr[right];
            cout<<arr[i]<<", "<<arr[left]<<" "<<arr[right]<<"\n";
            if(sum<target){
                right++;
                left++;
                count++;
            }else{
                break;
            }
            // while(left<right && left!=i+1 && arr[left]==arr[left-1]){
            //     left++;
            // }
            // while(left<right && right!=n-1 && arr[right]==arr[right+1]){
            //     right--;
            // }
        }
    }
    return count;
}


int main(){
    vector<int> arr={5, 1, 3, 4, 7};
    int target=12;
    int result=Optimal(arr,target);
    cout<<result;
    return 0;
}