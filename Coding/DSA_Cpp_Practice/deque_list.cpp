#include<iostream>
using namespace std;

struct node 
{
    int item;
    node *next;
};

class deque
{
    node *front;
    node *rear;
    public:
    deque();
    //~deque();
    void insert_front(int);
    void insert_rear(int);
    void del_front();
    void del_rear();
    void view_rear();
    void view_front();
    deque(deque&);
    deque& operator=(deque&);
};

deque::deque()
{
    rear=NULL;
    front=NULL;
}

void deque::insert_front(int data)
{
    node *t=new node ;
    t->item=data;
    if(rear==NULL)
    {
        rear=front=t;
        t->next=NULL;    
    }
    else
    {
        t->next=front;
        front=t;
    }
}

void deque::insert_rear(int data)
{
    node *t=new node;
    t->item=data;
    if(rear==NULL)
        {
            rear=front=t;
            t->next=NULL;
        }
    else
    {
        rear->next=t;
        t->next=NULL;
    }
}

void deque::del_front()
{
    if(front->next==NULL)
    {
        delete front;
        rear=front=NULL;
    }
    else
    {
        node *t=front;
        front=front->next;
        delete t;
    }
}

void deque::del_rear()
{
    if(front->next==NULL)
        {
            delete front;
            front=rear=NULL;
        }
    else
    {
        node *t=front;
        while(t->next!=rear)
        t=t->next;
        delete t->next;
        rear=t;
    }
}

void deque::view_front()
{
    if(rear==NULL)
        cout<<"underflow";
        else
        cout<<front->item;
}

void deque::view_rear()
{
    if(front==NULL)
        cout<<"underflow";
        else
    cout<<rear->item;
}

deque::deque(deque &d)
{
    node *t=d.front;
    rear=front=NULL;
    while (t)
    {
        insert_rear(t->item);
        t=t->next;

        
    }
    
}