// Given an integer array nums of size n. Return all elements which appear more than n/3
// times in the array. The output can be returned in any order.

// Example 1:
// Input: nums = [1, 2, 1, 1, 3, 2]
// Output: [1]

// Explanation:
// Here, n / 3 = 6 / 3 = 2.
// Therefore the elements appearing 3 or more times is : [1]

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

vector<int> BruteForce(vector<int> arr)
{
    int n = arr.size();
    vector<int> result;
    for (int i = 0; i < n; i++)
    {
        int count = 1;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] == arr[i])
            {
                count++;
            }
        }
        if (count > n / 3)
        {
            result.push_back(arr[i]);
        }
    }
    return result;
}

vector<int> Better(vector<int> arr)
{
    map<int, int> freq;
    vector<int> result;
    int n = arr.size();
    for (int i : arr)
    {
        freq[i]++;
    }
    for (auto i : freq)
    {
        if (i.second > n / 3)
        {
            result.push_back(i.first);
        }
    }
    return result;
}

vector<int> Optimal(vector<int> arr)
{
   int c1=0,c2=0,v1,v2,n=arr.size();
   for(int i=0;i<n;i++){
    // cout<<i<<"="<<v1<<"->"<<c1<<" "<<v2<<"->"<<c2<<"\n";
    if(c1==0 && v2!=arr[i]){
        v1=arr[i];
        c1++;
    }else if(c2==0 && v1!=arr[i]){
        v2=arr[i];
        c2++;
    }else if(v1==arr[i]) c1++;
    else if(v2==arr[i]) c2++;            
    else {
        --c1;
        --c2;
    }
}
    c1=0,c2=0;
    for(int i:arr){
        if(i==v1) c1++;
        if(i==v2) c2++;
    }
    // cout<<v2<<","<<v1<<","<<c1<<","<<c2;
    vector<int> result;
    if(c1>n/3) result.push_back(v1);
    if(c2>n/3) result.push_back(v2);
    sort(result.begin(),result.end());
    return result;
}

int main()
{
    vector<int> arr = {1,2,1,2,2,3,3,1};
    vector<int> result = Optimal(arr);
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}