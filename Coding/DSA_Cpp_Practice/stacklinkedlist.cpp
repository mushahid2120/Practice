#include<iostream>
using namespace std;

struct node 
{
    int item;
    node *next;
};

class stack
{
    node *top;
    public:
    stack();
    void push(int);
    int peek();
    void pop();
    ~stack();
    stack(stack&);
    stack& operator=(stack&);
    void revese();
    void showData();
};

stack::stack()
{
    top=NULL;
}

void stack::push(int data)
{
        node *t=new node;
        t->item=data;
        if(top==NULL)
        {
            top=t;
            t->next=t;
        }
        else
        {
            t->next=top->next;
            top->next=t;
            top=t;
        }
}

int stack::peek()
{
    if(top)
        return top->item;
        return -1;
}

void stack::pop()
{
    if(top)
    {
        node *n;
        n=top;
        while(n->next!=top)
         n=n->next;
        n->next=top;
        if(top->next!=top)
        {
            delete top;
            n->next=n;
            top=n;
        }
        else
        {
            delete top;
            top=NULL;
        }
    }
}

stack::~stack()
{
    while (top)
        pop();
}

stack::stack(stack &s)
{
    node *n=s.top;
    top=NULL;
    while(n!=s.top)
    {
        push(n->item);
        n=n->next;
    }
    push(s.top->item);
}
void stack::revese(){
    if(top)
    top=top->next;
}
int main()
{
    stack s;
    s.push(50);
    s.push(60);
    cout<<s.peek();
    stack d=s;
    cout<<endl<<d.peek();
    s.revese();
    cout<<s.peek();

    return 0;
}