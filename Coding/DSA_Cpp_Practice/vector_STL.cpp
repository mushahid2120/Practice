#include<iostream>
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
        return s1.getsalary()>s2.getsalary();
    }
};


int main()
{
    vector<int>v1={12,30,40};
    vector<student>v2;
    vector<student>v3={*new student(6,"mushahid",5000.0),*new student(2,"Guddu",6000),*new student (3,"rohit",7000)};

        for(auto x:v3)
        x.showdata();

    
    cout<<endl<<endl;
        v3.push_back(*new student(10,"Raju",10000));
            for(auto x:v3)
        x.showdata();
    cout<<endl;
        student s(9,"AHMAD",6500);
        v3.emplace(v3.begin(),s);
            for(auto x:v3)
            x.showdata();
        v2.insert(v2.begin(),v3.begin(),v3.begin()+3);
        for(auto x:v2)
        x.showdata();

        cout<<endl;
        v2.pop_back();
        for(auto x:v2)
        x.showdata();

            cout<<endl;
            cout<<v2.capacity();
            v2.shrink_to_fit();
            cout<<endl<<v2.capacity();
    return 0;
}