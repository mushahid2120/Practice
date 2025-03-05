#include<iostream>
using namespace std;
struct node
{
    int item;
    node *next;
};

class SLL
{
        private:
        node *start;
        public:
        SLL(){start=NULL;}
        void showData();
        void insertAtFirst(int);
        void insertAtLast(int);
        node* search(int);
        void insertAfter(node*,int);
        void deletefirst();
        void deletelast();
        void deletenode(node*);
        ~SLL();
        SLL(SLL&);
};

void SLL::showData()
{
    try
    {
        node *t;
        if(!start)
        throw 1;
        t=start;
        while(t)
        {
            cout<<t->item<<endl;
            t=t->next;
        }
    }
    catch(int e)
    {cout<<"list is empty";}
}

void SLL::insertAtFirst(int data)
{
    node *t=new node;
    t->item=data;
    t->next=start;
    start=t;
}

void SLL::insertAtLast(int data)
{
    node *t=new node;
    t->item=data;
    t->next=NULL;
    if(!start)
    start=t;
    else
    {
        node *n;
        n=start;
        while(n->next)
            n=n->next;
        n->next=t;

    }
}

node* SLL::search(int data)
{
    node *t;
    t=start;
    while(t)
    {
        if(t->item==data)
            return t;
        t=t->next;
    }
    return NULL;
}

void SLL::insertAfter(node *k,int data)
{
    if(k)
    {
        node *t=new node;
        t->next=k->next;
        t->item=data;
        k->next=t;
    }
}

void SLL::deletefirst()
{
    node *t=start;
    if(start)
    {
        start=t->next;
        delete t;

    }
}

void SLL::deletelast()
{
    node *t;
    try
    {
        if(start==NULL)
        throw 1;
        if(start->next==NULL)
        {
            delete start;
            start=NULL;
        }
        else
        {
            t=start;
            while(t->next->next)
                t=t->next;
            delete t->next;
            t->next=NULL;            
        }
    }
        catch(int e)
        {cout<<"list is empty";}
}

void SLL::deletenode(node *k)
{
    node *t;
    try 
    {
        if(start==NULL)
        throw 1;
        if(start==t)
        {
            delete start;
            start=NULL;
        }
        else 
        {
            t=start;
            while(t->next!=k)
            t=t->next;
            t->next=k->next;
            delete k;
        }
    }
    catch (int e)
    {cout<<"list is empty";}
}

SLL::~SLL()
{
    while(start)
    deletefirst();
}

SLL::SLL(SLL &s)
{
    node *t;
    t=s.start;
    start=NULL;
    while (t)
    {
        insertAtLast(t->item);
        t=t->next;
    }
}

int main()
{
    SLL s;
    s.insertAtFirst(20);
    s.insertAtLast(30);
    s.insertAtLast(50);
    s.insertAtLast(60);
    //s.insertAfter(s.search(50),500);
    //s.deletenode(s.search(30));
    SLL a=s;
    s.showData();
    cout<<endl;
    a.showData();
    return 0;
}