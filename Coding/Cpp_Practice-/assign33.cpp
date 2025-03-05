#include<iostream>
using namespace std;
#include<string.h>
class complex

{
    private:
    int a,b;
    public:
    void setdata(int x,int y) {a=x;b=y;}
    void showdata(){cout<<a<<"+i"<<b;}
    
    complex add (complex c2)
    {
        complex c3;
        c3.a=a+c2.a;
        c3.b=b+c2.b;
        return c3;
    }
    complex substract(complex c2)
    {
        complex c3;
        c3.a=abs(a-c2.a);
        c3.b=abs(b-c2.b);
        return c3;
    }
    complex multiply(complex c2)
    {
        complex c3;
        c3.a=(a*c2.a)-(b*c2.b);
        c3.b=(b*c2.a)+(a*c2.b);
        return c3;
    }
};
class Time
{
    private:
    int h,m,s;
    public:
    void setTime(int x,int y,int z){h=x;m=y;s=z;}
    void showTime(){cout<<h<<":"<<m<<":"<<s;}
    void normalize()
    {
        if(s>60)
        {
            m=m+s/60;
            s=s%60;
        }
        if(m>60)
        {
            h=h+m/60;
            m=m%60;
        }
        if(h>12)
        {
            h=h%12;
        }
    }
    Time add(Time t1)
    {
        Time t;
        t.h=h+t1.h;
        t.m=m+t1.m;
        t.s=s+t1.s;
        return t;
    }
    bool is_greater(Time t)
    {
        return (t.h>h ?true :false);
    }
};
class TestResult
{
    private:
    int roll_no,right,wrong,net_score;
    static int right_weight,wrong_weight;
    public:
    void setTest(int x,int y,int z)
    {
        roll_no=x;
        right=y;
        wrong=z;
    }
    void setnetTest()
    {
        net_score=(right*right_weight)+(wrong*wrong_weight);
    }
    void getTest()
    {
        cout<<"roll  no: "<<roll_no<<"\nwrong="<<wrong<<"\nright: "<<right<<"\nnet score:"<<net_score;
    }
    static void setweight(int x,int y)
    {
        right_weight=x;
        wrong_weight=y;
    }
};
int TestResult::right_weight;
int TestResult::wrong_weight;
void drive();
void drive()
{
    int i,x,y;
    TestResult T[5];
    TestResult::setweight(2,-1);
  for(i=0;i<5;i++)
  {
    cout<<"enter the right and wrong aswer of \n roll no="<<i+1;
    cout<<endl<<"right question\n";
    cin>>x;
    cout<<"wrong question\n";
    cin>>y;
    T[i].setTest(i+1,x,y);
    T[i].setnetTest();
  }
  cout<<"Result:\n";
    for(i=0;i<5;i++)
    T[i].getTest();
}
class Matrix
{
    private:
    int mat[3][3];
    public:
    void setmat()
    {
        for(int i=0;i<3;i++)
            for(int j=0;j<3;j++)
            cin>>mat[i][j];
        
    }
    void showmat()
    {
        for(int i=0;i<3;i++)
            {
                for(int j=0;j<3;j++)
                cout<<mat[i][j]<<" ";
                cout<<endl;
            }
    }
    Matrix add(Matrix m)
{
    Matrix b;
    for(int i=0;i<3;i++)
        for(int j=0;j<3;j++)
        b.mat[i][j]=mat[i][j]+m.mat[i][j];
        return b;
}
Matrix multiply(Matrix a)
{
    int sum=0,i,j,k;
    Matrix m;
       for(i=0;i<3;i++)
        for(j=0;j<3;j++)
              {  for(k=0;k<3;k++)
                    sum=sum+(a.mat[i][k]*mat[k][j]);
                    //cout<<a.mat[i][k]<<"  + "<<mat[k][j]<< "="<<sum <<endl<<endl;
                m.mat[i][j]=sum;
                sum=0;
                //cout<<m.mat[i][j]<<endl<<endl;
        }
       /*for(i=0;i<3;i++)
        {for(j=0;j<3;j++)
            {
                for(k=0;k<3;k++)
                sum=sum+a.mat[i][k]*mat[k][j];
                m.mat[i][j]=sum;
                sum=0;
            }
        }
        */    
        return m;
}
bool is_singular()
{
    int i,j,x=0,k,sum=0,s=0,m,sign=-1;
    for(i=0;i<3;i++)
        {
            m=-1;
            sign=-1*sign;
            for(j=0;j<3;j++)
            {
                if(j!=i)
                        {
                            k=0;
                            while(k==i || k==j)
                            k++;
                            sum=sum-m*mat[1][j]*mat[2][k];
                            //cout<<i<<" "<<j<<" "<<k<<endl<<endl;
                            //cout<<mat[1][j]<<"  "<< mat[2][k]<<endl;
                            m=1;
                     
                        }
            }
             s=m*sum*mat[0][i]*sign+s;
                   // cout<<"s=="<<s<<endl<<"m ="<<m<<endl;
                        sum=0;
        }            
        cout<<"s=="<<s<<endl;
            if(s==0)
        return true;
        return false;
}
Matrix transpose()
{
    Matrix m;
    int i,j,temp;
    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            m.mat[i][j]=mat[j][i];
    return m;
}
};
int main()
{
    Matrix m,m1,m3;
    cout<<"enter matrix 3*3 oder:\n";
    m.setmat();
    m.showmat();
    cout<<" enter 2nd matrix 3*3 order:\n";
    m1.setmat();
    m1.showmat();
    //cout<<"enter matrix 3*3 order";
    //m1.setmat();
    //m1.showmat();
    //m3=m.multiply(m1);
    //cout<<"multiply:\n";
    //m3.showmat();
    m3=m1.multiply(m);
    m3.showmat();
    return 0;
}