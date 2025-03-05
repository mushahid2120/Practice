#include<iostream>
#include<string.h>
using namespace std;
class complex
{
    int real,imaginary;
    public:
    complex(int x,int y):real(x),imaginary(y){}
    void showcomplex(){cout<<real<<"+i"<<imaginary;}
    friend complex operator+(complex,complex);
    friend complex operator-(complex,complex);
    friend complex operator*(complex,complex);   
    friend complex operator-(complex); 
};
complex operator+(complex c,complex c1)
{
    complex c2(0,0);
    c2.real=c.real+c1.real;
    c2.imaginary=c.imaginary+c1.imaginary;
    return c2;
}
complex operator-(complex c,complex c1)
{
    complex c2(0,0);
    c2.real=c.real-c1.real;
    c2.imaginary=c.imaginary-c1.imaginary;
    return c2;
}
complex operator*(complex c,complex c1)
{
    complex c2(0,0);
    c2.real=c.real*c1.real-c.imaginary*c1.imaginary;
    c2.imaginary=c.real*c1.imaginary+c.imaginary*c1.real;
    return c2;
}
class Time 
{
    int h,m,s;
    public:
    friend ostream& operator<<(ostream&,Time);
    friend istream& operator>>(istream&,Time&);
    Time operator=(Time);
};
istream& operator>>(istream &kin,Time &t)
{
    kin>>t.h>>t.m>>t.s;
    return kin;
}
ostream& operator<<(ostream &kout,Time t)
{
    kout<<t.h<<"-"<<t.m<<"-"<<t.s;
    return kout;
}
Time Time::operator=(Time t)
{
    h=t.h;
    m=t.m;
    s=t.s;
    return t;
}
class Array
{
    int *p,size;
    public:
    Array()
    {
        size=10;
        p=(int*)calloc(size,sizeof(int));
    }
    Array(Array &a)
    {
        size=a.size;
        p=(int*)calloc(size,sizeof(int));
        for(int i=0;i<size;i++)
        p[i]=a.p[i];
    }
    
    ~Array()
    {
        free(p);
    }
    Array operator=(Array);
    int& operator[](int);
    friend Array operator+(Array a,Array b);
};
int& Array::operator[](int i)
{
//*(p+i)=i+1;
    return *(p+i);
}
Array Array::operator=(Array a)
{
    //cout<<a.size;
    size=a.size;
    //a.p=(int*)calloc(size,sizeof(int));
    for(int i=0;i<size;i++)
    p[i]=a.p[i];
    
    return a;
}
Array operator+(Array a,Array b)
{
    Array c;
    c.size=a.size+b.size;
    free(c.p);
    c.p=(int*)calloc(c.size,sizeof(int));
    for(int i=0;i<c.size;i++)
    {
        if(i<a.size)
        c.p[i]=a.p[i];
        else
        c.p[i]=b.p[i-a.size];
    }
    return c;
}
complex operator-(complex c)
{
    complex c1(0,0);
    c1.real=-c.real;
    c1.imaginary=-c.imaginary;
    return c1;
}
class integer 
{
    int n;
    public:
    integer(int n):n(n){ }
    friend bool operator!(integer);
    friend bool operator==(integer,integer);
};
bool operator!(integer N)
{
    if(N.n==0)
        return true;
        return false;
}
bool operator==(integer N1,integer N2)
{
    if(N1.n==N2.n)
    return true;
    return false;
}
class Cordinates1
{
    int x,y;
    public:
    Cordinates1(int x,int y):x(x),y(y){}
    Cordinates1(){};
    void show(){cout<<x<<","<<y;}
    friend Cordinates1 operator,(Cordinates1,Cordinates1);
};
Cordinates1 operator,(Cordinates1 c1,Cordinates1 c2)
{
    Cordinates1 c3;
    c3.x=c1.x-c2.y;
    c3.y=c1.y-c2.y;
    return c3;
}
class student
{
    int roll;
    char name[20];
    int age;
    public:
    student()
    {
        cin>>roll;
        cin.ignore();
        cin.getline(name,20);
        cin>>age;
    }
    void show()
 {
        cout<<roll<<endl<<name<<endl<<age;
}
    friend bool operator==(student,student);
};
bool operator==(student s1,student s2)
{
    if(s1.roll==s2.roll)
        if(strcmp(s1.name,s2.name)==0)
            if(s1.age==s2.age)
            return true;

            return false;
}
int main()
{
    student s1;
    student s2;
    s1.show();
    s2.show();
    if(s1==s2)
    cout<<"same";
    else
    cout<<"not same";
    return 0;
}