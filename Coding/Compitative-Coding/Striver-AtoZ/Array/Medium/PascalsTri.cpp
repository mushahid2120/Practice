// Given an integer numRows, return the first numRows of Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:

// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// Example 2:

// Input: numRows = 1
// Output: [[1]]

#include <iostream>
#include <vector>
using namespace std;

int  main(){
    int numsRows=5;
    vector<vector<int>> pascal;
    vector<int> row;
    for(int i=0;i<numsRows;i++){
        for(int j=0;j<=i;j++){
            if(j==0 || j==i){
                row.push_back(1);
            }else{
                row.push_back(pascal[i-1][j-1]+pascal[i-1][j]);
            }
        }
        pascal.push_back(row);
        row.clear();
    }
    for(auto v:pascal){
        for(int i:v){
            cout<<i<<", ";
        }
        cout<<"\n";
    }
    return 0;
}