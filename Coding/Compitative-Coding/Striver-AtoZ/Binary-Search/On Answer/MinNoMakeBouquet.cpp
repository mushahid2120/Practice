// You are given an integer array bloomDay, an integer m and an integer k.
// You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
// The garden consists of n flowers, 
// the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.
// Return the minimum number of days you need to wait to be able to make m bouquets from the garden.
//  If it is impossible to make m bouquets return -1.

// Example 1:
// Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
// Output: 3
// Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
// We need 3 bouquets each should contain 1 flower.
// After day 1: [x, _, _, _, _]   // we can only make one bouquet.
// After day 2: [x, _, _, _, x]   // we can only make two bouquets.
// After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int nob(vector<int> arr,int bd,int k){
    int numberOfBouquet=0,count=0;
    for(int i:arr){
        if(i<=bd){
            count++;
        }else{
            numberOfBouquet+=count/k;
            count=0;
        }
    }
    numberOfBouquet+=count/k;
    cout<<bd<<"---"<<numberOfBouquet<<" ";
    return numberOfBouquet;
}

int Optimal(vector<int> arr,int m,int k){
    int n=arr.size();
    if(n<(long)m*k) return -1;
    int min=*min_element(arr.begin(),arr.end()),max=*max_element(arr.begin(),arr.end());
    int low=min,high=max,mid=0,ans;

    while(low<=high){
        mid=(low+high)/2;
        if(nob(arr,mid,k)>=m){
            high=mid-1;
            ans=mid;
        }else{
            low=mid+1;
        }
    }
    return ans;
}

int main(){
    vector<int> arr={1,10,3,10,2};
    int m=3,k=2;
    int result=Optimal(arr,m,k);
    cout<<result;
    return 0;
}