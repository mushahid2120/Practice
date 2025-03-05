#include<iostream>
#include<array>
using namespace std;

void print(array<int,10>&A)
{
    array<int,5>::reverse_iterator I;
    for(I=A.rbegin();I!=A.rend();I++)
        cout<<*I<<" ";
}

template <class X>
void average(array<X,5> A)
{
    float sum=0;
    for(auto x:A)
    sum=sum+x;
    cout<<sum;
}

template <class X>
X find_greatest(array<X,10> A)
{
    X g;
    g=*(A.begin());
    for(auto x:A)
    {
        if(x>g)
            g=x;
    }
    return g;
}

//template <class X>
void input(array<int,10>&A)
{
    int x;
    //array<int,10>::iterator I;
    for(int i=0;i<A.size();i++)
    {
        cin>>x;
        *(A.begin()+i)=x;
    }
}

template <class X>
void sort(array<X,10>&A)
{
    X temp;
    for(int i=0;i<A.size();i++ )
        {
            for(int j=0;j<A.size()-i-1;j++)
        if(A[j]>A[j+1])
        {
            temp=A[j];
            A[j]=A[j+1];
            A[j+1]=temp;
        }
        }
}

int main()
{ 
    array<int,10>A;
       // cout<<find_greatest(A);
        input(A);
        sort(A);
        print(A);        
    return 0;
}