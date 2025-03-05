#include<iostream>
#include<string.h>
using namespace std;
class comlex
{
    private:
    int real,imaginary;
    public:
    void setvalue(int x,int y)
    {
        real=x;
        imaginary=y;
    }
    void display()
    {
        cout<<real<<"+i"<<imaginary;
    }
};
class time2
{
    private:
    int hr,min,sec;
    public:
    void set_time(int x,int y,int z)
    {
        hr=x;
        min=y;
        sec=z;
    }
    void display()
    {
        cout<<hr<<" hr"<<min<<"min"<<sec<<"sec";
    }
};
class date
{
    private:
    int d,m,y;
    char mo[5];
    public:
    void set_date(int x,int ye,int z)
    {
        d=x;
        m=ye;
        y=z;
    }
    void set_month(char b[5])
    {
        strcpy(mo,b);
    }
    void display_date()
    {
        cout<<d<<"-"<<m<<"-"<<y;

    }
    void display_with_month()
    {
        cout<<d<<"-"<<mo<<"-"<<d;
    }
};
class circle
{
    private:
    int radius;
    public:
    void setRadius()
    {
        cin>>radius;
    }
    void getRadius()
    {
        cout<<radius;
    }
        void area()
        {
            cout<<radius*radius*3.14;
        }
        void circumference()
        {
            cout<<2*radius*3.14;
        }
    
};

int main()
{
    time2 t1;
    t1.set_time(4,50,10);
    t1.display();

    return 0;
}