#include<iostream>
#include<queue>
#include<vector>
using namespace std;

class student
{
    int roll;
    string name;
    float salary;
    public:
    float getsalary(){return salary;}
    student(int r,string n,float s):roll(r),name(n),salary(s){}
    void showdata(){cout<<roll<<"  "<<name<<" "<<salary<<endl;}
};

class comparesroll
{
    public:
    bool operator()(student s1,student s2) const
    {
        return s1.getsalary()<s2.getsalary();
    }
};

int main()
{
    priority_queue<student,vector<student>,comparesroll>pq;
    pq.push(*new student(6,"mushahid",5000.0));
    pq.push(*new student (3,"rohit",7000));
    pq.push(*new student(2,"Guddu",6000));
    
        student s(10,"hi",9000);
            s=pq.top();
            s.showdata();
    return 0;
}