#include <iostream>
#include<algorithm>
using namespace std;
int main(){
	int T;
    cin>>T;
	while(T--)
	{
		int N,k;
		cin>>N>>k;
		int A[N];
		for(int i=0;i<N;i++)
		cin>>A[i];
		sort(A,A+N);
        //or(int i=0;i<N;i++)
        //cout<<A[i];
		if(A[0]<k)
		cout<<k-A[0];
		else
		cout<<0;
	}
}
