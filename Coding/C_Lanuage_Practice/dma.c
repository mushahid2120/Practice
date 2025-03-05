#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<conio.h>
struct student 
{
    char name[20];
    int roll;
    char college[30];
};
struct team
{
    struct student s1;
    struct student s2;
};
struct student* input_student(int ,char [],char []);
struct team* input_team(struct student s1,struct student s2);
void display_student(struct student);
void display_team(struct team);
struct student* arr_student(int size);
struct team* arr_team(int size);
char* input_char_arr();
char* input_char_arr1();
void driver();
void f1();
void f2();
int* merge();
int main()
{   //char a[]="guddu",b[]=
/*struct team *t,*pt;
    struct student *s,*p;
    struct student s2={"guddu",2,"holy child"};
    s=input_student(1,"mushahid","dr bc roy");
    t=input_team(*s,s2);
    display_student(*s);
    display_team(*t);
    pt=arr_team(2);
    p=arr_student(2);
    driver();
    */
   char *p;
   p=input_char_arr1();
   printf("%s",p);
   free(p);
    return 0;

}
char* input_char_arr1()
{
    int i,size=1;
    char *p=NULL ,ch,*q=NULL;
    printf("enter text");
    p=(char*)malloc(size);
    p[0]='\0';
    while(1)
    {
        ch=getchar();
        q=(char*)malloc(size+1);
        for(i=0;i<size;i++)
        q[i]=p[i];
        q[i-1]=ch;
        q[i]='\0';
        if(q[i-1]=='\n')
        break;
        free(p);
        size++;
        p=(char*)malloc(size);
        strcpy(p,q);
        free(q);
    }
    return q;
}
char* input_char_arr()
{
    char *c;
    int size,i=0;
    c=(char*)malloc(sizeof(char));
    printf("enter string:\n");
    while(c[i-1]!=' ')
    {
        //scanf("%c",c+i);
        c[i]=getchar();
        i++;
        size++;
        c=(char*)realloc(c,size);
        c[i]='\0';

    }
    return c;
}
void driver()
{
    struct student s1={"rohit",1,"pharmacy"}
                ,s2={"guddu",2,"bc roy"}
                ,s3={"mushahid",3,"dgp"}
                ,s4={"raju",4,"it"}
                ,s5={"anil",5,"vit"}
                ,s6={"tiwari",6,"bit"};
struct team *t1,*t2,*t3;
t1=input_team(s1,s2);
t2=input_team(s3,s4);
t3=input_team(s5,s6);
display_team(*t1);
display_team(*t2);
display_team(*t3);
}
struct student* arr_student(int size)
{
    struct student *p;
    p=(struct student*)calloc(size,sizeof(struct student));
    return p;
}
struct team* arr_team(int size)
{
    struct team *p;
    p=(struct team*)calloc(size,sizeof(struct team));
    return p;
}
void display_student(struct student s)
{
    printf("%d    %s   %s",s.roll,s.name,s.college);
}
void display_team(struct team t)
{
    display_student(t.s1);
    display_student(t.s2);
}
struct team* input_team(struct student s1,struct student s2)
{
    struct team *t;
    t=(struct team*)malloc(sizeof(struct team));
    t->s1=s1;
    t->s2=s2;
    return t;
}
struct student* input_student(int roll, char name[],char college[])
{
    struct student *p;
    p=(struct student*)malloc(sizeof(struct student));
    p->roll=roll;
    strcpy((p->name),name);
    strcpy((p->college),college);
    return p;
}
int* merge()
{
    int a[5],b[5],*p,i,j=0;
    for(i=0;i<5;i++)
    scanf("%d",&a[i]);
    for(i=0;i<5;i++)
    scanf("%d",&b[i]);
    p=(int*)calloc(10,4);
    for(i=0;i<10;i++)
    {
        if(i<5)
        *(p+i)=a[i];
        else
        {
            *(p+i)=b[j];
            j++;
        }
    }
    return p;
}
void f2()
{
    int *p,n,i,sum=0;
    float avg;
    printf("enter size of array");
    scanf("%d",&n);
    p=(int*)malloc(n*sizeof(int));
    printf("enter the %d numbers",n);
    for(i=0;i<n;i++)
        {
            scanf("%d",(p+i));
            sum=sum+*(p+i);
        }
        avg=(float)sum/n;
        free(p);
        printf("%f",avg);
}
void f1()
{
    int *p,n,i,sum=0;
    float avg;
    printf("enter the size of array");
    scanf("%d",&n);
    p=(int*)calloc(n,4);
    for(i=0;i<n;i++)
        {
            scanf("%d",(p+i));
            sum=sum+*(p+i);
        }
        avg=(float)sum/n;
        printf("%f",avg);


}