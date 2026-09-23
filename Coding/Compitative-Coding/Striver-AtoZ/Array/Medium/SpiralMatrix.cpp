// Given an m x n matrix, return all elements of the matrix in spiral order.
// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<vector<int>> matrix{{1},{2},{3}};
    vector<int> result;
    int m = matrix.size(), n = matrix[0].size();
    int top = 0, bottom = m, left = 0, right = n;
    while (top < bottom && left < right)
    {
        for (int i = left; i < right; i++)
        {
            result.push_back(matrix[top][i]);
        }
        top++;
        for (int i = top ; i < bottom; i++)
        {
            result.push_back(matrix[i][right-1]);
        }
        right--;
        if(bottom<=top || right<=left){
            break;
        }
        for (int i = right-1; i >= left; i--)
        {
            result.push_back(matrix[bottom-1][i]);
        }
        bottom--;
        for (int i = bottom-1; i >= top; i--)
        {
            result.push_back(matrix[i][left]);
        }
        left++;
    }
    for (auto i : result)
    {
            cout << i << ", ";
        }
    return 0;
}