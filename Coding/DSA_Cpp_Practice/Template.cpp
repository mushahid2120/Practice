#include<iostream>
#include<string>
using namespace std;

template <typename X>
X big(X a,X b)
{
    if(a>b)
        return a;
        return b;
}

template <class X>
void print_array(X a[],int size)
{
    for(int i=0;i<size;i++)
    cout<<a[i]<<" ";
}

template <class X>
void Sort_array(X a[],int size)
{
    X temp;
    for(int i=0;i<size;i++)
    {
        for(int j=0;j<size-i-1;j++)
        {
            if(a[j]>a[j+1])
            {
                temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
            }
        }
    }
}


//Array

template <typename X>
class Array
{
    private:
        int capacity;
        int last_index;
        X *ptr;
    public:
        void createArray(int);//done
        void insert(int,X);//done
        void append(X);//done
        X getItem(int);//done
        bool is_empty();//done
        bool is_full();//done
        void del(int);//done
        void edit(int,X);//done
        int count();//done
        Array();//done
        Array(Array&);
        Array& operator=(Array&);
        ~Array();
        void print();//done
};

template <class X>
void Array<X>::print()
{
    for(int i=0;i<=last_index;i++)
        cout<<ptr[i]<<" ";
}

template <class X>
Array<X>::Array()
{
    ptr=NULL;
}

template <class X>
Array<X>::Array(Array &A)
{
    capacity=A.capacity;
    last_index=A.last_index;
    ptr=new X[capacity];
    for(int i=0;i<=last_index;i++)
        ptr[i]=A.ptr[i];
}

template <class X>
Array<X>& Array<X>::operator=(Array &A)
{
    capacity=A.capacity;
    last_index=A.last_index;
    if(ptr)
        delete ptr;
    ptr=new X[capacity];
    for(int i=0;i<=last_index;i++)
        ptr[i]=A.ptr[i];
}

template <class X>
Array<X>::~Array()
{delete ptr;}

template <class X>
void Array<X>::createArray(int cap)
{
    capacity=cap;
    last_index=-1;
    if(ptr)
        delete ptr;
    ptr=new X[capacity]; 
}

template <class X>
void Array<X>::insert(int index,X data)
{
    if(is_full())
        cout<<"overload";
    else 
    if(last_index+1==index)
    {
        last_index++;
        ptr[last_index]=data;
    }
    else
    if(last_index<index)
        cout<<"invalid index"<<last_index<<" "<<index<<" ";
    else
    {
        for(int i=last_index;i<=index;i++)
        ptr[i]=ptr[i+1];
        ptr[index]=data;
        last_index++;
    }
}

template <class X>
bool Array<X>::is_empty()
{
    if(last_index==-1)
        return true;
        return false;
}

template <class X>
bool Array<X>::is_full()
{
    if(last_index==capacity-1)
        return true;
        return false;    
}

template <class X>
void Array<X>::append(X data)
{
    if(is_full())
    cout<<"overload";
    else
    {
        last_index++;
        ptr[last_index]=data;
    }
}


template <class X>
X Array<X>::getItem(int index)
{
    if(index<0 && index>last_index)
        cout<<"invalid index";
    else
        return ptr[index];
}


template <class X>
void Array<X>::del(int index)
{
    if(index<0 && index>last_index)
        cout<<"invlaid index";
    else
    {
        for(int i=index;i<last_index;i++)
            ptr[i]=ptr[i+1];
            last_index--;
    }
}


template <class X>
void Array<X>::edit(int index,X data)
{
    if(index<0 && index>last_index)
    cout<<"invalid index";
    else
    ptr[index]=data;
}


template <class X>
int Array<X>::count()
{
    return last_index+1;
}



//Dynamic


template <typename X>
class DynamicArray
{
    private:
        int capacity;
        int last_index;
        X *ptr;
    public:
        void createArray(int);//done
        void insert(int,X);//done
        void append(X);//done
        X getItem(int);//done
        bool is_empty();//done
        bool is_full();//done
        void del(int);//done
        void edit(int,X);//done
        int count();//done
        DynamicArray();//done
        DynamicArray(DynamicArray&);//done
        DynamicArray& operator=(DynamicArray&);//done
        ~DynamicArray();//done
        void print();//done
        void DoubleArray();
        void HalfArray();
};

