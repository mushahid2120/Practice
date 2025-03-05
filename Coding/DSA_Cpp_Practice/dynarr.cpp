#include<iostream>
#include<stdio.h>
using namespace std;
class DynArray 
{
    int capacity;
    int last_index;
    int *ptr;
    protected:
    void doublearray();
    void halfarray();
    public:
    DynArray(int);
    int currentcap();
    bool is_empty();
    bool is_full();
    void append(int);
    void insert(int ,int );
    void edit(int,int);
    int getelement(int );
    int count();
    ~DynArray();
    int search(int);
    DynArray(DynArray&);
    DynArray& operator=(DynArray&);
};

DynArray::DynArray(int size)
{
    capacity=size;
    last_index=-1;
    ptr=new int[size];
}

void DynArray::doublearray()
{
    int *temp;
    temp=new int[capacity*2];
    for(int i=0;i<capacity;i++)
    temp[i]=ptr[i];
    capacity*=2;
    delete []ptr;
    ptr=temp;
}

void DynArray::halfarray()
{
    int *temp=new int[capacity/2];
    for(int i=0;i<capacity;i++)
    temp[i]=ptr[i];
    delete []ptr;
    ptr=temp;
    capacity/=2;
}

int DynArray::currentcap()
{
    return capacity;
}

bool DynArray::is_empty()
{
    return last_index==-1;
}

bool DynArray::is_full()
{
    return last_index==capacity-1;
}
void DynArray::append(int data)
{
    if(is_full())
    doublearray();
    last_index;
    ptr[last_index]=data;
}

void DynArray::insert(int index,int data)
{
    try
    {
        if(index>last_index+1 || index<0)
        throw 1;
        if(is_full())
        doublearray();
        for(int i=last_index;i<=index;i++)
        ptr[i+1]=ptr[i];
        last_index++;
    }
    catch(int e)
    {
        cout<<"invalid index";
    }
    
}

void DynArray::edit(int index,int data)
{
    try
    {
        if(index>last_index||index<0)
        throw 1;
        if(is_empty())
        throw 2;
        ptr[index]=data;
    }
    catch(int e)
    {
        cout<<"invalid index";
    }
}

int DynArray::count()
{return last_index+1;}

DynArray::~DynArray()
{delete ptr;}

int DynArray::search(int data)
{
    try{
        if(last_index<0)
        throw 1;
    for(int i=0;i<=last_index;i++)
        if(data==ptr[i])
        return i;
        return -1;
    }
    catch(int e)
    {
        cout<<"array is empty";
    }
}

DynArray::DynArray(DynArray &arr)
{
    capacity=arr.capacity;
    last_index=arr.last_index;
    ptr=new int[capacity];
    for(int i=0;i<=arr.last_index;i++)
    ptr[i]=arr.ptr[i];
}

DynArray& DynArray::operator=(DynArray &arr)
{
    capacity=arr.capacity;
    last_index=arr.last_index;
    if(ptr!=NULL)
    delete ptr;
    ptr=new int[capacity];
    for(int i=0;i<arr.last_index;i++)
    ptr[i]=arr.ptr[i];
    return *this;
}
