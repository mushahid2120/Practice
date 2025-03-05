#include<iostream>
#include<string.h>
using namespace std;
class cuboid 

{
    private:
    int len,bred,height;
    public:
    cuboid()
    {
        len=0;
        bred=0;
        height=0;
    }
    void showcuboid(){cout<<len<<endl<<bred<<endl<<height;}
};
class Customer1
{
    int cust_id;
    char name[20];
    char email[30];
    int mobile_number[10];
    public:
    Customer1()
    {
        cust_id=0;
        name[0]='\0';
        email[0]='\0';
        for(int i=0;i<10;i++)
            mobile_number[i]=0;
    }
    Customer1(int ci,char n[20],char em[30],int m[10])
    {
        cust_id=ci;
        for(int i=0;n[i];i++)
            name[i]=n[i];
        for(int i=0;em[i];i++)
            email[i]=em[i];
        for(int i=0;i<10;i++)
            mobile_number[i]=m[i];
    }
    void showCustomer1();
  };
void Customer1::showCustomer1()
{
    cout<<cust_id<<endl<<name<<endl<<email<<endl;
    for(int i=0;i<10;i++)
        cout<<mobile_number[i];
}
class Time 
{
    int h,m,s;
    public:
    Time(){h=0;m=0;s=0;}
    void showTime()
    {cout<<h<<" "<<m<<" "<<s;}
    
};
class Book
{
    int booked;
    char title[20];
    float price;
    public:
    Book()
    {
        booked=0;
        title[0]='\0';
        price=0;
    }
    Book(int x,char a[20],float p)
    {
        booked=x;
        strcpy(title,a);
        price=p;

    }
    void showBook()
    {
        cout<<booked<<endl<<title<<endl<<price;
    }
};
class Complex
{
    int real,imaginary;
    public:
    Complex(int x,int y){real=x;imaginary=y;}
    void showData(){cout<<real<<"+i"<<imaginary;}
};
class Number
{
    int size,*arr;
    public:
    Number()
    {
        size=10;
        arr=(int*)malloc(size*sizeof(int));
    }
    ~Number()
    {
        free(arr);
    }
    void setvalue()
    {
        int i;
        cout<<"enter 10 numbers in array:\n";
        for(i=0;i<10;i++)
        cin>>*(arr+i);
    }
    void showdata()
    {
        int i;
        for(i=0;i<size;i++)
        cout<<*(arr+i)<<" ";
    }
    Number(Number &N)
    {
        size=N.size;
        arr=(int*)malloc(size*sizeof(int));
        for(int i=0;i<size;i++)
        *(arr+i)=*(N.arr+i);

    }
};

class student 
{
    int roll;
    char name[20];
    float marks;
    public:
    student()
    {
        cout<<"enter roll:\n";
        cin>>roll;
        cin.ignore();
        cout<<"enter your name:\n";
        cin.getline(name,20);
        cout<<"enter the marks:\n";
        cin>>marks;
    }
    void showStudent();
};
void student::showStudent()
{
    cout<<roll<<endl<<name<<endl<<marks;
}
class Date
{
    int d,m,y;
    public:
    Date():d(24),m(12),y(2000){cout<<"thanks"<<endl;}
    Date(int p,int q,int r):d(p),m(q),y(r){cout<<"you"<<endl;}
    void showDate(){cout<<d<<"\\"<<m<<"\\"<<y;}
};
class room
{
    int room_no;
    char type;
    bool is_ac;
    float price;
    public:
    room()
    {
        room_no=0;
        type='\0';
        is_ac=false;
        price=0.00;
    }
    void showroom(){cout<<room_no<<endl<<type<<endl<<is_ac<<endl<<price;}
};
class circle
{
    int r;
    public:
    circle(){r=0;}
    circle(int x){r=x;}
    void showcircle(){cout<<r;}
};
int main()
{
    Number N;
    N.setvalue();
    cout<< "this is N values:\n";
    N.showdata();
    Number N1=N;
    cout<<"this is n1 values\n";
    N1.showdata();
    return 0;
}