// You are given an array nums with n objects colored red, white, or blue, 
// sort them in-place so that objects of the same color are adjacent, 
// with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.

// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
// Explanation:
// The array has two 0s, two 1s, and two 2s. Sorting them in-place places all 0s first, then all 1s, then all 2s.


#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

void BruteForce(vector<int> & arr){
    int balloon[3]={0,1,2};
    int n=arr.size();
    for(int b=0;b)
}
void Better(vector<int> & arr){

}
void Optimal(vector<int> & arr){

}

int main(){
    vector<int> arr={2,0,2,1,1,0};
    for(int i:arr){
        cout<<i<<", ";
    }
    return 0;
}