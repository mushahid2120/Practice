#include<iostream>
using namespace std;
int binary_search(int [],int ,int ,int);

int binary_search(int a[],int l,int n, int item)
{
    int m,k=-1;
    m=(l+n)/2;
    if(a[m]==item)
    return m;
    if(item<a[m])
        k=binary_search(a,l,m-1,item);
    else
        k=binary_search(a,m+1,n,item);
    return k;
}

class Heap
{
    int capacity;
    int last_index;
    int *ptr;
    public:
    Heap(int);
    void insert(int);
    int get_top();
    void delet();
    void check_insert();
    void check_delet();
    void print();
    void Heap_apply(int [],int);
};

Heap::Heap(int C)
{
    capacity=C;
    last_index=-1;
    ptr=new int[capacity];
}

void Heap::insert(int item)
{
    if(last_index==capacity-1)
        	cout<<"Heap is full";
    else
    {
        last_index++;
        ptr[last_index]=item;
        cout<<ptr[last_index]<<" " <<last_index<<endl;
        check_insert();
    }
}

void Heap::check_insert()
{
    if(last_index>0)
    {
        int N=(last_index-1)/2,k=last_index,temp;
        while(N>=0)
        {
            if(ptr[N]<ptr[k])
            {
                temp=ptr[k];
                ptr[k]=ptr[N];
                ptr[N]=temp;
            }
            if(N==0)
                break;
                k=N;
            N=(N-1)/2;
        }
    }
}

void Heap::print()
{
    for(int i=0;i<=last_index;i++)
    cout<<ptr[i]<<" ";
}

void Heap::delet()
{
    if(last_index<0)
        cout<<"Heap is empty";
    else
    {
        ptr[0]=ptr[last_index];
        last_index--;
        check_delet();
        //cout<<"last index"<<last_index<<endl;
    }
}

void Heap::check_delet()
{
    int temp,N=0,k;
    k=N*2+1;
    while(k<=last_index)
    {
        if(k+1<=last_index)
         k=ptr[k]>ptr[k+1] ?k :k+1;
        if( ptr[N]<ptr[k] )
        {
            temp=ptr[N];
            ptr[N]=ptr[k];
            ptr[k]=temp;
            N=k;
            k=N*2+1;
        }
        else
            break;        
    }
}

void Heap::Heap_apply(int a[],int size)
{
    int i=0;
    while(last_index>=0)
    {
        print();
        cout<<endl;
        a[i]=ptr[0];
        i++;
        delet();
    }
}



int main()
{
    int a[]={100,90,70,20,40,80,85,30};
    Heap h(8);
    for(int i=0;i<8;i++)
    h.insert(a[i]);
    h.print();
    cout<<endl;
    /*
    h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    cout<<endl;
     h.delet();
    h.print();
    */

   cout<<"heap is  " <<endl;
    h.Heap_apply(a,8);
    for(int i=0;i<8;i++)
    cout<<a[i]<<" ";
}