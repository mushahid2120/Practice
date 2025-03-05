#include<iostream>
#include<stdio.h>

using namespace std;

struct node
{
    int item;
    node *next;
};

class sll
{
    node *start;
    int last_index;
    public:
    sll();
    void showData();
    void insert_first(int );
    void insert_after(int );
    void insert_last(int );
    int search(int);
    void del_last();
    void del_node(int index);
    void del_first();
    int count();
    sll(sll&);
    sll& operator=(sll&);
    void del_everything();
    ~sll()
    {
        node *temp1,*temp2;
    temp1=start->next;
    delete start;
    temp2=temp1->next;
    for(int i=1;i<=last_index;i++)
    {
        delete temp1;
        temp1=temp2;
        if(temp1!=NULL)
        temp2=temp1->next;
    }
    }
};
sll::sll()
{
    start=NULL;
    last_index=-1;
}

void sll::showData()
{
    try
    {
        if(last_index<0 || start==NULL)
        throw 1;
            node a=*start;
            cout<<endl<<a.item<<endl;
                for(int i=1;i<=last_index;i++)
                {
                    a=*a.next;
                    cout<<a.item<<endl;
                }
    }
    catch(int e)
    {cout<<" list is empty";}
}

void sll::insert_first(int data)
{
    try
    {
        if(last_index>0)
        throw 1;
    start =new node;
    start->item=data;
    start->next=NULL;
    last_index++;
    }
    catch(int e)
    {cout<<"list is not empty";}
}

void sll::insert_after(int data)
{
    try
    {
        if(last_index<0)
        throw 1;
        node *ptr=start;
                for(int i=1;i<=last_index;i++)
                    {
                        ptr=ptr->next;
                    }
                    if(ptr->next!=NULL || last_index==0)
                {ptr->next=new node;
                ptr=ptr->next;
                ptr->item=data;
                ++last_index;
                }
    }
    catch(int e)
    {cout<<"list is empty";}
}

void sll::insert_last(int data)
{
    try
    {
        if(last_index<0)
        throw 1;
        node *ptr=start;
        cout<<last_index;
                for(int i=1;i<=last_index;i++)
                    {
                        ptr=ptr->next;
                    }
                ptr->next=new node;
                ptr=ptr->next;
                ptr->item=data;
                ptr->next=NULL;
                ++last_index;
    }
    catch(int e)
    {cout<<"list is empty";}
}

int sll::search(int data)
{
    try
    {
        if(last_index<0)
        throw 1;
        node *ptr=start;
        if(ptr->item==data)
        return 0;
                for(int i=1;i<=last_index;i++)
                    {
                        ptr=ptr->next;
                        if(ptr->item==data)
                        return i;
                    }
                return -1;
    }
    catch(int e)
    {cout<<"list is empty";}
    return -1;
}

void sll::del_last()
{
    try
    {
        if(last_index<0)
        throw 1;
        node *ptr=start;
                for(int i=1;i<last_index;i++)
                    {
                        ptr=ptr->next;
                    }
                delete ptr->next;
                ptr->next=NULL;
                last_index--;
    }
    catch(int e)
    {cout<<"list is empty";}
}

void sll::del_first()
{
    try
    {
        if(last_index<0)
        throw 1;
        node *temp=start->next;
        delete start;
        start=temp;
        last_index--;
    }
    catch( int e)
    {
        cout<<"list is empty";
    }
    
}

void sll::del_node(int index)
{
    try
    {
        if(last_index<0)
        throw 1;
        if(last_index<index)
        throw 2;
        node *ptr=start;
                for(int i=1;i<index;i++)
                    {
                        ptr=ptr->next;
                    }
                node *temp;
                temp=ptr->next;
                ptr->next=ptr->next->next;
                delete temp;
                last_index--;
    }
    catch(int e)
    {cout<<"list is empty";}
}

int sll::count()
{
    return last_index+1;
}

sll::sll(sll &s)
{
    start=new node;
    last_index=s.last_index;
    if(s.last_index>-1)
        {
            start->item=s.start->item;
            start->next=new node;
            node *temp,a;
            temp=start->next;
            a=*s.start->next;
            for(int i=1;i<=last_index;i++)
            {
                temp->item=a.item;
                 if(a.next!=NULL)
                {
                    a=*a.next;
                    temp->next=new node;
                    temp=temp->next;
                }
                else temp->next=NULL;
            }
        }
}

sll& sll::operator=(sll &s)
{
    last_index=s.last_index;
    if(start!=NULL)
        {
            del_everything();
            cout<<"hello";
        }
        start=new node;
        cout<<"hello 1\n";
        start->item=s.start->item;
        cout<<"hello2\n";
        start->next=new node;
        node *temp,b;
        cout<<"hello3\n";
        temp=start->next;
        cout<<"hello 4\n";
        b=*s.start->next;
        cout<<"hello5\n";
        
        for(int i=1;i<=last_index;i++)
        {
            temp->item=b.item;
            temp->next=new node;
            cout<<"hello6\n";
            if(b.next==NULL)
            {
                temp->next=NULL;
                cout<<"hel6\n";
            }
            else
            {
                cout<<"hello7\n";
            temp=temp->next;
            b=*b.next;
            }
        }
        return *this;
}

void sll::del_everything()
{
    node *temp1,*temp2;
    temp1=start->next;
    delete start;
    temp2=temp1->next;
    for(int i=1;i<=last_index;i++)
    {
        delete temp1;
        temp1=temp2;
        if(temp1!=NULL)
        temp2=temp1->next;
    }
    start=NULL;
    last_index=-1;
}
int main()
{
    sll s;
    s.insert_first(30);
    s.insert_after(40);
    s.insert_after(50);
    s.insert_after(100);
    s.insert_last(200);
    sll a;
    //cout<<s.search(0);
    s.showData();
    cout<<endl;
    a=s;
    cout<<"a="<<s.count()<<"b="<<a.count()<<endl;
    a.showData();
}