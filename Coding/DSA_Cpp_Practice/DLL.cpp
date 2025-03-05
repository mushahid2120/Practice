#include<iostream>
using namespace std;
struct node 
{
    node *prev;
    int item;
    node *next;
};

class DLL
{
    node *start;
    public:
    DLL();
    void showData();
    void insertAtFirst(int);
    void insertAtLast(int);
    node* search(int);
    void insertAfter(node*,int);
    void del_first();
    void del_last();
    void del_node(node*);
    ~DLL();
    DLL(DLL&);
    DLL& operator=(DLL&);
};

DLL::DLL()
{
    start=NULL;
}

void DLL::showData()
{
    try
    {
        if(start==NULL)
        throw 1;
        node *t=start;
        t=start;
        while(t)
        {
            cout<<t->item<<endl;
            t=t->next;
        }
    }
    catch(int  e)
    {
        cout<<"list is empty";
    }
    
}

void DLL::insertAtFirst(int data)
{
    node *n=new node;
    n->item=data;
    n->prev=NULL;
    n->next=start;
    start=n;
}

void DLL::insertAtLast(int data)
{
    node *n=new node;
    n->item =data;
    n->next=NULL;
    node *t;
    t=start;
    if(!t)
    {
        start=n;
        n->prev=NULL;
    }
    else
    {
        while(t->next)
        t=t->next;
        n->prev=t;
        t->next=n;
    }
}

node* DLL::search(int data)
{
    if(start)
    {
        node *t;
        t=start;
        while(t)
        {
            if(t->item==data)
            return t;
            t=t->next;
        }
    }
    return NULL;
}

void DLL::insertAfter(node *list,int data)
{
    if(!list)
    {
        insertAtFirst(data);
    }    
    else
    {
        node *n=new node;
        n->item =data;
        n->prev=list;
        n->next=list->next;
        if(n->next)
        list->next->prev=n;
        list->next=n;
    }
}

void DLL::del_first()
{
    if(start)
    {
        node *t;
        t=start;
        start=start->next;
        if(start)
            {
            start->prev=NULL;
            delete t;
            }

    }
}

void DLL::del_last()
{
    if(start)
    {
        if(!start->next)
        {
            delete start;
            start=NULL;
        }
        else 
        {
            node *t;
            t=start;
            while(t->next->next)
            t=t->next;
            delete t->next;
            t->next=NULL;
        }
    }
}

void DLL::del_node(node *list)
{
    if(list)
    {
        node *t;
        t=start;
        while (t->next!=list)
        t=t->next;
        t->next=list->next;
        if(list->next)
        list->next->prev=t;
        delete list;
    }
}

DLL::~DLL()
{
    while (start)
    del_first();
}

DLL::DLL(DLL &d)
{
    node *t;
    cout<<" helllo";
    t=d.start;
    start=NULL;
    while(t)
    {
        insertAtLast(t->item);
        cout<<"hello1"<<endl;
        t=t->next;
    }
}

DLL& DLL::operator=(DLL &d)
{
    node *t;
    while (start)
    del_first();
    t=d.start;
    while (t)
    {
        insertAtLast(t->item);
        t=t->next;
    }
    return (*this);
}

int main()
{
    DLL d;
    d.insertAtFirst(50);
    d.insertAtLast(60);
    d.insertAfter(d.search(50),100);
    d.del_node(d.search(100));
    DLL d2=d,d3;
    d.showData();
    cout<<endl;
    d2.showData();
    cout<<endl;
    d3=d2;
    d3.showData();
    return 0;
}