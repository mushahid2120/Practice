#include<iostream>
using namespace std;
inline void average();
void swap();
void array();
int main()
{
    array();
    swap();
    average();
    return 0;
}
void average()
{
    int x,y,z,sum;
    float avg;
    cout<<"enter three numbers to find average";
    cin>>x>>y>>z;

    sum=x+y+z;
    avg=sum/3.0;
    cout<<"average is "<<avg<<endl;
}
void swap()
{
    int x,y;
    cout<<"enter two nubers want to swap";
    cin>>x>>y;
    x=x+y;
    y=x-y;
    x=x-y;
    cout<<"x="<<x<<"y="<<y;
}
void array()
{
    int a[10],i;
    cout<<"enter 10 elements of array";
    for(i=0;i<10;i++)
    cin>>a[i];
    for(i=0;i<10;i++)
    cout<<a[i]<<' ';
}

