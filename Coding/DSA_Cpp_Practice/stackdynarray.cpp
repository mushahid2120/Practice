#include<iostream>
#include<stdio.h>
using namespace std;

class stack
{
    private:
    int capacity;
    int top;
    int*ptr;
    public:
    stack(int);
    void push(int );
    int peek();
    void pop();
    ~stack();
    stack(stack&);
    stack& operator=(stack&);
    void reverse();
    void double();
};

stack::stack(int cap)
{
    capacity=cap;
    top=-1;
    ptr=new int[capacity];
}

void stack::push(int data)
{
    
}

int main()
{
    return 0;
}