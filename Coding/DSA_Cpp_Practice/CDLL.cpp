#include<iostream>
using namespace std;

struct node
{
    node *prev;
    int item;
    node *next;
};

class CDLL
{
    private:
    node *start;
    public:
    CDLL();
    void insertAtLast(int);
    void insertAtFirst(int);
    node* search(int);
    void insertAfter(node*, int );
    void delFirst();
    void delLast();
    void del_node(node*);
    ~CDLL();
    CDLL(CDLL&);
    CDLL& operator=(CDLL&);
    void showdata();
};

CDLL::CDLL()
{
    start=NULL;
}
void CDLL::insertAtFirst(int data)
{
    node *t;
    t=new node ;
    t->item=data;
    if(!start)
    {
        start=t;
        t->next=t;
        t->prev=t;
    }
    else 
    {
        t->next=start;
        t->prev=start->prev;
        start->prev->next=t;
        start->prev=t;
        start=t;
    }
}

void CDLL::showdata()
{
    try
    {
        if(start==NULL)
        throw 1;
        node *t=start;
        cout<<t->item<<endl;
        t=t->next;
        while(t!=start)
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

void CDLL::insertAtLast(int data)
{
    node *t;
    t=new node ;
    if(!start)
        insertAtFirst(data);
        else
        {
            t->item=data;
            t->next=start;
            t->prev=start->prev;
            start->prev->next=t;
            start->prev=t;
        }
}

node* CDLL::search(int data)
{
    node *t=start;
    if(t->item==data)
        return t;
        t=t->next;
    while (t!=start)
        {
            if(t->item==data)
                return t;
                t=t->next;
        }
        return NULL;
}

void CDLL::insertAfter(node *list,int data)
{
    if(list)
    {
        if(list==start->prev)
         insertAtLast(data);
         else 
         {
            node *t=new node ;
            t->item=data;
            t->next=list->next;
            t->prev=list;
            list->next->prev=t;
            list->next=t;
         }
    }
}

void CDLL::delFirst()
{
    if(start)
    {
        if(start->next==start)
            {
                delete start;
                start =NULL;
            }
        else 
        {
            node *t=start;
            start=start->next;
            start->prev=t->prev;
            t->prev->next=start;
            delete t;
        }
    }
}

void CDLL::delLast()
{
    if(start)
    {
        if(start->next==start)
            delFirst();
            else
        {
            node *t=start->prev;
            t->prev->next=start;
            start->prev=t->prev;
        }
    }
}

void CDLL::del_node(node *list)
{
    if(list)
    {
        if(list==start)
         delFirst();
         else
        if(list==start->prev)
            delLast();
        else
        {
            list->prev->next=list->next;
            list->next->prev=list->prev;
            delete list;
        }
    }
}

CDLL::~CDLL()
{
    while(start->next!=start)
        delFirst();
        delFirst();
}

CDLL::CDLL(CDLL &d)
{
    if(d.start)
    {
        start=NULL;
        node *t=d.start;
        insertAtLast(t->item);
        t=t->next;
        while (t!=d.start)
        {
            insertAtLast(t->item);
            t=t->next;
        }
    }
    else
    {
        start=NULL;
    }
}

CDLL& CDLL::operator=(CDLL &d)
{
    if(d.start)
    {   
        if(start)
        {while(start->next!=start )
            delFirst();
            delete start;
        }
        start=NULL;
        node *t=d.start;
        insertAtLast(t->item);
        t=t->next;
        while (t!=d.start)
        {
            insertAtLast(t->item);
            t=t->next;
        }
    }
    else
    {
        start=NULL;
    }
    return *this;
}

int main()
{
    CDLL c;
    c.insertAtFirst(50);
    c.insertAtLast(40);
    c.insertAtLast(140);
    c.insertAtLast(70);
    c.insertAfter(c.search(70),90);
    c.del_node(c.search(40));
    cout<<"hello";
    CDLL d;
    d=c;
    c.showdata();
    d.showdata();
    return 0;
}