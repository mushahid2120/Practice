#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void swap(int*,int*);
void print(char*, int);
void input(char*,int );
void inputp(int**,int [],int );
void display(int*,int );
void search_all_occurrances(char*,char,int*);
void uppercase(char *str);
void lowercase(char *str);
void extract_string(char*, int,int,char*);
void swap_string(char*,char*);
void sort_array(int*,int);
void merge(int*,int,int*,int ,int*);
int highest_mark(int**,int ,int []);
void first_digit_sort(int*,int);
void first_sort(int*,int);
int main()
{
    /*int arr[3],b[2],c[3],size[3];
    int *p[3];
    p[0]=arr;
    p[1]=b;
    p[2]=c;
    size[0]=3;
    size[1]=2;
    size[2]=3;
    inputp(p,size,3);
    
    printf("%d",highest_mark(p,3,size));
    */
   int a[10],i;
   for(i=0;i<10;i++)
    scanf("%d",&a[i]);
    first_sort(a,10);
    
for(i=0;i<10;i++)
    printf("%d",a[i]);

    /*p=a;
    for(int i=0;i<5;i++)
    {   
        printf("enter 4 numbers");
        for(int j=0;j<4;j++)
        scanf("%d",(*(p+i)+j));
    }
    for(int i=0;i<5;i++)
    for(int j=0;j<4;j++)
    printf("%d ",*(*(p+i)+j));
*/
//printf("enter string");
/*printf("enter 1st name\n");
    fgets(str,20,stdin);
    str[strlen(str)-1]='\0';
    printf("enter 2nd name\n");
    fgets(str1,20,stdin);
    str1[strlen(str1)-1]='\0';
    //printf("enter starting and ending index");
    //scanf("%d%d",&x,&y);
    swap_string(str,str1);
printf("1st name is :");
    puts(str);
printf("2nd name is : \n");
    puts(str1);
*/
    return 0;
}
void first_sort(int *a,int n)
{
    int right,left,loc=0,t;
    right=n-1;
    left=0;
    while(left<right)
    {
        while(left<right && a[loc]<=a[right])
        right--;
        if(left==right)
        break;
        t=a[loc];
        a[loc]=a[right];
        a[right]=t;
        loc=right;
        while(left<right && a[left]< a[loc])
        left++;
        if(left==right)
        break;
        t=a[left];
        a[left]=a[loc];
        a[loc]=t;
        loc=left;
    
    }

}
void first_digit_sort(int *p, int n)
{
    int i,k=0,j,temp,m;
    for(i=0;i<n;i++)
    {   
        if(*(p+k)>*(p+i))
        {temp=*(p+i);
        for(j=i;j>k;j--)
        *(p+j)=*(p+j-1);
        *(p+j)=temp;
        k++;
        }

    }
}
int highest_mark(int **q,int size,int sizel[])
{
    int i,j,highest_marks;
    for(i=0;i<size;i++)
        for(j=0;j<sizel[i];j++)
            if(highest_marks<*(*(q+i)+j))
                highest_marks=*(*(q+i)+j);
                return highest_marks;
}
void merge(int *arr1,int size1,int *arr2,int size2, int *arr3)
{
    int i,j=0,m;
    m=size1+size2;
    for(i=0;i<m-1;i++)
    {
        if(i<size1)
            *(arr3+i)=*(arr1+i);
        else
        {
            *(arr3+i)=*(arr2+j);
            j++;
        }
    }
}
void sort_array(int *p,int size)
{
    int i,j,temp;
    for(i=size;i>=0;i--)
    {
        for(j=0;j<size;j++)
            if(*(p+j)>*(p+j+1))
            {
                temp=*(p+j+1);
                *(p+j+1)=*(p+j);
                *(p+j)=temp;
            }
    }
}
void swap_string(char *str1,char *str2)
{
    int i,l;
    char temp;
    if(strlen(str1)>strlen(str2))
        l=strlen(str1);
        else
        l=strlen(str2);
        for(i=0;i<=l;i++)
        {
            temp=*(str1+i);
            *(str1+i)=*(str2+i);
            *(str2+i)=temp;
        }
    
}
void extract_string(char *str,int start_index,int end_index,char *result)
{
    int i,j=0;
    for(i=start_index;i<end_index;i++)
    {
        //printf("%c\n\n",*(str+i));
        *(result+j)=*(str+i);
        j++;
    }
    *(result+j)='\0';
}
void uppercase(char *str)
{
    int i;
    for(i=0;*(str+i);i++)
    {
        //printf("%c",str[i]=str[i]-32);
        if(*(str+i)>='a' && *(str+i)<='z')
        *(str+i)=*(str+i)-32;
    }
}
void lowercase(char *str)
{
    int i;
    for(i=0;*(str+i);i++)
    if(*(str+i)>='A' && *(str+i)<='Z')
    *(str+i)=*(str+i)+32;
}
void search_all_occurrances(char *str,char ch, int *arr)
{
    int i,j=0;
    printf("%c",*(str));
    for(i=0;*(str+i)!=0;i++)
        {  
            //printf("i=%d   %c  %c\n\n",i,*(str+i),ch);
            if((*(str+i))==ch)
            {
                *(arr+j)=i;
                printf("hello ");
                j++;
            }
        }
}
void display(int *q,int k)
{
    int i;
    for(i=0;i<k;i++)
        printf("%d",*(q+i));
}
void inputp(int **q,int size[],int n)
{
    int i,j;
    for(i=0;i<n;i++)
    {   printf("enter %d number",size[i]);
        for(j=0;j<size[i];j++)
                  scanf("%d",*(q+i)+j);
    }
}
void print(char *p,int size)
{
    int i;
    for(i=0;*p;i++)
        printf("%c",*p++);

}
void input(char *p,int size)
{
    fgets(p,size,stdin);
}
void swap(int *p,int *q)
{
    int temp;
    temp=*q;
    *q=*p;
    *p=temp;
}