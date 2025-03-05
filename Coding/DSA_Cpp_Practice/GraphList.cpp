#include<iostream>
#include<stdio.h>
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
         node* nodestart()
    {return start;}
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



class Graph:public SLL
{
    int v_cout;
    SLL *arr;
    public:
    Graph();
    void createGraph(int);
    void addedge(int,int);
    ~Graph();
    void printGraph();
};

Graph::Graph()
{
    v_cout=0;
    arr=NULL;
}

void Graph::createGraph(int v)
{
    node *t;
    v_cout=v;
    if(arr!=NULL)
    delete []arr;
    arr=new SLL[v_cout];
    for(int i=0;i<v_cout;i++)
    {
    t=arr[i].nodestart();
    t=NULL;
    }
}

void Graph::addedge(int a,int b)
{
    if(arr==NULL)
        cout<<"list is emepty";
    
    else
    {
        if(arr[a].nodestart())
            arr[a].insertAtLast(arr[b].nodestart()->item);
        else
        cout<<"a is empty";
        
        if(arr[b].nodestart())
            arr[b].insertAtLast(arr[b].nodestart()->item);
        else
        cout<<"b is empty";
    }
}

Graph::~Graph()
{
    delete []arr;
}

void Graph::printGraph()
{
    if(arr==NULL)
        cout<<"Graph is empty";
    else
    for(int i=0;i<v_cout;i++)
        arr[i].showData();
}

int main()
{
    return 0;
}