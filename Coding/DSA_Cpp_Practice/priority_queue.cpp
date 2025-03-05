#include<iostream>
using namespace std;

struct node 
{
    int prio,item;
    node *next;
};

class prioqueue
{
    node *start;
    public:
    prioqueue();
    void inser(int,int);
    void del();
    int get_element();
    int get_priority();
    ~prioqueue();
    bool is_empty();
    prioqueue(prioqueue&);
    prioqueue& operator=(prioqueue&);
};

prioqueue::prioqueue()
{start=NULL;}

void prioqueue::inser(int data,int priority)
{
    node *t=new node;
    t->item=data;
    t->prio=priority;
    if(is_empty())
    {
        start=t;
        t->next=NULL;
    }
    else
    {
        node *temp=start;
        if(start->prio>priority)
        {
                while(temp->next)
            {
                if(temp->prio < priority)
                    break;
                    temp=temp->next;
            }
            t->next=temp->next;
            temp->next=t;
        }
        else
        {
            t->next=start->next;
            start=t;
        }
    }
}

bool prioqueue::is_empty()
{
    return start==NULL;
}

int prioqueue::get_element()
{
    if(is_empty())
        return -1;
        else
        return start->item;
}

int prioqueue::get_priority()
{
    if(is_empty())
        return -1;
        return start->prio;
}

void prioqueue::del()
{
    if(is_empty())
        cout<<"underflow";
    else
        if(start->next==NULL)
        {
            delete start;
            start=NULL;
        }
    else
    {
        node *t=start;
        start=start->next;
        delete t;
    }

}

prioqueue::~prioqueue()
{
    while(start)
    del();

}

prioqueue::prioqueue(prioqueue &p)
{
    node *t=p.start;
    start=NULL;
    while (t)
    {
        inser(t->item,t->prio);
        t=t->next;
    }
}

int main()
{
    prioqueue p;
    p.inser(50,2);
    cout<<p.get_element()<<endl;
    p.inser(10,1);
    cout<<p.get_element();
    p.inser(55,0);
    prioqueue q=p;
    cout<<p.get_element();
    return 0;
}