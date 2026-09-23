// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
// You must do it in place.
// Example 1:
// Input:
// matrix = [[1,1,1],
//           [1,0,1],
//           [1,1,1]]
// Output: [[1,0,1],
//          [0,0,0],
//          [1,0,1]]

#include <iostream>
#include <vector>
#include <utility>
using namespace std;

void BruteForce(vector<vector<int>> &matrix)
{
    int m = matrix.size();
    int n = matrix[0].size();
    vector<pair<int, int>> zeroIndex;
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (matrix[i][j] == 0)
            {
                zeroIndex.push_back({i, j});
            }
        }
    }
    for (int z = 0; z < zeroIndex.size(); z++)
    {
        for (int r = 0; r < m; r++)
        {
            matrix[r][zeroIndex[z].second] = 0;
        }
        for (int c = 0; c < n; c++)
        {
            matrix[zeroIndex[z].first][c] = 0;
        }
    }
}

void Optimal(vector<vector<int>> &matrix)
{
    bool firstRowzero = false, firstColzero = false;
    int m = matrix.size();
    int n = matrix[0].size();
    for (int r = 0; r < m; r++)
    {
        if (matrix[r][0] == 0)
        {
            firstColzero = true;
        }
    }
    for (int c = 0; c < n; c++)
    {
        if (matrix[0][c] == 0)
        {
            firstRowzero = true;
        }
    }

    for (int r = 1; r < m; r++)
    {
        for (int c = 1; c < n; c++)
        {
            if (matrix[r][c] == 0)
            {
                matrix[0][c] = 0;
                matrix[r][0] = 0;
            }
        }
    }
    for (int r = 1; r < m; r++)
    {
        for (int c = 1; c < n; c++)
        {
            if(matrix[r][0]==0 || matrix[0][c]==0){
                matrix[r][c]=0;
            }
        }
    }

    if(firstColzero){
        for(int r=0;r<m;r++){
            matrix[r][0]=0;
        }
    }
    if(firstRowzero){
        for(int c=0;c<n;c++){
            matrix[0][c]=0;
        }
    }
}

int main()
{
    vector<vector<int>> matrix{{1, 1, 2, 1}, {3, 4, 0, 2}, {1, 3, 5, 5}};
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