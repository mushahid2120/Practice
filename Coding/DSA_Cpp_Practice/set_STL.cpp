#include<iostream>
#include<unordered_set>
#include<unordered_map>
using namespace std;
int main()
{
    unordered_multiset<int>s1={40,30,10,5,90};
    for(auto x:s1)
    cout<<x<<" ";

    unordered_map <int,string> s2={{1,"Mushahid"},{2,"Guddu"}};
    for(auto x:s2)
        cout<<x.first<<" "<<x.second<<" ";

    return 0;
}