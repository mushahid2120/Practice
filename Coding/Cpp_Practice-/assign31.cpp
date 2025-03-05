#include<iostream>
using namespace std;
#include<string.h>
void sort_array(int [],int,bool=true);
void sort_string(char [][50],int n,bool=true);
void rotate_array(int a[],int,int,int=1);
int LCM(int ,int ,int );
void prime_fact(int);
int HCF(int ,int );
int volume(int,int,int);
double volume(int,int );
double volume(int r);
void substring(char a[],int ,int=0 );
void swap_array(int [],int [],int ,int);
void merge(int [],int [],int [],int n);
int big(int ,int ,int=0);
int main()
{
    int i,b[]={6,9,7,8,3,1,4,9,7,5},c[]={9,2,5,1,9,5,0,5,6,88},d[20];
    char a[5][50]={"mushahid ",
                    "rohit ",
                    "raju ",
                    "abhi ",
                    "gorai "};
    merge(b,c,d,10);

    for(i=0;i<20;i++)
    cout<<d[i]<<" ";
    cout<<endl;   
    return 0;
}
void sort_array(int a[],int n,bool k)
{
    int i,j,temp;
    if(k==true)
    {
        for(i=0;i<n;i++)
        {
            for(j=0;j<n-i;j++)
            {
                if(a[j]>a[j+1])
                {
                    temp=a[j];
                    a[j]=a[j+1];
                    a[j+1]=temp;
                }
            }
        }
    }
    if(k==false)
    {
        for(i=0;i<n;i++)
        {
            for(j=n-2;j>=i;j--)
            {
                if(a[j]<a[j+1])
                {
                    temp=a[j];
                    a[j]=a[j+1];
                    a[j+1]=temp;
                }
            }
        }
    }
}
void sort_string(char a[][50],int n,bool k)
{
    int i,j;
    char temp[50];
    //cout<<a[4];
    if(k==true)
    for(i=0;i<n;i++)
    {
        for(j=0;j<n-i-1;j++)
        {
            if(strcmp(a[j],a[1+j])==1)
            {
                strcpy(temp,a[j]);
                strcpy(a[j],a[j+1]);
                strcpy(a[j+1],temp);
            }
        }
    }
    else
    for(i=0;i<n;i++)
    {
        for(j=0;j<n-i-1;j++)
        {
            if(strcmp(a[j],a[j+1])==-1)
            {
                strcpy(temp,a[j]);
                strcpy(a[j],a[j+1]);
                strcpy(a[j+1],temp);
            }
        }
    }
}
void rotate_array(int a[],int b,int d,int n)
{
    int i,j,temp;
    if(d==-1)
    {
        while(n)
        {
            temp=a[0];
            for(i=0;i<b-1;i++)
            a[i]=a[i+1];
            n--;
            a[i]=temp;
        }
    }
    if(d==1)
    {
         
        while(n)
        {
            temp=a[b-1];
            for(i=b-2;i>=0;i--)
            a[i+1]=a[i];
            n--;
            a[0]=temp;
        }
        
    }
}
int LCM(int x,int y,int z)
{
    int i;
    for(i=big(x,y,z);i<x*y*z;i++)
    if(!(i%x)&& !(i%y) && !(i%z))
    break;
    cout<<big(x,y,z)<<endl;
    return i;    
}
void prime_fact(int n)
{
    int j=2;
    while(j<=n)
    {
        if(n%j==0)
        {
            n=n/j;
            cout<<j<<' ';
            j=2;
        }
        else
        j++;
        
    }
}
int HCF(int x,int y)
{
    int i;
    for(i=x<y ?x:y ;i>0;i--)
    {
        if(!(x%i) && !(y%i))
        break;
    }
    return i;
}
int volume( int l,int b,int h)
{
    return l*b*h;
}
double volume(int r,int h)
{
    cout<<r<<endl<<h<<endl;
    //cout<<(3.14*r*r*h)/3<<endl;
    return (3.14*r*r*h)/3;
}
double volume(int r)
{
    return 4/3*3.14*r*r*r;
}
void substring(char a[],int start_index,int end_index)
{
    int i;
    if(end_index==0)
    end_index=strlen(a)-1;
    for(i=start_index;i<end_index;i++)
            cout<<a[i];
}
void swap_array(int a[],int b[],int n,int m)
{
    int i,temp;
    for(i=0;i<(n>m ?m:n);i++)
    {
        temp=a[i];
        a[i]=b[i];
        b[i]=temp;
    }
        if(big(n,m)==n)
        {
            while(i<n)
            {b[i]=a[i];
            i++;
            }
        }
        else 
        while(i<n)
        {a[i]=b[i];
        i++;
        }
}
void merge(int a[],int b[],int d[],int c)
{
    int i,j=0;
    for(i=0;i<2*c;i++)
    {
        if(i<c)
            d[i]=a[i];
            else
            {
                d[i]=b[j];
                j++;
            }
        }
    }

int big(int x,int y,int z)
{
    if(x>z)
    {
        if(x>y)
        return x;
        else 
        return y;
    }
    else
    {
        if(y>z)
        return y;
        else 
        return z;
    }
}