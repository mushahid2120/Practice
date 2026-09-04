#include<bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    char c;
    int T,N;
    int num=0;
    cin>>T;
    while (T--)
    {
        cin>>N;
        cin.ignore();
        cin>>s;
        for(int i=N;i>=0;i--)
            if(s[i-1]=='1')
                num=pow(2,N-i)+num;
        cout<<s<<" "<<num<<endl;
        num=0;
    }
    
    return 0;
}