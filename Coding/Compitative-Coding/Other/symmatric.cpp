#include <iostream>
using namespace std;
int main() {
	int T;
	cin>>T;
	while(T--)
	{
		int N,M;
		cin>>N;
		string A[N];
		for (int i=0;i<N;i++)
        cin>>A[i];
		int i,j;
		for(i=0;i<N;i++){
			for(j=0;j<N;j++)
			{
                //cout<<A[i][j]<<" "<<A[i][N-j-1]<<endl;
                //cout<<A[i][j]<<" "<<A[N-i-1][j]<<endl;
				if((A[i][j]!=A[i][N-j-1]) || (A[i][j]!=A[N-i-1][j]))
					{cout<<"NO"<<endl;
						break;
						}
			}
			if(j!=N)
				break;
		}
        //cout<<i<<endl;
		if(i>=N/2)
			cout<<"YES"<<endl;
	}
}
/*
01110
01010
10001
01010
01110
*/