template <class X>
void DynamicArray<X>::DoubleArray()
{
    cout<<"hello";
    X *temp;
    temp=new X[capacity*2];
    for(int i=0;i<capacity;i++)
        temp[i]=ptr[i];

    delete ptr;
    ptr=temp;
    capacity=capacity*2;
}

template <class X>
void DynamicArray<X>::HalfArray()
{
    X *temp;
    temp=new X[capacity/2];
    for(int i=0;i<capacity/2;i++)
    temp[i]=ptr[i];
    delete ptr;
    ptr=temp;
    capacity=capacity/2;
}

template <class X>
void DynamicArray<X>::print()
{
    for(int i=0;i<=last_index;i++)
        cout<<ptr[i]<<" ";
}

template <class X>
DynamicArray<X>::DynamicArray()
{
    last_index=-1;
    ptr=NULL;
}

template <class X>
DynamicArray<X>::DynamicArray(DynamicArray &A)
{
    capacity=A.capacity;
    last_index=A.last_index;
    ptr=new X[capacity];
    for(int i=0;i<=last_index;i++)
        ptr[i]=A.ptr[i];
}

template <class X>
DynamicArray<X>& DynamicArray<X>::operator=(DynamicArray &A)
{
    capacity=A.capacity;
    last_index=A.last_index;
    if(ptr)
        delete ptr;
    ptr=new X[capacity];
    for(int i=0;i<=last_index;i++)
        ptr[i]=A.ptr[i];
}

template <class X>
DynamicArray<X>::~DynamicArray()
{
    delete ptr;
}

template <class X>
void DynamicArray<X>::createArray(int cap)
{
    capacity=cap;
    last_index=-1;
    if(ptr)
        delete ptr;
    ptr=new X[capacity]; 
}

template <class X>
void DynamicArray<X>::insert(int index,X data)
{
    if(is_full())
        DoubleArray();
    if(last_index+1==index)
    {
        last_index++;
        ptr[last_index]=data;
    }
    else
    if(last_index<index)
        cout<<"invalid index"<<last_index<<" "<<index<<" ";
    else
    {
        for(int i=last_index;i<=index;i++)
        ptr[i]=ptr[i+1];
        ptr[index]=data;
        last_index++;
    }
}

template <class X>
bool DynamicArray<X>::is_empty()
{
    if(last_index==-1)
        return true;
        return false;
}

template <class X>
bool DynamicArray<X>::is_full()
{
    if(last_index==capacity-1)
        return true;
        return false;    
}

template <class X>
void DynamicArray<X>::append(X data)
{
    if(is_full())
        DoubleArray();
        
        last_index++;
        ptr[last_index]=data;
}


template <class X>
X DynamicArray<X>::getItem(int index)
{
    if(index<0 && index>last_index)
        cout<<"invalid index";
    else
        return ptr[index];
}


template <class X>
void DynamicArray<X>::del(int index)
{
    if(index<0 && index>last_index)
        cout<<"invlaid index";
    else
    {
        for(int i=index;i<last_index;i++)
            ptr[i]=ptr[i+1];
            last_index--;
    }

    if(last_index==capacity/2)
        HalfArray();
}


template <class X>
void DynamicArray<X>::edit(int index,X data)
{
    if(index<0 && index>last_index)
    cout<<"invalid index";
    else
    ptr[index]=data;
}


template <class X>
int DynamicArray<X>::count()
{
    return last_index+1;
}


//singly linked list

