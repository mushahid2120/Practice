#include<stdio.h>
#include<string.h>
void input(char [][20],int );
void output(char a[][20], int );
void find_vowel(char [][20],int );
void sort_string(char [][20],int);
void swap(char [],char []);
void ending_s(char [][20],char [][20],int);
void find_duplicate(char [][20],int );
char most_repeat(char [][20],int);
void start_a(char [][20],char [][20],int );
int find_gmail(char [][20],int );
int anagram(char [][20],int);
int count_char(char ,char a[20]);
void eachword(char []);
int count_word(char []);
void each_word(char []);
int main()
{
    char str[2][20],str1[4][20],a[20];
  //input(str,2);
    fgets(a,20,stdin);
    each_word(a);
    
    return 0;
}
void each_word(char a[])
{
    int i,j,k,word;
    word=count_word(a);
    //printf("%d",word);
    char s[word][20];
    for(i=0,j=0,k=0;a[i];i++,k++)
    {
        if(a[i]!=' ')
        s[j][k]=a[i];
        else
        {
            s[j][k]='\0';
            j++;
            k=-1;

        }
    }
    s[j][k]='\0';
    for(i=0;i<word;i++)
        puts(s[i]);
}
int count_word(char a[])
{
    int i,m=1,count=0;
    for(i=0;a[i];i++)
    {
        if(a[i]==' ')
            m=1;
        else
        if((a[i]<='z' && a[i]>='a') || (a[i]<='Z' && a[i]>='A'))
        if(m==1)
            {count++;
                m=m-1;
            }
    }
    return count;
}
void eachword(char a[])
{
    int i,j;

    char c[strlen(a)-1][2];
    for(i=0;a[i];i++)
    {
        c[i][0]=a[i];
        c[i][1]='\0';
    }
    for(i=0;i<strlen(a);i++)
    {
        for(j=0;c[i][j];j++)
        printf("%c",c[i][j]);
        printf("\n");
    }
    }
int anagram(char a[][20],int n)
{
    int i,count1,count2;
    for(i=0;a[0][i];i++)
    {
        count1=count_char(a[0][i],&a[0][0]);
        count2=count_char(a[0][i],&a[1][0]);
        if(count1!=count2)
        break;
    }
    if(!a[0][i])
    return 1;
    return 0;
}
int count_char(char ch,char a[20])
{
    int i,count=0;
    for(i=0;a[i];i++)
    {
        if(ch==a[i])
            count++;
    }
    return count;
}
int find_gmail(char a[][20],int n )
{
    int i,j,k=0,count=0;
    char gmail[20]="gmail.com";
    for(i=0;i<n;i++)
        for(j=0;a[i][j];j++)
           { while((a[i][j+k]==gmail[k]) && gmail[k] )
                {k++;
                //printf("%c  %c  %d  %d\n\n",a[i][j],gmail[k],count,k);
                }
            if(gmail[k])
                k=0;
            else
            {
                count++;
                k=0;
            }
           }
           return count;
}
void start_a(char a[][20],char b[][20],int n)

    {
    int i,k;
    for(i=0,k=0;i<n;i++)
        if(a[i][0]=='a')
        {
            strcpy(&b[k][0],&a[i][0]);
            k++;
        }
}

char most_repeat(char a[][20],int n)
{
    int i,j,k,l,count=0,big=0;
    char ch;
    for(i=0;i<n;i++)
        for(j=0;a[i][j];j++)
           { for(k=i;k<n;k++)
                for(l=0;a[k][l];l++)
                {
                    if(a[i][j]==a[k][l])
                        count++;

                }
                if(count>big)
                    {big=count;
                    ch=a[i][j];
                    }
                    count=0;
           }
           return ch;

}
void find_duplicate(char a[][20],int n)
{
    int i,j;
    for(i=0;i<n;i++)
    for(j=i+1;j<n;j++)
        if(strcmp(&a[i][0],&a[j][0])==0)
            {if(a[j][0]=='\0')
                continue;
                a[j][0]='\0';
            }
}
void ending_s(char a[][20],char b[][20],int n)
{
    int i,k;
    for(i=0,k=0;i<n;i++)
        if(a[i][strlen(&a[i][0])-1]=='s')
        {
            strcpy(&b[k][0],&a[i][0]);
            k++;
        }
}
void sort_string(char a[][20],int n)
{
    int i,j;
    for(i=0;i<n;i++)
        for(j=i;j<n;j++)
        if(strcmp(&a[i][0],&a[j][0])==1)
            swap(a[i],a[j]);
}
void swap(char a[],char b[])
{
    int i,j,l,s;
    char temp;
    if(strlen(&a[0])>strlen(&b[0]))
        {
        l=strlen(&a[0]);
        s=strlen(&b[0]);
        }
    else
            {
            l=strlen(&b[0]);
            s=strlen(&a[0]);
            }
    for(i=0;i<l;i++)
        if(i>=s)
            {
                if(l==strlen(&a[0]))
                        {
                        b[i]=a[i];
                        a[i]='\0';
                    }
                    else
                    {
                        a[i]=b[i];
                        b[i]='\0';
                    }
                    }
                    else
                        {    temp=a[i];
                            a[i]=b[i];
                            b[i]=temp;
                        }
            }
void input(char a[][20],int n)
{
    int i,j;
    for(i=0;i<n;i++)
        {fgets(&a[i][0],20,stdin);
        a[i][strlen(&a[i][0])-1]='\0';
        }

}
void output(char a[][20], int n)
{
    int i;
    for(i=0;i<n;i++)
        puts(&a[i][0]);
}
void find_vowel(char a[][20],int n)
{
    int i,j,k,count=0;
    char vowel[20]="aeiouAEIOU";
    for(i=0;i<n;i++)
        {for(j=0;a[i][j];j++)
            {
                while(vowel[k])
                    {if(vowel[k]==a[i][j])
                        {
                            count++;
                            break;
                        }
                        k++;
                    }
                    k=0;

            }
        printf("Number of vowel in String %d is %d\n",i+1,count);
        count=0;
        }
}