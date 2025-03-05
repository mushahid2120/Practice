#include<iostream>
#include<utility>
#include<tuple>
using namespace std;
int main()
{
    pair<string,int> p1("Mushahid",600),p2;
    p2=make_pair("Guddu",300);
    cout<<p2.first<<" "<<p2.second<<endl;

    tuple<int,int ,string,float> t={50,60,"Samsung",35.15};
    cout<<get<0>(t)<<" "<<get<1>(t)<<" "<<get<2>(t)<<endl;
    return 0;
}