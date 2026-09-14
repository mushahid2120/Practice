// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. 
// You may assume that the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int BruteForce(vector<int>& nums){
    int big=0,n=nums.size(),majorElement=0;
    for(int i =0;i<n;i++){
        int count=0;
        for(int j=0;j<n;j++){
            if(nums[i]==nums[j]){
                count++;
            }
            if(count>big){
                big=count;
                majorElement=nums[i];
            }
        }
    }
    return majorElement;
}

int Better(vector<int>& nums){
    map<int,int> freq;
    int n=nums.size();
    for(int i=0;i<n;i++){
        freq[nums[i]]++;
    }
    for(auto f:freq){
        if(f.second>n/2){
            return f.first;
        }
    }
    return 0;
}

int Optimal(vector<int>& nums){
    int n=nums.size(),count=0,majorElement=nums[0];
    for(int i=0;i<n;i++){
        if(nums[i]==majorElement){
            count++;
        }else{
            count--;
        }
        if(count<0){
            majorElement=nums[i];
            count=1;
        }
    }
    return majorElement;
}

int main(){
    vector<int> nums={10,9,9,9,10};
    int result=Optimal(nums);
    cout<<result;
    return 0;
}