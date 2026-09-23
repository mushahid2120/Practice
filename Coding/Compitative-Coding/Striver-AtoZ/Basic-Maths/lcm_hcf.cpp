#include<iostream>
#include<vector>
using namespace std;

long long hcf(long long , long long);
vector<int> mywayLcmHcf(int,int);

int main(){
    vector<int> lh=mywayLcmHcf(9,12);
    for (int x : lh)
        cout<<x<<" ";

    return 0;
}

vector<int> mywayLcmHcf(int a,int b){

    vector<int> result;
    int x=min(a,b),y=max(a,b),r;
    for(;x>0;y=r){
        r=x;
        x=y%x;
    }
    result.push_back(a*b/y);
    result.push_back(y);
    return result;
}

// Given two integers a and b, write a function lcmAndGcd() to compute their LCM and GCD. The function inputs two integers a and b and returns a list containing their LCM and GCD.

// Examples:

// Input: a = 5 , b = 10
// Output: [10, 5]
// Explanation: LCM of 5 and 10 is 10, while their GCD is 5.