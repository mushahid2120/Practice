#include<iostream>
using namespace std;
int main()
{
    int i,j,x,y,R=3,C=2;
    i=j=x=y=0;
    int sumR=0,sumC=0,A[R][C];
    for (int i=0;i<R;i++)
    for(int j=0;j<C;j++)
    cin>>A[i][j];
    while(i<R || x<C)
    {
        while(j<C || y<R)
        {
            if (i<R && j<C)
            {
                sumR+=A[i][j];
                j++;
            }
            if(x<C && y<R)
            {
                sumC+=A[y][x];
                y++;
            }
            cout<<"hello";
        }
        cout<<sumR<<" "<<sumC<<endl;
        if(i>=min(R,C)-1)
            break;
        sumR=sumC=j=y=0;
        i++;
        x++;
    }
}