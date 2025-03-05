#include<iostream>
#include<queue>
using namespace std;

int main()
{
    queue <int > q;
    q.push( 70);
    q.push(90);
    q.push(20);
    q.pop();
    cout<<q.back();
    return 0;
}