#include<iostream>
using namespace std;
struct node 
{
    int item;
    node *next ;
};

class queue
{
    private:
    node *rear;
    node *front;
    public:
    queue();
    void insert_rear(int);
    void view_rear();
    void view_front();
    void del_front();
    ~queue();
    queue(queue&);
    queue& operator=(queue&);
    int count();
};

queue::queue()
{
     rear=NULL;
     front=NULL;
}

void queue::insert_rear(int data)
{
    node *t=new node ;
    t->item=data;
    t->next=NULL;
    if(front==NULL)
    {
        front=t;
        rear=t;
    }
    else
    {
        rear->next=t;
        rear=t;
    }
}

void queue::view_rear()
{
    cout<<rear->item<<endl;
}

void queue::view_front()
{
    cout<<front->item<<endl;
}

void queue::del_front()
{
    if(front->next==NULL)
        {
            
        delete front ;
        front=NULL;
        }
        else
        {
            node *t=front;
            while(t->next!=rear)
                t=t->next;
            delete rear;
            t->next=NULL;
            rear=t;
        }

}

queue::~queue()
{
    while(front!=NULL)
    del_front();
}

queue::queue(queue &q)
{
    node *t=q.front;
    front=NULL;
    rear=NULL;
    while(t)
    {
        insert_rear(t->item);
        t=t->next;
    }
}


int main()
{
    queue q;
    q.insert_rear(59);
    q.insert_rear(60);
    queue d=q;
    d.view_front();
    d.view_rear();
    return 0;
}










