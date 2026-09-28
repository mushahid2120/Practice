// Given an integer array nums, find a subarray that has the largest product,
//  and return the product.
// The test cases are generated so that the answer will fit in a 32-bit integer.
// Note that the product of an array with a single element is the value of that element.

// Example 1:
// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.

#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main()
{
    vector<int> arr = {2,3,-2,4,4};
    int n = arr.size();
    int prod = 1,mprod=1, maxProd = arr[0],minProd=arr[0];
    for (int i = 0; i < n; i++)
    {
        prod*=arr[i];
        mprod*=arr[i];
        if(mprod>prod){
            swap(mprod,prod);
        }
        if(prod>maxProd){
            maxProd=prod;
        }
        if(mprod<minProd){
            minProd=mprod;
        }
        if(mprod>=0) mprod=1;
        if(prod<=0) prod=1;
    }
    cout << maxProd;
    return 0;
}