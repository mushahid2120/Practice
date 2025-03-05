#include<iostream>
#include<stdio.h>
#include<string>

using namespace std;

class student 
{
    int roll,year;
    string name;
    string stream;
    public:
    student(int r,int y,string n,string s);
    student(){}
    void show_student()
    {
        cout<<roll<<" "<<name<<" "<<stream<<" "<<year<<endl;
    }
};

student::student(int r,int y,string n,string s)
{
    roll=r;
    year=y;
    name=n;
    stream=s;
}

struct node
{
    student item;
    node *next;
};
class HashTable
{
    int capacity;
    node **ptr;
    public:
    HashTable(int);
    int hashfunc(int r);
    void insert_Student_data(int index,student);
    node* Search(int r);
    void showtable();
};

HashTable::HashTable(int c)
{
    capacity=c;
    ptr=new node*[capacity];
    for(int i=0;i<capacity;i++)
        ptr[i]=NULL;
}

int HashTable::hashfunc(int r)
{
    r=r%100;
    if(r<capacity && r>=0)
        return r-1;
    return -1;
}

void HashTable::insert_Student_data(int index,student S)
{
    if(index>=0 && index<capacity)
    {
        node *temp;
        temp=new node;
        temp->item=S;
        temp->next=NULL;
        if(ptr[index]==NULL)
            ptr[index]=temp;
        else
        {
            node *p=ptr[index];
            while(p->next)
                p=p->next;
            p->next=temp;
        }
    }
    else 
    cout<<"invalid index";
}

node* HashTable::Search(int r)
{
    if(hashfunc(r)<capacity && hashfunc(r)>=0)
    {
        if(ptr[hashfunc(r)])
            return ptr[hashfunc(r)];
    }
    return NULL;
}

void HashTable::showtable()
{
    for(int i=0;i<capacity;i++)
        if(ptr[i])
            	(ptr[i]->item).show_student();
}

int main()
{
    student s1(10,2018,"mushahid","ME"),s2(1,2019,"kk","cse"),s3(9,2020,"akki","ece");
    HashTable h1(3);
    h1.insert_Student_data(0,s1);
    h1.insert_Student_data(1,s2);
    h1.insert_Student_data(2,s3);
    h1.showtable();
    return 0;
}