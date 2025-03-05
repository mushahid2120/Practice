#include<iostream>
#include<vector>
using namespace std;

vector<int> strickly_smaller(vector<int> v,int position)
{
    vector<int> temp;
    int leftelement=v[position-1], rightelement=v[position+1],small;
    small=leftelement<rightelement ?leftelement :rightelement;
    for(auto x:v)
        if(x<small)
            temp.push_back(x);
    return temp;
}


int main()
{
    /*

    Question 1

    vector <int> v={2,4,2,53,2};
    for(int i=0;i<v.size();i++)
        cout<<v[i]<<endl;
    
    Question 2

   vector <float> v={2.3,4.3,5.4,7.1};
    for(int i=0;i<v.size();i++)
        cout<<v.at(i)<<end;

    Question 3

   vector<string> v={"ABC","XYZ","PQR"};
   for(auto x:v)
    cout<<x<<endl;

    Question 4

   vector<int> v={3,5,3,2,4};
   vector<int>::iterator it;
   for(it=v.begin();it!=v.end();it++)
    cout<<*it<<endl;

    Question 5
    */

    vector<int> v={2,4,2,-4,0,-5,5,7,8,10};
    for(auto x:strickly_smaller(v,7))
        cout<<x<<" ";
    return 0;
}

