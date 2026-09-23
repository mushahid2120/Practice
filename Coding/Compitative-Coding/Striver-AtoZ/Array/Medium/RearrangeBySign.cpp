// You are given a 0-indexed integer array nums of even length consisting of an equal number of
// positive and negative integers.

// You should return the array of nums such that the array follows the given conditions:

// Every consecutive pair of integers have opposite signs.
// For all integers with the same sign, the order in which they were present in nums is preserved.
// The rearranged array begins with a positive integer.
// Return the modified array after rearranging the elements to satisfy the aforementioned conditions.

// Example 1:
// Input: nums = [3,1,-2,-5,2,-4]
// Output: [3,-2,1,-5,2,-4]
// Explanation:
// The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
// The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
// Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.

#include <iostream>
#include <vector>
using namespace std;

vector<int> BruteForce(vector<int> &arr)
{
    int n = arr.size();
    vector<int> pos, neg;
    for (int i = 0; i < n; i++)
    {
        if (arr[i] < 0)
        {
            neg.push_back(arr[i]);
        }
        else
        {
            pos.push_back(arr[i]);
        }
    }
    for (int i = 0; i < n / 2; i++)
    {
        arr[2 * i] = pos[i];
        arr[2 * i + 1] = neg[i];
    }
    return arr;
}

vector<int> Optimal(vector<int> arr){
    int n=arr.size();
    int a[n];
    int front=0,back=n-1;
    for(int i=0;i<n;i++){
        if(arr[i]<0){
            a[front++]=arr[i];
        }else{
            a[back--]=arr[i];
        }
    }
    for(int i=0;i<n/2;i++){
        arr[2*i]=a[n-i-1];
        arr[2*i+1]=a[i];
    }
    return arr;
}

int main()
{
    vector<int> arr = {3, 1, -2, -5, 2, -4};
    vector<int> result = Optimal(arr);
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}