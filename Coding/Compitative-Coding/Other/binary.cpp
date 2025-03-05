#include<iostream>
using namespace std;
//#include"solution.h"
int binarySearch(int[],int,int ,int);
int main() {
    int n;
    cin>>n;
    int arr[n];
    for(int i=0;i<n;i++)
    {
        cin>>arr[i];
    }
    int left = 0;
    int right =n-1;
    int target;
    cin>>target;


    int ans = binarySearch(arr, 0, n-1, target);


    cout<<ans;




    return 0;
}

int binarySearch(int a[],int left,int right,int data)
{
    int m=(right+left)/2;
    if(m==data)
        return m;
    else
    if(m<data)
        binarySearch(a,left,m-1,data);
    else
    if(m<data)
    binarySearch(a,m,right,data);
    return -1;
}