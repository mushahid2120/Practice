// A conveyor belt has packages that must be shipped from one port to another within days days.
// The ith package on the conveyor belt has a weight of weights[i].
//  Each day, we load the ship with packages on the conveyor belt (in the order given by weights).
//   We may not load more weight than the maximum weight capacity of the ship.
// Return the least weight capacity of the ship that will result in
//  all the packages on the conveyor belt being shipped within days days.

// Example 1:

// Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
// Output: 15
// Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
// 1st day: 1, 2, 3, 4, 5
// 2nd day: 6, 7
// 3rd day: 8
// 4th day: 9
// 5th day: 10

#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

int Optimal(vector<int> arr, int day)
{
    int max = *max_element(arr.begin(), arr.end()), totalSum = accumulate(arr.begin(), arr.end(), 0);
    int n = arr.size(), lowcap = max, highcap = totalSum, capacity = 0, ans;
    while (lowcap <= highcap)
    {
        capacity = (lowcap + highcap) / 2;
        int nod = 1, perdaycap = 0;
        for(int i=0;i<n;i++){
            if(perdaycap+arr[i]>capacity){
                perdaycap=arr[i];
                nod++;
            }else{
                perdaycap+=arr[i];
            }
        }
        if (nod <= day)
        {
            ans = capacity  ;
            highcap = capacity - 1;
        }
        else
        {
            lowcap = capacity + 1;
        }
    }

    return ans;
}
int main()
{
    vector<int> arr = {1,2,3,4,5,6,7,8,9,10};
    int day = 5;
    int result = Optimal(arr, day);
    cout << result;
    return 0;
}