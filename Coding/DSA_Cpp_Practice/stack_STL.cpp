#include<iostream>
#include<stack>

using namespace std;

int main()
{
    stack<int> s;
    s.push(12);
    s.push(60);
    s.push(90);
     s.pop();
     cout<<s.top();
    return 0;
}