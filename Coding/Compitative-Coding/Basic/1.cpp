// Minimize the maximum of Two Array

#include<bits/stdc++.h>

using namespace std;
class Solution {
public:
    int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) 
    {
      class Solution {
public:
    int minimizeSet(int divisor1, int divisor2, int uniqueCnt1,
                    int uniqueCnt2) {
        vector<int> arr1, arr2;
        map<int, int> record;
        for (int i = 1, ct = 0; ct <= uniqueCnt1; i++) {
            if (i % divisor1 && !record[i])
                {
                    arr1.push_back(i);
                    record[i]++;
                    ct++;
                    cout<<i<<" ";
                }
        }
        cout<<endl;
        for (int i = 1, ct = 0; ct <= uniqueCnt2; i++) {
            if (i % divisor2 && !record[i]) 
                {
                    arr2.push_back(i);
                    record[i]++;
                    ct++;
                    cout<<i<<" ";
                }
        }
        return 1;

        // return max(*max_element(arr1.begin(),arr1.end()),*max_element(arr2.begin(),arr2.end()));

        }
    };
    }
};

int main()
{
    int d1,d2,u1,u2;
    cout<<"enter the divisor 1 and divisor 2"<<endl;
    cin>>d1>>d2;
    cout<<"size of array 1 and 2"<<endl;
    cin>>u1>>u2;

    Solution s;
    s.minimizeSet(d1,d2,u1,u2);

    return 0;
}