#include<stdio.h>
void product(int [3][3],int [3][3],int [3][3],int);
void sum(int [3][3],int [3][3],int [3][3],int);
void transpose(int a[3][3],int);
void update(int score[4][4],int );
int score_player(int score[][4],int );
char winner(int score[][4]);
void rank(int score[][4],int );
void sort(int [],int);
int main()
{
    int i,j;
    char a[4][4]={0};
        /*printf("enter the array of B : \n");
        for(i=0;i<3;i++)
            for(j=0;j<3;j++)
                scanf("%d",&b[i][j]);
*/
for(i=0;i<4;i++)
           { for(j=0;j<4;j++)
                printf("%d ",a[i][j]);
                printf("\n");
           }
          update(a,4);
          rank(a,4);
for(i=0;i<4;i++)
            {for(j=0;j<4;j++)
                printf("%d ",a[i][j]);
                printf("\n");
            }
        
    return 0;
}
void rank(int score[][4],int n)
{
    int i,j;
    int score_player[4],temp[4];
    for(i=0;i<4;i++)
        score_player[i]=score[i][i]=temp[i];
        sort(score_player,4);
        for(i=3;i>=0;i--)
            for(j=0;j<4;j++)
                {
                    if(temp[j]==score_player[i])
                 printf(" \n %d=%c\n",4-i,97+j);
                }
}
void sort(int a[],int n)
{
    int i,j,temp;
    for(i=1;i<n;i++)
        for(j=0;j<n-i;j++)
        {
            if(a[j]>a[j+1])
            {
                temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
            }
        }
}
char winner(int score[][4])
{
    
    int m;
    char i,j,big=score[0][0];
    for(i=0;i<4;i++)
            if(big<score[i][i])
            {
            big=score[i][i];
            m=i;
            }
            return 97+m;
}
int score_player(int score[4][4],int n)
{
    return score[n][n];
}
void update(int score[4][4],int n)
{
    char x,y,i,j;
    int m;
    printf("enter Match between:\n A,B,C,D");
    scanf("%c %c",&x,&y);
    fflush(stdin);
    printf("1.draw or 2.wins");
    scanf("%d",&m);
    if(m==1)
    {
        score[x-97][y-97]=score[x-97][y-97]+m;
        score[y-97][x-97]=score[y-97][x-97]+m;
        score[y-97][y-97]=score[y-97][y-97]+m;
        score[x-97][x-97]=score[x-97][x-97]+m;
    }
    else
        {
            printf("enter who wins %c or %c\n",x,y);
            fflush(stdin);
            scanf("%c",&i);
            if(x==i)
                j=y;
                else
                    j=x;
                    printf("i=%d j=%d x=%d y=%d m=%d",i,j,x,y,m);
                score[i-97][j-97]=score[i-97][j-97]+2;
                score[i-97][i-97]=score[i-97][i-97]+2;

        }
}
void transpose(int a[3][3],int n)
{
    int i,j,temp;
for(i=0;i<3;i++)
            for(j=i;j<3;j++)
            {
                temp=a[i][j];
                a[i][j]=a[j][i];
                a[j][i]=temp;
            }
}
void sum(int a[3][3],int b[3][3],int c[3][3],int n)
{
    int i,j,k;
    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
        c[i][j]=a[i][j]+b[i][j];
}

void product(int a[3][3],int b[3][3],int c[3][3],int n)
{
    int sum=0,i,j,k;
    for(i=0;i<n;i++)
        {for(j=0;j<n;j++)
            {
                for(k=0;k<n;k++)
                sum=sum+a[i][k]*b[k][j];
                c[i][j]=sum;
                sum=0;
            }
        }
}