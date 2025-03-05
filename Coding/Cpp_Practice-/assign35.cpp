#include<iostream>
#include<string.h>
using namespace std;
class Complex
{
    int real, imaginary;
    public:
    Complex(int x,int y):real(x),imaginary(y){}
    void showComplex(){cout<<real<<" +i"<<imaginary;}
    Complex operator+(Complex);
    Complex operator-(Complex);
    Complex operator*(Complex);
    bool operator==(Complex);
};
bool Complex::operator==(Complex C)
{
    if(C.real==real && imaginary==C.imaginary)
    return true;
    return false;
}
Complex Complex::operator*(Complex C)
{
    Complex c(0,0);
    c.real=real*C.real-imaginary*C.imaginary;
    c.imaginary=real*C.imaginary+imaginary*C.real;
    return c;
}
Complex Complex::operator-(Complex C)
{
    Complex c(0,0);
    c.real=real-C.real;
    c.imaginary=imaginary-C.imaginary;
    return c;
}
Complex Complex::operator+(Complex C)
{
    Complex c(0,0);
    c.real=real+C.real;
    c.imaginary=imaginary+C.imaginary;
    return c;
}
class Time
{
    private:
    int hour,min,second;
    public:
    Time(int x,int y,int z){hour=x;min=y;second=z;}
    Time(){hour=0;min=0;second=0;}
    bool operator>(Time);
    Time operator+(Time);
    void showTime(){cout<<hour<<"-"<<min<<"-"<<second;}
    Time operator++();
    Time operator--();
    Time operator++(int);
};

Time Time::operator++()
{
    Time t;
    this->second++;
    t=*this;
    return t;
}

Time Time::operator--()
{
    if(second>0)
        second--;
    
    else if(second==0)
    {
        second=59;
        if(min==0)
            {     
                min=59;
                if(hour==1)
                    hour=12;
                else
                    hour--;
            }
        else
            min--;
    }   
    return *this;
}

Time Time::operator++(int)
{
    Time temp;
    temp=*this;
    this->second++;
    return temp;
}

Time Time::operator+(Time t)
{
    Time t1;
    t1.second=second+t.second;
    if(t1.second>60)
    {
        t1.min=t.second/60;
    t1.second=t.second%60;
    }
    t1.min=t.min+min+t1.min;
    if(t1.min>60)
    {
        t1.hour=t1.min/60;
        t1.min=t1.min%60;
    }
    t1.hour=t1.hour+hour+t.hour;
    if(t1.hour>60)
    {
        t1.hour=t1.hour%60;
    }
    return t1;
}
bool Time::operator>(Time t)
{
    if(hour>t.hour)
    return true;
    return false;
}
class Matrix
{
    int mat[3][3];
    public:
    Matrix(){}
    Matrix(int x)
    {
        cout<<"enter 3*3 order matrix:\n";
        for(int i=0;i<3;i++)
            for(int j=0;j<3;j++)
            cin>>mat[i][j];
    }
    void matrix()
    {
        for(int i=0;i<3;i++)
            {for(int j=0;j<3;j++)
            cout<<mat[i][j]<<' ';
            cout<<endl;
            }
    }
Matrix operator+(Matrix);
Matrix operator-(Matrix);
Matrix operator*(Matrix);
};
Matrix Matrix::operator+(Matrix m)
{
    Matrix M;
    int i,j;
    for(int i=0;i<3;i++)
            for(int j=0;j<3;j++)
            M.mat[i][j]=mat[i][j]+m.mat[i][j];
        return M;
}
Matrix Matrix::operator-(Matrix m)
{
    Matrix M;
    int i,j;
    for(int i=0;i<3;i++)
            for(int j=0;j<3;j++)
            M.mat[i][j]=mat[i][j]-m.mat[i][j];
        return M;
}
Matrix Matrix::operator*(Matrix m)
{
    Matrix M;
    int i,j,k,sum=0;
     for(i=0;i<3;i++)
        {for(j=0;j<3;j++)
            {
                for(k=0;k<3;k++)
                sum=sum+mat[i][k]*m.mat[k][j];
                M.mat[i][j]=sum;
                sum=0;
            }
        }
        return M;
}
class numbers
{
    int x,y,z;
    public:
    numbers():x(1),y(4),z(9){}
    void shownumbers(){cout<<x<<endl<<y<<endl<<z;}
    void operator-();
};
void numbers::operator-()
{
    x=-x;
    y=-y;
    z=-z;
}
class fraction
{
    long int num,deno;
    public:
    fraction(long int x,long int y):num(x),deno(y){}
    void shownumbers() {cout<<num<<"/"<<deno;}
    fraction operator+(fraction);
    bool operator<(fraction);
};
bool fraction::operator<(fraction f)
{
    if((num/deno)<(f.num/f.deno))
    return true;
    return false;
}
fraction fraction::operator+(fraction f)
{
    fraction f1(0,0);
    f1.num=num*f.deno+f.num*deno;
    f1.deno=deno*f.deno;
    return f1;

}
class distance1
{
    int km,m,cm;
    public:
    distance1(int x,int y,int z):km(x),m(y),cm(z){}
    void showdistance(){cout<<km<<endl<<m<<endl<<cm;}
    distance1 operator+(distance1);
};
distance1 distance1::operator+(distance1 D)
{
    distance1 t(3,4,5);
    int temp=(km*100000+m*100+cm)-(D.km*100000+D.m*100+D.cm);
    t.km=temp/100000;
    temp=temp%100000;
    t.m=temp/100;
    t.cm=temp%100;
    return t;
}
class array
{
    int *p,size;
    public:
    array()
    {
        size=10;
        p=(int*)malloc(size*sizeof(int));
    }
    int& operator[](int);
    void showdata()
    {
        for(int i=0;i<size;i++)
        cout<<p[i]<<" ";
    }
    ~array()
    {
        free(p);
    }
};
int& array::operator[](int i)
{
    *(p+i)=0;
    return *(p+i);
}
/*
class Time3
{
    int h,m,s;
    public:
    Time3(int x,int y,int z):h(x),m(y),s(z){}
    void showTime(){cout<<h<<"-"<<m<<"-"<<s;}
   void operator++ ();
    void operator ++();
};
void Time3::operator++ ()
{
    s++;
}
void Time3::operator ++()
{
    ++m;
}
*/  

int main()
{
    Time t1(1,0,0),t2;
    t1.showTime();
    t2=--t1;
    cout<<endl;
    t1.showTime();
    cout<<endl;
    t2.showTime();
    return 0;
}