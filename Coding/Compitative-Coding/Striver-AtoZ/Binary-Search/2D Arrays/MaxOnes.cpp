// Given a 2D binary array arr[][] consisting of only 1s and 0s. 
// Each row of the array is sorted in non-decreasing order. 
// Find and return the index of the first row that contains the maximum number of 1s.
//  If no such row exists, return -1.
// Note: The array follows 0-based indexing.

// Examples:
// Input: arr[][] = [[0,1,1,1], [0,0,1,1], [1,1,1,1]]
// Output: 2
// Explanation: Row 2 contains the most number of 1s (4 - 1s). Hence, the output is 2.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;


int Optimal(vector<vector<int>> arr){
    int n=arr.size(),m=arr[0].size();
    int maxOneCount=0,maxOneIndex=0;
    for(int i=0;i<n;i++){
        // cout<<"row="<<i<<" ";
        int currentOneCount=arr[i].end()-lower_bound(arr[i].begin(),arr[i].end(),1);
        // cout<<"LOWER_BOUND="<<currentOneCount<<" ";
        if(currentOneCount>maxOneCount){
            maxOneCount=currentOneCount;
            maxOneIndex=i;
        }
    }
    if(maxOneCount==0)return -1;
    return maxOneIndex;
}

int main(){
    vector<vector<int>> arr={{0,1,1},{1,1,1},{0,1,1}};
    int result=Optimal(arr);
    cout<<result;
    return 0;
}