/*

template <class X>
class SLL
{
    private:
    node <X>*start;
    public:
    SLL();//done
    SLL(SLL&);
    SLL& operator=(SLL&);
    void insertAtstart(X);//done
    void insertAtlast(X);
    void insertAfter(node<X>*,X);
    void delfirst();
    void dellast();
    void delnode(node<X>*);
    node<X>* search(X);
    ~SLL();
    void print();//done
};

template <class X>
void SLL<X>::print()
{
    node <X>*t=start;
    while(t)
        {
            cout<<t->item<<" ";
            t=t->next;
        }
}

template <class X>
SLL<X>::SLL()
{
    start=NULL;
}

template <class X>
void SLL<X>::insertAtstart(X data)
{
    node <X>*t=new node<X>;
    t->item=data;
    t->next=NULL;
    if(start==NULL)
        start=t;
    else
    {
        t->next=start;
        start=t;
    }
}

template <class X>
void SLL<X>::insertAtlast(X data)
{
    node <X>*t=new node<X>;
    t->item=data;
    t->next=NULL;
    if(start==NULL)
        start=t;
    else
    {
        node <X>*temp;
        temp=start;
        while(temp->next)
            temp=temp->next;
        temp->next=t;
    }
}

template <class X>
void SLL<X>::insertAfter(node <X>*N,X data)
{
    if(N)
    {
        node<X> *t,*temp;
        t=new node<X>;
        t->item=data;
        t->next=NULL;
        t->next=N->next;
        N->next=t;
    }
}

template <class X>
void SLL<X>::delfirst()
{
    if(start->next==NULL)
    {
        delete start;
        start=NULL;
    }
    else
    {
        node<X> *t=start;
        start=start->next;
        delete t;
    }
}


template<class X>
void SLL<X>::dellast()
{
    if(start==NULL)
        cout<<"list is empty";
        else;
    if(start->next==NULL)
    {
        delete start;
        start=NULL;
    }
    else
    {
        node<X> *t,*temp;
        t=start;
        temp=start;
        while(t->next)
        {
            temp=t;
            t=t->next;
        }
        delete temp->next;
        temp->next=NULL;
        
    }
}


template <class X>
void SLL<X>::delnode(node<X> *t)
{
    if(t)
    {
        node<X> *temp;
        temp=start;
        if(start==t)
        {
            delfirst();
        }
        else
        {
        while(temp->next!=t)
        temp=temp->next;
        temp->next=temp->next->next;
        delete t;
        }
    }
}

template <class X>
node<X>* SLL<X>::search(X data)
{
    node<X> *t;
    t=start;
    while(t)
    {
        if(t->item==data)
        return t;
        t=t->next;
    }
    return NULL;
}

template <class X>
SLL<X>::SLL(SLL<X> &A)
{
    node<X> *t;
    t=A.start;
    while(t)
    {
        insertAtlast(t->item);
        t=t->next;
    }
}

template <class X>
SLL<X>::~SLL()
{
    while(start)
    delfirst();
}

*/

//doubly linked list
template <class X>
struct node
{
    node<X> *prev;
    X item;
    node<X> *next;
};

template <class X>
class DLL
{
    private:
    node <X>*start;
    public:
    DLL();
    void insertAtstart(X);//done
    void insertAtlast(X);
    void insertAfter(node<X>*,X);
    void delfirst();
    void dellast();
    void delnode(node<X>*);
    node<X>* search(X);
    void print();//done
};

template <class X>
void DLL<X>::print()
{
    node <X>*t=start;
    while(t->next)
        {
            cout<<t->item<<" ";
            t=t->next;
        }
    cout<<t->item<<endl;
    while(t)
    {
        cout<<t->item<<" ";
        t=t->prev;
    }
}



template <class X>
DLL<X>::DLL()
{
    start=NULL;
}

template <class X>
void DLL<X>::insertAtstart(X data)
{
    node<X> *t=new node<X>;
    t->item=data;
    t->prev=NULL;
    t->next=start;
    if(start!=NULL)
        start->prev=t;
    start=t;
}

template <class X>
void DLL<X>::insertAtlast(X data)
{
    if(start==NULL)
        insertAtstart(data);
    else
    {
        node<X> *t,*temp;
        t=new node<X>;
        t->item=data;
        t->next=NULL;
        temp=start;
        while(temp->next)
            temp=temp->next;
        temp->next=t;
        t->prev=temp;
    }
}

