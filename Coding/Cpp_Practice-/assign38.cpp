#include<iostream>
#include<string.h>
#include<math.h>
using namespace std;
class person
{
    char name[20];
    int age;
    protected:
    void setdata(int a,char n[20])
    {
        age=a;
        strcpy(name,n);
    }
    void showdata()
    {
        cout<<age;
        cout<<" "<<name;
    }
};
class employee:public person
{
    float salary;
    public:
    void setemployee(int a ,char n[20],float s)
    {
        setdata(a,n);
        salary=s;
    }
    void showemployee()
    {
        showdata();
        cout<<" "<<salary;
    }
};

class circle
{
    int radius;
    public:
    void setradius(int r)
    {
        radius=r;
    }
    int  getradius()
    {return radius;}
    double getArea()
    {
        return 3.14*radius*radius;
    }
};
class Thickcircle:public circle
{
    int Thickness;
    public:
    int getThickness()
    {return Thickness;}
    void setThickness(int t)
    {Thickness=t;}
    double getArea()
    {return (this->circle::getArea())-(3.14*(getradius()-Thickness)*(getradius()-Thickness));}
};

class coordinate
{
    int x,y;
    public:
    void setcoordinate(int x1,int y1){x=x1;y=y1;}
    int getx(){return x;}
    int gety(){return y;}
    double getdistance();
    double getdistance(int x1,int y1);
};
double coordinate::getdistance()
{return sqrt(x*x+y*y);}

double coordinate::getdistance(int x1,int y1)
{return sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1));}

class shape
{
    char shapeName[20];
    public:
    void setname(char n[20])
    {strcpy(shapeName,n);}
    char* getName()
    { return shapeName;}
};

class straightline:public shape
{
    coordinate c1;
    coordinate c2;
    public:
    straightline(){setname("straightline");}
    void setline (int x1,int y1,int x2, int y2)
    {
        c1.setcoordinate(x1,y1);
        c2.setcoordinate(x2,y2);
    }
    double getdistance()
    {
        cout<<c1.getx()<<c1.gety()<<c2.getx()<<c2.gety();
        return c1.getdistance(c2.getx(),c2.gety());
    }
    void showline();
};

void straightline::showline()
{
    int m,c;
    m=(c2.gety()-c1.gety())/(c2.getx()-c1.getx());
    c=c1.gety()-m*c1.getx();
    cout<<"y="<<m<<"x+"<<c;
}

class game 
{
    int eachroundscore[5];
    public:
    void setscore(int round ,int score)
    {
        eachroundscore[round]=score;
    }
    int getscore(int round)
    {return eachroundscore[round];}
};
class gameresult:public game
{
    int result[5];
    public:
    void setresult(int round ,int res)
    {
        result[round]=res;
        //cout<<result[round]<<endl;
    }
    int getresult(int round)
    {return result[round];}
};

class actor
{
    char name[20];
    int age;
    public:
    void setactor(char n[20],int a)
    {strcpy(name,n);age=a;}
    char* getname()
    {return name;}
    int getage()
    {return age;}
};
class TVactor:virtual public actor
{
    int no_of_tvshow;
    public:
    void no_of_show(int a)
    {no_of_tvshow=a;}
    int get_no_of_show()
    {return no_of_tvshow;}
};
class Movieactor:virtual public actor
{
    int no_of_movie;
    public:
    void set_no_of_movie(int no)
    {no_of_movie=no;}
    int get_no_of_movie()
    {return no_of_movie;}
};

class allscreenactor:public TVactor,public Movieactor
{
    public:
    void setActor(int tv,int mov,char name[20],int age)
    {
        no_of_show(tv);
        set_no_of_movie(mov);
        setactor(name,age);
    }
    void getactor()
    {
        cout<<get_no_of_show()<<endl<<get_no_of_movie()<<endl<<getname()<<endl<<getage();
    }
};
int main()
{   
    allscreenactor a;
    a.setActor(5,9,"john",40);
    a.getactor();
    
    return 0;
}