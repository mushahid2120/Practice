#include<iostream>
#include<string>
#include<vector>
#include<map>
#include<stack>
using namespace std;

int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        string s;
        int i;
        cin>>s;
        map<char,int> m;
        stack <char> st;
        m['[']=3;m['{']=2;m['(']=1;
        m[']']=-3;m['}']=-2;m[')']=-1;
        for(i=0;i<s.size();i++)
    {
        if(m[s[i]]>0)
            {
                    st.push(s[i]);
            }
        else
        {
          
            if(!st.empty() && m[s[i]]+m[st.top()]==0)
            {
                st.pop();
            }
            else
                {
                    break;}
        }
    }
    if(!st.empty() || i==0)
        cout<<"NO"<<endl;
    else
     cout<<"YES"<<endl;
    }
    return 0;
    
}