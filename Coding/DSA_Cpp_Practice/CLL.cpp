#include<iostream>
using namespace std;

struct node 
{
    int item;
    node* next;
};

class CLL
{
    private:
    node *last;
    public:
    CLL();
    void showData();
    void insertAtFirst(int);
    void insertAtLast(int);
    node* search(int);
    void insertAfter(node*,int);
    void del_first();
    void del_last();
    void del_after(node*);
    ~CLL();
    CLL(CLL&);
    CLL& operator=(CLL&);
};

CLL::CLL()
{
    last=NULL;
}

void CLL::insertAtFirst(int data)
{
    node *t=new node ;
    t->item =data;
    if(last)
    {
        t->next=last->next;
        last->next=t;
    }
    else 
    {
        last=t;
        t->next=last;
    }

}

void CLL::showData()
{
    try
    {
        if(!last)
        throw 1;
        node *t=last->next;
        while(t!=last)
        {
            cout<<t->item<<endl;
            t=t->next;
        }
        cout<<t->item<<endl;
    }
    catch(int e)
    {
        cout<<"list is empty";
    }
    
}

void CLL::insertAtLast(int data)
{
    node *t=new node ;
    t->item =data;
    if(last)
    {
        cout<<"hello 6";
        t->next=last->next;
        last->next=t;
        last=t;
    }
    else
    {
    insertAtFirst(data);
    cout<<"hello  7";
    }
}

node* CLL::search(int data)
{
    if(last)
    {
        node *t=last->next;
        while (t!=last)
        {
            if(t->item==data)
            return t;
            t=t->next;
        }
        if(last->item==data)
        return last;
    }
    return NULL;
}

void CLL::insertAfter(node *list,int data)
{
    if(list)
    {
        if(list==last)
        insertAtFirst(data);
        else
        {
            node *t=new node ;
            t->item=data;
            t->next=list->next;
            list->next=t;
        }
    }
}

void CLL::del_first()
{
    try
    {
        if(!last)
        throw 1;
        if(last->next==NULL)
        {
            delete last;
            last =NULL;
        }
        else 
        {
            node *t=last->next;
            last->next=last->next->next;
            delete t;
        }
    }
    catch(int  e)
    {
        cout<<" list is empty";
    }
    
}

void CLL::del_last()
{
    try
    {
        if(last==NULL)
        throw 1;
        if(last->next==last)
        {
            delete last;
            last =NULL;
        }
        else 
        {
            node *t;
            t=last->next;
            while(t->next!=last)
            t=t->next;
            node *x;
            x=last;
            t->next=last->next;
            delete last;
            last =t;
        }
            }
    catch(int  e)
    {
        cout<<" list is empty";
    }
    
}

void CLL::del_after(node *list)
{
    if(list)
    {
        if(list==last)
        {
            cout<<"last";
            del_last();
        }
        else
        if(list==last->next)
        {
            del_first();
            cout<<"first";
        }
        else
        {
            node *t=last->next;
            while(t->next!=list)
            t=t->next;
            t->next=list->next;
            delete list;
            cout<<"middle";
        }
    }
}

CLL::~CLL()
{
    while (last!=NULL)
    del_last();
}

CLL::CLL(CLL &list)
{
    node *t;
    t=list.last->next;
    last=NULL;
    while(t!=list.last)
    {
        cout<<"helpp";
        insertAtLast(t->item);
        t=t->next;
        cout<<"\nhelp 2";
    }
    insertAtLast(t->item);
}

CLL& CLL::operator=(CLL &list)
{
     node *t;
     while (last)
     del_last();
    t=list.last->next;
    last=NULL;
    while(t!=list.last)
    {
        cout<<"helpp";
        insertAtLast(t->item);
        t=t->next;
        cout<<"\nhelp 2";
    }
    insertAtLast(t->item);
    return *this;
}

int main()
{
    CLL c;
    c.insertAtFirst(30);
    c.insertAtLast(60);         
    c.insertAtLast(50);
    c.insertAtLast(90);
    c.insertAtLast(100);
    c.del_after(c.search(90));
    CLL c1;
    c1=c;
    c.showData();
    cout<<endl;
    c1.showData();
    return 0;
}