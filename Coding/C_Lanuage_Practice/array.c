#include<stdio.h>
#include<stdlib.h>
int find_duplicate(int a[],int);
void merge(int a[],int b[],int);
void frequency(int a[],int);
//void sum(int a[][], int b[][], int c[][],int);
void sort(int [],int);
void printa(int a[],int);
void print_unique(int [],int);
void first_digit_sort(int [],int );

//./void frequ

int main()
{
    int a[10],b[10],i;
    printf("enter array of A");
    for(i=0;i<10;i++)
        scanf("%d",&a[i]);
        frequency(a,10);
    /*for(i=0;i<10;i++)
    {
        printf("%d ",a[i]);
    }
    */
    /*for(int i=0;i<10;i++)
        printf("%d",a[i]);
        */
    return 0;
}
void print_unique(int a[],int n)
{
    int i;
    sort(a,n);
    for(i=0;i<n-1;i++)
    {
        printf("%d",a[i]);
        while(a[i]==a[i+1])
            i++;
    }
    if(i==n-1)
    printf("%d",a[i]);
}
void sort(int a[],int n)
{
    int i,j,temp;
    for(i=1;i<n;i++)
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
void printa(int a[],int n)
{
    int i,j;
    for(i=0;i<n;i++)
    {for(j=0;j<n;j++)
        printf("%d ",a[i]);
        printf("\n");
    }

}
/*void sum(int a[][],int b[][],int c[][],int n)
{
    int i,j;
    for(i=0;i<n;i++)
        for(j=0;j<n;j++)
        c[i][i]=a[i][j]+b[i][j];
}
*/
void frequency(int a[],int n)
{
    int i,j,k,count=1;
    sort(a,10);
    for(i=0;i<n;i++)
            {
                while(a[i]==a[i+1])
                {count++;
                i++;
                }
        printf("%d=%d\n",a[i],count);
        count=1;
        }
        printf("%d=%d",a[i]=count);
}
void merge(int a[],int b[],int n)
{
    int i;
    for(i=n;i<2*n-1;i++)
         a[i]=b[i-n];
        sort(a,20);

    }
int find_duplicate(int a[],int n)
{
    int i,count=0;
    sort(a,n);
    for(int i=0;i<n;i++)
      {if(a[i]==a[i+1])
        count++;
        while(a[i]==a[i+1])
            i++;
      }
      getch();
    return count;

}