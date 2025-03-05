#include<iostream>
#include<deque>
using namespace std;
int main()
{
    deque<int> d1={1,8,9,6,7,5,6,5};
    deque<int>::iterator it;
    for(it=d1.begin();it!=d1.end();it++)
        cout<<*it<<" ";
        d1.pop_back();

        cout<<endl;
        for(auto x:d1)
            cout<<x<<" ";
    return 0;
}