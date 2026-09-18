// You are given an array arr of positive integers. 
// Your task is to find all the leaders in the array. 
// An element is considered a leader if it is greater than or equal to all elements to its right. 
// The rightmost element is always a leader.
// Examples:

// Input: arr = [16, 17, 4, 3, 5, 2]
// Output: [17, 5, 2]
// Explanation: Note that there is nothing greater on the right side of 17, 5 and, 2.

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main(){
    vector<int> arr={61, 61, 17};
    vector<int> leader;
    int n=arr.size();
    int max=arr[n-1];
    leader.push_back(max);
    for(int i=n-2;i>=0;i--){
        if(arr[i]>=max){
            leader.push_back(arr[i]);
            max=arr[i];
        }
    }
    reverse(leader.begin(),leader.begin()+leader.size());
    for(int i:leader){
        cout<<i<<", ";
    }
    return 0;
}