#include<stdio.h>
#include<stdlib.h>
int LCM(int, int);
int prime(int);
int next_prime(int);
void nprime(int);
void printprime(int,int);
int main()
{
    int x,y;
    printf(" enter  number ");
    scanf("%d%d",&x,&y);
    printprime(x,y);
    return 0;
}
void printprime(int x,int y)
{
    int i;
    for(i=x;i<=y;i++)
    if(prime(i))
        printf("%d",i);
}
void nprime (int n)
{
    int x=1;
    while(n)
    {
        x=next_prime(x);
        printf("%d",x);
        n--;

    }
}
int next_prime(int x)
{
    while(!prime(++x));
    return x;
}
int prime(int x)
{
    int i;
    for(i=2;i<=x/2;i++)
        if(x%i==0)
            break;
    if(i==x/2+1)
        return 1;
        return 0;
}

int LCM(int x,int y)
{
    int z;
    for(z=x>y ?y:x;z>=1;z--)
        if(x%z==0 && y%z==0)
            break;
    return z;
}
