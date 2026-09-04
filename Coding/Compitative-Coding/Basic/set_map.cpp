#include<iostream>
#include<map>
#include<set>
using namespace std;

int main()
{
    // map<string,int> stud_data;
    // int Q;
    // while(true)
    // {
        
    // cin>>Q;
    // if(Q==1)
    // {
    //     string x;
    //     int y;
    //     cin>>x;
    //     cin>>y;
    //     stud_data[x]=stud_data[x]+y;
    //     cout<<stud_data[x];
    // }
    // else if(Q==2)
    // {
    //     string x;
    //     cin>>x;
    //     stud_data.erase(x);
    // }
    // else if(Q==3)
    // {
    //     string x;
    //     cin>>x;
    //     if(stud_data.find(x)!=stud_data.end())
    //         cout<<x<<" "<<stud_data[x]<<endl;
    //     else
    //     cout<<"not found";
    // }
    // if(Q==0)
    //     break;
    // }
    
    // multiset<int,greater<int>> s;
    // int n,k,sum=0;
    // cin>>n>>k;
    // for(int i=0;i<n;i++)
    // {
    //     int x;
    //     cin>>x;
    //     s.emplace(x);
    // }
    // for(auto it=s.begin();it!=s.end();it++)
    // {
    //     cout<<*it<<" ";
    // }
    // for(int i=0;i<k;i++)
    // {
    //     sum=*s.begin()+sum;
    //     auto a=*s.begin();
    //     s.emplace(a/2);
    //    s.erase(s.find(a)); 
    // }
    
    // cout<<endl;
    // cout<<sum;
    
    // set<long long>s;
    // int y;
    

    // long long x;
    
    // while(true)
    // {
    //     cout<<"Enter the Option\n";
    //     cin>>y;
        
    //     cin>>x;
    // switch(y)
    // {
    //     case 1:{
    //         s.emplace(x);
    //         break;
    //     }
    //     case 2:{
    //         s.erase(s.find(x));
    //         break;
    //     }
    //     case 3: {
    //         if(s.find(x)!=s.end())
    //             cout<<"Yess"<<endl;
    //         else 
    //             cout<<"no"<<endl;
    //         break;
    //     }
    //     case 4: exit(0);
    // }
    // }   



	
	// int t,N,M;
	// cin>>t;
	// while(t--)
	// {map<long long,int> s;
	// 	cin>>N>>M;
	// 	for(int i=0;i<N;i++)
	// 	{
	// 		long long x;
	// 		cin>>x;
	// 		s[x]=1;
	// 	}
	// 	for(int i=0;i<M;i++)
	// 	{
	// 		long long x;
	// 		cin>>x;
	// 		if(s[x]==1)
	// 			cout<<"YES\n";
	// 		else
	// 			{
	// 				cout<<"NO\n";
	// 				s[x]=1;
	// 			}
	// 	}
    //     cout<<endl<<endl;
	// }



		// map<int,multiset<string>,greater<int>> mark_name;
		// int N;
		// cin>>N;
		// for(int i=0;i<N;i++)
		// {
		// 	int marks;
		// 	string name;
		// 	cin>>name>>marks;
		// 	mark_name[marks].emplace(name);
		// }
		// auto it=mark_name.begin();
		// for(;it!=mark_name.end();it++)
		// {
		// 	for(auto &value:it->second)
		// 		cout<<value<<" "<<it->first<<endl;
		// }
    

    

    return 0;
}