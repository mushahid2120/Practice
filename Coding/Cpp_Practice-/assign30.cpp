#include<iostream>
#include<math.h>
using namespace std;
int prime(int );
int high_value_numbers(int );
double power(int ,int);
void pascal_triangle(int );
int check_fab(int );
void swap(int&,int&);
int add(int,int,int=0);
float area(int radi);
int area(int l,int b);
float area(int ,int ,int); 
int fact(int);
int comb(int ,int);
int find_max(int,int);
double find_max(double,double);
double add(int ,double);
double add(double,int );
int main()
{
    
    cout<<add(3.5,3);
    
    return 0;
}
int prime(int n)
{
    int i;
    for(i=2;i<=n/2;i++)
        if(n%i==0)
        break;
        if(i<n/2)
        return 0;
        return 1;
}
int high_value_numbers(int n)
{
    int i,b=n%10;
    for(;n;n=n/10)
    {
        if(b<(n%10))
        b=n%10;
    }
    return b;
}
double power(int x,int y)
{
    int k=abs(y);
    for(k=k-2;k>=0;k--)
    x=x*x;
    if(y>0)
    return x;
    if(y<0)
    return 1.0/x;
    return 1;
}
void pascal_triangle(int n)
{
    int i,j,z;
    for(i=1;i<=n;i++)
    {
        z=0;
        for(j=1;j<2*n;j++)
        {
            if(j<n+i && j>n-i)
            {
                cout<<comb(i-1,z)<<" ";
                j<n ?z++:z--;
                j++;
            }
            else
            cout<<" ";
        }
        cout<<endl;
    }
}
int comb(int n,int r)
{
    if(n==0 || r==0)
    return 1;
    return (fact(n)/fact(r))/fact(n-r);
}
int fact(int n)
{
    int fact=1,i=1;
    while(i<=n)
    {fact=fact*i;
        i++;
    }
    if(n==0)
    return 1;
    return fact;
}
int check_fab(int n)
{
    int x=-1,y=1,z;
    for(;z<n;)
    {
        z=x+y;
        x=y;
        y=z;
    }
    if(z==n)
    return 1;
    return 0;
}
void swap(int &x,int &y)
{
    x=x+y;
    y=x-y;
    x=x-y;
    
}
int add(int x,int y,int z)
{
    return x+y+z;
}
float area(int radi)
{
    return radi*3.14*radi;
}
int area(int l,int b)
{
    return l*b;
}
float area(int x,int y,int z)
{
    float area,s;
    s=(x+y+z)/2.0;
    area=(float)sqrt(s*(s-x)*(s-y)*(s-z));
    return area;
}
int find_max(int x,int y)
{
    return (x>y ?x:y);
}
double find_max(double x,double y)
{
     return x>y ?x:y;
}
double add(int x,double y)
{
    return (x+y);
}
double add(double x,int y)
{
    return (x+y);
}