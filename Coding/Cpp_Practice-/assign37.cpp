#include<iostream>
#include<string.h>
using namespace std;
class person 
{
    char name[20];
    int age;
    public:
    person(char name[20],int age)
    {
        strcpy(this->name,name);
        this->age=age;
    }
    void showData()
    {
        cout<<"name : "<<name<<endl<<"age="<<age;
    }
};
class complex
{
    int a,b;
    public:
    void setData(int a,int b)
    {
        this->a=a;
        this->b=b;
    }
    void showData()
    {
        cout<<this->a<<"+i"<<this->b;
    }
    friend complex* initiate();
};
complex* initiate()
{
    complex *p=new complex;
    p->a=5;
    p->b=8;
    return p;
}
class Time
{
    int h,m,s;
    public:
    void setTime(int h,int m,int s)
    {
        this->h=h;
        this->m=m;
        this->s=s;
    }
    void showTime()
    {
        cout<<this->h<<"-"<<this->m<<"-"<<this->s<<' ';
    }
    friend Time* create_arr(int i);
    friend bool operator>(Time ,Time);
    friend void sort_arr(Time *p,int size);
};
Time* create_arr(int i)
{
    Time *p;
    p=new Time[i];
    return p;
}
bool operator>(Time t1,Time t2)
{
    if(t1.h>t2.h)
    return true;
    else
    if(t1.h==t1.h)
    {
        if(t1.m>t2.m)
            return true;
        else
        if(t1.m==t2.m)
            if(t1.s>t2.s)
                return true;
            return false; 
    }
    return false;
}
void sort_arr(Time *q,int size)
{
    int i,j;
    Time temp;
    for(i=0;i<size;i++)
    {
        for(j=0;j<size-1-i;j++)
            if(q[i]>q[i+1])
            {
                temp=q[i];
                q[i]=q[i+1];
                q[i+1]=temp;
            }
    }
}
class sting
{
    char *p;
    int len;
    public:
    void arr();
    void upper();
    int leng();
    void display()
    {
        for(int i=0;i<len;i++)
        cout<<p[i];
    }
};
void sting::upper()
{
    int i;
    for(i=0;p[i];i++)
        if(p[i]>='a' && p[i]<='z')
            p[i]=p[i]-32;
}
int sting::leng()
{
    return len;
}
void sting::arr()
    {
        len=1;
        int i=0;
        char *q;
        p=new char[len];
        q=new char[len+1];
        cout<<"enter string:\n";
        while(p[i-1]!='\n')
        {
            p[i]=getchar();
            for(i=0;i<len;i++)
            q[i]=p[i];
            q[i]='\0';
            delete []p;
            p=new char[++len];
            for(i=0;q[i];i++)
            p[i]=q[i];
            p[i]='\0';
            delete []q;
            q=new char[len+1];

        }
        len-=2;
    }
int main()
{
    sting s1;
    s1.arr();
    s1.upper();
    s1.display();
    cout<<s1.leng();
    return 0;
}