template <class X>
void DLL<X>::insertAfter(node<X> *N,X data)
{
    if(N)
    {
        node<X> *t;
        t=new node<X>;
        t->item=data;
        t->next=N->next;
        t->prev=N;
        N->next=t;
        t->next->prev=t;
    }
}

template <class X>
void DLL<X>::delfirst()
{
    if(start)
    {
        if(start==NULL)
            cout<<"list is empty";
            else
            {
        node<X> *t=start;
        if(start->next)
            start->next->prev=NULL;
            start=start->next;
            delete t;
            }
    }
}


template <class X>
void DLL<X>::dellast()
{
    if(start==NULL)
        cout<<"list is empty";
    else
    {
        if(start->next==NULL)
        delfirst();
        else
        {
            node<X> *t,*temp;
            t=temp=start;
            while(t->next)
            {
                temp=t;
                t=t->next;
            }
            delete t;
            temp->next=NULL;
        }
    }
}

template <class X>
void DLL<X>::delnode(node<X> *N)
{
    if(N==start)
    delfirst();
    else
    {
        N->prev->next=N->next;
        if(N->next)
            N->next->prev=N->prev;
            delete N;
    }
}

template <class X>
node<X>* DLL<X>::search(X data)
{
    node<X> *t;
    t=start;
    while(t)
    {
        if(t->item==data)
        return t;
        t=t->next;
    }
    return NULL;
}




//deque

template <class X>
class Deque
{
    int capacity;
    int rear,front;
    X *ptr;
    public:
    Deque();
    Deque(int cap){ capacity=cap;rear=front=-1;ptr=new X[capacity]; }
    void insertatfront(X);
    void insertatback(X);
    void deletatback();
    void deleratfront();
    //Deque(Deque&);
    bool is_full();
    bool is_empty();
    void print();
};

template <class X>
void Deque<X>::print()
{
    for(int i=front;i!=rear;i++)
    {
        cout<<ptr[i]<<" ";
        if(i==capacity-1)
            i=0;
    }
    cout<<ptr[rear];
}

template <class X>
Deque<X>::Deque()
{
    front=-1;
    rear=-1;
    ptr=NULL;
}

template <class X>
void Deque<X>::insertatback(X data)
{
    if(is_full())
    cout<<"overload";
    else
    if(rear==-1)
    {
        //cout<<"hwllo";
        rear=0;
        front=0;
        ptr[front]=data;
    }
    else
    {
        if(rear==capacity-1)
        {
            rear=0;
            ptr[rear]=data;
        }
        else
        {
            rear++;
            ptr[rear]=data;
        }
    }
}
 
template <class X>
void Deque<X>::insertatfront(X data)
{
    if(is_full())
        cout<<"overload ";
        else
        {
            if(front!=0)
            { 
                front --;
                ptr[front]=data;
            }
            else
            {
                for(int i=rear;i>=0;i--)
                    ptr[i+1]=ptr[i];
                ptr[0]=data;
                rear++;
            }
        }
}

template <class X>
void Deque<X>::deleratfront()
{
    if(is_empty())
    cout<<"overload";
    else
    if(front ==rear)
        front=rear=-1;
    else
    if(front==capacity-1)
        front=0;
    else
    front++;
}

template <class X>
void Deque<X>::deletatback()
{
    if(is_empty())
    cout<<"underflow";
    else
    if(front==rear)
    front=rear=-1;
    else
    if(rear==0)
    rear=capacity-1;
    else
    rear--;
}

template <class X>
bool Deque<X>::is_empty()
{
    if(rear==-1)
        return true;
    return false;
}

template <class X>
bool Deque<X>::is_full()
{
    if(front==0 && rear==capacity-1)
    return true;
    else
    if(front !=0 && rear+1==front)
    return true;
    return false;
}

int main()
{
    Deque <string>s(5);
    s.insertatback("mushaid");
    s.insertatback("guddu");
    s.insertatfront("rohit");
    s.deletatback();
    //s.insertAfter(s.search("guddu"),"raju");
    s.print();
    //SLL <string>k=s;
    //k.print();
    return 0;
}
