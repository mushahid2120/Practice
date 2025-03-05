#include<iostream>
#include<forward_list>
using namespace std;
int main()
{
    forward_list<string> s;
    s.push_front("Mushahid");
    for(auto x:s)
        cout<<x;
        s.push_front("Guddu");
        for(auto x:s)
        cout<<x<<" ";

        s.clear();
        for(auto x:s)
        cout<<x<<" ";
    return 0;
}