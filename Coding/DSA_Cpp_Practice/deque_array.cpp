#include<iostream>
using namespace std;

class deque
{
    private:
    int capacity ;
    int rear, front;
    int *ptr;
    public:
    deque(int);
    deque(deque&);
    void insert_at_front(int );
    void insert_at_back(int);
    void del_front();
    void del_back();
    void view_front();
    void view_back();
    ~deque();
    deque& operator=(deque&);
    bool is_full();
    bool is_empty();
};

deque::deque(int cap)
{
    capacity=cap;
    rear=-1;
    front=-1;
    ptr=new int[capacity];
}

deque::~deque()
{delete []ptr;}

bool deque::is_full()
{
    return ((front==0 && rear==capacity-1) ||(rear<front && rear+1==front));
}

bool deque::is_empty()

{

    return front==-1;
}

void deque::insert_at_front(int data)
{
    if(is_full())
        cout<<"overflow";
        else
        if(rear<0)
        {
            rear++;
            front++;
            ptr[rear]=data;
        }
        else
            if(front==0)
            {
                for(int i=rear;i>=0;i--)
                ptr[i+1]=ptr[i];
                ptr[0]=data;
                rear++;
            }
            else
                {
                    front--;
                    ptr[front]=data;
                }
        
}

void deque::insert_at_back(int data)
{
    if(is_full())
    cout<<"overflow";
    else
        if(rear<0)
        {
            rear=front=0;
            ptr[rear]=data;
        }
        else
        if(rear==capacity-1)
        {
            rear=0;
            ptr[0]=data;
        }
        else
        {
            rear++;
            ptr[rear]=data;
        }
}

void deque::del_front()
{
    if(is_empty())
        cout<<"underflow";
        else
        if(rear==front)
            rear=front=-1;
        else
        if(front==capacity-1)
            front=0;
            else
            front++;
}

void deque::del_back()
{
    if(is_empty())
        cout<<"underflow";
        else
        if(rear==front)
            rear=front=-1;
        else
        if(rear==0)
            rear=capacity-1;
        else
        rear--;
}

void deque::view_back()
{
    if(is_empty())
        cout<<"underflow";
        else
        cout<<ptr[rear]<<endl<<"rear="<<rear<<"  "<<"front"<<front<<endl;
}

void deque::view_front()
{
    if(is_empty())
        cout<<"underflow";
        else
        cout<<ptr[front]<<endl;    
}

deque::deque(deque &d)
{
    capacity=d.capacity;
    front=d.front;
    rear=d.rear;
    ptr=new int[capacity];
    for(int i=0;i<capacity;i++)
    ptr[i]=d.ptr[i];
}

int main()
{
    deque d(5);
    d.insert_at_front(60);
    d.insert_at_back(70);
    d.insert_at_back(90);
    deque s=d;
    s.view_front();
    s.view_back();
    d.view_back();
    d.view_front();
    return 0;
}