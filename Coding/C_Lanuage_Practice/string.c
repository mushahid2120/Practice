#include<stdio.h>
#include<stdlib.h>
#include<string.h>
int counting_vowel(char a[]);
int lens(char str[]);
void occurance(char a[]);
void convert_upper(char a[]);
void revstring(char a[]);
void count(char a[]);
void copy(char [],char []);
int palindrome(char []);
void trim_string(char []);
int count_word(char []);
int com_insenitive(char [], char []);
void frequency(char []);
int search_word(char [],char[]);
void first_capital(char []);
void concatinate(char [],char []);
void count_digalpha(char []);
void acronym(char []);
void acronym1(char []);
void sort(int a[],int n);
void reverse_word(char []);
void reverse_word(char a[])
{
    int i,j=0,k=0,l=strlen(a)-1,m,p=0,q=0,y=0;
    char b[20],c[20];
    printf("%d",l);
    for(i=0;i<=l;i++)
    {
        if(a[i]!=' ')
        {
            b[j]=a[i];
            j++;
            printf(" l== %d  %d == %c\n\n",l,i,a[i]);
           // printf("hello\n\n");
        }
        else
        {
            b[j]='\0';
            printf("%s hello\n\n",b);
            while(a[l]!=' ')
            {
                c[k]=a[l];
                c[k+1]=a[l];
                k++;
                l--;
              //printf("hello2\n\n");
            }
            c[k]='\0';
            printf("%s\n\n",c);
            m=l;
        }
        if(a[i]==' ' && a[l]==' ')
        {
            printf("hello3\n\n");
            while(m<=l && m>=i)
            {
                a[m+k-j]=a[m];
                printf("%d===%c   %d\n\n",m+k-j,a[m],m);
                m--;
            }
            q=l=k-j+l-1;
            for(k=strlen(c)-1,p=y;k>=0;k--)
            {
                a[p]=c[k];
                printf("p=%d==%c\n\n",p,a[p]);
                p++;
            }
            for(j=0;b[j];j++)
            {
                a[q+2]=b[j];
                printf("q=%d %c==\n\n",q+2,a[q+2]);
                q++;
            }
            y=y+strlen(c)+1;
            i=y-1;
            printf( "l=======%d\n\n\n i==%d",l,i);
            k=0;
            j=0;
            
        }
        if(i==l)
        break;
    }
}
int main()
{
    int i;
    char str[40],str1[40];
    printf("enter the string \n");
    fgets(str,40,stdin);
    str[strlen(str)-1]=str[strlen(str)];
    reverse_word(str);
    printf("%s",str);
    return 0;

}
void acronym1(char a[])
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
    for(i=0,j=0;j<word-1;j++)
    {
        if(s[j][0]>='a' && s[j][0]<='z')
        a[i]=s[j][0]-32;
        else 
        a[i]=s[j][0];
        i++;
        a[i]=' ';
        i++;
    }
    for(k=0;s[j][k];i++,k++)
    {
        a[i]=s[j][k];
    }
    a[i]='\0';
}
void rank(int score[][4],int n)
{
    int i;
    int score_player[4];
    for(i=0;i<4;i++)
        score_player[i]=score[i][i];
        sort(score_player,4);
        for(i=0;i<4;i++)
        printf("Rank\n %d=%d",i+1,score_player[i]);
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
void acronym(char a[])
{
    int i,k=0,m=1;
    trim_string(a);
    for(i=0;a[i];i++)
    {
        if(a[i]==' ')
        {
            while(a[i+k])
            {
                a[k+m]=a[i+k];
                k++;
            }
            a[k+m]='\0';
            m=m+2;
            i=m;
            k=0;
        }
        
    }
}
void count_digalpha(char a[])
{
    int i,digit=0,alpha=0,special=0;
    for(i=0;i<a[i];i++)
    {
        switch(a[i])
        {
            case 'a' ... 'z':
            case 'A' ... 'Z':
            alpha++;
            break;
            case '0' ... '9':
            digit++;
            break;
            default :
            special++;
        }}
        printf("%d%d%d",alpha,digit,special);
}
void concatinate(char a[],char b[])
{
    int i,j;
    for(i=strlen(a),j=0;b[j];i++,j++)
    a[i]=b[j];
}
void first_capital(char a[])
{
    int i,m=1;
    for(i=0;a[i];i++)
    {
        if(a[i]<='z' && a[i]>='a')
           { if(m==1)
                {a[i]=a[i]-32;
                m++;
                }
           }
        else 
        if(a[i]==' ')
            m=1;
    }

    }

int search_word(char a[],char word[])
{
    int i,j,countl=0;
    for(i=0,j=0;a[i];i++)
    {
        if(a[i]==word[j])
        countl++;
        else
        {if(countl!=strlen(word)-1 )
            countl=0; 
         j=0;
        }j++;
    }
    if(countl>=strlen(word)-1);
        return 1;
        return 0;
}
void frequency(char a[])
{
    int i,j,k,count=1;
    for(i=0;a[i];i++)
        {for(j=i+1;a[j];j++)
            if(a[i]==a[j])
            {
                for(k=j;a[k];k++)
                    a[k]=a[k+1];
                count++;
            }
        printf("%c=%d\n",a[i],count);
        count=1;
        }    
}
int com_insenitive(char a[], char b[])
{
    int i;
    convert_upper(a);
    convert_upper(b);
    for(i=0;a[i];i++)
        {if(a[i]>b[i])
            return -1;
        else
        if(a[i]>b[i])
            return 1;
        }
        return 0;
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
void trim_string(char a[])
{
    int m,i=0,j=0,l;
    printf("%d",strlen(a));
    l=strlen(a);
    while(a[l-1]==' ')
        l--;
        while(a[i]==' ')
        i++;
    for(j=0;j<l-3;j++)
    a[j]=a[j+i];
    a[l-i]='\0';

}
int palindrome(char a[])
{
    int i,x,m;
    if(strlen(a)%2)
        x=strlen(a);
    else 
    x=strlen(a)-1;
    
    for(i=0;i<=x/2;i++)
            if(a[i]!=a[strlen(a)-i-2])
                    break;
                    printf("%d",i);
        if(i==x/2+1)
        return 1;
        return 0;
}
void copy(char a[],char b[])
{
    int i;
    for(i=0;a[i];i++)
        b[i]=a[i];

}
void count(char a[])
{
    int i,alpha=0,digit=0,special=0;
    for(i=0;a[i];i++)
            {if(a[i]<=122 && a[i]>=97 || a[i]>=67 && a[i]<=90)
                alpha++;
            if(a[i]<='9' && a[i]>='0')
                digit++;
            else
            special++;
            }
    printf("%d%d%d",alpha,digit,special);
}
void revstring(char a[])
{
    int i,n;
    char temp;
    n=strlen(a)-1;
    for(i=0;i<=n/2;i++)
        {
            temp=a[i];
            a[i]=a[n-i];
            a[n-i]=temp;
            printf(" %c ",temp);
        }
        printf("%d",n);
        printf("%s",a);
}
void convert_upper(char a[])
{
    int i;
    for(i=0;a[i];i++)
        if(a[i]<=122 && a[i]>=97)
            a[i]=a[i]-32;
}
int counting_vowel(char a[])
{
    int i,count=0;
    for(i=0;i<a[i];i++)
            if(a[i]==' ')
                count++;
        return count;
            }
void occurance(char a[])
{
    int count=0,i;
    char ch;
    printf("enter a chater want  to: ");scanf("%c",&ch);
    for(i=0;a[i];i++)
        if(a[i]==ch)
            count++;
    printf("%d",count);
}
int lens(char str[])
{
    int i;
    for(i=0;str[i];i++);
    str[i-1]=str[i];
    for(i=0;str[i];i++);
    return i;
}