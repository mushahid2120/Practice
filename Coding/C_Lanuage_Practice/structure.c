#include<stdio.h>
#include<stdlib.h>
#include<string.h>
struct employee
{
    int id;
    char name[20];
    float salary;
};

struct student
{
    int roll_no;
    char name[20];
    float marks;
};
struct time 
{
    int hr;
    int min;
    int sec;
};
struct marks
{
    int roll;
    char name[20];
    int chem_marks;
    int maths_marks;
    int phy_marks;
};
struct student inputl(struct student e);
void displayl(struct student e);
int find_highest_salary(struct employee e[],int n);
void salary(struct employee [],int);
void swap(struct employee [],int );
struct time differ_time(struct time t1,struct time t2);
void percentage();
struct marks input_marks(struct marks);
int main()
{
    percentage();
    /*int i;
    for(i=0;i<5;i++)
    s[i]=inputl(s[i]);
    for(i=0;i<5;i++)
    displayl(s[i]);
    */
    return 0;
}
void percentage()
{
    struct marks s[5];
    float per;
    int i,sum=0;
    for(i=0;i<5;i++)
    {
        printf("enter detail of %d student",i+1);
        s[i]=input_marks(s[i]);
        sum=s[i].chem_marks+s[i].maths_marks+s[i].phy_marks+sum;
        per=sum/3.0;
        printf("name =%s \n roll =%d \n %0.2f%%",s[i].name,s[i].roll,per);
        sum=0;
    }

}
struct marks input_marks(struct marks s)
{
    printf("enter roll : ");
    scanf("%d",&s.roll);
    fflush(stdin);
    printf("enter name");
    fgets(s.name,20,stdin);
    s.name[strlen(s.name)-1]='\0';
    printf("enter the marks of chemistry maths physics");
    scanf("%d%d%d",&s.chem_marks,&s.maths_marks,&s.phy_marks);
    return s;
}
struct time differ_time(struct time t1,struct time t2)
{
    struct time temp;
    int sec=abs((t1.hr*3600+t1.min*60+t1.sec)-(t2.hr*3600+t2.min*60+t2.sec));
    temp.hr=sec/3600;
    sec=sec%3600;
    temp.min=sec/60;
    temp.sec=sec%60;
    return temp;
}
void swap(struct employee e[],int n)
{
    int i,j;
    char temp[20];
    for(i=0;i<n;i++)
        for(j=i;j<n;j++)
        {
            if(strcmp(e[i].name,e[j].name)==1)
            {
                strcpy(temp,e[j].name);
                strcpy(e[j].name,e[i].name);
                strcpy(e[i].name,temp);
            }
        }
}
void salary(struct employee e[],int n)
{
    int i,j;
    struct employee temp;
    for(i=0;i<n;i++)
        for(j=0;j<n;j++)
            {
                
                if(e[i].salary>e[j].salary)
                {
                    temp=e[j];
                    e[j]=e[i];
                    e[i]=temp;
                }
            }
}
int find_highest_salary(struct employee e[],int n)
{
    int i,k,big=e[0].salary;
    for(i=0;i<n;i++)
        if(big<e[i].salary)
            {
                big=e[i].salary;
                k=e[i].id;
                printf("%d\n",k);
            }
            return k;
}
struct student inputl(struct student e)
{
    printf("roll no");
    scanf("%d",&e.roll_no);
    fflush(stdin);
    printf("enter name");
    fgets(e.name,20,stdin);
    e.name[strlen(e.name)-1]='\0';
    printf("enter marks");
    scanf("%f",&e.marks);
    return e;
}
void displayl(struct student e)
{
    printf("%d  %s   %f",e.roll_no,e.name,e.marks);
}

