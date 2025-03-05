#include<iostream>
#include<stdio.h>
#include<string.h>
using namespace std;

class Array
{
    private:
    int capacity;
    int last_index;
    int *ptr;
    public:
    Array();
    Array(Array&);
    Array& operator=(Array&);
    ~Array();
    void createArray(int);
    void insert(int ,int);
    void append(int);
    int getItem(int);
    bool is_empty();
    bool is_full();
    void del(int);
    void edit(int,int);
    int count();
    int getcapacity();
    void display()
    {
        for(int i=0;i<=last_index;i++)
        cout<<ptr[i];
    }

};

Array::Array()
{
    ptr=NULL;
}

Array::Array(Array &arr)
{
    capacity=arr.capacity;
    last_index=arr.last_index;
    ptr=new int[capacity];
    for(int i=0;i<=arr.last_index;i++)
    ptr[i]=arr.ptr[i];
}

Array& Array::operator=(Array &arr)
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

void Array::createArray(int size)
{
    capacity=size;
    last_index=-1;
    if(ptr!=NULL)
    {
        delete []ptr;
    }
    ptr=new int[capacity];
}

void Array::insert(int index,int data)
{
    try
    {
        if(last_index<index || index<0)
        throw 1;
        if(is_full())
        throw 2;
        for(int i=last_index;i>=index;i--)
        ptr[i+1]=ptr[i];
        last_index++;
        ptr[index]=data;
    }
    catch(int  e)
    {
        if(e==1)
        cout<<"invalid index";
        if(e==2)
        cout<<"overloading";    }
    
}

bool Array::is_full()
{
    return last_index==capacity-1;
}

void Array::append(int data)
{
    try
    {
        if(is_full())
        throw 1;
        last_index++;
        ptr[last_index]=data;
    }
    catch(int e)
    {
        cout<<"overload1";
    }
}

int Array::getItem(int index)
{
    try
    {
        if(last_index<index)
        throw 1;
        if(index<0)
        throw 2;
        return ptr[index];
    }
    catch(int e)
    {
        cout<<"invalid index";
    }
    
    return -1;
}

bool Array::is_empty()
{
    return last_index==-1;
}

void Array::del(int index)
{
    try
    {
        if(index>last_index || index<-1)
        throw 1;
        for(int i=index;i<last_index;i++)
        ptr[i]=ptr[i+1];
        last_index--;
    }
    catch(int e)
    {
        cout<<"invalid index";
    }
    
}

void Array::edit(int index,int data)
{
    try{
            
        if(index>last_index || index<-1)
        throw 1;
        ptr[index]=data;
    }
    catch(int e)
    {
        cout<<"invalid index";
    }
}

int Array::count()
{
    return last_index+1;
}

int Array::getcapacity()
{
    return capacity;
}

Array::~Array()
{
    delete []ptr;
}

int main()
{
    Array a;
    a.createArray(10);
    a.append(10);
    a.append(20);
    a.append(30);
    a.insert(1,5);
    a.display();
    cout<<"full=" <<a.is_full()<<endl<<"coutunt="<<a.count()<<endl;
    return 0;
}