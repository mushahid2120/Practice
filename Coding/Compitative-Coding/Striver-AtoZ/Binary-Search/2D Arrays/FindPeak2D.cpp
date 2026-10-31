// Given a 0-indexed n x m matrix mat where no two adjacent cells are equal,
// find any peak element mat[i][j] and return the array [i, j].
// A peak element in a 2D grid is an element that is strictly greater
//  than all of its adjacent neighbours to the left, right, top, and bottom.
// Assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.
// Note: As there can be many peak values, 1 is given as output if the returned index is a peak number,
// otherwise 0.

// Example 1:
// Input: mat=[[10, 20, 15], [21, 30, 14], [7, 16, 32]]
// Output: [1, 1]
// Explanation: The value at index [1, 1] is 30, which is a peak element because all its neighbours are smaller or equal to it. Similarly, {2, 2} can also be picked as a peak.

#include <iostream>
#include <vector>
using namespace std;

int FindMax(vector<int> arr)
{
    int max=arr[0],index=0;
    for(int i=0;i<arr.size();i++){
            if(max<arr[i]){
                index=i;
                max=arr[i];
            }
    }
    return index;
}

vector<int> Optimal(vector<vector<int>> arr)
{
    int n = arr.size(), m = arr[0].size(), low = 0, high = n - 1;
    while (low <= high)
    {
        int mid=(low+high)/2;
        int peak=FindMax(arr[mid]);
        int top=(mid==0)?-1:arr[mid-1][peak];
        int bottom=(mid==n-1)?-1:arr[mid+1][peak];
        if(arr[mid][peak]>top && arr[mid][peak]>bottom) return {mid,peak};
        if(arr[mid][peak]<top && arr[mid][peak]<bottom){
            if(top>bottom) high=mid-1;
            else low=mid+1;
        }
        else if(arr[mid][peak]<top) high=mid-1;
        else low=mid+1;
    }
    return {-1};
}

int main()
{
    vector<vector<int>> arr = {{3,1,5,4,10},{4,2,6,7,8}};
    vector<int> result = Optimal(arr);
    cout << result[0] << "," << result[1];
    return 0;
}