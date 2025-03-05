#include<stdio.h>
void print_all_unique(int A[],int size);
void count_frequency(int [],int);
int main()
{
    int a[10],i;
    printf("enter array of A");
    for(i=0;i<10;i++)
        scanf("%d",&a[i]);
        count_frequency(a,10);
        return 0;
}
int greatest(int A[],int size)
{
    int max,i;
    max=A[0];
    for(i=1;i<=size-1;i++)
        if(A[i]>max)
            max=A[i];
    return max;
}
int smallest(int A[],int size)
{
    int min,i;
    min=A[0];
    for(i=1;i<=size-1;i++)
        if(A[i]<min)
            min=A[i];
    return min;
}
void sort(int A[],int size)
{
    int i,t,r;
    for(r=1;r<=size-1;r++)
    {
        for(i=0;i<=size-1-r;i++)
            if(A[i]>A[i+1])
            {
                t=A[i];
                A[i]=A[i+1];
                A[i+1]=t;
            }
    }
}

void rotate(int A[],int size,int n,int d)
{
    int i,temp;
    if(d==1)
    {
        while(n){
            temp=A[size-1];
            for(i=size-2;i>=0;i--)
                A[i+1]=A[i];
            A[0]=temp;
            n--;
        }
        
    }
    else
    {
        while(n){
            temp=A[0];
            for(i=1;i<=size-1;i++)
                A[i-1]=A[i];
            A[size-1]=temp;
            n--;
        }
    }
}

int adjacent_duplicate(int A[],int size)
{
    int i;
    for(i=0;i<=size-2;i++)
    {
        if(A[i]==A[i+1])
            return A[i];
    }
    return -1;
}
void swap(int a[],int i1,int i2)
{
    int t;
    t=a[i1];
    a[i1]=a[i2];
    a[i2]=t;
}
int count_duplicate(int A[],int size)
{
    int i,j,count=0;
    sort(A,size);
    i=0;
    j=1;

    while(i<=size-2)
    {
        if(A[i]==A[j])
            count++;
        while(A[i]==A[j])
            j++;
        i=j;
        j=j+1;
    }
    return count;
}
void print_all_unique(int A[],int size)
{
    int i,j;
    sort(A,size);
    i=0;
    j=1;

    while(i<=size-2)
    {
        printf("%d ",A[i]);
        while(A[i]==A[j])
            j++;
        i=j;
        j=j+1;
    }
}
void merge(int A[],int B[],int size,int C[])
{
    int i=0,j=0,k=0;
    
    while(i<=size-1&&j<=size-1)
    {
        if(A[i]>B[j])
        {
            C[k]=A[i];
            i++;
        }
        else
        {
            C[k]=B[j];
            j++;
        }
        k++;
    }
    if(i==size)
    {
        while(j<=size-1)
        {
            C[k]=B[j];
            k++;
            j++;
        }
    }
    else 
    {
        while(i<=size-1)
        {
            C[k]=A[i];
            k++;
            i++;
        }
    }
    
}
void count_frequency(int A[],int size)
{
    int i,j;
    sort(A,size);
    i=0;
    j=1;

    while(i<=size-2)
    {
        printf("%d ",A[i]);
        while(A[i]==A[j])
            j++;
        printf("- %d\n",j-i);
        i=j;
        j=j+1;
    }
    printf("%d=%d",A[i],1);
}
