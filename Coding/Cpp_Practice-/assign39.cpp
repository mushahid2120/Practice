#include<iostream>
#include<fstream>
#include<string.h>
using namespace std;

void writing(char c[20])
{
    ofstream fout;
    fout.open("file.txt",ios::out);
    fout<<c;
    fout.close();
}

void reading()
{
    char ch;
    ifstream fin;
    fin.open("file.txt",ios::in);
    if(!fin)
    cout<<"file not exist";
    else
    {
        ch=fin.get();//file se data variable me jayega
        while(!fin.eof())
        {
            cout<<ch;
            ch=fin.get();
        }
    }
    fin.close();
}

void append(char c[20])
{
    ofstream fout;
    fout.open("file.txt",ios::out);
    fout<<" "<<c;
    fout.close();
}

void copy_files_data()
{
    char ch;
    ofstream fout;
    ifstream fin;
    fin.open("file.txt",ios::in);
    fout.open("file1.txt",ios::out);
    if(!fin)
    cout<<"file not exist";
    else
    {
        ch=fin.get();
        while(!fin.eof())
        {
            fout<<ch;
            ch=fin.get();
        }
    }
    fin.close();
    fout.close();
}

bool seach_word(char word[10])
{
    char ch;
    int i=0;
    ifstream fin;
    fin.open("file.txt",ios::in);
    if(!fin)
    cout<<"file not exist";
    else
    {
        ch=fin.get();
        while(!fin.eof())
        {
            while(ch==word[i])
            {
                cout<<ch<<"  " <<i<<endl;
                i++;
                ch=fin.get();
            }
            if(strlen(word)==i)
                return true;
                else 
                i=0;
            ch=fin.get();
        }
    }
    return false;
}
class employee
{
    int empid;
    char name[20];
    float salary;
    public:
    void inputdata()
    {
        cout<<"enter your empid,name,salary:\n";
        cin>>empid;
        cin.ignore();
        cin.getline(name,20);
        cin>>salary;
    }
    void showdata()
    {
        cout<<empid<<" ";
        cout<<name<<" ";
        cout<<salary<<endl;
    }
    void store();
    void viewallrecord();
    friend void search_by_id(int id);
    friend void edit_by_id(int);
    friend void delet_an_employee(int);
};

void delet_an_employee(int id)
{
    int pointing;
    employee *ptr=new employee;
    fstream finout;
    finout.open("employee.dat",ios::in|ios::binary|ios::out);
    if(!finout)
    cout<<"file not exist";
    else
    {
        pointing=finout.tellg();
        finout.read((char*)ptr,sizeof(*ptr));
        while(!finout.eof())
        {
            if(id==ptr->empid)
            {
                while(!finout.eof())
                {
                    cout<<pointing<<"  "<<finout.tellg()<<endl;
                    finout.read((char*)ptr,sizeof(*ptr));
                    ptr->showdata();
                    finout.seekp(pointing);
                    finout.write((char*)ptr,sizeof(*ptr));
                    ptr->showdata();
                    cout<<endl;
                    pointing=finout.tellg();
                    finout.read((char*)ptr,sizeof(*ptr));
                }
                break;
            }
            pointing=finout.tellg();
            finout.read((char*)ptr,sizeof(*ptr));
        }
        ptr->inputdata();
        cout<<"-";
        ptr->showdata();
        finout.seekp(pointing);
        finout.write((char*)ptr,sizeof(*ptr));
    }
}

void edit_by_id(int id)
{
    int pointing=0;
    employee *ptr=new employee;
    fstream finout;
    finout.open("employee.dat",ios::in|ios::binary|ios::out);
    if(!finout)
    cout<<"file not exist";
    else
    {
            finout.tellg();
        finout.read((char*)ptr,sizeof(*ptr));
        while(!finout.eof())
        {
            if(id==ptr->empid)
                {
                    ptr->showdata();
                    ptr->inputdata();
                    finout.seekp(pointing);
                    finout.write((char*)ptr,sizeof(*ptr));
                    break;
                }
                //cout<<pointing<<endl;
                pointing=finout.tellg();
                finout.read((char*)ptr,sizeof(*ptr));
        }
        if(finout.eof())
        cout<<" invalid id";
        finout.close();
        delete ptr;
    }
}

void employee::store()
{
    ofstream fout;
    fout.open("employee.dat",ios::app|ios::binary);
    fout.write((char*)this,sizeof(*this));
    fout.close();
}

void employee::viewallrecord()
{
    ifstream fin;
    fin.open("employee.dat",ios::in|ios::binary);
    if(!fin)
    cout<<"file not exist";
    else
    {
        fin.read((char*)this,sizeof(*this));
        while(!fin.eof())
        {
            showdata();
            fin.read((char*)this,sizeof(*this));
        }
    }
    fin.close();
}

void search_by_id(int id)
    {
        employee *ptr=new employee;
        ifstream fin;
        fin.open("employee.dat",ios::in|ios::binary);
        if(!fin)
        cout<<"file not exits";\
        else
        {
            fin.read((char*)ptr,sizeof(*ptr));
            while(!fin.eof())
            {
                if(ptr->empid==id)
                {
                    ptr->showdata();
                    break;
                }
                fin.read((char*)ptr,sizeof(*ptr));
            }
            if(fin.eof())
            {cout<<"invalid employee ID:";}
        }
        delete ptr;
        fin.close();
    }

int menu()
{
    int x;
    cout<<"\n1.store new employee detail";
    cout<<"\n2.view all record";
    cout<<"\n3.exit\n";
    cout<<"4.search by id\n";
    cout<<"5.edit employee\n";
    cout<<"6.delet an employee\n";
    cin>>x;
    return x;
}

int main()
{
    int i,x;
    employee e;
    while(true)
    {
        cout<<"enter your choice:   ";
        switch(menu())
        {
            case 1:
            {
                e.inputdata(); 
                e.store();
                break;
            }
            case 2:
            {
              e.viewallrecord();
              break;
            }
            case 3: exit (0);
            case 4: 
            {
                cout<<" enter empid want to search: ";
                cin>>x;
                search_by_id(x);
                break;
            }
            case 5:
            {
                cout<<" enter empid want to edit: ";
                cin>>x;
                edit_by_id(x);
                break;
            }
            case 6:
            {
                cout<<" enter empid wants to delet: ";
                cin>>x;
                delet_an_employee(x);
                break;
            }
            default : cout<<"invalid choice";
        }

    }
    return 0;
}