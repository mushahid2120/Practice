// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees
//  (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
//  DO NOT allocate another 2D matrix and do the rotation.
// Example 1:
// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
vector<vector<int>> BruteForce(vector<vector<int>> matrix)
{
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> newMatrix;
    vector<int> row;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            row.push_back(matrix[j][m - i - 1]);
        }
        newMatrix.push_back(row);
        row.clear();
    }
    return newMatrix;
}

void Optimal(vector<vector<int>> &matrix)
{
    int n = matrix.size();

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < i ; j++)
        {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    for (int i = 0; i < n; i++)
    {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

int main()
{
    vector<vector<int>> matrix{{5,1,9,11}, {2,4,8,10}, {13,3,6,7},{15,14,12,16}};
    Optimal(matrix);
    for (auto v : matrix)
    {
        for (int i : v)
        {
            cout << i << ", ";
        }
        cout << "\n";
    }
    return 0;
}