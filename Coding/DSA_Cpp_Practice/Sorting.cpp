#include<iostream>
#include<stdio.h>
#include<string>
using namespace std;

void bubbleSort(int a[],int);
void modBubbleSort(int a[],int);
void insertionSort(int a[],int);
void SelectionSort(int a[],int);
void QuickSort(int a[],int,int);
void MergeSort(int a[],int);
void Merge(int a[],int ,int ,int ,int );

class Employee
{
    private:
    int emp_id;
    int salary;
    string name;
    public:
    void setid(int id){emp_id=id;}
    void setsalary(int s){salary=s;}
    void setname(string n){name=n;}
    int getid(){return emp_id;}
    int getsalary(){return salary;}
    string getname(){return name;}
    void sortemp_by_merg(Employee e[],int);
    void sortname_by_Quick(Employee e[],int);

};

void bubbleSort(int a[],int size)
{
    int r,i,temp;
    for(r=0;r<size-1;r++)
    {
        for(i=0;i<size-r-1;i++)
        {
            cout<<"hello="<<a[i+1]<<endl;
            if(a[i]>a[i+1])
            {
                temp=a[i];
                a[i]=a[i+1];
                a[i+1]=temp;
            }
        }
    }
}

void mobBubbleSort(int a[],int size)
{
    int i,r,temp,k;
    for(r=0;r<size-1;r++)
    {cout<<endl<<"r="<<r<<endl;
        for(i=0,k=0;i<size-r-1;i++)
        {
            if(a[i+1]<a[i])
            {
                temp=a[i];
                a[i]=a[i+1];
                a[i+1]=temp;
                k=1;
            }
        }
        if(k!=1)
        break;
    }
}

void insertionSort(int a[],int size)
{
    int i,temp,r;
    for(i=0;i<size-1;i++)
    {
        temp=a[i+1];
        r=i;
        while(temp<a[r] && r>=0)
        {
            a[r+1]=a[r];
            r--;
        }
        a[r+1]=temp;
    }
}

void SelectionSort(int a[],int size)
{
    int i,j,temp;
    for(i=0;i<size-1;i++)
        {
            for(j=i+1;j<size;j++)
            {
                if(a[i]>a[j])
                {
                    temp=a[i];
                    a[i]=a[j];
                    a[j]=temp;
                }
            }
        }
}

void QuickSort(int a[],int left,int right)
{
       int loc=left,l=left,r=right,temp;
    if(right-left>1)
    {
     
        while(left<right)
        {
            if(a[loc]<a[right])
            right--;
            else
            {
                temp=a[loc];
                a[loc]=a[right];
                a[right]=temp;
                loc=right;
            }
            if(a[loc]>a[left])
            left++;
            else
            {
                temp=a[loc];
                a[loc]=a[left];
                a[left]=temp;
                loc=left;
            }
        }

        QuickSort(a,l,loc-1);
        QuickSort(a,loc+1,r);

    }
}

void MergeSort(int a[],int left,int right)
{
    if(right-left>0)
    {
        int x=(left+right)/2;
        MergeSort(a,left,x);
        MergeSort(a,x+1,right);
        Merge(a,left,x,x+1,right);
    }
}


void Merge(int a[],int l1,int r1,int l2,int r2)
{
    int t ,temp;
    while(l2<=r2 && l1<=r1)
        {
            if(a[l1]<=a[l2])
                l1++;
            else
                {
                    temp=a[l2];
                    t=r1;
                    while(t>=l1)
                    {
                        a[t+1]=a[t];
                        t--;
                    }
                    a[l1]=temp;
                    l1++;
                    l2++;
                    r1++;
                }
        }
}

int main()
{
    int a[10];
    cout<<"enter array of size6\n";
    for(int i=0;i<10;i++)
        cin>>a[i];
    //bubbleSort(a,6);
    //mobBubbleSort(a,6);
    //insertionSort(a,6);
    //SelectionSort(a,6);
    MergeSort(a,0,9);

    cout<<endl;
    for(int i=0;i<10;i++)
        cout<<a[i]<<' ';
    return 0;
}