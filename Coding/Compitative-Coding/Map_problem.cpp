//{ Driver Code Starts
#include <bits/stdc++.h>
using namespace std;

// } Driver Code Ends

class Solution
{
    public:
        int countWords(string list[], int n)
        {
            
            map<string,int> name_count;
           for(int i=0;i<n;i++)
                name_count[list[i]]++;
            int ct=0;
            for (auto &key:name_count)
            {
                cout<<key.first<<" "<<key.second<<endl;
                if(key.second>=2)
                    ct++;
            }
            return ct;

        }

};

//{ Driver Code Starts.
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n;
        cin>>n;
        string list[n];
        for(int i=0;i<n;i++)
            cin>>list[i];
        Solution ob;    
        cout <<ob.countWords(list, n)<<endl;
    }
    return 0;
}

// } Driver Code Ends