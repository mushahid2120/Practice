#include<iostream>
using namespace std;

class queue
{
    int capacity;
    int front;
    int rear;
    int *ptr;
    public:
    queue(int);
    void insert(int);
    void view_rear();
    void view_front();
    void del_front();
    ~queue();
    bool is_full();
    bool is_empty();
    int count();
    queue(queue&);
    queue& operator=(queue&);
    void view_frontrear();
};

void queue::view_frontrear()
{
    cout<<"\nfront="<<front<<"  rear="<<rear<<endl;
}

queue::queue(int cap)
{
    capacity=cap;
    front=-1;
    rear=-1;
    ptr=new int[capacity];
}
 
bool queue::is_full()
{
    if(front==0)
        return rear==capacity-1;
    else
    return front==rear+1;
}

bool queue::is_empty()
{
    return front<0;
}

void queue::insert(int data)
{
    if(is_full())
    cout<<"overflow";
    else
    if(is_empty())
    {
        front++;
        rear++;
        ptr[front]=data;
    }
    else
    {
        
            if(rear<capacity-1)
            {
                rear++;
                ptr[rear]=data;
            }
            else
            {
                rear=0;
                ptr[rear]=data;
            }
    }
}

void queue::view_rear()
{
    if(is_empty())
        cout<<" underflow";
    else
    cout<<ptr[rear];
}

void queue::view_front()
{
    if(is_empty())
    cout<<"underflow";
    else
    cout<<ptr[front];
}

void queue::del_front()
{
    if(is_empty())
    cout<<"underflow";
    else
    {
        if(rear==front)
            {
                rear=-1;
                front=-2;
            }
            else
            if(front==capacity-1)
                front=-1;
                front++;
    }
}

queue::~queue()
{
    delete []ptr;
}

queue::queue(queue &q)
{
    capacity=q.capacity;
    rear=q.rear;
    front=q.front;
    ptr=new int[capacity];
    for(int i=(front<rear?front:rear) ; i<=(front<rear?rear:front) ; i++)
    ptr[i]=q.ptr[i];
}

int main()
{
    queue q(5);
    q.insert(60);
    q.insert(50);
    q.insert(20);
    q.insert(100);
    q.insert(200);

    q.view_frontrear();

    queue d=q;
    d.view_front();
    d.view_rear();
    cout<<endl;
    q.view_front();
    q.view_rear();
    return 0;
}

