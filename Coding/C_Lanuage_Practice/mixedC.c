#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>
int* remove_duplicate(int [],int n);
int* arrayofprime(int [],int );
int prime(int );
int freq(int ,int ar[],int);
int max_freq(int [],int n);
int main()
{
    triangles();
    return 0;
}
//Question 7
struct triangle
{
    int l1,l2,l3;
    double area;
};

void triangles()
{
    struct triangle t[5];
    int a[5]={1,23,4,5,6},
        b[5]={5,3,1,6,4},
        c[5]={4,5,7,4,3};
    for(int i=0;i<5;i++)
        {
            t[i].l1=a[i];
            t[i].l2=b[i];
            t[i].l3=c[i];
            int semi_peri=a[i]+b[i]+c[i];

            t[i].area=sqrt(semi_peri*(semi_peri-a[i])*(semi_peri-b[i])*(semi_peri-c[i]));
        }
        
    for (int r=0;r<5;r++)
        for(int i=0;i<4-r;i++)
            if(t[i].area>t[i+1].area)
            {
                int temp=t[i].area;
                t[i].area=t[i+1].area;
                t[i+1].area=temp;
            }
    for(int i=0;i<5;i++)
        printf("%d %d %d %lf \n",t[i].l1,t[i].l2,t[i].l3,t[i].area);
}

//Question 5 Reversing
void rev_arr()
{
    int a[10]={3,4,5,3,56,78,5,4,3,4};
    int temp;
    for (int i=0;i<5;i++)
        {
            temp=a[i];
            a[i]=a[9-i];
            a[9-i]=temp;
        }
        for(int i=0;i<10;i++)
        printf("%d ",a[i]);
}

//Question 6
int findnthterm(a,b,c,n)
{
    if(n==3)
    return a+b+c;
    else
    {
        int sum ;
        sum=a+b+c;
        return findnthterm(b,c,sum,--n);
    }
}

//Question 10
int* arrayofprime(int a[],int n)
{
    int i,j=0,count=n;
    for(i=2;count;i++)
    {
        if(prime(i))
        {
            a[j]=i;
            count--;
            j++;
        }
    }
    return a;

}
int prime(int a)
{
    int i;
    for(i=2;i<=a/2;i++)
    if(a%i==0)
    break;
    if(i>a/2)
    return 1;
    return 0;
}
//Question 9
int max_freq(int a[],int n)
{
    int i,big=0;
    for(i=0;i<n;i++)
    {
        if(big<freq(a[i],a,n))
        big=a[i];
    }
    return big;
}

// frequency of unique elements  Question 8
int freq(int a,int ar[],int n)
{
    int i,count=0;
    for(i=0;i<n;i++)
    if(a==ar[i])
    count++;
    return count;
}
int* remove_duplicate(int a[],int n)
{
    int i,j,k;
    for(i=0;i<n;i++)
    {
        for(j=i+1;j<n;j++)
        {
            if(a[i]==a[j])
                {k=j;
                while(k<n-1)
                {
                    a[k]=a[k+1];
                    k++;
                }
                n--;
                }  
        }
    }
    return a;
}