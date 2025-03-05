#include<iostream>
#include<list>
using namespace std;
 
 int main()
{
    list<int> l1={30,40,80,90,46,30,70};
    for(auto x:l1)
        cout<<x<<" ";
            cout<<endl;
        l1.push_back(99);
        l1.push_front(1);
         for(auto x:l1)
        cout<<x<<" ";

        l1.~list();
         for(auto x:l1)
        cout<<x<<" ";

    return 0;
}