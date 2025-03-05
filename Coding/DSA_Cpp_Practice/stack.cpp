#include<iostream>
#include<stdio.h>
using namespace std;

class stack
{
    private:
        int capacity;
        int top;
        int *ptr;
    public:
        stack(int);
        void push(int);
        int peek();
        void pop();
        ~stack(){delete ptr;}
        bool is_full();
        bool is_empty();
        stack(stack&);
        stack& operator=(stack&);
};

stack::stack(int cap)
{
    capacity=cap;
    top=-1;
    ptr=new int[capacity];
}

bool stack::is_full()
{
    return top==capacity-1;
}

bool stack::is_empty()
{
    return top==-1;
}
void stack::push(int data)
{
    if(is_full())
        cout<<"overflow";
        else
        {
            top++;
            ptr[top]=data;
        }
}

int stack::peek()
{
    if(is_empty())
        cout<<"underflow";
        else 
        {
            return ptr[top];
        }
        return -1;
}

void stack::pop()
{
    if(is_empty())
        cout<<"operation not performed";
        else 
        top--;
}

stack::stack(stack &s)
{
    top=s.top;
    capacity=s.capacity;
    ptr=new int[capacity];
    for(int i=0;i<=top;i++)
        ptr[i]=s.ptr[i];
}

stack& stack::operator=(stack &s)
{
    top=s.top;
    capacity=s.capacity;
    if(ptr!=NULL)
        delete ptr;
    ptr=new int[capacity];
    for(int i=0;i<=top;i++)
        ptr[i]=s.ptr[i];
        return *this;
}
int main()
{
    stack s(5);
    s.push(10);
    cout<<s.peek()<<endl;
    s.push(20);
    cout<<s.peek()<<endl;
    stack d(1);
    d=s;
    cout<<d.peek();
    return 0;
}