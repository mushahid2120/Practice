// Given an unsorted array of integers nums, 
// return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
//  Therefore its length is 4.

#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

int BruteForce(vector<int> nums){
    int n=nums.size();
    int count=1,maxCount=1;
    sort(nums.begin(),nums.begin()+n);
    for(int i:nums){
        cout<<i<<", ";
    }
    cout<<"\n ";
    for(int i=0;i<n-1;i++){
        if(nums[i]==nums[i+1]){
            continue;
        }
        if(nums[i]+1==nums[i+1]){
            count++;
        }else{
            count=1;
        }
        if(count>maxCount){
            maxCount=count;
        }
    }
    if(n==0){
        return 0;
    }
    return maxCount;
}

int Optimal(vector<int>nums){
    set<int> set;
    int n=nums.size(),count=1,maxCount=1;
    for(int i:nums){
        set.insert(i);
    }

    int prev=*set.begin();
    for(int i:set){
        if(prev+1==i){
            count++;
        }else{
            count=1;
        }

        if(count>maxCount){
            maxCount=count;
        }
        prev=i;
    }
    if(n==0){
        return 0;
    }
    return maxCount;
}

int main(){
    vector<int> nums={0,3,7,2,5,8,4,6,0,1};
    int result=Optimal(nums);
    cout<<result;
    return 0;
}
