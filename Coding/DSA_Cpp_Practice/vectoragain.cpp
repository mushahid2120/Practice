#include<iostream>
#include<vector>
using namespace std;

bool is_prime(int a)
{
    int i;
    if(a>=2){
        for(i=2;i<a;i++)
            {   
                 if(a%i==0)
                break;

            }
        if(i==a)
            return true;
        return false;
    }
    return false;
}

int main()
{
    /*

    Question 1

    vector<int> v={1,2,5,-7,10,0,-1};
    vector<int>::iterator it;
    for(it=v.begin();it!=v.end();it++)
            if(*it<0)
            {
                v.erase(it);
                it--;
            }

    for(auto x:v)
        cout<<x<<" ";
    
    Question 2

   vector<int> v={1,2,4};
   v.insert(v.begin()+2,3,25);
    for(auto x:v)
        cout<<x<<endl;

        Question 3

       vector<vector<int>> soav;
       vector<int>v={3,2,4,6,3,6,3,4,6};
       vector<int> temp={v[0]};
       for(int i=1;i<v.size();i++)
           {
            int prev_index=i-1;
            if(v[i]>=v[prev_index])
                temp.push_back(v[i]);
            else
            {
                soav.push_back(temp);
                temp.clear();
                temp.push_back(v[i]);
            }
           }
           soav.push_back(temp);
        
        for(auto x:soav)
            {
                for(auto y:x)
                cout<<y<<" ";
            cout<<endl;
            }

    Question 4


vector<int> v={1,2,7,9,10,11};
vector<int>::iterator it;
for(it=v.begin();it!=v.end()-1;it++)
        {if(is_prime(*it))
            {v.erase(it);
            it--;}
        }
    if(is_prime(*v.end()))
        v.erase(it);

    for(auto x:v)
        cout<<x<<" ";

Question 5

vector <int> v;
vector <vector<int>> multiv={{1,5,7,10,20},{20,11,13,7,9},{100,200,50,499}};
v.push_back(multiv[0][0]);
v.push_back(multiv[0][1]);
v.push_back(multiv[0][2]);
v.insert(v.begin()+3,multiv[1].end()-2,multiv[1].end());
v.insert(v.end(),multiv[2].begin(),multiv[2].end());
for(auto x:v)
    cout<<x<<" ";
return 0;
*/
}