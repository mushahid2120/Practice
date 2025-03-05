
#include <iostream>
#include<vector>
using namespace std;
int main() {
	
	int T,k=1,cg,cp,n,sum=0;
	cin>>T;
	while(T--)
	{
		
		cin>>cg>>cp;
		cin>>n;
		sum=0;
		if(k==0)
			cg=cg+cp-(cp=cg);

		int A[n][2];

		for(int i=0;i<n;i++)
				{cin>>A[i][0]>>A[i][1];
					sum+=A[i][0]*cg+A[i][1]*cp;
					}
		cout<<sum<<endl;
		k=1-k;
	}
}