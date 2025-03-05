#include<iostream>
using namespace std;
int main()
{
    int a[3][3]={{1,4,7},{2,5,8},{3,6,9}},b[3][3]={{2,4,6},{3,5,7},{8,9,1}},c[3][3],n=3;
    int sum=0,i,j,k;
    /*cout<<" enter a matrix 3*3:/n";
    for(i=0;i<3;i++)
    for(j=0;j<3;j++)
    cin>>a[i][j];
    cout<<"enter a matrix 3*3: /n";
    for(i=0;i<3;i++)
    for(j=0;j<3;j++)
    cin>>b[i][j];
    */
    for(i=0;i<n;i++)
        {for(j=0;j<n;j++)
            {               
                for(k=0;k<n;k++)
                sum=sum+a[i][k]*b[k][j];
                c[i][j]=sum;
                sum=0;
            }
        }
for(i=0;i<3;i++)
{
    for(j=0;j<3;j++)
    cout<<c[i][j]<<' ';
    cout<<endl;
}
    return 0;
}